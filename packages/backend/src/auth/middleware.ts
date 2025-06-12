import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractBearerToken } from './jwt.js';
import { createAuthenticatedUser, validateUserSession } from './utils.js';
import { getSupabaseClient } from './providers.js';
import { AuthError, PropertyAccess } from './types.js';

/**
 * Authentication middleware - validates JWT tokens and sets user context
 */
export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);
    
    if (!token) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'No token provided',
      });
      return;
    }

    // Verify JWT token
    verifyToken(token);
    
    // Get full user context from Supabase
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid token',
      });
      return;
    }

    // Create enhanced user object
    const authenticatedUser = await createAuthenticatedUser(user);

    // Set auth context on request
    req.auth = {
      user: authenticatedUser,
      property_id: authenticatedUser.active_property_id,
      permissions: authenticatedUser.permissions || {
        can_view: false,
        can_edit: false,
        can_manage: false,
        is_super_admin: false,
      },
    };

    // Also set user directly for convenience
    req.user = req.auth.user;

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        error: error.type,
        message: error.message,
      });
    } else {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid token',
      });
    }
  }
}

/**
 * Optional authentication middleware - sets user context if token is present
 */
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (token) {
      verifyToken(token);
      
      // Get full user context from Supabase
      const supabase = getSupabaseClient();
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        // For optional auth, we don't fail on invalid tokens
        next();
        return;
      }

      // Create enhanced user object
      const authenticatedUser = await createAuthenticatedUser(user);

      req.auth = {
        user: authenticatedUser,
        property_id: authenticatedUser.active_property_id,
        permissions: authenticatedUser.permissions || {
          can_view: false,
          can_edit: false,
          can_manage: false,
          is_super_admin: false,
        },
      };

      req.user = req.auth.user;
    }

    next();
  } catch (error) {
    // For optional auth, we don't fail on invalid tokens
    next();
  }
}

/**
 * Enhanced authentication middleware with database validation
 */
export async function authenticateWithDatabase(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (!token) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'No token provided',
      });
      return;
    }

    // Verify JWT token
    verifyToken(token);
    
    // Validate session with database
    await validateUserSession(token);
    
    // Get full user context from Supabase
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid session',
      });
      return;
    }

    // Create enhanced user object
    const authenticatedUser = await createAuthenticatedUser(user);
    
    req.auth = {
      user: authenticatedUser,
      property_id: authenticatedUser.active_property_id,
      permissions: authenticatedUser.permissions || {
        can_view: false,
        can_edit: false,
        can_manage: false,
        is_super_admin: false,
      },
    };

    req.user = authenticatedUser;

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        error: error.type,
        message: error.message,
      });
    } else {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Session validation failed',
      });
    }
  }
}

/**
 * Property context middleware - ensures user has access to specified property
 */
export function requirePropertyAccess(propertyIdParam: string = 'propertyId') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.auth || !req.auth.user) {
        res.status(401).json({
          error: 'Authentication required',
          message: 'No authentication context or user information',
        });
        return;
      }

      const requestedPropertyId = req.params[propertyIdParam] || req.body.property_id;
      
      if (!requestedPropertyId) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Property ID required',
        });
        return;
      }

      // Check if user has access to this property
      const userProperties = req.auth.user.properties || [];
      const hasAccess = userProperties.some(
        (p: PropertyAccess) => p.property_id === requestedPropertyId
      );

      if (!hasAccess && !req.auth.permissions.is_super_admin) {
        res.status(403).json({
          error: 'Property access denied',
          message: 'No access to specified property',
        });
        return;
      }

      // Set property context
      req.auth.property_id = requestedPropertyId;

      next();
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        message: 'Property access validation failed',
      });
    }
  };
}

/**
 * Error handling middleware for authentication errors
 */
export function authErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof AuthError) {
    res.status(error.statusCode).json({
      error: error.type,
      message: error.message,
      details: error.details,
    });
  } else {
    // Pass non-auth errors to next handler
    next(error);
  }
}

/**
 * Middleware to extract user context from Supabase session
 */
export async function extractSupabaseUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (!token) {
      next();
      return;
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (!error && user) {
      const authenticatedUser = await createAuthenticatedUser(user);
      req.user = authenticatedUser;
      
      req.auth = {
        user: authenticatedUser,
        property_id: authenticatedUser.active_property_id,
        permissions: authenticatedUser.permissions || {
          can_view: false,
          can_edit: false,
          can_manage: false,
          is_super_admin: false,
        },
      };
    }

    next();
  } catch (error) {
    // Don't fail on user extraction errors
    next();
  }
} 
