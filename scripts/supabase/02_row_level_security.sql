-- =====================================================================================
-- Verding Row Level Security (RLS) Policies
-- =====================================================================================
-- This script implements comprehensive RLS policies for multi-property data isolation
-- and user access control throughout the Verding system.

-- Enable RLS on all tables that need property-scoped access control
-- =====================================================================================

-- Core tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_property_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Agent & Memory system tables
ALTER TABLE agent_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_access_control ENABLE ROW LEVEL SECURITY;

-- Operations tables
ALTER TABLE growing_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Customer & Sales tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Sensor & Monitoring tables
ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- =====================================================================================
-- HELPER FUNCTIONS FOR RLS
-- =====================================================================================

-- Function to get user's accessible properties
CREATE OR REPLACE FUNCTION get_user_properties(user_uuid UUID DEFAULT auth.uid())
RETURNS UUID[] AS $$
BEGIN
    RETURN ARRAY(
        SELECT property_id 
        FROM user_property_access 
        WHERE user_id = user_uuid 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can view property
CREATE OR REPLACE FUNCTION can_view_property(property_uuid UUID, user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 
        FROM user_property_access 
        WHERE user_id = user_uuid 
        AND property_id = property_uuid 
        AND can_view = true 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can edit property data
CREATE OR REPLACE FUNCTION can_edit_property(property_uuid UUID, user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 
        FROM user_property_access 
        WHERE user_id = user_uuid 
        AND property_id = property_uuid 
        AND can_edit = true 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can manage property
CREATE OR REPLACE FUNCTION can_manage_property(property_uuid UUID, user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 
        FROM user_property_access 
        WHERE user_id = user_uuid 
        AND property_id = property_uuid 
        AND can_manage = true 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 
        FROM user_property_access 
        WHERE user_id = user_uuid 
        AND role = 'owner' 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- PROPERTIES TABLE POLICIES
-- =====================================================================================

-- Users can view properties they have access to
CREATE POLICY "Users can view accessible properties" ON properties
    FOR SELECT
    USING (
        id = ANY(get_user_properties()) OR
        is_super_admin()
    );

-- Users can insert properties if they are super admin or property owner
CREATE POLICY "Property owners can create properties" ON properties
    FOR INSERT
    WITH CHECK (
        is_super_admin() OR
        auth.uid() IN (
            SELECT user_id FROM user_property_access 
            WHERE role IN ('owner', 'admin') AND is_active = true
        )
    );

-- Users can update properties they can manage
CREATE POLICY "Users can update manageable properties" ON properties
    FOR UPDATE
    USING (can_manage_property(id))
    WITH CHECK (can_manage_property(id));

-- Only super admins can delete properties
CREATE POLICY "Only super admins can delete properties" ON properties
    FOR DELETE
    USING (is_super_admin());

-- =====================================================================================
-- USER PROPERTY ACCESS POLICIES
-- =====================================================================================

-- Users can view their own property access records
CREATE POLICY "Users can view own property access" ON user_property_access
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        can_manage_property(property_id) OR
        is_super_admin()
    );

-- Property managers can insert new user access records
CREATE POLICY "Property managers can grant access" ON user_property_access
    FOR INSERT
    WITH CHECK (
        can_manage_property(property_id) OR
        is_super_admin()
    );

-- Property managers can update user access records
CREATE POLICY "Property managers can update access" ON user_property_access
    FOR UPDATE
    USING (
        can_manage_property(property_id) OR
        is_super_admin()
    )
    WITH CHECK (
        can_manage_property(property_id) OR
        is_super_admin()
    );

-- Property managers can delete user access records
CREATE POLICY "Property managers can revoke access" ON user_property_access
    FOR DELETE
    USING (
        can_manage_property(property_id) OR
        is_super_admin()
    );

-- =====================================================================================
-- USER PROFILES POLICIES
-- =====================================================================================

-- Users can view their own profile and profiles of users in their properties
CREATE POLICY "Users can view accessible profiles" ON user_profiles
    FOR SELECT
    USING (
        id = auth.uid() OR
        id IN (
            SELECT DISTINCT upa.user_id 
            FROM user_property_access upa 
            WHERE upa.property_id = ANY(get_user_properties())
        ) OR
        is_super_admin()
    );

-- Users can insert their own profile
CREATE POLICY "Users can create own profile" ON user_profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Users can delete their own profile
CREATE POLICY "Users can delete own profile" ON user_profiles
    FOR DELETE
    USING (id = auth.uid());

-- =====================================================================================
-- AGENT SESSIONS POLICIES
-- =====================================================================================

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON agent_sessions
    FOR SELECT
    USING (user_id = auth.uid());

-- Users can insert their own sessions for accessible properties
CREATE POLICY "Users can create own sessions" ON agent_sessions
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid() AND
        (active_property_id IS NULL OR can_view_property(active_property_id))
    );

-- Users can update their own sessions
CREATE POLICY "Users can update own sessions" ON agent_sessions
    FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (
        user_id = auth.uid() AND
        (active_property_id IS NULL OR can_view_property(active_property_id))
    );

-- Users can delete their own sessions
CREATE POLICY "Users can delete own sessions" ON agent_sessions
    FOR DELETE
    USING (user_id = auth.uid());

-- =====================================================================================
-- MEMORY SYSTEM POLICIES
-- =====================================================================================

-- Memory chunks - property-scoped access with tag-based filtering
CREATE POLICY "Users can view accessible memory chunks" ON memory_chunks
    FOR SELECT
    USING (
        property_id IS NULL OR
        can_view_property(property_id) OR
        is_super_admin()
    );

-- Users with edit permissions can insert memory chunks
CREATE POLICY "Users can create memory chunks" ON memory_chunks
    FOR INSERT
    WITH CHECK (
        property_id IS NULL OR
        can_edit_property(property_id) OR
        is_super_admin()
    );

-- Users with edit permissions can update memory chunks
CREATE POLICY "Users can update memory chunks" ON memory_chunks
    FOR UPDATE
    USING (
        property_id IS NULL OR
        can_edit_property(property_id) OR
        is_super_admin()
    )
    WITH CHECK (
        property_id IS NULL OR
        can_edit_property(property_id) OR
        is_super_admin()
    );

-- Users with manage permissions can delete memory chunks
CREATE POLICY "Users can delete memory chunks" ON memory_chunks
    FOR DELETE
    USING (
        property_id IS NULL OR
        can_manage_property(property_id) OR
        is_super_admin()
    );

-- Conversation history - users can view their own conversations and property-scoped
CREATE POLICY "Users can view accessible conversations" ON conversation_history
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        can_view_property(property_id) OR
        is_super_admin()
    );

-- Users can insert their own conversation history
CREATE POLICY "Users can create own conversations" ON conversation_history
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid() AND
        (property_id IS NULL OR can_view_property(property_id))
    );

-- Memory access control - property-scoped
CREATE POLICY "Users can view memory access control" ON memory_access_control
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        can_view_property(property_id) OR
        is_super_admin()
    );

-- =====================================================================================
-- OPERATIONS MANAGEMENT POLICIES
-- =====================================================================================

-- Growing batches - property-scoped access
CREATE POLICY "Users can view property growing batches" ON growing_batches
    FOR SELECT
    USING (can_view_property(property_id));

CREATE POLICY "Users can create growing batches" ON growing_batches
    FOR INSERT
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can update growing batches" ON growing_batches
    FOR UPDATE
    USING (can_edit_property(property_id))
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can delete growing batches" ON growing_batches
    FOR DELETE
    USING (can_manage_property(property_id));

-- Tasks - property-scoped with user assignment
CREATE POLICY "Users can view property tasks" ON tasks
    FOR SELECT
    USING (
        can_view_property(property_id) OR
        assigned_to = auth.uid() OR
        user_id = auth.uid()
    );

CREATE POLICY "Users can create tasks" ON tasks
    FOR INSERT
    WITH CHECK (
        can_edit_property(property_id) AND
        user_id = auth.uid()
    );

CREATE POLICY "Users can update tasks" ON tasks
    FOR UPDATE
    USING (
        can_edit_property(property_id) OR
        assigned_to = auth.uid() OR
        user_id = auth.uid()
    )
    WITH CHECK (
        can_edit_property(property_id) OR
        assigned_to = auth.uid() OR
        user_id = auth.uid()
    );

CREATE POLICY "Users can delete own tasks" ON tasks
    FOR DELETE
    USING (
        can_manage_property(property_id) OR
        user_id = auth.uid()
    );

-- =====================================================================================
-- CUSTOMER & SALES POLICIES
-- =====================================================================================

-- Customers - property-scoped access
CREATE POLICY "Users can view property customers" ON customers
    FOR SELECT
    USING (can_view_property(property_id));

CREATE POLICY "Users can create customers" ON customers
    FOR INSERT
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can update customers" ON customers
    FOR UPDATE
    USING (can_edit_property(property_id))
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can delete customers" ON customers
    FOR DELETE
    USING (can_manage_property(property_id));

-- Orders - property-scoped access
CREATE POLICY "Users can view property orders" ON orders
    FOR SELECT
    USING (can_view_property(property_id));

CREATE POLICY "Users can create orders" ON orders
    FOR INSERT
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can update orders" ON orders
    FOR UPDATE
    USING (can_edit_property(property_id))
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can delete orders" ON orders
    FOR DELETE
    USING (can_manage_property(property_id));

-- Order items - inherit from order access
CREATE POLICY "Users can view order items" ON order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND can_view_property(orders.property_id)
        )
    );

CREATE POLICY "Users can manage order items" ON order_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND can_edit_property(orders.property_id)
        )
    );

-- =====================================================================================
-- SENSOR & MONITORING POLICIES
-- =====================================================================================

-- Sensor readings - property-scoped access
CREATE POLICY "Users can view property sensor data" ON sensor_readings
    FOR SELECT
    USING (can_view_property(property_id));

CREATE POLICY "Users can insert sensor data" ON sensor_readings
    FOR INSERT
    WITH CHECK (can_edit_property(property_id));

-- Alerts - property-scoped access
CREATE POLICY "Users can view property alerts" ON alerts
    FOR SELECT
    USING (can_view_property(property_id));

CREATE POLICY "Users can create alerts" ON alerts
    FOR INSERT
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can update alerts" ON alerts
    FOR UPDATE
    USING (can_edit_property(property_id))
    WITH CHECK (can_edit_property(property_id));

CREATE POLICY "Users can delete alerts" ON alerts
    FOR DELETE
    USING (can_manage_property(property_id));

-- =====================================================================================
-- GLOBAL DATA ACCESS (No property association)
-- =====================================================================================

-- Crop varieties - global read access, admin write access
ALTER TABLE crop_varieties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view crop varieties" ON crop_varieties
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage crop varieties" ON crop_varieties
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- =====================================================================================
-- SECURITY DEFINER FUNCTIONS FOR PERFORMANCE
-- =====================================================================================

-- Function to batch check property access (for performance)
CREATE OR REPLACE FUNCTION check_property_batch_access(
    property_ids UUID[],
    user_uuid UUID DEFAULT auth.uid(),
    access_type TEXT DEFAULT 'view'
)
RETURNS UUID[] AS $$
DECLARE
    accessible_properties UUID[];
BEGIN
    SELECT ARRAY(
        SELECT unnest(property_ids)
        INTERSECT
        SELECT property_id 
        FROM user_property_access 
        WHERE user_id = user_uuid 
        AND is_active = true
        AND (
            (access_type = 'view' AND can_view = true) OR
            (access_type = 'edit' AND can_edit = true) OR
            (access_type = 'manage' AND can_manage = true)
        )
    ) INTO accessible_properties;
    
    RETURN accessible_properties;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 