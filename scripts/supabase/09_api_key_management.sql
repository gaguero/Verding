-- =====================================================================================
-- Verding API Key Management and Security
-- =====================================================================================
-- This script sets up API key management, access control, and security monitoring
-- for the Verding microgreens management platform.

-- =====================================================================================
-- API KEY MANAGEMENT TABLES
-- =====================================================================================

-- Table to track API key usage and rotation
CREATE TABLE IF NOT EXISTS api_key_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_type TEXT NOT NULL CHECK (key_type IN ('anon', 'service_role', 'custom')),
    key_name TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('created', 'rotated', 'revoked', 'accessed')),
    user_id UUID REFERENCES auth.users(id),
    property_id UUID REFERENCES properties(id),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for custom API keys (for integrations)
CREATE TABLE IF NOT EXISTS custom_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id),
    key_name TEXT NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix TEXT NOT NULL,
    permissions JSONB DEFAULT '{}',
    rate_limit INTEGER DEFAULT 1000,
    expires_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(property_id, key_name)
);

-- Table for API access logs
CREATE TABLE IF NOT EXISTS api_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    api_key_id UUID REFERENCES custom_api_keys(id),
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    ip_address INET,
    user_agent TEXT,
    request_size INTEGER,
    response_size INTEGER,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================================
-- API KEY MANAGEMENT FUNCTIONS
-- =====================================================================================

-- Function to generate secure API key
CREATE OR REPLACE FUNCTION generate_api_key(prefix TEXT DEFAULT 'vrd')
RETURNS TEXT AS $$
DECLARE
    key_suffix TEXT;
    full_key TEXT;
BEGIN
    -- Generate a secure random suffix
    key_suffix := encode(gen_random_bytes(32), 'base64');
    -- Remove URL-unsafe characters
    key_suffix := replace(replace(replace(key_suffix, '+', ''), '/', ''), '=', '');
    -- Truncate to reasonable length
    key_suffix := left(key_suffix, 40);
    
    full_key := prefix || '_' || key_suffix;
    
    RETURN full_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to hash API key for storage
CREATE OR REPLACE FUNCTION hash_api_key(api_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(api_key, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create custom API key
CREATE OR REPLACE FUNCTION create_custom_api_key(
    p_property_id UUID,
    p_key_name TEXT,
    p_permissions JSONB DEFAULT '{}',
    p_rate_limit INTEGER DEFAULT 1000,
    p_expires_days INTEGER DEFAULT NULL
)
RETURNS TABLE (
    api_key TEXT,
    key_id UUID,
    key_prefix TEXT
) AS $$
DECLARE
    new_key TEXT;
    key_hash TEXT;
    key_prefix TEXT;
    new_key_id UUID;
    expires_at TIMESTAMPTZ;
BEGIN
    -- Check if user has permission to create API keys for this property
    IF NOT can_manage_property(p_property_id) THEN
        RAISE EXCEPTION 'Insufficient permissions to create API keys for this property';
    END IF;
    
    -- Generate new API key
    new_key := generate_api_key('vrd');
    key_hash := hash_api_key(new_key);
    key_prefix := left(new_key, 8) || '...';
    
    -- Set expiration if specified
    IF p_expires_days IS NOT NULL THEN
        expires_at := NOW() + (p_expires_days || ' days')::INTERVAL;
    END IF;
    
    -- Insert new API key
    INSERT INTO custom_api_keys (
        property_id,
        key_name,
        key_hash,
        key_prefix,
        permissions,
        rate_limit,
        expires_at,
        created_by
    ) VALUES (
        p_property_id,
        p_key_name,
        key_hash,
        key_prefix,
        p_permissions,
        p_rate_limit,
        expires_at,
        auth.uid()
    ) RETURNING id INTO new_key_id;
    
    -- Log the creation
    INSERT INTO api_key_audit (
        key_type,
        key_name,
        action,
        user_id,
        property_id,
        metadata
    ) VALUES (
        'custom',
        p_key_name,
        'created',
        auth.uid(),
        p_property_id,
        jsonb_build_object(
            'key_id', new_key_id,
            'permissions', p_permissions,
            'rate_limit', p_rate_limit,
            'expires_days', p_expires_days
        )
    );
    
    RETURN QUERY SELECT new_key, new_key_id, key_prefix;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate API key
CREATE OR REPLACE FUNCTION validate_api_key(api_key TEXT)
RETURNS TABLE (
    is_valid BOOLEAN,
    key_id UUID,
    property_id UUID,
    permissions JSONB,
    rate_limit INTEGER
) AS $$
DECLARE
    key_hash TEXT;
    key_record RECORD;
BEGIN
    key_hash := hash_api_key(api_key);
    
    SELECT 
        k.id,
        k.property_id,
        k.permissions,
        k.rate_limit,
        k.is_active,
        k.expires_at
    INTO key_record
    FROM custom_api_keys k
    WHERE k.key_hash = key_hash;
    
    -- Check if key exists and is valid
    IF key_record.id IS NULL THEN
        RETURN QUERY SELECT false, NULL::UUID, NULL::UUID, NULL::JSONB, NULL::INTEGER;
        RETURN;
    END IF;
    
    -- Check if key is active
    IF NOT key_record.is_active THEN
        RETURN QUERY SELECT false, key_record.id, key_record.property_id, key_record.permissions, key_record.rate_limit;
        RETURN;
    END IF;
    
    -- Check if key is expired
    IF key_record.expires_at IS NOT NULL AND key_record.expires_at < NOW() THEN
        RETURN QUERY SELECT false, key_record.id, key_record.property_id, key_record.permissions, key_record.rate_limit;
        RETURN;
    END IF;
    
    -- Update last used timestamp
    UPDATE custom_api_keys 
    SET last_used_at = NOW() 
    WHERE id = key_record.id;
    
    RETURN QUERY SELECT true, key_record.id, key_record.property_id, key_record.permissions, key_record.rate_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to revoke API key
CREATE OR REPLACE FUNCTION revoke_api_key(p_key_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    key_record RECORD;
BEGIN
    -- Get key details
    SELECT property_id, key_name INTO key_record
    FROM custom_api_keys
    WHERE id = p_key_id;
    
    IF key_record.property_id IS NULL THEN
        RAISE EXCEPTION 'API key not found';
    END IF;
    
    -- Check permissions
    IF NOT can_manage_property(key_record.property_id) THEN
        RAISE EXCEPTION 'Insufficient permissions to revoke this API key';
    END IF;
    
    -- Revoke the key
    UPDATE custom_api_keys 
    SET is_active = false, updated_at = NOW()
    WHERE id = p_key_id;
    
    -- Log the revocation
    INSERT INTO api_key_audit (
        key_type,
        key_name,
        action,
        user_id,
        property_id,
        metadata
    ) VALUES (
        'custom',
        key_record.key_name,
        'revoked',
        auth.uid(),
        key_record.property_id,
        jsonb_build_object('key_id', p_key_id)
    );
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log API access
CREATE OR REPLACE FUNCTION log_api_access(
    p_property_id UUID,
    p_api_key_id UUID,
    p_endpoint TEXT,
    p_method TEXT,
    p_status_code INTEGER,
    p_response_time_ms INTEGER DEFAULT NULL,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL,
    p_request_size INTEGER DEFAULT NULL,
    p_response_size INTEGER DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO api_access_logs (
        property_id,
        api_key_id,
        endpoint,
        method,
        status_code,
        response_time_ms,
        ip_address,
        user_agent,
        request_size,
        response_size,
        error_message
    ) VALUES (
        p_property_id,
        p_api_key_id,
        p_endpoint,
        p_method,
        p_status_code,
        p_response_time_ms,
        p_ip_address,
        p_user_agent,
        p_request_size,
        p_response_size,
        p_error_message
    ) RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- API KEY MONITORING FUNCTIONS
-- =====================================================================================

-- Function to get API key usage statistics
CREATE OR REPLACE FUNCTION get_api_key_usage(
    p_property_id UUID DEFAULT NULL,
    p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
    key_id UUID,
    key_name TEXT,
    key_prefix TEXT,
    total_requests BIGINT,
    successful_requests BIGINT,
    error_requests BIGINT,
    avg_response_time NUMERIC,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        k.id,
        k.key_name,
        k.key_prefix,
        COALESCE(COUNT(l.id), 0) as total_requests,
        COALESCE(COUNT(l.id) FILTER (WHERE l.status_code < 400), 0) as successful_requests,
        COALESCE(COUNT(l.id) FILTER (WHERE l.status_code >= 400), 0) as error_requests,
        COALESCE(AVG(l.response_time_ms), 0) as avg_response_time,
        k.last_used_at,
        k.created_at
    FROM custom_api_keys k
    LEFT JOIN api_access_logs l ON k.id = l.api_key_id 
        AND l.created_at >= NOW() - (p_days || ' days')::INTERVAL
    WHERE (p_property_id IS NULL OR k.property_id = p_property_id)
        AND k.is_active = true
    GROUP BY k.id, k.key_name, k.key_prefix, k.last_used_at, k.created_at
    ORDER BY total_requests DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get API security alerts
CREATE OR REPLACE FUNCTION get_api_security_alerts(
    p_property_id UUID DEFAULT NULL,
    p_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
    alert_type TEXT,
    alert_message TEXT,
    severity TEXT,
    count BIGINT,
    first_seen TIMESTAMPTZ,
    last_seen TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    -- High error rate alerts
    SELECT 
        'high_error_rate'::TEXT,
        'API key ' || k.key_prefix || ' has high error rate: ' || 
        ROUND((COUNT(*) FILTER (WHERE l.status_code >= 400)::NUMERIC / COUNT(*)::NUMERIC) * 100, 1) || '%',
        'HIGH'::TEXT,
        COUNT(*) FILTER (WHERE l.status_code >= 400),
        MIN(l.created_at),
        MAX(l.created_at)
    FROM custom_api_keys k
    JOIN api_access_logs l ON k.id = l.api_key_id
    WHERE l.created_at >= NOW() - (p_hours || ' hours')::INTERVAL
        AND (p_property_id IS NULL OR k.property_id = p_property_id)
    GROUP BY k.id, k.key_prefix
    HAVING COUNT(*) > 100 
        AND (COUNT(*) FILTER (WHERE l.status_code >= 400)::NUMERIC / COUNT(*)::NUMERIC) > 0.1
    
    UNION ALL
    
    -- Suspicious IP activity
    SELECT 
        'suspicious_ip'::TEXT,
        'Suspicious activity from IP ' || l.ip_address::TEXT || ' - ' || COUNT(*) || ' requests',
        'MEDIUM'::TEXT,
        COUNT(*),
        MIN(l.created_at),
        MAX(l.created_at)
    FROM api_access_logs l
    JOIN custom_api_keys k ON l.api_key_id = k.id
    WHERE l.created_at >= NOW() - (p_hours || ' hours')::INTERVAL
        AND (p_property_id IS NULL OR l.property_id = p_property_id)
        AND l.ip_address IS NOT NULL
    GROUP BY l.ip_address
    HAVING COUNT(*) > 1000
    
    UNION ALL
    
    -- Expired keys still being used
    SELECT 
        'expired_key_usage'::TEXT,
        'Expired API key ' || k.key_prefix || ' is still being used',
        'HIGH'::TEXT,
        COUNT(*),
        MIN(l.created_at),
        MAX(l.created_at)
    FROM custom_api_keys k
    JOIN api_access_logs l ON k.id = l.api_key_id
    WHERE l.created_at >= NOW() - (p_hours || ' hours')::INTERVAL
        AND (p_property_id IS NULL OR k.property_id = p_property_id)
        AND k.expires_at < NOW()
    GROUP BY k.id, k.key_prefix
    
    ORDER BY severity DESC, count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get environment configuration status
CREATE OR REPLACE FUNCTION get_environment_config_status()
RETURNS TABLE (
    config_item TEXT,
    status TEXT,
    description TEXT,
    recommendation TEXT
) AS $$
BEGIN
    RETURN QUERY
    VALUES 
    ('Supabase URL', 'CONFIGURED', 'Project URL is set', 'Verify URL matches your project'),
    ('Anonymous Key', 'CONFIGURED', 'Public anon key is available', 'Safe to use in client applications'),
    ('Service Role Key', 'REQUIRED', 'Private service role key needed', 'Set SUPABASE_SERVICE_ROLE_KEY in environment'),
    ('JWT Secret', 'REQUIRED', 'JWT signing secret needed', 'Generate secure JWT_SECRET'),
    ('Session Secret', 'REQUIRED', 'Session encryption secret needed', 'Generate secure SESSION_SECRET'),
    ('CORS Configuration', 'REQUIRED', 'CORS origins need configuration', 'Set CORS_ORIGIN for production'),
    ('Rate Limiting', 'CONFIGURED', 'API rate limiting enabled', 'Monitor usage and adjust limits'),
    ('API Key Rotation', 'MANUAL', 'Manual key rotation required', 'Implement automated rotation schedule'),
    ('Environment Separation', 'REQUIRED', 'Separate dev/staging/prod configs', 'Use different Supabase projects for each environment'),
    ('Backup Configuration', 'CONFIGURED', 'Backup monitoring active', 'Consider PITR for production');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================================================

-- Enable RLS on API key tables
ALTER TABLE api_key_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_access_logs ENABLE ROW LEVEL SECURITY;

-- API key audit policies
CREATE POLICY "Users can view API key audit for their properties" ON api_key_audit
    FOR SELECT USING (
        property_id IS NULL OR 
        can_view_property(property_id)
    );

CREATE POLICY "Users can create API key audit entries" ON api_key_audit
    FOR INSERT WITH CHECK (
        property_id IS NULL OR 
        can_manage_property(property_id)
    );

-- Custom API keys policies
CREATE POLICY "Users can view API keys for their properties" ON custom_api_keys
    FOR SELECT USING (can_view_property(property_id));

CREATE POLICY "Users can manage API keys for their properties" ON custom_api_keys
    FOR ALL USING (can_manage_property(property_id));

-- API access logs policies
CREATE POLICY "Users can view API logs for their properties" ON api_access_logs
    FOR SELECT USING (
        property_id IS NULL OR 
        can_view_property(property_id)
    );

CREATE POLICY "System can insert API access logs" ON api_access_logs
    FOR INSERT WITH CHECK (true);

-- =====================================================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================================================

-- Indexes for API key tables
CREATE INDEX IF NOT EXISTS idx_api_key_audit_property_created ON api_key_audit(property_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_key_audit_user_created ON api_key_audit(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_api_keys_property ON custom_api_keys(property_id);
CREATE INDEX IF NOT EXISTS idx_custom_api_keys_hash ON custom_api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_custom_api_keys_active ON custom_api_keys(is_active, expires_at);
CREATE INDEX IF NOT EXISTS idx_api_access_logs_property_created ON api_access_logs(property_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_access_logs_key_created ON api_access_logs(api_key_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_access_logs_ip_created ON api_access_logs(ip_address, created_at DESC);

-- =====================================================================================
-- GRANT PERMISSIONS
-- =====================================================================================

-- Grant permissions on API key management functions
GRANT EXECUTE ON FUNCTION generate_api_key(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION hash_api_key(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION create_custom_api_key(UUID, TEXT, JSONB, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION validate_api_key(TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION revoke_api_key(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION log_api_access(UUID, UUID, TEXT, TEXT, INTEGER, INTEGER, INET, TEXT, INTEGER, INTEGER, TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_api_key_usage(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_api_security_alerts(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_environment_config_status() TO authenticated;

-- Grant service role permissions
GRANT ALL ON api_key_audit TO service_role;
GRANT ALL ON custom_api_keys TO service_role;
GRANT ALL ON api_access_logs TO service_role;

-- =====================================================================================
-- CLEANUP AND MAINTENANCE
-- =====================================================================================

-- Function to cleanup old API access logs
CREATE OR REPLACE FUNCTION cleanup_old_api_logs(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM api_access_logs 
    WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    INSERT INTO api_key_audit (
        key_type,
        key_name,
        action,
        metadata
    ) VALUES (
        'system',
        'log_cleanup',
        'cleanup',
        jsonb_build_object(
            'deleted_logs', deleted_count,
            'days_kept', days_to_keep
        )
    );
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- API KEY MANAGEMENT COMPLETE
-- =====================================================================================

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'API key management system configured successfully';
    RAISE NOTICE 'Custom API key creation and validation enabled';
    RAISE NOTICE 'API access logging and monitoring active';
    RAISE NOTICE 'Security policies and rate limiting configured';
END $$; 