import { Request, Response, NextFunction } from 'express';
import { getSupabaseClient } from './providers';
import { AuthError, AuthErrorType, PropertyAccess } from './types';
import { isPropertyOwner } from './rbac';

/**
 * Property context isolation middleware
 * Ensures users can only access data from properties they have access to
 */
export function enforcePropertyIsolation(
  propertyIdParam: string = 'propertyId'
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.auth) {
        res.status(401).json({
          error: 'Authentication required',
          message: 'No authentication context',
        });
        return;
      }

      const requestedPropertyId = req.params[propertyIdParam] || 
                                  req.body.property_id || 
                                  req.query.property_id as string;

      if (!requestedPropertyId) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Property ID required',
        });
        return;
      }

      // Super admins can access any property
      if (req.auth.permissions.is_super_admin) {
        req.auth.property_id = requestedPropertyId;
        next();
        return;
      }

      // Check if user has access to the requested property
      const userProperties = req.auth.user?.properties || [];
      const propertyAccess = userProperties.find(
        (p: PropertyAccess) => p.property_id === requestedPropertyId
      );

      if (!propertyAccess) {
        res.status(403).json({
          error: 'Property access denied',
          message: 'No access to the requested property',
          property_id: requestedPropertyId,
          user_properties: userProperties.map((p: PropertyAccess) => p.property_id),
        });
        return;
      }

      // Set property context
      req.auth.property_id = requestedPropertyId;
      req.auth.property_access = propertyAccess;

      next();
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        message: 'Property isolation validation failed',
      });
    }
  };
}

/**
 * Middleware to validate property ownership for sensitive operations
 */
export function requirePropertyOwnership(
  propertyIdParam: string = 'propertyId'
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.auth) {
        res.status(401).json({
          error: 'Authentication required',
          message: 'No authentication context',
        });
        return;
      }

      const requestedPropertyId = req.params[propertyIdParam] || 
                                  req.body.property_id || 
                                  req.query.property_id as string;

      if (!requestedPropertyId) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Property ID required',
        });
        return;
      }

      // Check if user is owner of the requested property
      const userProperties = req.auth.user.properties || [];
      const propertyAccess = userProperties.find(
        (p: PropertyAccess) => p.property_id === requestedPropertyId && isPropertyOwner(p.role)
      );

      if (!propertyAccess) {
        res.status(403).json({
          error: 'Property ownership required',
          message: 'Only property owners can perform this action',
          property_id: requestedPropertyId,
        });
        return;
      }

      req.auth.property_id = requestedPropertyId;
      req.auth.property_access = propertyAccess;

      next();
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        message: 'Property ownership validation failed',
      });
    }
  };
}

/**
 * Middleware to automatically inject property context from user's active property
 */
export function injectActivePropertyContext(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.auth && req.auth.user && req.auth.user.active_property_id) {
    const user = req.auth.user;
    req.auth.property_id = user.active_property_id;
    
    // Find the property access info
    const userProperties = user.properties || [];
    const propertyAccess = userProperties.find(
      (p: PropertyAccess) => p.property_id === user.active_property_id
    );
    
    if (propertyAccess) {
      req.auth.property_access = propertyAccess;
    }
  }

  next();
}

/**
 * Middleware to validate property switching
 */
export function validatePropertySwitch(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.auth) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'No authentication context',
    });
    return;
  }

  const newPropertyId = req.body.property_id;
  
  if (!newPropertyId) {
    res.status(400).json({
      error: 'Bad request',
      message: 'Property ID required for switching',
    });
    return;
  }

  // Super admins can switch to any property
  if (req.auth.permissions.is_super_admin) {
    next();
    return;
  }

  // Check if user has access to the new property
  const userProperties = req.auth.user.properties || [];
  const hasAccess = userProperties.some(
    (p: PropertyAccess) => p.property_id === newPropertyId
  );

  if (!hasAccess) {
    res.status(403).json({
      error: 'Property access denied',
      message: 'No access to the requested property',
      property_id: newPropertyId,
    });
    return;
  }

  next();
}

/**
 * Middleware to filter query results by property access
 */
export function filterByPropertyAccess(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.auth) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'No authentication context',
    });
    return;
  }

  // Super admins see all properties
  if (req.auth.permissions.is_super_admin) {
    next();
    return;
  }

  // Add property filter to query
  const userProperties = req.auth.user.properties || [];
  const accessiblePropertyIds = userProperties.map((p: PropertyAccess) => p.property_id);
  
  // Add property filter to request for use in controllers
  req.auth.accessible_property_ids = accessiblePropertyIds;

  next();
}

/**
 * Database query helper to add property isolation
 */
export function addPropertyFilter(
  query: any,
  propertyId: string | string[],
  columnName: string = 'property_id'
): any {
  if (Array.isArray(propertyId)) {
    return query.in(columnName, propertyId);
  } else {
    return query.eq(columnName, propertyId);
  }
}

/**
 * Validate property access for database operations
 */
export async function validatePropertyAccess(
  userId: string,
  propertyId: string,
  requiredPermission: 'view' | 'edit' | 'manage' = 'view'
): Promise<PropertyAccess | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .rpc('get_user_properties_with_roles', {
      p_user_id: userId,
    })
    .returns<PropertyAccess[]>();

  if (error || !data) {
    throw new AuthError(
      AuthErrorType.PROPERTY_ACCESS_DENIED,
      `Failed to fetch user properties with roles: ${error?.message || 'Unknown error'}`,
      500,
      error
    );
  }

  // Ensure data is an array before calling find
  const properties: PropertyAccess[] = Array.isArray(data) ? data : [];
  const propertyAccess = properties.find((p) => p.property_id === propertyId);

  if (!propertyAccess) {
    return null;
  }

  const hasPermission = (
    permission: 'can_view' | 'can_edit' | 'can_manage'
  ) => {
    return propertyAccess[permission];
  };

  switch (requiredPermission) {
    case 'view':
      if (!hasPermission('can_view')) {
        return null;
      }
      break;
    case 'edit':
      if (!hasPermission('can_edit')) {
        return null;
      }
      break;
    case 'manage':
      if (!hasPermission('can_manage')) {
        return null;
      }
      break;
  }

  return propertyAccess;
}

/**
 * Get user property access information
 */
export async function getUserPropertyAccess(userId: string): Promise<PropertyAccess[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .rpc('get_current_user_properties')
    .eq('user_id', userId)
    .returns<PropertyAccess[]>();

  if (error || !data) {
    throw new AuthError(
      AuthErrorType.PROPERTY_ACCESS_DENIED,
      `Failed to fetch user properties: ${error?.message || 'Unknown error'}`
    );
  }

  // Ensure data is an array before returning
  return Array.isArray(data) ? data : [];
}

/**
 * Middleware to ensure data operations are scoped to accessible properties
 */
export function scopeToAccessibleProperties(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.auth) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'No authentication context',
    });
    return;
  }

  // For super admins, no scoping needed
  if (req.auth.permissions.is_super_admin) {
    next();
    return;
  }

  // Add property scoping information to request
  const userProperties = req.auth.user.properties || [];
  req.auth.property_scope = {
    accessible_property_ids: userProperties.map((p: PropertyAccess) => p.property_id),
    property_roles: userProperties.reduce((acc: any, p: PropertyAccess) => {
      acc[p.property_id] = p.role;
      return acc;
    }, {}),
  };

  next();
}

/**
 * Utility to check if user can access specific property data
 */
export function canAccessPropertyData(
  userProperties: PropertyAccess[],
  targetPropertyId: string,
  requiredPermission: 'view' | 'edit' | 'manage' = 'view'
): boolean {
  const propertyAccess = userProperties.find(p => p.property_id === targetPropertyId);
  
  if (!propertyAccess) {
    return false;
  }

  switch (requiredPermission) {
    case 'view':
      return propertyAccess.can_view;
    case 'edit':
      return propertyAccess.can_edit;
    case 'manage':
      return propertyAccess.can_manage;
    default:
      return false;
  }
} 
