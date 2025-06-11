-- =====================================================================================
-- Verding n8n Workflow Metrics Table Enhancement
-- =====================================================================================
-- This script enhances the existing n8n_workflow_metrics table to support comprehensive
-- monitoring with user tracking, timing data, and error details

-- =====================================================================================
-- TABLE SCHEMA ENHANCEMENT
-- =====================================================================================

-- Add missing columns to support comprehensive workflow monitoring
ALTER TABLE n8n_workflow_metrics 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS execution_time_ms INTEGER,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS error_details TEXT;

-- Add comments for documentation
COMMENT ON TABLE n8n_workflow_metrics IS 'Comprehensive n8n workflow execution metrics and monitoring data';
COMMENT ON COLUMN n8n_workflow_metrics.id IS 'Primary key identifier';
COMMENT ON COLUMN n8n_workflow_metrics.property_id IS 'Property context for multi-tenant monitoring';
COMMENT ON COLUMN n8n_workflow_metrics.workflow_id IS 'n8n workflow identifier';
COMMENT ON COLUMN n8n_workflow_metrics.workflow_name IS 'Human-readable workflow name';
COMMENT ON COLUMN n8n_workflow_metrics.execution_id IS 'Unique execution instance identifier';
COMMENT ON COLUMN n8n_workflow_metrics.node_name IS 'Specific node name within workflow (for granular monitoring)';
COMMENT ON COLUMN n8n_workflow_metrics.metric_type IS 'Type of metric being recorded (execution, performance, error, etc.)';
COMMENT ON COLUMN n8n_workflow_metrics.metric_value IS 'Numeric value of the metric';
COMMENT ON COLUMN n8n_workflow_metrics.status IS 'Execution status (success, failed, timeout, etc.)';
COMMENT ON COLUMN n8n_workflow_metrics.timestamp IS 'When the metric was recorded';
COMMENT ON COLUMN n8n_workflow_metrics.user_id IS 'User who triggered the workflow execution';
COMMENT ON COLUMN n8n_workflow_metrics.start_time IS 'Workflow execution start timestamp';
COMMENT ON COLUMN n8n_workflow_metrics.end_time IS 'Workflow execution end timestamp';
COMMENT ON COLUMN n8n_workflow_metrics.execution_time_ms IS 'Total execution time in milliseconds';
COMMENT ON COLUMN n8n_workflow_metrics.metadata IS 'Flexible JSON storage for additional context (AI model usage, tokens, etc.)';
COMMENT ON COLUMN n8n_workflow_metrics.error_details IS 'Detailed error information for failed executions';

-- =====================================================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================================================

-- Create indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_n8n_metrics_property_user ON n8n_workflow_metrics(property_id, user_id);
CREATE INDEX IF NOT EXISTS idx_n8n_metrics_workflow_status ON n8n_workflow_metrics(workflow_name, status);
CREATE INDEX IF NOT EXISTS idx_n8n_metrics_execution_time ON n8n_workflow_metrics(execution_id, start_time);
CREATE INDEX IF NOT EXISTS idx_n8n_metrics_timestamp ON n8n_workflow_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_n8n_metrics_performance ON n8n_workflow_metrics(execution_time_ms) WHERE execution_time_ms IS NOT NULL;

-- =====================================================================================
-- ROW LEVEL SECURITY
-- =====================================================================================

-- Enable RLS on the table
ALTER TABLE n8n_workflow_metrics ENABLE ROW LEVEL SECURITY;

-- Policy for users to view metrics for their properties
CREATE POLICY "Users can view workflow metrics for their properties" ON n8n_workflow_metrics
    FOR SELECT USING (
        property_id IS NULL OR 
        can_view_property(property_id)
    );

-- Policy for system to insert workflow metrics
CREATE POLICY "System can insert workflow metrics" ON n8n_workflow_metrics
    FOR INSERT WITH CHECK (true);

-- Policy for users to manage metrics for their properties
CREATE POLICY "Users can manage workflow metrics for their properties" ON n8n_workflow_metrics
    FOR ALL USING (
        property_id IS NULL OR 
        can_manage_property(property_id)
    );

-- =====================================================================================
-- MONITORING FUNCTIONS
-- =====================================================================================

-- Function to get workflow performance summary
CREATE OR REPLACE FUNCTION get_workflow_performance_summary(
    p_property_id UUID DEFAULT NULL,
    p_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
    workflow_name TEXT,
    total_executions BIGINT,
    successful_executions BIGINT,
    failed_executions BIGINT,
    success_rate NUMERIC,
    avg_execution_time_ms NUMERIC,
    min_execution_time_ms INTEGER,
    max_execution_time_ms INTEGER,
    last_execution TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.workflow_name,
        COUNT(*) as total_executions,
        COUNT(*) FILTER (WHERE m.status = 'success') as successful_executions,
        COUNT(*) FILTER (WHERE m.status = 'failed') as failed_executions,
        ROUND(
            (COUNT(*) FILTER (WHERE m.status = 'success')::NUMERIC / COUNT(*)::NUMERIC) * 100, 
            2
        ) as success_rate,
        ROUND(AVG(m.execution_time_ms), 2) as avg_execution_time_ms,
        MIN(m.execution_time_ms) as min_execution_time_ms,
        MAX(m.execution_time_ms) as max_execution_time_ms,
        MAX(m.end_time) as last_execution
    FROM n8n_workflow_metrics m
    WHERE 
        (p_property_id IS NULL OR m.property_id = p_property_id)
        AND m.timestamp >= NOW() - (p_hours || ' hours')::INTERVAL
        AND m.execution_time_ms IS NOT NULL
    GROUP BY m.workflow_name
    ORDER BY total_executions DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get workflow errors summary
CREATE OR REPLACE FUNCTION get_workflow_errors_summary(
    p_property_id UUID DEFAULT NULL,
    p_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
    workflow_name TEXT,
    error_count BIGINT,
    latest_error TIMESTAMPTZ,
    common_error_patterns TEXT[],
    affected_users BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.workflow_name,
        COUNT(*) as error_count,
        MAX(m.timestamp) as latest_error,
        array_agg(DISTINCT SUBSTRING(m.error_details, 1, 100)) as common_error_patterns,
        COUNT(DISTINCT m.user_id) as affected_users
    FROM n8n_workflow_metrics m
    WHERE 
        (p_property_id IS NULL OR m.property_id = p_property_id)
        AND m.timestamp >= NOW() - (p_hours || ' hours')::INTERVAL
        AND m.status = 'failed'
        AND m.error_details IS NOT NULL
    GROUP BY m.workflow_name
    ORDER BY error_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- GRANT PERMISSIONS
-- =====================================================================================

-- Grant permissions on monitoring functions
GRANT EXECUTE ON FUNCTION get_workflow_performance_summary(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_workflow_errors_summary(UUID, INTEGER) TO authenticated;

-- Grant service role permissions
GRANT ALL ON n8n_workflow_metrics TO service_role;

-- =====================================================================================
-- CLEANUP FUNCTION
-- =====================================================================================

-- Function to cleanup old workflow metrics
CREATE OR REPLACE FUNCTION cleanup_old_workflow_metrics(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM n8n_workflow_metrics 
    WHERE timestamp < NOW() - (days_to_keep || ' days')::INTERVAL;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RAISE NOTICE 'Cleaned up % old workflow metrics records', deleted_count;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION cleanup_old_workflow_metrics(INTEGER) TO authenticated;

-- =====================================================================================
-- LOG COMPLETION
-- =====================================================================================

DO $$
BEGIN
    RAISE NOTICE 'n8n workflow metrics table enhanced successfully';
    RAISE NOTICE 'Added columns: user_id, start_time, end_time, execution_time_ms, metadata, error_details';
    RAISE NOTICE 'Created performance monitoring functions';
    RAISE NOTICE 'Configured row-level security policies';
    RAISE NOTICE 'Added indexes for query optimization';
END $$; 