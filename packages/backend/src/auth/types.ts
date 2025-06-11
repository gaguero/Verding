// User type imported from Supabase when needed

// User roles in the system
export type UserRole = 'owner' | 'admin' | 'manager' | 'employee' | 'viewer' | 'client';

// Permission types
export interface UserPermissions {
  can_view: boolean;
  can_edit: boolean;
  can_manage: boolean;
  is_super_admin: boolean;
}

// Property access information
export interface PropertyAccess {
  property_id: string;
  property_name: string;
  property_description: string;
  role: UserRole;
  can_view: boolean;
  can_edit: boolean;
  can_manage: boolean;
  granted_at: string;
}

// User profile from database
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  created_at: string;
  updated_at: string;
}

// Authenticated user context
export interface AuthenticatedUser {
  id: string;
  email: string;
  profile: UserProfile;
  properties: PropertyAccess[];
  active_property_id?: string;
  permissions: UserPermissions;
}

// Authentication context
export interface AuthContext {
  user: AuthenticatedUser;
  property_id?: string;
  property_access?: PropertyAccess;
  accessible_property_ids?: string[];
  property_scope?: {
    accessible_property_ids: string[];
    property_roles: Record<string, string>;
  };
  permissions: UserPermissions;
  session_id?: string;
  resourcePermissions?: Record<string, Record<string, boolean>>;
  allowedRolesToAssign?: UserRole[];
  hasManagementPermissions?: boolean;
  hasAdminPermissions?: boolean;
  isPropertyOwner?: boolean;
}

// Session validation result
export interface SessionValidation {
  valid: boolean;
  user?: AuthenticatedUser;
  error?: string;
}

// Authentication provider configuration
export interface AuthProvider {
  name: string;
  enabled: boolean;
  client_id?: string;
  client_secret?: string;
  redirect_url?: string;
  scopes?: string[];
  config?: any; // Added to handle the config property in providers.ts
}

// OAuth provider configuration
export interface OAuthProvider extends AuthProvider {
  authorization_url: string;
  token_url: string;
  user_info_url: string;
  redirect_url: string; // Corrected from redirect_uri
}

// Error types for authentication
export enum AuthErrorType {
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  INVALID_SESSION = 'INVALID_SESSION',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  INVALID_PROVIDER = 'INVALID_PROVIDER',
  INVITATION_ALREADY_EXISTS = 'INVITATION_ALREADY_EXISTS',
  INVITATION_NOT_FOUND = 'INVITATION_NOT_FOUND',
  INVITATION_CREATION_FAILED = 'INVITATION_CREATION_FAILED',
  INVITATION_UPDATE_FAILED = 'INVITATION_UPDATE_FAILED',
  INVALID_INVITATION_STATUS = 'INVALID_INVITATION_STATUS',
  PROPERTY_ACCESS_DENIED = 'PROPERTY_ACCESS_DENIED',
}

// Authentication error class
export class AuthError extends Error {
  public readonly type: AuthErrorType;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(
    type: AuthErrorType,
    message: string,
    statusCode: number = 500,
    details?: any
  ) {
    super(message);
    this.name = 'AuthError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

// Login response
export interface LoginResponse {
  success: boolean;
  user?: AuthenticatedUser;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  error?: string;
}

// Registration request
export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  timezone?: string;
  language?: string;
}

// Registration response
export interface RegisterResponse {
  success: boolean;
  user?: AuthenticatedUser;
  message?: string;
  error?: string;
}

// Password reset request
export interface PasswordResetRequest {
  email: string;
}

// Password reset response
export interface PasswordResetResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Password update request
export interface PasswordUpdateRequest {
  current_password: string;
  new_password: string;
}

// Profile update request
export interface ProfileUpdateRequest {
  full_name?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  avatar_url?: string;
}

// Property switching request
export interface PropertySwitchRequest {
  property_id: string;
}

// Property switching response
export interface PropertySwitchResponse {
  success: boolean;
  property?: PropertyAccess;
  access_token?: string;
  error?: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
      user?: AuthenticatedUser;
    }
  }
} 
