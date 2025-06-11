-- =====================================================================================
-- Verding Backup Configuration and Monitoring
-- =====================================================================================
-- This script documents the backup strategy and creates monitoring functions
-- for the Verding microgreens management platform backup system.

-- =====================================================================================
-- BACKUP STRATEGY DOCUMENTATION
-- =====================================================================================

/*
VERDING BACKUP STRATEGY OVERVIEW
===============================

1. DATABASE BACKUPS
   - Current: Daily logical backups (7-day retention)
   - Recommended: Point-in-Time Recovery (PITR) with 14-day retention
   - RPO Target: < 1 hour (PITR achieves 2-minute RPO)
   - RTO Target: < 4 hours for critical operations

2. STORAGE BACKUPS
   - User avatars: Public bucket, backed up via external sync
   - Property documents: Critical business data, requires backup
   - Batch/harvest photos: Operational data, requires backup
   - Growing guides: Knowledge base, requires backup
   - Variety images: Reference data, can be restored from source
   - Temp uploads: Ephemeral, no backup needed

3. COMPLIANCE REQUIREMENTS
   - Agricultural records: 7+ year retention
   - User data: GDPR compliance (right to deletion)
   - Audit trails: Regulatory compliance

4. DISASTER RECOVERY
   - Multi-region strategy via Supabase infrastructure
   - Automated failover capabilities
   - Regular recovery testing procedures
*/

-- =====================================================================================
-- BACKUP MONITORING FUNCTIONS
-- =====================================================================================

-- Function to get backup status and metrics
CREATE OR REPLACE FUNCTION get_backup_status()
RETURNS TABLE (
    metric_name TEXT,
    metric_value TEXT,
    last_updated TIMESTAMPTZ,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'Database Size'::TEXT as metric_name,
        pg_size_pretty(pg_database_size(current_database()))::TEXT as metric_value,
        NOW() as last_updated,
        CASE 
            WHEN pg_database_size(current_database()) > 15 * 1024 * 1024 * 1024 THEN 'WARNING: >15GB - Consider PITR'
            ELSE 'OK'
        END as status
    
    UNION ALL
    
    SELECT 
        'Total Tables'::TEXT,
        COUNT(*)::TEXT,
        NOW(),
        'OK'
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    
    UNION ALL
    
    SELECT 
        'Critical Tables'::TEXT,
        COUNT(*)::TEXT,
        NOW(),
        CASE 
            WHEN COUNT(*) < 10 THEN 'WARNING: Missing critical tables'
            ELSE 'OK'
        END
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
        'properties', 'users', 'user_property_access', 
        'growing_batches', 'harvests', 'agent_memory_operations'
    )
    
    UNION ALL
    
    SELECT 
        'Storage Buckets'::TEXT,
        COUNT(*)::TEXT,
        NOW(),
        CASE 
            WHEN COUNT(*) < 8 THEN 'WARNING: Missing storage buckets'
            ELSE 'OK'
        END
    FROM storage.buckets
    
    UNION ALL
    
    SELECT 
        'RLS Policies'::TEXT,
        COUNT(*)::TEXT,
        NOW(),
        CASE 
            WHEN COUNT(*) < 20 THEN 'WARNING: Insufficient RLS policies'
            ELSE 'OK'
        END
    FROM pg_policies
    WHERE schemaname IN ('public', 'storage');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get critical data metrics for backup planning
CREATE OR REPLACE FUNCTION get_critical_data_metrics()
RETURNS TABLE (
    data_category TEXT,
    table_name TEXT,
    row_count BIGINT,
    size_pretty TEXT,
    size_bytes BIGINT,
    backup_priority TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH table_stats AS (
        SELECT 
            schemaname,
            tablename,
            n_tup_ins + n_tup_upd + n_tup_del as total_activity,
            pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
        FROM pg_stat_user_tables
        WHERE schemaname = 'public'
    )
    SELECT 
        CASE 
            WHEN ts.tablename IN ('properties', 'users', 'user_property_access') THEN 'User & Property Data'
            WHEN ts.tablename LIKE 'growing_%' OR ts.tablename LIKE 'batch_%' OR ts.tablename LIKE 'harvest%' THEN 'Operational Data'
            WHEN ts.tablename LIKE 'agent_%' OR ts.tablename LIKE 'memory_%' OR ts.tablename LIKE 'conversation_%' THEN 'Agent Memory'
            WHEN ts.tablename LIKE 'facility_%' OR ts.tablename LIKE 'equipment_%' THEN 'Facility Management'
            ELSE 'System Data'
        END as data_category,
        ts.tablename::TEXT,
        COALESCE(c.reltuples::BIGINT, 0) as row_count,
        pg_size_pretty(ts.size_bytes)::TEXT,
        ts.size_bytes,
        CASE 
            WHEN ts.tablename IN ('properties', 'users', 'user_property_access', 'growing_batches', 'harvests') THEN 'CRITICAL'
            WHEN ts.tablename LIKE 'agent_%' OR ts.tablename LIKE 'memory_%' THEN 'HIGH'
            WHEN ts.total_activity > 1000 THEN 'MEDIUM'
            ELSE 'LOW'
        END as backup_priority
    FROM table_stats ts
    LEFT JOIN pg_class c ON c.relname = ts.tablename
    ORDER BY ts.size_bytes DESC, backup_priority;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get storage usage metrics for backup planning
CREATE OR REPLACE FUNCTION get_storage_backup_metrics()
RETURNS TABLE (
    bucket_name TEXT,
    file_count BIGINT,
    total_size_pretty TEXT,
    total_size_bytes BIGINT,
    backup_strategy TEXT,
    retention_period TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        so.bucket_id::TEXT,
        COUNT(*)::BIGINT,
        pg_size_pretty(SUM(COALESCE((so.metadata->>'size')::BIGINT, 0)))::TEXT,
        SUM(COALESCE((so.metadata->>'size')::BIGINT, 0))::BIGINT,
        CASE 
            WHEN so.bucket_id IN ('documents', 'batch-photos', 'harvest-images') THEN 'CRITICAL - Daily sync required'
            WHEN so.bucket_id IN ('growing-guides', 'facility-photos') THEN 'IMPORTANT - Weekly sync recommended'
            WHEN so.bucket_id = 'avatars' THEN 'STANDARD - Monthly sync sufficient'
            WHEN so.bucket_id = 'variety-images' THEN 'REFERENCE - Restore from source'
            WHEN so.bucket_id = 'temp-uploads' THEN 'EPHEMERAL - No backup needed'
            ELSE 'REVIEW - Strategy needed'
        END as backup_strategy,
        CASE 
            WHEN so.bucket_id IN ('documents', 'growing-guides') THEN '7+ years (compliance)'
            WHEN so.bucket_id IN ('batch-photos', 'harvest-images', 'facility-photos') THEN '3 years (operational)'
            WHEN so.bucket_id = 'avatars' THEN '1 year (user data)'
            WHEN so.bucket_id = 'variety-images' THEN 'Indefinite (reference)'
            WHEN so.bucket_id = 'temp-uploads' THEN '24 hours (auto-cleanup)'
            ELSE 'Define retention policy'
        END as retention_period
    FROM storage.objects so
    GROUP BY so.bucket_id
    ORDER BY SUM(COALESCE((so.metadata->>'size')::BIGINT, 0)) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate backup readiness
CREATE OR REPLACE FUNCTION validate_backup_readiness()
RETURNS TABLE (
    check_name TEXT,
    status TEXT,
    details TEXT,
    recommendation TEXT
) AS $$
BEGIN
    RETURN QUERY
    -- Check database size for backup type recommendation
    SELECT 
        'Database Size Check'::TEXT,
        CASE 
            WHEN pg_database_size(current_database()) > 15 * 1024 * 1024 * 1024 THEN 'WARNING'
            ELSE 'OK'
        END,
        'Current size: ' || pg_size_pretty(pg_database_size(current_database())),
        CASE 
            WHEN pg_database_size(current_database()) > 15 * 1024 * 1024 * 1024 THEN 'Enable PITR for better performance'
            ELSE 'Daily backups sufficient for current size'
        END
    
    UNION ALL
    
    -- Check RLS policies
    SELECT 
        'RLS Security Check'::TEXT,
        CASE 
            WHEN COUNT(*) < 20 THEN 'WARNING'
            ELSE 'OK'
        END,
        'Active RLS policies: ' || COUNT(*)::TEXT,
        CASE 
            WHEN COUNT(*) < 20 THEN 'Review and enable missing RLS policies'
            ELSE 'RLS policies properly configured'
        END
    FROM pg_policies
    WHERE schemaname IN ('public', 'storage')
    
    UNION ALL
    
    -- Check storage buckets
    SELECT 
        'Storage Buckets Check'::TEXT,
        CASE 
            WHEN COUNT(*) < 8 THEN 'ERROR'
            ELSE 'OK'
        END,
        'Configured buckets: ' || COUNT(*)::TEXT,
        CASE 
            WHEN COUNT(*) < 8 THEN 'Missing required storage buckets'
            ELSE 'All storage buckets configured'
        END
    FROM storage.buckets
    
    UNION ALL
    
    -- Check critical tables
    SELECT 
        'Critical Tables Check'::TEXT,
        CASE 
            WHEN COUNT(*) < 6 THEN 'ERROR'
            ELSE 'OK'
        END,
        'Critical tables found: ' || COUNT(*)::TEXT,
        CASE 
            WHEN COUNT(*) < 6 THEN 'Missing critical application tables'
            ELSE 'All critical tables present'
        END
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
        'properties', 'users', 'user_property_access', 
        'growing_batches', 'harvests', 'agent_memory_operations'
    )
    
    UNION ALL
    
    -- Check extensions
    SELECT 
        'Extensions Check'::TEXT,
        CASE 
            WHEN COUNT(*) < 2 THEN 'WARNING'
            ELSE 'OK'
        END,
        'Critical extensions: ' || STRING_AGG(extname, ', '),
        CASE 
            WHEN COUNT(*) < 2 THEN 'Verify pgvector and other extensions'
            ELSE 'Required extensions installed'
        END
    FROM pg_extension 
    WHERE extname IN ('vector', 'uuid-ossp', 'postgis');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- BACKUP MONITORING VIEWS
-- =====================================================================================

-- View for backup dashboard
CREATE OR REPLACE VIEW backup_dashboard AS
SELECT 
    'Database' as component,
    pg_size_pretty(pg_database_size(current_database())) as size,
    'Daily backups (7 days)' as current_strategy,
    'PITR recommended for <1hr RPO' as recommendation,
    CASE 
        WHEN pg_database_size(current_database()) > 4 * 1024 * 1024 * 1024 THEN 'HIGH'
        WHEN pg_database_size(current_database()) > 1 * 1024 * 1024 * 1024 THEN 'MEDIUM'
        ELSE 'LOW'
    END as priority
UNION ALL
SELECT 
    'Storage (' || bucket_id || ')' as component,
    pg_size_pretty(SUM(COALESCE((metadata->>'size')::BIGINT, 0))) as size,
    CASE 
        WHEN bucket_id IN ('documents', 'batch-photos', 'harvest-images') THEN 'Critical - needs backup'
        WHEN bucket_id = 'temp-uploads' THEN 'Ephemeral - auto-cleanup'
        ELSE 'Standard - periodic backup'
    END as current_strategy,
    CASE 
        WHEN bucket_id IN ('documents', 'batch-photos', 'harvest-images') THEN 'Daily sync to external storage'
        WHEN bucket_id = 'temp-uploads' THEN 'No action needed'
        ELSE 'Weekly sync recommended'
    END as recommendation,
    CASE 
        WHEN bucket_id IN ('documents', 'batch-photos', 'harvest-images') THEN 'HIGH'
        WHEN bucket_id IN ('growing-guides', 'facility-photos') THEN 'MEDIUM'
        ELSE 'LOW'
    END as priority
FROM storage.objects
GROUP BY bucket_id;

-- =====================================================================================
-- BACKUP PROCEDURES DOCUMENTATION
-- =====================================================================================

-- Function to generate backup procedures documentation
CREATE OR REPLACE FUNCTION get_backup_procedures()
RETURNS TABLE (
    procedure_type TEXT,
    procedure_name TEXT,
    description TEXT,
    frequency TEXT,
    automation_level TEXT
) AS $$
BEGIN
    RETURN QUERY
    VALUES 
    ('Database', 'Daily Logical Backup', 'Automatic pg_dumpall backup via Supabase', 'Daily', 'Fully Automated'),
    ('Database', 'PITR Setup', 'Enable Point-in-Time Recovery for 2-minute RPO', 'Continuous', 'Fully Automated'),
    ('Database', 'Backup Verification', 'Test restore procedures monthly', 'Monthly', 'Manual'),
    ('Storage', 'Critical Files Sync', 'Sync documents, photos to external storage', 'Daily', 'Automated'),
    ('Storage', 'Reference Data Backup', 'Backup growing guides and variety images', 'Weekly', 'Automated'),
    ('Storage', 'Temp Cleanup', 'Automatic cleanup of temporary uploads', 'Daily', 'Fully Automated'),
    ('Monitoring', 'Backup Health Check', 'Validate backup status and metrics', 'Daily', 'Automated'),
    ('Monitoring', 'Storage Usage Report', 'Monitor storage growth and usage patterns', 'Weekly', 'Automated'),
    ('Recovery', 'Database Recovery Test', 'Test database restore procedures', 'Quarterly', 'Manual'),
    ('Recovery', 'Storage Recovery Test', 'Test storage file recovery procedures', 'Quarterly', 'Manual'),
    ('Compliance', 'Retention Policy Review', 'Review and update retention policies', 'Annually', 'Manual'),
    ('Compliance', 'Audit Trail Backup', 'Ensure audit logs are properly backed up', 'Daily', 'Automated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- GRANT PERMISSIONS
-- =====================================================================================

-- Grant execute permissions on backup monitoring functions
GRANT EXECUTE ON FUNCTION get_backup_status() TO authenticated;
GRANT EXECUTE ON FUNCTION get_critical_data_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION get_storage_backup_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION validate_backup_readiness() TO authenticated;
GRANT EXECUTE ON FUNCTION get_backup_procedures() TO authenticated;

-- Grant select permissions on backup views
GRANT SELECT ON backup_dashboard TO authenticated;

-- Grant service role permissions for maintenance
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =====================================================================================
-- BACKUP CONFIGURATION COMPLETE
-- =====================================================================================

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Backup configuration completed successfully';
    RAISE NOTICE 'Current database size: %', pg_size_pretty(pg_database_size(current_database()));
    RAISE NOTICE 'Backup monitoring functions created';
    RAISE NOTICE 'Next step: Enable PITR add-on for enhanced backup strategy';
END $$; 