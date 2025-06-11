-- =====================================================================================
-- Verding API Key Management Fixes
-- =====================================================================================
-- This script fixes issues found in the API key management system

-- Fix the validate_api_key function - ambiguous column reference
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
        custom_api_keys.id,
        custom_api_keys.property_id,
        custom_api_keys.permissions,
        custom_api_keys.rate_limit,
        custom_api_keys.is_active,
        custom_api_keys.expires_at
    INTO key_record
    FROM custom_api_keys
    WHERE custom_api_keys.key_hash = validate_api_key.key_hash;
    
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

-- Fix the get_api_security_alerts function - UNION ORDER BY issue
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
    WITH security_alerts AS (
        -- High error rate alerts
        SELECT 
            'high_error_rate'::TEXT as alert_type,
            'API key ' || k.key_prefix || ' has high error rate: ' || 
            ROUND((COUNT(*) FILTER (WHERE l.status_code >= 400)::NUMERIC / COUNT(*)::NUMERIC) * 100, 1) || '%' as alert_message,
            'HIGH'::TEXT as severity,
            COUNT(*) FILTER (WHERE l.status_code >= 400) as count,
            MIN(l.created_at) as first_seen,
            MAX(l.created_at) as last_seen
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
    )
    SELECT 
        sa.alert_type,
        sa.alert_message,
        sa.severity,
        sa.count,
        sa.first_seen,
        sa.last_seen
    FROM security_alerts sa
    ORDER BY 
        CASE sa.severity 
            WHEN 'HIGH' THEN 1 
            WHEN 'MEDIUM' THEN 2 
            ELSE 3 
        END,
        sa.count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions on updated functions
GRANT EXECUTE ON FUNCTION validate_api_key(TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_api_security_alerts(UUID, INTEGER) TO authenticated;

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'API key management fixes applied successfully';
    RAISE NOTICE 'Fixed validate_api_key ambiguous column reference';
    RAISE NOTICE 'Fixed get_api_security_alerts UNION ORDER BY clause';
END $$; 