-- =====================================================================================
-- Verding API Key Management Final Fix
-- =====================================================================================
-- This script fixes the remaining issue in validate_api_key function

-- Fix the validate_api_key function - FROM-clause entry issue
CREATE OR REPLACE FUNCTION validate_api_key(api_key TEXT)
RETURNS TABLE (
    is_valid BOOLEAN,
    key_id UUID,
    property_id UUID,
    permissions JSONB,
    rate_limit INTEGER
) AS $$
DECLARE
    input_key_hash TEXT;
    key_record RECORD;
BEGIN
    input_key_hash := hash_api_key(api_key);
    
    SELECT 
        custom_api_keys.id,
        custom_api_keys.property_id,
        custom_api_keys.permissions,
        custom_api_keys.rate_limit,
        custom_api_keys.is_active,
        custom_api_keys.expires_at
    INTO key_record
    FROM custom_api_keys
    WHERE custom_api_keys.key_hash = input_key_hash;
    
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

-- Grant permissions on updated function
GRANT EXECUTE ON FUNCTION validate_api_key(TEXT) TO authenticated, anon;

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'API key management final fix applied successfully';
    RAISE NOTICE 'Fixed validate_api_key FROM-clause entry issue';
END $$; 