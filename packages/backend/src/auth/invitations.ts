import { getSupabaseClient, getServiceRoleClient } from './providers.js';
import { generateSecureToken } from './utils.js';
import { canInviteWithRole } from './rbac.js';
import { UserRole, AuthError, AuthErrorType } from './types.js';

// Invitation status types
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'cancelled';

// Invitation interface
export interface Invitation {
  id: string;
  email: string;
  property_id: string;
  property_name: string;
  invited_by: string;
  invited_by_name: string;
  role: UserRole;
  status: InvitationStatus;
  token: string;
  expires_at: string;
  created_at: string;
  accepted_at?: string;
  message?: string;
}

// Invitation creation data
export interface CreateInvitationData {
  email: string;
  property_id: string;
  role: UserRole;
  message?: string;
  expires_in_hours?: number;
}

// Invitation acceptance data
export interface AcceptInvitationData {
  token: string;
  password?: string;
  full_name: string;
  phone?: string;
}

/**
 * Create a new user invitation
 */
export async function createInvitation(
  inviterUserId: string,
  inviterRole: UserRole,
  invitationData: CreateInvitationData
): Promise<Invitation> {
  const supabase = getServiceRoleClient();
  
  // Validate inviter can invite with the specified role
  if (!canInviteWithRole(inviterRole, invitationData.role)) {
    throw new AuthError(
      AuthErrorType.INSUFFICIENT_PERMISSIONS,
      `Cannot invite users with role: ${invitationData.role}`,
      403
    );
  }

  // Check if user is already invited or has access to the property
  const { data: existingAccess } = await supabase
    .from('property_users')
    .select('id')
    .eq('property_id', invitationData.property_id)
    .eq('user_id', inviterUserId)
    .single();

  if (existingAccess) {
    throw new AuthError(
      AuthErrorType.USER_ALREADY_EXISTS,
      'User already has access to this property',
      409
    );
  }

  // Check for pending invitation
  const { data: existingInvitation } = await supabase
    .from('invitations')
    .select('id, status')
    .eq('email', invitationData.email)
    .eq('property_id', invitationData.property_id)
    .eq('status', 'pending')
    .single();

  if (existingInvitation) {
    throw new AuthError(
      AuthErrorType.INVITATION_ALREADY_EXISTS,
      'User already has a pending invitation for this property',
      409
    );
  }

  // Generate secure invitation token
  const token = generateSecureToken();
  const expiresInHours = invitationData.expires_in_hours || 72; // 3 days default
  const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

  // Get property and inviter information
  const { data: propertyData } = await supabase
    .from('properties')
    .select('name')
    .eq('id', invitationData.property_id)
    .single();

  const { data: inviterData } = await supabase
    .from('user_profiles')
    .select('full_name')
    .eq('id', inviterUserId)
    .single();

  // Create invitation record
  const { data: invitation, error } = await supabase
    .from('invitations')
    .insert({
      email: invitationData.email,
      property_id: invitationData.property_id,
      invited_by: inviterUserId,
      role: invitationData.role,
      token,
      expires_at: expiresAt.toISOString(),
      status: 'pending',
      message: invitationData.message,
    })
    .select(`
      id,
      email,
      property_id,
      invited_by,
      role,
      status,
      token,
      expires_at,
      created_at,
      message
    `)
    .single();

  if (error) {
    throw new AuthError(
      AuthErrorType.INVITATION_CREATION_FAILED,
      `Failed to create invitation: ${error.message}`,
      500
    );
  }

  return {
    ...invitation,
    property_name: propertyData?.name || 'Unknown Property',
    invited_by_name: inviterData?.full_name || 'Unknown User',
  };
}

/**
 * Get invitation by token
 */
export async function getInvitationByToken(token: string): Promise<Invitation | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('invitations')
    .select(`
      id,
      email,
      property_id,
      invited_by,
      role,
      status,
      token,
      expires_at,
      created_at,
      accepted_at,
      message,
      properties (name),
      user_profiles (full_name)
    `)
    .eq('token', token)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    property_id: data.property_id,
    property_name: (data.properties as any)?.name || 'Unknown Property',
    invited_by: data.invited_by,
    invited_by_name: (data.user_profiles as any)?.full_name || 'Unknown User',
    role: data.role,
    status: data.status,
    token: data.token,
    expires_at: data.expires_at,
    created_at: data.created_at,
    accepted_at: data.accepted_at,
    message: data.message,
  };
}

/**
 * Validate invitation token
 */
export async function validateInvitationToken(token: string): Promise<{
  valid: boolean;
  invitation?: Invitation;
  error?: string;
}> {
  const invitation = await getInvitationByToken(token);
  
  if (!invitation) {
    return {
      valid: false,
      error: 'Invalid invitation token',
    };
  }

  if (invitation.status !== 'pending') {
    return {
      valid: false,
      error: `Invitation is ${invitation.status}`,
    };
  }

  const now = new Date();
  const expiresAt = new Date(invitation.expires_at);
  
  if (now > expiresAt) {
    // Mark invitation as expired
    await updateInvitationStatus(invitation.id, 'expired');
    return {
      valid: false,
      error: 'Invitation has expired',
    };
  }

  return {
    valid: true,
    invitation,
  };
}

/**
 * Accept invitation and create user account
 */
export async function acceptInvitation(
  acceptanceData: AcceptInvitationData
): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> {
  const supabase = getServiceRoleClient();
  
  // Validate invitation
  const validation = await validateInvitationToken(acceptanceData.token);
  if (!validation.valid || !validation.invitation) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const invitation = validation.invitation;

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    
    let userId: string;
    
    const userExists = existingUser.users?.find(u => u.email === invitation.email);
    if (userExists) {
      // User exists, just add property access
      userId = userExists.id;
    } else {
      // Create new user account
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: invitation.email,
        password: acceptanceData.password,
        email_confirm: true,
        user_metadata: {
          full_name: acceptanceData.full_name,
          phone: acceptanceData.phone,
        },
      });

      if (createError || !newUser.user) {
        return {
          success: false,
          error: `Failed to create user account: ${createError?.message}`,
        };
      }

      userId = newUser.user.id;

      // Create user profile
      await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          email: invitation.email,
          full_name: acceptanceData.full_name,
          phone: acceptanceData.phone,
        });
    }

    // Add user to property with specified role
    const { error: propertyAccessError } = await supabase
      .from('property_users')
      .insert({
        user_id: userId,
        property_id: invitation.property_id,
        role: invitation.role,
        can_view: true,
        can_edit: invitation.role !== 'client' && invitation.role !== 'viewer',
        can_manage: ['manager', 'admin', 'owner'].includes(invitation.role),
        granted_by: invitation.invited_by,
      });

    if (propertyAccessError) {
      return {
        success: false,
        error: `Failed to grant property access: ${propertyAccessError.message}`,
      };
    }

    // Mark invitation as accepted
    await updateInvitationStatus(invitation.id, 'accepted', new Date().toISOString());

    // Get the created/updated user
    const { data: user } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to accept invitation: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Update invitation status
 */
export async function updateInvitationStatus(
  invitationId: string,
  status: InvitationStatus,
  acceptedAt?: string
): Promise<void> {
  const supabase = getServiceRoleClient();
  
  const updateData: any = { status };
  if (acceptedAt) {
    updateData.accepted_at = acceptedAt;
  }

  await supabase
    .from('invitations')
    .update(updateData)
    .eq('id', invitationId);
}

/**
 * Cancel invitation
 */
export async function cancelInvitation(
  invitationId: string,
  cancelledBy: string
): Promise<void> {
  const supabase = getServiceRoleClient();
  
  // Verify the user can cancel this invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('invited_by, property_id')
    .eq('id', invitationId)
    .single();

  if (!invitation) {
    throw new AuthError(
      AuthErrorType.INVITATION_NOT_FOUND,
      'Invitation not found',
      404
    );
  }

  // Check if user can cancel (inviter or property admin/owner)
  if (invitation.invited_by !== cancelledBy) {
    // Check if user has admin access to the property
    const { data: propertyAccess } = await supabase
      .from('property_users')
      .select('role')
      .eq('user_id', cancelledBy)
      .eq('property_id', invitation.property_id)
      .single();

    if (!propertyAccess || !['admin', 'owner'].includes(propertyAccess.role)) {
      throw new AuthError(
        AuthErrorType.INSUFFICIENT_PERMISSIONS,
        'Cannot cancel this invitation',
        403
      );
    }
  }

  await updateInvitationStatus(invitationId, 'cancelled');
}

/**
 * Get invitations for a property
 */
export async function getPropertyInvitations(
  propertyId: string,
  status?: InvitationStatus
): Promise<Invitation[]> {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from('invitations')
    .select(`
      id,
      email,
      property_id,
      invited_by,
      role,
      status,
      expires_at,
      created_at,
      accepted_at,
      message,
      user_profiles (full_name)
    `)
    .eq('property_id', propertyId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    email: item.email,
    property_id: item.property_id,
    property_name: '', // Would need to join with properties table
    invited_by: item.invited_by,
    invited_by_name: (item.user_profiles as any)?.full_name || 'Unknown User',
    role: item.role,
    status: item.status,
    token: '', // Don't expose token in listings
    expires_at: item.expires_at,
    created_at: item.created_at,
    accepted_at: item.accepted_at,
    message: item.message,
  }));
}

/**
 * Get invitations sent by a user
 */
export async function getUserInvitations(
  userId: string,
  status?: InvitationStatus
): Promise<Invitation[]> {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from('invitations')
    .select(`
      id,
      email,
      property_id,
      invited_by,
      role,
      status,
      expires_at,
      created_at,
      accepted_at,
      message,
      properties (name)
    `)
    .eq('invited_by', userId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    email: item.email,
    property_id: item.property_id,
    property_name: (item.properties as any)?.name || 'Unknown Property',
    invited_by: item.invited_by,
    invited_by_name: '', // Current user
    role: item.role,
    status: item.status,
    token: '', // Don't expose token in listings
    expires_at: item.expires_at,
    created_at: item.created_at,
    accepted_at: item.accepted_at,
    message: item.message,
  }));
}

/**
 * Resend invitation
 */
export async function resendInvitation(
  invitationId: string,
  resendBy: string
): Promise<Invitation> {
  const supabase = getServiceRoleClient();
  
  // Get existing invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', invitationId)
    .single();

  if (!invitation) {
    throw new AuthError(
      AuthErrorType.INVITATION_NOT_FOUND,
      'Invitation not found',
      404
    );
  }

  if (invitation.status !== 'pending' && invitation.status !== 'expired') {
    throw new AuthError(
      AuthErrorType.INVALID_INVITATION_STATUS,
      'Can only resend pending or expired invitations',
      400
    );
  }

  // Generate new token and extend expiry
  const newToken = generateSecureToken();
  const newExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 3 days

  // Log who resent the invitation
  console.log(`Invitation ${invitationId} resent by user ${resendBy}`);

  const { data: updatedInvitation, error } = await supabase
    .from('invitations')
    .update({
      token: newToken,
      expires_at: newExpiresAt.toISOString(),
      status: 'pending',
    })
    .eq('id', invitationId)
    .select(`
      id,
      email,
      property_id,
      invited_by,
      role,
      status,
      token,
      expires_at,
      created_at,
      message,
      properties (name),
      user_profiles (full_name)
    `)
    .single();

  if (error) {
    throw new AuthError(
      AuthErrorType.INVITATION_UPDATE_FAILED,
      `Failed to resend invitation: ${error.message}`,
      500
    );
  }

  return {
    ...updatedInvitation,
    property_name: (updatedInvitation.properties as any)?.name || 'Unknown Property',
    invited_by_name: (updatedInvitation.user_profiles as any)?.full_name || 'Unknown User',
  };
}

/**
 * Cleanup expired invitations
 */
export async function cleanupExpiredInvitations(): Promise<number> {
  const supabase = getServiceRoleClient();
  
  const { data, error } = await supabase
    .from('invitations')
    .update({ status: 'expired' })
    .eq('status', 'pending')
    .lt('expires_at', new Date().toISOString())
    .select('id');

  if (error) {
    console.error('Failed to cleanup expired invitations:', error);
    return 0;
  }

  return data?.length || 0;
} 
