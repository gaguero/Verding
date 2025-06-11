-- =====================================================
-- VERDING AGENT MEMORY ARCHITECTURE IMPLEMENTATION
-- =====================================================
-- 
-- This migration implements the comprehensive agent memory system
-- designed for Verding's agent-first microgreens management platform.
-- 
-- Memory Types Implemented:
-- 1. Short-term Memory - Conversation context with recency layers
-- 2. Working Memory - Active task state management
-- 3. Long-term Memory - Pattern learning and user preferences
-- 4. Procedural Memory - How-to knowledge with MCP integration
-- 5. Episodic Memory - Experience tracking and event history
-- 6. Semantic Memory - Domain knowledge and relationships
-- 
-- Author: Verding Development Team
-- Date: 2025-05-30
-- Version: 1.0
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. SHORT-TERM MEMORY
-- =====================================================
-- Manages conversation context with layered recency approach
-- Primary (0-2h), Secondary (2-24h), Tertiary (1-7d)

CREATE TABLE agent_short_term_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id UUID NOT NULL,
    
    -- Memory layer classification
    memory_layer TEXT NOT NULL CHECK (memory_layer IN ('primary', 'secondary', 'tertiary')),
    
    -- Content and context
    content TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('conversation', 'decision', 'action', 'observation')),
    summary TEXT, -- For compressed layers
    
    -- Context tagging
    tags JSONB DEFAULT '[]'::jsonb,
    property_context JSONB DEFAULT '{}'::jsonb,
    crop_context JSONB DEFAULT '{}'::jsonb,
    task_context JSONB DEFAULT '{}'::jsonb,
    
    -- Retrieval optimization
    embedding vector(1536),
    importance_score FLOAT DEFAULT 0.5 CHECK (importance_score >= 0 AND importance_score <= 1),
    
    -- Temporal management
    expires_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for short-term memory
CREATE INDEX idx_agent_short_term_memory_property_session ON agent_short_term_memory(property_id, session_id);
CREATE INDEX idx_agent_short_term_memory_layer_expires ON agent_short_term_memory(memory_layer, expires_at);
CREATE INDEX idx_agent_short_term_memory_embedding ON agent_short_term_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_short_term_memory_tags ON agent_short_term_memory USING gin(tags);
CREATE INDEX idx_agent_short_term_memory_importance ON agent_short_term_memory(importance_score DESC);

-- =====================================================
-- 2. WORKING MEMORY
-- =====================================================
-- Manages active task state with multi-workspace architecture

CREATE TABLE agent_working_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id UUID NOT NULL,
    
    -- Workspace management
    workspace_type TEXT NOT NULL CHECK (workspace_type IN ('primary', 'background', 'planning', 'monitoring')),
    workspace_name TEXT NOT NULL,
    
    -- Task state
    task_id TEXT,
    task_state JSONB NOT NULL DEFAULT '{}'::jsonb,
    entity_frames JSONB DEFAULT '{}'::jsonb,
    relationship_maps JSONB DEFAULT '{}'::jsonb,
    variable_tracking JSONB DEFAULT '{}'::jsonb,
    reasoning_chain JSONB DEFAULT '[]'::jsonb,
    
    -- State management
    checkpoint_data JSONB,
    state_version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    
    -- Context preservation
    interruption_context JSONB,
    resumption_cues JSONB,
    
    -- Retrieval optimization
    embedding vector(1536),
    priority_score FLOAT DEFAULT 0.5 CHECK (priority_score >= 0 AND priority_score <= 1),
    
    -- Temporal tracking
    last_checkpoint_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for working memory
CREATE INDEX idx_agent_working_memory_property_session ON agent_working_memory(property_id, session_id);
CREATE INDEX idx_agent_working_memory_workspace_active ON agent_working_memory(workspace_type, is_active);
CREATE INDEX idx_agent_working_memory_task ON agent_working_memory(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX idx_agent_working_memory_embedding ON agent_working_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_working_memory_priority ON agent_working_memory(priority_score DESC);

-- =====================================================
-- 3. LONG-TERM MEMORY
-- =====================================================
-- Stores learned patterns and user preferences across dimensions

CREATE TABLE agent_long_term_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Knowledge dimensions
    knowledge_dimension TEXT NOT NULL CHECK (knowledge_dimension IN ('crop', 'environmental', 'user', 'outcome')),
    knowledge_category TEXT NOT NULL,
    
    -- Pattern data
    pattern_data JSONB NOT NULL,
    pattern_type TEXT NOT NULL CHECK (pattern_type IN ('correlation', 'sequence', 'classification', 'prediction')),
    
    -- Learning metadata
    learning_mechanism TEXT NOT NULL CHECK (learning_mechanism IN ('supervised', 'unsupervised', 'reinforcement', 'transfer')),
    confidence_score FLOAT NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    evidence_count INTEGER DEFAULT 1,
    
    -- Hierarchical organization
    parent_pattern_id UUID REFERENCES agent_long_term_memory(id) ON DELETE SET NULL,
    taxonomy_path TEXT[],
    
    -- Causal relationships
    causal_factors JSONB DEFAULT '[]'::jsonb,
    outcome_correlations JSONB DEFAULT '{}'::jsonb,
    
    -- Temporal patterns
    seasonal_patterns JSONB DEFAULT '{}'::jsonb,
    temporal_validity JSONB DEFAULT '{}'::jsonb,
    
    -- Retrieval optimization
    embedding vector(1536),
    
    -- Knowledge evolution
    version INTEGER DEFAULT 1,
    superseded_by UUID REFERENCES agent_long_term_memory(id) ON DELETE SET NULL,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_validated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for long-term memory
CREATE INDEX idx_agent_long_term_memory_property_dimension ON agent_long_term_memory(property_id, knowledge_dimension);
CREATE INDEX idx_agent_long_term_memory_category ON agent_long_term_memory(knowledge_category);
CREATE INDEX idx_agent_long_term_memory_confidence ON agent_long_term_memory(confidence_score DESC);
CREATE INDEX idx_agent_long_term_memory_embedding ON agent_long_term_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_long_term_memory_taxonomy ON agent_long_term_memory USING gin(taxonomy_path);
CREATE INDEX idx_agent_long_term_memory_parent ON agent_long_term_memory(parent_pattern_id);

-- =====================================================
-- 4. PROCEDURAL MEMORY
-- =====================================================
-- Stores procedures and workflows with MCP integration

CREATE TABLE agent_procedural_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Procedure identification
    procedure_name TEXT NOT NULL,
    procedure_category TEXT NOT NULL,
    procedure_type TEXT NOT NULL CHECK (procedure_type IN ('microgreens_operation', 'mcp_tool_usage', 'system_integration', 'maintenance')),
    
    -- Procedure structure
    procedure_template JSONB NOT NULL,
    parameter_schema JSONB DEFAULT '{}'::jsonb,
    conditional_branches JSONB DEFAULT '[]'::jsonb,
    expected_outcomes JSONB DEFAULT '{}'::jsonb,
    
    -- MCP integration
    mcp_tools_used JSONB DEFAULT '[]'::jsonb,
    tool_configurations JSONB DEFAULT '{}'::jsonb,
    error_handling_procedures JSONB DEFAULT '{}'::jsonb,
    
    -- Execution tracking
    execution_history JSONB DEFAULT '[]'::jsonb,
    success_rate FLOAT DEFAULT 0.0 CHECK (success_rate >= 0 AND success_rate <= 1),
    average_duration INTERVAL,
    
    -- Adaptation and refinement
    adaptation_rules JSONB DEFAULT '[]'::jsonb,
    refinement_history JSONB DEFAULT '[]'::jsonb,
    version INTEGER DEFAULT 1,
    
    -- Context and conditions
    applicable_conditions JSONB DEFAULT '{}'::jsonb,
    prerequisite_procedures UUID[],
    
    -- Retrieval optimization
    embedding vector(1536),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_executed_at TIMESTAMP WITH TIME ZONE,
    last_refined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for procedural memory
CREATE INDEX idx_agent_procedural_memory_property_category ON agent_procedural_memory(property_id, procedure_category);
CREATE INDEX idx_agent_procedural_memory_type ON agent_procedural_memory(procedure_type);
CREATE INDEX idx_agent_procedural_memory_success_rate ON agent_procedural_memory(success_rate DESC);
CREATE INDEX idx_agent_procedural_memory_embedding ON agent_procedural_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_procedural_memory_mcp_tools ON agent_procedural_memory USING gin(mcp_tools_used);

-- =====================================================
-- 5. EPISODIC MEMORY
-- =====================================================
-- Records experiences and events with temporal organization

CREATE TABLE agent_episodic_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Episode identification
    episode_type TEXT NOT NULL CHECK (episode_type IN ('problem_detected', 'solution_applied', 'milestone_reached', 'user_decision', 'observation', 'outcome')),
    episode_title TEXT NOT NULL,
    
    -- Event details
    narrative TEXT NOT NULL,
    event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Temporal metadata
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTERVAL,
    
    -- Context
    crop_variety TEXT,
    batch_id UUID REFERENCES growing_batches(id) ON DELETE SET NULL,
    growth_stage TEXT,
    environmental_conditions JSONB DEFAULT '{}'::jsonb,
    
    -- Participants
    participants JSONB DEFAULT '[]'::jsonb,
    primary_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Outcomes and consequences
    immediate_outcomes JSONB DEFAULT '{}'::jsonb,
    long_term_consequences JSONB DEFAULT '{}'::jsonb,
    success_indicators JSONB DEFAULT '{}'::jsonb,
    
    -- Problem-solution pairing
    problem_description TEXT,
    solution_applied JSONB,
    solution_effectiveness FLOAT CHECK (solution_effectiveness >= 0 AND solution_effectiveness <= 1),
    
    -- Learning extraction
    lessons_learned TEXT,
    patterns_identified JSONB DEFAULT '[]'::jsonb,
    
    -- Episode relationships
    related_episodes UUID[],
    causal_predecessors UUID[],
    causal_successors UUID[],
    
    -- Retrieval optimization
    embedding vector(1536),
    importance_score FLOAT DEFAULT 0.5 CHECK (importance_score >= 0 AND importance_score <= 1),
    
    -- Temporal organization
    seasonal_context JSONB DEFAULT '{}'::jsonb,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for episodic memory
CREATE INDEX idx_agent_episodic_memory_property_timestamp ON agent_episodic_memory(property_id, event_timestamp DESC);
CREATE INDEX idx_agent_episodic_memory_type ON agent_episodic_memory(episode_type);
CREATE INDEX idx_agent_episodic_memory_crop_variety ON agent_episodic_memory(crop_variety) WHERE crop_variety IS NOT NULL;
CREATE INDEX idx_agent_episodic_memory_batch ON agent_episodic_memory(batch_id) WHERE batch_id IS NOT NULL;
CREATE INDEX idx_agent_episodic_memory_embedding ON agent_episodic_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_episodic_memory_importance ON agent_episodic_memory(importance_score DESC);
CREATE INDEX idx_agent_episodic_memory_related ON agent_episodic_memory USING gin(related_episodes);

-- =====================================================
-- 6. SEMANTIC MEMORY
-- =====================================================
-- Stores domain knowledge and relationships

CREATE TABLE agent_semantic_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Concept identification
    concept_type TEXT NOT NULL CHECK (concept_type IN ('crop_variety', 'technique', 'equipment', 'problem', 'nutrient', 'environmental_factor')),
    entity_name TEXT NOT NULL,
    entity_category TEXT,
    
    -- Knowledge representation
    properties JSONB NOT NULL DEFAULT '{}'::jsonb,
    attributes JSONB DEFAULT '{}'::jsonb,
    measurable_parameters JSONB DEFAULT '{}'::jsonb,
    qualitative_descriptors JSONB DEFAULT '{}'::jsonb,
    
    -- Relationship network
    relationships JSONB DEFAULT '[]'::jsonb, -- Array of {target_entity, relationship_type, strength, conditions}
    causal_relationships JSONB DEFAULT '[]'::jsonb,
    temporal_relationships JSONB DEFAULT '[]'::jsonb,
    
    -- Knowledge graph integration
    subject TEXT NOT NULL,
    predicate TEXT,
    object TEXT,
    
    -- Domain ontology
    taxonomy_path TEXT[],
    ontology_class TEXT,
    
    -- Knowledge provenance
    sources JSONB DEFAULT '[]'::jsonb,
    confidence_score FLOAT NOT NULL DEFAULT 0.5 CHECK (confidence_score >= 0 AND confidence_score <= 1),
    evidence_strength FLOAT DEFAULT 0.5 CHECK (evidence_strength >= 0 AND evidence_strength <= 1),
    
    -- Knowledge evolution
    version INTEGER DEFAULT 1,
    superseded_by UUID REFERENCES agent_semantic_memory(id) ON DELETE SET NULL,
    validation_status TEXT DEFAULT 'unvalidated' CHECK (validation_status IN ('validated', 'unvalidated', 'disputed', 'deprecated')),
    
    -- Retrieval optimization
    embedding vector(1536),
    
    -- Inference support
    inference_rules JSONB DEFAULT '[]'::jsonb,
    derived_facts JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_validated_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for semantic memory
CREATE INDEX idx_agent_semantic_memory_property_concept ON agent_semantic_memory(property_id, concept_type);
CREATE INDEX idx_agent_semantic_memory_entity ON agent_semantic_memory(entity_name);
CREATE INDEX idx_agent_semantic_memory_subject_predicate ON agent_semantic_memory(subject, predicate);
CREATE INDEX idx_agent_semantic_memory_confidence ON agent_semantic_memory(confidence_score DESC);
CREATE INDEX idx_agent_semantic_memory_embedding ON agent_semantic_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_semantic_memory_taxonomy ON agent_semantic_memory USING gin(taxonomy_path);
CREATE INDEX idx_agent_semantic_memory_relationships ON agent_semantic_memory USING gin(relationships);

-- =====================================================
-- MEMORY INTEGRATION TABLES
-- =====================================================

-- Cross-memory type references for integration
CREATE TABLE agent_memory_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_memory_type TEXT NOT NULL CHECK (source_memory_type IN ('short_term', 'working', 'long_term', 'procedural', 'episodic', 'semantic')),
    source_memory_id UUID NOT NULL,
    target_memory_type TEXT NOT NULL CHECK (target_memory_type IN ('short_term', 'working', 'long_term', 'procedural', 'episodic', 'semantic')),
    target_memory_id UUID NOT NULL,
    reference_type TEXT NOT NULL CHECK (reference_type IN ('derived_from', 'supports', 'contradicts', 'enhances', 'applies_to')),
    reference_strength FLOAT DEFAULT 0.5 CHECK (reference_strength >= 0 AND reference_strength <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agent_memory_references_source ON agent_memory_references(source_memory_type, source_memory_id);
CREATE INDEX idx_agent_memory_references_target ON agent_memory_references(target_memory_type, target_memory_id);

-- Memory operation logs for debugging and optimization
CREATE TABLE agent_memory_operations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    operation_type TEXT NOT NULL CHECK (operation_type IN ('create', 'read', 'update', 'delete', 'search', 'consolidate')),
    memory_type TEXT NOT NULL CHECK (memory_type IN ('short_term', 'working', 'long_term', 'procedural', 'episodic', 'semantic')),
    memory_id UUID,
    operation_details JSONB DEFAULT '{}'::jsonb,
    performance_metrics JSONB DEFAULT '{}'::jsonb,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agent_memory_operations_property_type ON agent_memory_operations(property_id, memory_type);
CREATE INDEX idx_agent_memory_operations_timestamp ON agent_memory_operations(created_at DESC);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all memory tables
CREATE TRIGGER update_agent_short_term_memory_updated_at BEFORE UPDATE ON agent_short_term_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agent_working_memory_updated_at BEFORE UPDATE ON agent_working_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agent_long_term_memory_updated_at BEFORE UPDATE ON agent_long_term_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agent_procedural_memory_updated_at BEFORE UPDATE ON agent_procedural_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agent_episodic_memory_updated_at BEFORE UPDATE ON agent_episodic_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agent_semantic_memory_updated_at BEFORE UPDATE ON agent_semantic_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MEMORY MANAGEMENT FUNCTIONS
-- =====================================================

-- Function to clean up expired short-term memory
CREATE OR REPLACE FUNCTION cleanup_expired_short_term_memory()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM agent_short_term_memory 
    WHERE expires_at < NOW();
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    INSERT INTO agent_memory_operations (
        property_id, operation_type, memory_type, operation_details
    ) VALUES (
        '00000000-0000-0000-0000-000000000000'::uuid, 
        'delete', 
        'short_term', 
        jsonb_build_object('deleted_count', deleted_count, 'reason', 'expired')
    );
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to consolidate working memory checkpoints
CREATE OR REPLACE FUNCTION consolidate_working_memory_checkpoints(p_session_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Archive old checkpoints, keeping only the latest 5 per workspace
    WITH ranked_checkpoints AS (
        SELECT id, 
               ROW_NUMBER() OVER (PARTITION BY workspace_name ORDER BY last_checkpoint_at DESC) as rn
        FROM agent_working_memory 
        WHERE session_id = p_session_id
    )
    DELETE FROM agent_working_memory 
    WHERE id IN (
        SELECT id FROM ranked_checkpoints WHERE rn > 5
    );
END;
$$ LANGUAGE plpgsql;

-- Function to update memory access patterns
CREATE OR REPLACE FUNCTION update_memory_access(
    p_memory_type TEXT,
    p_memory_id UUID,
    p_access_type TEXT DEFAULT 'read'
)
RETURNS VOID AS $$
BEGIN
    -- Update last_accessed_at for the specific memory type
    CASE p_memory_type
        WHEN 'short_term' THEN
            UPDATE agent_short_term_memory 
            SET last_accessed_at = NOW() 
            WHERE id = p_memory_id;
        WHEN 'working' THEN
            UPDATE agent_working_memory 
            SET last_accessed_at = NOW() 
            WHERE id = p_memory_id;
        WHEN 'long_term' THEN
            UPDATE agent_long_term_memory 
            SET last_validated_at = NOW() 
            WHERE id = p_memory_id;
        WHEN 'procedural' THEN
            UPDATE agent_procedural_memory 
            SET last_executed_at = NOW() 
            WHERE id = p_memory_id;
        WHEN 'semantic' THEN
            UPDATE agent_semantic_memory 
            SET last_validated_at = NOW() 
            WHERE id = p_memory_id;
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE agent_short_term_memory IS 'Stores conversation context with layered recency management for agent continuity';
COMMENT ON TABLE agent_working_memory IS 'Manages active task state with multi-workspace architecture for parallel operations';
COMMENT ON TABLE agent_long_term_memory IS 'Stores learned patterns and user preferences across multiple knowledge dimensions';
COMMENT ON TABLE agent_procedural_memory IS 'Contains procedures and workflows with MCP tool integration for system operations';
COMMENT ON TABLE agent_episodic_memory IS 'Records experiences and events with temporal organization for learning from history';
COMMENT ON TABLE agent_semantic_memory IS 'Stores domain knowledge and relationships in a structured knowledge graph format';
COMMENT ON TABLE agent_memory_references IS 'Manages cross-references between different memory types for integrated retrieval';
COMMENT ON TABLE agent_memory_operations IS 'Logs memory operations for performance monitoring and debugging';

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE 'Agent Memory Architecture implementation completed successfully!';
    RAISE NOTICE 'Created 6 memory type tables with comprehensive indexing and triggers';
    RAISE NOTICE 'Implemented cross-memory integration and management functions';
    RAISE NOTICE 'Ready for agent memory operations and learning capabilities';
END $$; 