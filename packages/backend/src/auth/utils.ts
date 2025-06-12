import { getSupabaseClient, getServiceRoleClient } from './providers.js';
import {
  AuthenticatedUser,
  UserProfile,
  PropertyAccess,
  SessionValidation,
  UserPermissions,
  AuthError,
  AuthErrorType,
} from './types.js';
import { User } from '@supabase/supabase-js';

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    throw new AuthError(
      AuthErrorType.USER_NOT_FOUND,
      `Failed to fetch user profile: ${error.message}`
    );
  }

  return data;
}

/**
 * Get user's property access information
 */
export async function getUserProperties(userId: string): Promise<PropertyAccess[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc('get_current_user_properties').eq('user_id', userId);

  if (error) {
    throw new AuthError(
      AuthErrorType.PROPERTY_ACCESS_DENIED,
      `Failed to fetch user properties: ${error.message}`
    );
  }

  return data || [];
}

/**
 * Validate user session and get complete user context
 */
export async function validateUserSession(accessToken: string): Promise<SessionValidation> {
  const supabase = getSupabaseClient();

  // Set the session with the provided access token
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(accessToken);

  if (authError || !user) {
    throw new AuthError(AuthErrorType.INVALID_TOKEN, 'Invalid or expired access token');
  }

  // Get session validation data using the database function
  const { data: sessionData, error: sessionError } = await supabase
    .rpc('validate_user_session')
    .single();

  if (sessionError) {
    throw new AuthError(
      AuthErrorType.USER_NOT_FOUND,
      `Failed to validate session: ${sessionError.message}`
    );
  }

  return sessionData as SessionValidation;
}

/**
 * Create enhanced user object with profile and property information
 */
export async function createAuthenticatedUser(user: User): Promise<AuthenticatedUser> {
  const profile = await getUserProfile(user.id);
  const properties = await getUserProperties(user.id);

  // Get active property from agent session
  const supabase = getSupabaseClient();
  const { data: sessionData } = await supabase
    .from('agent_sessions')
    .select('active_property_id')
    .eq('user_id', user.id)
    .single();

  const activePropertyId = sessionData?.active_property_id;
  const activeProperty = properties.find(p => p.property_id === activePropertyId);

  const permissions: UserPermissions = activeProperty
    ? {
        can_view: activeProperty.can_view,
        can_edit: activeProperty.can_edit,
        can_manage: activeProperty.can_manage,
        is_super_admin: activeProperty.role === 'owner',
      }
    : {
        can_view: false,
        can_edit: false,
        can_manage: false,
        is_super_admin: false,
      };

  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    email: user.email || '',
    profile: profile || {
      id: user.id,
      email: user.email || '',
      full_name: user.email ? user.email.split('@')[0] : '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    active_property_id: activePropertyId,
    permissions,
    properties,
  };

  return authenticatedUser;
}

/**
 * Set user's active property
 */
export async function setActiveProperty(userId: string, propertyId: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc('set_active_property', { property_uuid: propertyId });

  if (error) {
    throw new AuthError(
      AuthErrorType.PROPERTY_ACCESS_DENIED,
      `Failed to set active property: ${error.message}`
    );
  }

  return data;
}

/**
 * Check if user has specific permission for a property
 */
export async function checkPropertyPermission(
  userId: string,
  propertyId: string,
  permission: 'view' | 'edit' | 'manage'
): Promise<boolean> {
  const supabase = getSupabaseClient();

  let functionName: string;
  switch (permission) {
    case 'view':
      functionName = 'can_view_property';
      break;
    case 'edit':
      functionName = 'can_edit_property';
      break;
    case 'manage':
      functionName = 'can_manage_property';
      break;
    default:
      return false;
  }

  const { data, error } = await supabase.rpc(functionName, {
    property_uuid: propertyId,
    user_uuid: userId,
  });

  if (error) {
    console.error(`Permission check failed: ${error.message}`);
    return false;
  }

  return data === true;
}

/**
 * Invite user to property (admin function)
 */
export async function inviteUserToProperty(
  userEmail: string,
  propertyId: string,
  role: string = 'viewer',
  invitedBy: string
): Promise<string> {
  const supabase = getServiceRoleClient();

  const { data, error } = await supabase.rpc('invite_user_to_property', {
    user_email: userEmail,
    property_uuid: propertyId,
    user_role: role,
    invited_by_uuid: invitedBy,
  });

  if (error) {
    throw new AuthError(
      AuthErrorType.INSUFFICIENT_PERMISSIONS,
      `Failed to invite user: ${error.message}`
    );
  }

  return data;
}

/**
 * Create user profile after registration
 */
export async function createUserProfile(
  userId: string,
  email: string,
  fullName?: string,
  additionalData?: Partial<UserProfile>
): Promise<UserProfile> {
  const supabase = getServiceRoleClient();

  const profileData = {
    id: userId,
    email,
    full_name: fullName || email.split('@')[0],
    ...additionalData,
  };

  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profileData)
    .select()
    .single();

  if (error) {
    throw new AuthError(
      AuthErrorType.USER_NOT_FOUND,
      `Failed to create user profile: ${error.message}`
    );
  }

  return data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new AuthError(
      AuthErrorType.USER_NOT_FOUND,
      `Failed to update user profile: ${error.message}`
    );
  }

  return data;
}

/**
 * Extract JWT token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Generate secure random string for tokens
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Hash password using bcrypt (for additional security if needed)
 */
export async function hashPassword(password: string): Promise<string> {
  // Note: Supabase handles password hashing automatically
  // This function is provided for additional security layers if needed
  const bcrypt = await import('bcryptjs');
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}
