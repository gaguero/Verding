import { UserRole, UserPermissions, PropertyAccess } from './types.js';

// Role hierarchy definition (higher number = more permissions)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  client: 1,
  viewer: 2,
  employee: 3,
  manager: 4,
  admin: 5,
  owner: 6,
};

// Base permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  client: {
    can_view: true,
    can_edit: false,
    can_manage: false,
    is_super_admin: false,
  },
  viewer: {
    can_view: true,
    can_edit: false,
    can_manage: false,
    is_super_admin: false,
  },
  employee: {
    can_view: true,
    can_edit: true,
    can_manage: false,
    is_super_admin: false,
  },
  manager: {
    can_view: true,
    can_edit: true,
    can_manage: true,
    is_super_admin: false,
  },
  admin: {
    can_view: true,
    can_edit: true,
    can_manage: true,
    is_super_admin: false,
  },
  owner: {
    can_view: true,
    can_edit: true,
    can_manage: true,
    is_super_admin: true,
  },
};

// Resource types in the system
export enum ResourceType {
  PROPERTY = 'property',
  BATCH = 'batch',
  HARVEST = 'harvest',
  INVENTORY = 'inventory',
  EQUIPMENT = 'equipment',
  SENSOR = 'sensor',
  USER = 'user',
  REPORT = 'report',
  SETTING = 'setting',
  AGENT_MEMORY = 'agent_memory',
  WORKFLOW = 'workflow',
  NOTIFICATION = 'notification',
}

// Action types
export enum ActionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
  INVITE = 'invite',
  EXPORT = 'export',
  ARCHIVE = 'archive',
}

// Permission matrix: [Resource][Action] = [Required Role Level]
export const PERMISSION_MATRIX: Record<ResourceType, Record<ActionType, number>> = {
  [ResourceType.PROPERTY]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.owner, // Only owners can create properties
    [ActionType.READ]: ROLE_HIERARCHY.client,
    [ActionType.UPDATE]: ROLE_HIERARCHY.admin,
    [ActionType.DELETE]: ROLE_HIERARCHY.owner,
    [ActionType.MANAGE]: ROLE_HIERARCHY.admin,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.owner,
  },
  [ResourceType.BATCH]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.employee,
    [ActionType.READ]: ROLE_HIERARCHY.client,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.manager,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.manager,
  },
  [ResourceType.HARVEST]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.employee,
    [ActionType.READ]: ROLE_HIERARCHY.client,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.manager,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.manager,
  },
  [ResourceType.INVENTORY]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.employee,
    [ActionType.READ]: ROLE_HIERARCHY.viewer,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.manager,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.manager,
  },
  [ResourceType.EQUIPMENT]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.manager,
    [ActionType.READ]: ROLE_HIERARCHY.viewer,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.admin,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.admin,
  },
  [ResourceType.SENSOR]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.manager,
    [ActionType.READ]: ROLE_HIERARCHY.viewer,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.admin,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.admin,
  },
  [ResourceType.USER]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.manager, // Invite users
    [ActionType.READ]: ROLE_HIERARCHY.viewer,
    [ActionType.UPDATE]: ROLE_HIERARCHY.admin,
    [ActionType.DELETE]: ROLE_HIERARCHY.owner,
    [ActionType.MANAGE]: ROLE_HIERARCHY.admin,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.admin,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.admin,
  },
  [ResourceType.REPORT]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.employee,
    [ActionType.READ]: ROLE_HIERARCHY.viewer,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.manager,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.manager,
  },
  [ResourceType.SETTING]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.admin,
    [ActionType.READ]: ROLE_HIERARCHY.manager,
    [ActionType.UPDATE]: ROLE_HIERARCHY.admin,
    [ActionType.DELETE]: ROLE_HIERARCHY.owner,
    [ActionType.MANAGE]: ROLE_HIERARCHY.admin,
    [ActionType.INVITE]: ROLE_HIERARCHY.admin,
    [ActionType.EXPORT]: ROLE_HIERARCHY.admin,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.owner,
  },
  [ResourceType.AGENT_MEMORY]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.employee,
    [ActionType.READ]: ROLE_HIERARCHY.viewer,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.manager,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.manager,
  },
  [ResourceType.WORKFLOW]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.manager,
    [ActionType.READ]: ROLE_HIERARCHY.employee,
    [ActionType.UPDATE]: ROLE_HIERARCHY.manager,
    [ActionType.DELETE]: ROLE_HIERARCHY.admin,
    [ActionType.MANAGE]: ROLE_HIERARCHY.admin,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.manager,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.admin,
  },
  [ResourceType.NOTIFICATION]: {
    [ActionType.CREATE]: ROLE_HIERARCHY.employee,
    [ActionType.READ]: ROLE_HIERARCHY.client,
    [ActionType.UPDATE]: ROLE_HIERARCHY.employee,
    [ActionType.DELETE]: ROLE_HIERARCHY.manager,
    [ActionType.MANAGE]: ROLE_HIERARCHY.manager,
    [ActionType.INVITE]: ROLE_HIERARCHY.manager,
    [ActionType.EXPORT]: ROLE_HIERARCHY.viewer,
    [ActionType.ARCHIVE]: ROLE_HIERARCHY.manager,
  },
};

/**
 * Check if a role has permission to perform an action on a resource
 */
export function hasPermission(
  userRole: UserRole,
  resource: ResourceType,
  action: ActionType
): boolean {
  const userLevel = ROLE_HIERARCHY[userRole];
  const requiredLevel = PERMISSION_MATRIX[resource]?.[action];
  
  if (requiredLevel === undefined) {
    // If permission is not defined, deny access
    return false;
  }
  
  return userLevel >= requiredLevel;
}

/**
 * Check if a role can perform an action on another user's role
 */
export function canManageRole(managerRole: UserRole, targetRole: UserRole): boolean {
  const managerLevel = ROLE_HIERARCHY[managerRole];
  const targetLevel = ROLE_HIERARCHY[targetRole];
  
  // Can only manage users with lower role level
  return managerLevel > targetLevel;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): UserPermissions {
  return { ...ROLE_PERMISSIONS[role] };
}

/**
 * Get effective permissions for a user across multiple properties
 */
export function getEffectivePermissions(properties: PropertyAccess[]): UserPermissions {
  if (properties.length === 0) {
    return {
      can_view: false,
      can_edit: false,
      can_manage: false,
      is_super_admin: false,
    };
  }

  // Get the highest level of permissions across all properties
  const effective: UserPermissions = {
    can_view: false,
    can_edit: false,
    can_manage: false,
    is_super_admin: false,
  };

  for (const property of properties) {
    if (property.can_view) effective.can_view = true;
    if (property.can_edit) effective.can_edit = true;
    if (property.can_manage) effective.can_manage = true;
    if (property.role === 'owner') effective.is_super_admin = true;
  }

  return effective;
}

/**
 * Check if user can invite another user with a specific role
 */
export function canInviteWithRole(inviterRole: UserRole, inviteeRole: UserRole): boolean {
  // Must be able to manage the target role
  if (!canManageRole(inviterRole, inviteeRole)) {
    return false;
  }

  // Must have invite permission
  return hasPermission(inviterRole, ResourceType.USER, ActionType.INVITE);
}

/**
 * Get allowed roles that a user can assign to others
 */
export function getAllowedRolesToAssign(userRole: UserRole): UserRole[] {
  const userLevel = ROLE_HIERARCHY[userRole];
  const allowedRoles: UserRole[] = [];

  for (const [role, level] of Object.entries(ROLE_HIERARCHY)) {
    if (level < userLevel) {
      allowedRoles.push(role as UserRole);
    }
  }

  return allowedRoles;
}

/**
 * Validate role transition (role changes)
 */
export function canChangeRole(
  changerRole: UserRole,
  currentRole: UserRole,
  newRole: UserRole
): boolean {
  // Must be able to manage both current and new roles
  return canManageRole(changerRole, currentRole) && canManageRole(changerRole, newRole);
}

/**
 * Get resource permissions for a role
 */
export function getResourcePermissions(
  role: UserRole,
  resource: ResourceType
): Record<ActionType, boolean> {
  const userLevel = ROLE_HIERARCHY[role];
  const resourcePermissions = PERMISSION_MATRIX[resource];
  const permissions: Record<ActionType, boolean> = {} as any;

  for (const [action, requiredLevel] of Object.entries(resourcePermissions)) {
    permissions[action as ActionType] = userLevel >= requiredLevel;
  }

  return permissions;
}

/**
 * Check if user has any management permissions
 */
export function hasManagementPermissions(role: UserRole): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY.manager;
}

/**
 * Check if user has administrative permissions
 */
export function hasAdminPermissions(role: UserRole): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY.admin;
}

/**
 * Check if user is a property owner
 */
export function isPropertyOwner(role: UserRole): boolean {
  return role === 'owner';
}

/**
 * Get role display information
 */
export function getRoleInfo(role: UserRole): {
  name: string;
  description: string;
  level: number;
  permissions: UserPermissions;
} {
  const descriptions: Record<UserRole, string> = {
    client: 'External client with read-only access to specific data',
    viewer: 'Read-only access to property operations and reports',
    employee: 'Can view and edit operational data, create batches and harvests',
    manager: 'Can manage operations, invite users, and oversee workflows',
    admin: 'Full administrative access except property ownership',
    owner: 'Complete control over property and all users',
  };

  return {
    name: role.charAt(0).toUpperCase() + role.slice(1),
    description: descriptions[role],
    level: ROLE_HIERARCHY[role],
    permissions: getRolePermissions(role),
  };
}

/**
 * Validate RBAC configuration
 */
export function validateRBACConfiguration(): void {
  // Ensure all resources have all actions defined
  for (const resource of Object.values(ResourceType)) {
    const resourcePerms = PERMISSION_MATRIX[resource];
    for (const action of Object.values(ActionType)) {
      if (resourcePerms[action] === undefined) {
        throw new Error(`Missing permission definition for ${resource}.${action}`);
      }
    }
  }

  // Ensure role hierarchy is consistent
  const roles = Object.keys(ROLE_HIERARCHY) as UserRole[];
  for (const role of roles) {
    if (!ROLE_PERMISSIONS[role]) {
      throw new Error(`Missing base permissions for role: ${role}`);
    }
  }

  console.log('RBAC configuration validated successfully');
} 
