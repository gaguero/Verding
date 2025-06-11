-- =====================================================
-- VERDING AGENT MEMORY SAMPLE DATA
-- =====================================================
-- 
-- This script populates the agent memory architecture with
-- realistic sample data to demonstrate functionality and
-- enable testing of the memory system.
-- 
-- Author: Verding Development Team
-- Date: 2025-05-30
-- Version: 1.0
-- =====================================================

-- Get sample property and user IDs for data insertion
DO $$
DECLARE
    sample_property_id UUID;
    sample_user_id UUID;
    sample_batch_id UUID;
    session_uuid UUID := uuid_generate_v4();
    
    -- Memory IDs for cross-references
    short_term_id UUID;
    working_memory_id UUID;
    long_term_id UUID;
    procedural_id UUID;
    episodic_id UUID;
    semantic_id UUID;
BEGIN
    -- Get sample IDs from existing data
    SELECT id INTO sample_property_id FROM properties LIMIT 1;
    SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
    SELECT id INTO sample_batch_id FROM growing_batches LIMIT 1;
    
    RAISE NOTICE 'Populating agent memory with sample data...';
    RAISE NOTICE 'Using Property ID: %', sample_property_id;
    RAISE NOTICE 'Using Session ID: %', session_uuid;

    -- =====================================================
    -- 1. SHORT-TERM MEMORY SAMPLES
    -- =====================================================
    
    -- Primary layer conversation
    INSERT INTO agent_short_term_memory (
        property_id, user_id, session_id, memory_layer, content, content_type,
        tags, property_context, crop_context, task_context,
        importance_score, expires_at
    ) VALUES 
    (
        sample_property_id, sample_user_id, session_uuid, 'primary',
        'User asked about the status of pea microgreens batch B-2024-001. Provided current growth stage (day 3 of blackout period) and expected timeline for light exposure.',
        'conversation',
        '["pea_microgreens", "batch_status", "growth_stage"]'::jsonb,
        '{"facility": "greenhouse_2", "section": "A"}'::jsonb,
        '{"variety": "pea", "batch_id": "B-2024-001", "stage": "blackout"}'::jsonb,
        '{"type": "status_inquiry", "urgency": "normal"}'::jsonb,
        0.8,
        NOW() + INTERVAL '2 hours'
    ),
    (
        sample_property_id, sample_user_id, session_uuid, 'primary',
        'User reported yellowing on radish microgreens. Recommended reducing humidity and increasing air circulation. Scheduled follow-up check in 24 hours.',
        'decision',
        '["radish_microgreens", "yellowing", "humidity_control"]'::jsonb,
        '{"facility": "greenhouse_1", "section": "B"}'::jsonb,
        '{"variety": "radish", "problem": "yellowing", "stage": "light_growth"}'::jsonb,
        '{"type": "problem_solving", "urgency": "medium"}'::jsonb,
        0.9,
        NOW() + INTERVAL '1.5 hours'
    );

    -- Secondary layer summary
    INSERT INTO agent_short_term_memory (
        property_id, user_id, session_id, memory_layer, content, content_type,
        summary, tags, importance_score, expires_at
    ) VALUES 
    (
        sample_property_id, sample_user_id, session_uuid, 'secondary',
        'Previous session covered sunflower microgreens harvest planning and packaging procedures.',
        'conversation',
        'Discussed harvest timing, yield expectations, and packaging requirements for sunflower microgreens order.',
        '["sunflower_microgreens", "harvest_planning", "packaging"]'::jsonb,
        0.6,
        NOW() + INTERVAL '18 hours'
    );

    -- =====================================================
    -- 2. WORKING MEMORY SAMPLES
    -- =====================================================
    
    -- Primary workspace - active task
    INSERT INTO agent_working_memory (
        property_id, user_id, session_id, workspace_type, workspace_name,
        task_id, task_state, entity_frames, relationship_maps, variable_tracking,
        reasoning_chain, priority_score
    ) VALUES 
    (
        sample_property_id, sample_user_id, session_uuid, 'primary', 'batch_monitoring',
        'monitor_pea_batch_001',
        '{"current_step": "evaluate_growth_progress", "completion": 0.6, "next_action": "check_moisture_levels"}'::jsonb,
        '{"batch": {"id": "B-2024-001", "variety": "pea", "day": 3}, "environment": {"temp": 22, "humidity": 85}}'::jsonb,
        '{"batch_to_environment": "affected_by", "growth_stage_to_conditions": "requires"}'::jsonb,
        '{"temperature": 22.5, "humidity": 85, "last_watering": "2024-05-30T08:00:00Z"}'::jsonb,
        '[{"step": "assess_current_stage", "reasoning": "Day 3 of blackout, normal progress"}, {"step": "check_environmental_conditions", "reasoning": "Temperature and humidity within range"}]'::jsonb,
        0.9
    ) RETURNING id INTO working_memory_id;

    -- Background workspace - monitoring task
    INSERT INTO agent_working_memory (
        property_id, user_id, session_id, workspace_type, workspace_name,
        task_id, task_state, priority_score
    ) VALUES 
    (
        sample_property_id, sample_user_id, session_uuid, 'monitoring', 'environmental_alerts',
        'monitor_greenhouse_conditions',
        '{"alerts_active": ["humidity_high_gh1"], "last_check": "2024-05-30T10:30:00Z"}'::jsonb,
        0.7
    );

    -- =====================================================
    -- 3. LONG-TERM MEMORY SAMPLES
    -- =====================================================
    
    -- Crop knowledge pattern
    INSERT INTO agent_long_term_memory (
        property_id, knowledge_dimension, knowledge_category, pattern_data,
        pattern_type, learning_mechanism, confidence_score, evidence_count,
        taxonomy_path, causal_factors, outcome_correlations
    ) VALUES 
    (
        sample_property_id, 'crop', 'growth_optimization',
        '{"variety": "pea", "optimal_conditions": {"temp_range": [18, 24], "humidity_range": [80, 90]}, "common_issues": ["damping_off", "slow_germination"]}'::jsonb,
        'classification', 'supervised', 0.85, 15,
        ARRAY['microgreens', 'legumes', 'pea'],
        '[{"factor": "high_humidity", "effect": "increased_damping_off_risk"}, {"factor": "low_temperature", "effect": "slower_germination"}]'::jsonb,
        '{"success_rate": 0.92, "yield_correlation": {"temperature": 0.7, "humidity": 0.6}}'::jsonb
    ) RETURNING id INTO long_term_id;

    -- User preference pattern
    INSERT INTO agent_long_term_memory (
        property_id, knowledge_dimension, knowledge_category, pattern_data,
        pattern_type, learning_mechanism, confidence_score, evidence_count
    ) VALUES 
    (
        sample_property_id, 'user', 'communication_preferences',
        '{"user_id": "' || sample_user_id || '", "preferred_detail_level": "moderate", "notification_frequency": "daily", "preferred_channels": ["web", "email"]}'::jsonb,
        'classification', 'unsupervised', 0.78, 8
    );

    -- =====================================================
    -- 4. PROCEDURAL MEMORY SAMPLES
    -- =====================================================
    
    -- Microgreens operation procedure
    INSERT INTO agent_procedural_memory (
        property_id, procedure_name, procedure_category, procedure_type,
        procedure_template, parameter_schema, conditional_branches,
        mcp_tools_used, success_rate, average_duration
    ) VALUES 
    (
        sample_property_id, 'Pea Microgreens Seeding', 'seeding_operations', 'microgreens_operation',
        '{"steps": [{"id": 1, "action": "prepare_tray", "duration": "5min"}, {"id": 2, "action": "measure_seeds", "duration": "3min"}, {"id": 3, "action": "distribute_seeds", "duration": "7min"}, {"id": 4, "action": "initial_watering", "duration": "5min"}]}'::jsonb,
        '{"tray_size": {"type": "string", "enum": ["1020", "3.5x6"]}, "seed_amount": {"type": "number", "unit": "grams"}}'::jsonb,
        '[{"condition": "tray_size == 1020", "modifications": {"seed_amount": 45}}, {"condition": "tray_size == 3.5x6", "modifications": {"seed_amount": 15}}]'::jsonb,
        '["batch_management", "inventory_tracking", "task_scheduling"]'::jsonb,
        0.94, INTERVAL '20 minutes'
    ) RETURNING id INTO procedural_id;

    -- MCP tool usage procedure
    INSERT INTO agent_procedural_memory (
        property_id, procedure_name, procedure_category, procedure_type,
        procedure_template, mcp_tools_used, tool_configurations,
        error_handling_procedures, success_rate
    ) VALUES 
    (
        sample_property_id, 'Batch Status Update via MCP', 'system_operations', 'mcp_tool_usage',
        '{"steps": [{"id": 1, "tool": "get_batch_details", "params": ["batch_id"]}, {"id": 2, "tool": "update_batch_stage", "params": ["batch_id", "new_stage"]}, {"id": 3, "tool": "log_stage_event", "params": ["batch_id", "event_data"]}]}'::jsonb,
        '["get_batch_details", "update_batch_stage", "log_stage_event"]'::jsonb,
        '{"get_batch_details": {"timeout": 5000}, "update_batch_stage": {"validate_stage": true}}'::jsonb,
        '{"tool_failure": {"action": "retry_with_backoff", "max_retries": 3}, "validation_error": {"action": "request_user_confirmation"}}'::jsonb,
        0.96
    );

    -- =====================================================
    -- 5. EPISODIC MEMORY SAMPLES
    -- =====================================================
    
    -- Problem detection episode
    INSERT INTO agent_episodic_memory (
        property_id, episode_type, episode_title, narrative, event_data,
        event_timestamp, crop_variety, batch_id, growth_stage,
        environmental_conditions, primary_user_id, immediate_outcomes,
        problem_description, solution_applied, solution_effectiveness,
        lessons_learned, importance_score
    ) VALUES 
    (
        sample_property_id, 'problem_detected', 'Damping-off detected in radish batch',
        'During routine morning inspection, noticed white fuzzy growth and collapsed seedlings in radish microgreens batch R-2024-015. Approximately 15% of tray affected, concentrated in northwest corner.',
        '{"affected_area": "northwest_corner", "percentage_affected": 15, "symptoms": ["white_fuzzy_growth", "collapsed_seedlings"]}'::jsonb,
        NOW() - INTERVAL '2 days',
        'radish', sample_batch_id, 'germination',
        '{"temperature": 24, "humidity": 92, "air_circulation": "low"}'::jsonb,
        sample_user_id,
        '{"immediate_isolation": true, "affected_area_removed": true, "humidity_reduced": true}'::jsonb,
        'Damping-off fungal infection likely caused by excessive humidity and poor air circulation',
        '{"humidity_reduction": {"from": 92, "to": 85}, "air_circulation_increase": true, "affected_area_removal": true}'::jsonb,
        0.85,
        'High humidity (>90%) combined with poor air circulation creates ideal conditions for damping-off. Early detection and immediate isolation crucial for preventing spread.',
        0.9
    ) RETURNING id INTO episodic_id;

    -- Solution applied episode
    INSERT INTO agent_episodic_memory (
        property_id, episode_type, episode_title, narrative, event_data,
        event_timestamp, crop_variety, primary_user_id, solution_applied,
        solution_effectiveness, lessons_learned, related_episodes
    ) VALUES 
    (
        sample_property_id, 'solution_applied', 'Implemented humidity control protocol',
        'Applied comprehensive humidity control measures following damping-off detection. Adjusted ventilation system, repositioned fans, and modified watering schedule.',
        '{"ventilation_adjustment": "increased_by_20_percent", "fan_repositioning": true, "watering_schedule": "reduced_frequency"}'::jsonb,
        NOW() - INTERVAL '1.5 days',
        'radish', sample_user_id,
        '{"environmental_controls": {"humidity_target": 85, "air_circulation": "enhanced"}, "monitoring_frequency": "increased"}'::jsonb,
        0.88,
        'Rapid environmental adjustment can effectively halt damping-off progression when combined with affected area removal.',
        ARRAY[episodic_id]
    );

    -- =====================================================
    -- 6. SEMANTIC MEMORY SAMPLES
    -- =====================================================
    
    -- Crop variety knowledge
    INSERT INTO agent_semantic_memory (
        property_id, concept_type, entity_name, entity_category,
        properties, attributes, measurable_parameters,
        relationships, subject, predicate, object,
        taxonomy_path, sources, confidence_score
    ) VALUES 
    (
        sample_property_id, 'crop_variety', 'Pea Microgreens', 'legume',
        '{"scientific_name": "Pisum sativum", "family": "Fabaceae", "difficulty": "beginner"}'::jsonb,
        '{"flavor": "sweet", "texture": "tender", "color": "bright_green"}'::jsonb,
        '{"germination_time": {"min": 2, "max": 4, "unit": "days"}, "harvest_time": {"min": 7, "max": 14, "unit": "days"}, "yield": {"value": 1.5, "unit": "oz_per_tray"}}'::jsonb,
        '[{"target_entity": "high_humidity", "relationship_type": "susceptible_to", "strength": 0.7}, {"target_entity": "damping_off", "relationship_type": "prone_to", "strength": 0.6}]'::jsonb,
        'pea_microgreens', 'requires', 'moderate_humidity',
        ARRAY['plants', 'microgreens', 'legumes', 'pea'],
        '[{"type": "growing_guide", "reference": "microgreens_cultivation_manual_v2"}, {"type": "experience", "reference": "property_growing_history"}]'::jsonb,
        0.92
    ) RETURNING id INTO semantic_id;

    -- Environmental factor knowledge
    INSERT INTO agent_semantic_memory (
        property_id, concept_type, entity_name, entity_category,
        properties, measurable_parameters, relationships,
        subject, predicate, object, confidence_score
    ) VALUES 
    (
        sample_property_id, 'environmental_factor', 'Humidity', 'atmospheric_condition',
        '{"definition": "Amount of water vapor in air", "measurement_unit": "percentage"}'::jsonb,
        '{"optimal_range": {"min": 80, "max": 90}, "critical_high": 95, "critical_low": 70}'::jsonb,
        '[{"target_entity": "damping_off", "relationship_type": "promotes_when_high", "strength": 0.8}, {"target_entity": "germination", "relationship_type": "affects", "strength": 0.7}]'::jsonb,
        'high_humidity', 'causes', 'damping_off_risk',
        0.88
    );

    -- =====================================================
    -- 7. MEMORY CROSS-REFERENCES
    -- =====================================================
    
    -- Link episodic memory to procedural memory
    INSERT INTO agent_memory_references (
        source_memory_type, source_memory_id, target_memory_type, target_memory_id,
        reference_type, reference_strength
    ) VALUES 
    ('episodic', episodic_id, 'procedural', procedural_id, 'applies_to', 0.8),
    ('long_term', long_term_id, 'semantic', semantic_id, 'supports', 0.9),
    ('working', working_memory_id, 'episodic', episodic_id, 'derived_from', 0.7);

    -- =====================================================
    -- 8. MEMORY OPERATIONS LOG
    -- =====================================================
    
    -- Log sample operations
    INSERT INTO agent_memory_operations (
        property_id, operation_type, memory_type, operation_details,
        performance_metrics, user_id, session_id
    ) VALUES 
    (
        sample_property_id, 'create', 'episodic',
        '{"episode_type": "problem_detected", "context": "routine_inspection"}'::jsonb,
        '{"processing_time_ms": 150, "embedding_generation_ms": 45}'::jsonb,
        sample_user_id, session_uuid
    ),
    (
        sample_property_id, 'search', 'semantic',
        '{"query": "pea microgreens humidity requirements", "results_count": 3}'::jsonb,
        '{"search_time_ms": 25, "relevance_score": 0.87}'::jsonb,
        sample_user_id, session_uuid
    );

    RAISE NOTICE 'Agent memory sample data populated successfully!';
    RAISE NOTICE 'Created sample data for all 6 memory types with cross-references';
    RAISE NOTICE 'Memory system ready for testing and demonstration';

END $$; 