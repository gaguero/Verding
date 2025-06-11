-- =====================================================================================
-- Verding Authentication Integration
-- =====================================================================================
-- This script sets up authentication integration including user registration triggers,
-- property assignment logic, and authentication helper functions.

-- =====================================================================================
-- USER REGISTRATION TRIGGERS
-- =====================================================================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user_registration()
RETURNS TRIGGER AS $$
DECLARE
    default_property_id UUID;
    user_email TEXT;
BEGIN
    -- Get the user's email
    user_email := NEW.email;
    
    -- Create user profile
    INSERT INTO public.user_profiles (
        id,
        email,
        full_name,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        user_email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(user_email, '@', 1)),
        NOW(),
        NOW()
    );
    
    -- For demo purposes, assign user to the first available property
    -- In production, this would be based on invitation codes or admin assignment
    SELECT id INTO default_property_id 
    FROM public.properties 
    WHERE is_active = true 
    ORDER BY created_at 
    LIMIT 1;
    
    -- If no properties exist, create a default one for the first user
    IF default_property_id IS NULL THEN
        INSERT INTO public.properties (
            id,
            name,
            description,
            address,
            contact_email,
            contact_phone,
            is_active,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            'Default Property',
            'Default property created for first user',
            '123 Main St, City, State 12345',
            user_email,
            '+1-555-0123',
            true,
            NOW(),
            NOW()
        ) RETURNING id INTO default_property_id;
    END IF;
    
    -- Create user property access record
    INSERT INTO public.user_property_access (
        id,
        user_id,
        property_id,
        role,
        can_view,
        can_edit,
        can_manage,
        is_active,
        granted_at,
        granted_by,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        NEW.id,
        default_property_id,
        'admin', -- First user gets admin role, subsequent users get 'user' role
        true,
        true,
        true,
        true,
        NOW(),
        NEW.id, -- Self-granted for first user
        NOW(),
        NOW()
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user_registration();

-- =====================================================================================
-- USER PROFILE UPDATE TRIGGERS
-- =====================================================================================

-- Function to handle user profile updates from auth.users
CREATE OR REPLACE FUNCTION handle_user_profile_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user profile when auth.users is updated
    UPDATE public.user_profiles 
    SET 
        email = NEW.email,
        full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', full_name),
        avatar_url = NEW.raw_user_meta_data->>'avatar_url',
        updated_at = NOW()
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user profile updates
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_user_profile_update();

-- =====================================================================================
-- AUTHENTICATION HELPER FUNCTIONS
-- =====================================================================================

-- Function to get current user's profile
CREATE OR REPLACE FUNCTION get_current_user_profile()
RETURNS TABLE (
    id UUID,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    timezone TEXT,
    language TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.id,
        up.email,
        up.full_name,
        up.avatar_url,
        up.phone,
        up.timezone,
        up.language,
        up.created_at,
        up.updated_at
    FROM public.user_profiles up
    WHERE up.id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current user's properties with access levels
CREATE OR REPLACE FUNCTION get_current_user_properties()
RETURNS TABLE (
    property_id UUID,
    property_name TEXT,
    property_description TEXT,
    role TEXT,
    can_view BOOLEAN,
    can_edit BOOLEAN,
    can_manage BOOLEAN,
    granted_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id as property_id,
        p.name as property_name,
        p.description as property_description,
        upa.role,
        upa.can_view,
        upa.can_edit,
        upa.can_manage,
        upa.granted_at
    FROM public.properties p
    JOIN public.user_property_access upa ON p.id = upa.property_id
    WHERE upa.user_id = auth.uid() 
    AND upa.is_active = true
    AND p.is_active = true
    ORDER BY upa.granted_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to switch user's active property context
CREATE OR REPLACE FUNCTION set_active_property(property_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    has_access BOOLEAN;
BEGIN
    -- Check if user has access to this property
    SELECT can_view_property(property_uuid) INTO has_access;
    
    IF NOT has_access THEN
        RAISE EXCEPTION 'User does not have access to property %', property_uuid;
    END IF;
    
    -- Update or create agent session with new active property
    INSERT INTO public.agent_sessions (
        id,
        user_id,
        active_property_id,
        session_data,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        auth.uid(),
        property_uuid,
        jsonb_build_object('property_switched_at', NOW()),
        NOW(),
        NOW()
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        active_property_id = property_uuid,
        session_data = jsonb_set(
            COALESCE(agent_sessions.session_data, '{}'::jsonb),
            '{property_switched_at}',
            to_jsonb(NOW())
        ),
        updated_at = NOW();
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- PROPERTY INVITATION SYSTEM
-- =====================================================================================

-- Function to invite user to property (for future use)
CREATE OR REPLACE FUNCTION invite_user_to_property(
    user_email TEXT,
    property_uuid UUID,
    user_role TEXT DEFAULT 'user',
    invited_by_uuid UUID DEFAULT auth.uid()
)
RETURNS UUID AS $$
DECLARE
    target_user_id UUID;
    invitation_id UUID;
BEGIN
    -- Check if inviting user can manage the property
    IF NOT can_manage_property(property_uuid, invited_by_uuid) THEN
        RAISE EXCEPTION 'User does not have permission to invite users to this property';
    END IF;
    
    -- Find target user by email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', user_email;
    END IF;
    
    -- Create property access record
    INSERT INTO public.user_property_access (
        id,
        user_id,
        property_id,
        role,
        can_view,
        can_edit,
        can_manage,
        is_active,
        granted_at,
        granted_by,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        target_user_id,
        property_uuid,
        user_role,
        true,
        CASE WHEN user_role IN ('admin', 'manager') THEN true ELSE false END,
        CASE WHEN user_role = 'admin' THEN true ELSE false END,
        true,
        NOW(),
        invited_by_uuid,
        NOW(),
        NOW()
    ) RETURNING id INTO invitation_id;
    
    RETURN invitation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- AUTHENTICATION VALIDATION FUNCTIONS
-- =====================================================================================

-- Function to validate user session and property access
CREATE OR REPLACE FUNCTION validate_user_session()
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    active_property_id UUID,
    property_name TEXT,
    role TEXT,
    permissions JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id as user_id,
        au.email,
        ags.active_property_id,
        p.name as property_name,
        upa.role,
        jsonb_build_object(
            'can_view', upa.can_view,
            'can_edit', upa.can_edit,
            'can_manage', upa.can_manage,
            'is_super_admin', is_super_admin(au.id)
        ) as permissions
    FROM auth.users au
    LEFT JOIN public.agent_sessions ags ON au.id = ags.user_id
    LEFT JOIN public.properties p ON ags.active_property_id = p.id
    LEFT JOIN public.user_property_access upa ON au.id = upa.user_id AND p.id = upa.property_id
    WHERE au.id = auth.uid()
    AND (upa.is_active = true OR upa.is_active IS NULL);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- CLEANUP FUNCTIONS
-- =====================================================================================

-- Function to cleanup expired sessions (for maintenance)
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.agent_sessions 
    WHERE updated_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- GRANT PERMISSIONS
-- =====================================================================================

-- Grant execute permissions on functions to authenticated users
GRANT EXECUTE ON FUNCTION get_current_user_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION get_current_user_properties() TO authenticated;
GRANT EXECUTE ON FUNCTION set_active_property(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION invite_user_to_property(TEXT, UUID, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION validate_user_session() TO authenticated;

-- Grant execute permissions on cleanup function to service role only
GRANT EXECUTE ON FUNCTION cleanup_expired_sessions() TO service_role; 