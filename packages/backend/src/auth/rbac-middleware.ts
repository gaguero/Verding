import { Request, Response, NextFunction } from 'express';
import { 
  ResourceType, 
  ActionType, 
  hasPermission, 
  canManageRole, 
  hasManagementPermissions,
  hasAdminPermissions,
  isPropertyOwner,
  getResourcePermissions,
  getAllowedRolesToAssign
} from './rbac.js';
import { UserRole } from './types.js';

/**
 * Helper function to get the user's role in the active property.
 */
function getUserRoleInActiveProperty(req: Request): UserRole | undefined {
  if (req.auth && req.auth.user) {
    const authenticatedUser = req.auth.user;
    if (authenticatedUser.active_property_id) {
      const activeProperty = authenticatedUser.properties.find(
        (p) => p.property_id === authenticatedUser.active_property_id
      );
      return activeProperty?.role;
    }
  }
  return undefined;
}

/**
 * Middleware to require specific resource permission
 */
export function requireResourcePermission(resource: ResourceType, action: ActionType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = getUserRoleInActiveProperty(req);

    if (!req.auth || !userRole) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'No user role information or active property set',
      });
      return;
    }

    if (!hasPermission(userRole, resource, action)) {
      res.status(403).json({
        error: 'Insufficient permissions',
        message: `${action} permission required for ${resource}`,
        required_permission: `${resource}:${action}`,
        user_role: userRole,
      });
      return;
    }

    next();
  };
}

/**
 * Middleware to require management permissions
 */
export function requireManagement(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userRole = getUserRoleInActiveProperty(req);

  if (!req.auth || !userRole) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'No user role information or active property set',
    });
    return;
  }

  if (!hasManagementPermissions(userRole)) {
    res.status(403).json({
      error: 'Insufficient permissions',
      message: 'Management permissions required',
      user_role: userRole,
    });
    return;
  }

  next();
}

/**
 * Middleware to require admin permissions
 */
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userRole = getUserRoleInActiveProperty(req);

  if (!req.auth || !userRole) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'No user role information or active property set',
    });
    return;
  }

  if (!hasAdminPermissions(userRole)) {
    res.status(403).json({
      error: 'Insufficient permissions',
      message: 'Administrative permissions required',
      user_role: userRole,
    });
    return;
  }

  next();
}

/**
 * Middleware to require property owner permissions
 */
export function requireOwner(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userRole = getUserRoleInActiveProperty(req);

  if (!req.auth || !userRole) {
    res.status(401).json({
      error: 'Authentication required',
      message: 'No user role information or active property set',
    });
    return;
  }

  if (!isPropertyOwner(userRole)) {
    res.status(403).json({
      error: 'Insufficient permissions',
      message: 'Property owner permissions required',
      user_role: userRole,
    });
    return;
  }

  next();
}

/**
 * Middleware to validate role management permissions
 */
export function requireRoleManagement(targetRoleParam: string = 'role') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const managerRole = getUserRoleInActiveProperty(req);

    if (!req.auth || !managerRole) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'No user role information or active property set',
      });
      return;
    }

    const targetRole = (req.params[targetRoleParam] || req.body.role) as UserRole;
    
    if (!targetRole) {
      res.status(400).json({
        error: 'Bad request',
        message: 'Target role required',
      });
      return;
    }

    if (!canManageRole(managerRole, targetRole)) {
      res.status(403).json({
        error: 'Insufficient permissions',
        message: `Cannot manage users with role: ${targetRole}`,
        manager_role: managerRole,
        target_role: targetRole,
      });
      return;
    }

    next();
  };
}

/**
 * Middleware to inject user permissions into request
 */
export function injectPermissions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userRole = getUserRoleInActiveProperty(req);

  if (req.auth && userRole) {
    // Add resource permissions to request context
    req.auth.resourcePermissions = {};
    for (const resource of Object.values(ResourceType)) {
      req.auth.resourcePermissions[resource] = getResourcePermissions(userRole, resource);
    }

    // Add role management capabilities
    req.auth.allowedRolesToAssign = getAllowedRolesToAssign(userRole);
    req.auth.hasManagementPermissions = hasManagementPermissions(userRole);
    req.auth.hasAdminPermissions = hasAdminPermissions(userRole);
    req.auth.isPropertyOwner = isPropertyOwner(userRole);
  }

  next();
}

/**
 * Middleware to check ownership of a resource
 */
export function requireResourceOwnership(
  resourceIdParam: string = 'id',
  userIdField: string = 'created_by'
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.auth) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'No authentication context',
      });
      return;
    }

    const resourceId = req.params[resourceIdParam];
    const userId = req.auth.user.id;
    
    if (!resourceId) {
      res.status(400).json({
        error: 'Bad request',
        message: 'Resource ID required',
      });
      return;
    }

    // Super admins and property owners can access any resource
    const userRole = getUserRoleInActiveProperty(req);
    if (req.auth.permissions.is_super_admin || (userRole && isPropertyOwner(userRole))) {
      next();
      return;
    }

    // For other users, check ownership using the userIdField
    // This implementation would check if the resource's userIdField matches the current user
    // For now, log the ownership check parameters for future implementation
    console.log(
      `Checking ownership: resourceId=${resourceId}, userId=${userId}, field=${userIdField}`
    );
    next();
  };
}

/**
 * Middleware to validate batch permissions
 */
export function requireBatchPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.BATCH, action);
}

/**
 * Middleware to validate harvest permissions
 */
export function requireHarvestPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.HARVEST, action);
}

/**
 * Middleware to validate inventory permissions
 */
export function requireInventoryPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.INVENTORY, action);
}

/**
 * Middleware to validate equipment permissions
 */
export function requireEquipmentPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.EQUIPMENT, action);
}

/**
 * Middleware to validate sensor permissions
 */
export function requireSensorPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.SENSOR, action);
}

/**
 * Middleware to validate user management permissions
 */
export function requireUserPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.USER, action);
}

/**
 * Middleware to validate report permissions
 */
export function requireReportPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.REPORT, action);
}

/**
 * Middleware to validate setting permissions
 */
export function requireSettingPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.SETTING, action);
}

/**
 * Middleware to validate agent memory permissions
 */
export function requireAgentMemoryPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.AGENT_MEMORY, action);
}

/**
 * Middleware to validate workflow permissions
 */
export function requireWorkflowPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.WORKFLOW, action);
}

/**
 * Middleware to validate notification permissions
 */
export function requireNotificationPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.NOTIFICATION, action);
}

/**
 * Middleware to validate property permissions
 */
export function requirePropertyPermission(action: ActionType) {
  return requireResourcePermission(ResourceType.PROPERTY, action);
} 
