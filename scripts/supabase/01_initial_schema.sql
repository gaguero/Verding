-- =====================================================================================
-- Verding Database Schema - Initial Setup
-- =====================================================================================
-- This script creates the foundational schema for the Verding multi-property
-- microgreens management system with agent-first architecture.

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS vector;

-- =====================================================================================
-- CORE TABLES
-- =====================================================================================

-- Properties table - Core entity for multi-property architecture
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location GEOGRAPHY(POINT),
    address JSONB,
    parent_id UUID REFERENCES properties(id),
    metadata JSONB DEFAULT '{}'::jsonb,
    timezone VARCHAR(50) DEFAULT 'UTC',
    settings JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User property access - Manages multi-property permissions
CREATE TABLE IF NOT EXISTS user_property_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'employee', 'viewer', 'client')),
    permissions JSONB DEFAULT '{}'::jsonb,
    can_view BOOLEAN DEFAULT TRUE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_manage BOOLEAN DEFAULT FALSE,
    can_manage_children BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- User profiles - Extended user information
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(20),
    preferred_language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    active_property_id UUID REFERENCES properties(id),
    preferences JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- AGENT & MEMORY SYSTEM
-- =====================================================================================

-- Agent sessions - Track property context and conversation state
CREATE TABLE IF NOT EXISTS agent_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    active_property_id UUID REFERENCES properties(id),
    session_token VARCHAR(255) UNIQUE,
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('web', 'mobile', 'telegram', 'whatsapp', 'email', 'phone')),
    metadata JSONB DEFAULT '{}'::jsonb,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
);

-- Memory chunks - Agent knowledge base with vector embeddings
CREATE TABLE IF NOT EXISTS memory_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    document_id UUID,
    chunk_text TEXT NOT NULL,
    dense_embedding vector(1536), -- OpenAI embedding dimensions
    sparse_embedding JSONB,
    context TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    access_tags TEXT[] DEFAULT '{}',
    content_type VARCHAR(50) DEFAULT 'document',
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversation history - Agent interactions with property context
CREATE TABLE IF NOT EXISTS conversation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id),
    session_id UUID REFERENCES agent_sessions(id),
    chat_id UUID, -- For group chats
    channel VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    embedding vector(1536),
    message_index INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Memory access control - Tag-based permissions for agent memory
CREATE TABLE IF NOT EXISTS memory_access_control (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    property_id UUID REFERENCES properties(id),
    user_role VARCHAR(50),
    access_level INTEGER DEFAULT 1,
    allowed_contexts JSONB DEFAULT '[]'::jsonb,
    allowed_tags JSONB DEFAULT '[]'::jsonb,
    visibility_scope VARCHAR(20) DEFAULT 'private' CHECK (visibility_scope IN ('private', 'team', 'property', 'public')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- OPERATIONS MANAGEMENT - Enhanced Hybrid Approach
-- =====================================================================================

-- Crop varieties - Comprehensive microgreens parameters from growing guide
CREATE TABLE IF NOT EXISTS crop_varieties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    category VARCHAR(100),
    
    -- Growing parameters from microgreens guide
    sowing_density_1020_grams DECIMAL(8,2), -- For 1020 trays
    sowing_density_small_grams DECIMAL(8,2), -- For 3.5×6 trays
    growing_medium VARCHAR(100),
    soak_time_hours INTEGER DEFAULT 0,
    bury_seed BOOLEAN DEFAULT FALSE,
    weight_required BOOLEAN DEFAULT FALSE,
    weight_lbs INTEGER,
    
    -- Stage durations (in days)
    germination_days INTEGER,
    blackout_days INTEGER DEFAULT 0,
    light_days INTEGER DEFAULT 0,
    total_grow_days INTEGER,
    
    -- Environmental requirements
    optimal_temp_min INTEGER,
    optimal_temp_max INTEGER,
    optimal_humidity_min INTEGER,
    optimal_humidity_max INTEGER,
    
    -- Business parameters
    difficulty_level VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    harvest_height_cm INTEGER,
    yield_per_tray_grams INTEGER,
    price_per_kg DECIMAL(10,2),
    multiple_harvests BOOLEAN DEFAULT FALSE,
    
    -- Special requirements and notes
    special_requirements TEXT[], -- e.g., ['keep_in_dark', 'prevent_mold', 'mucilaginous_seeds']
    growing_notes TEXT,
    
    -- System fields
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Growing batches - Enhanced batch tracking with stage management
CREATE TABLE IF NOT EXISTS growing_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    batch_number VARCHAR(50) NOT NULL,
    crop_variety_id UUID REFERENCES crop_varieties(id),
    
    -- Batch configuration
    tray_count INTEGER NOT NULL DEFAULT 1,
    tray_type VARCHAR(50) DEFAULT '1020', -- '1020', '3.5x6', 'custom'
    growing_medium VARCHAR(100),
    seed_weight_grams DECIMAL(8,2),
    location VARCHAR(255),
    
    -- Stage tracking
    current_stage VARCHAR(50) DEFAULT 'planned' CHECK (current_stage IN (
        'planned', 'soaking', 'sowing', 'germination', 'blackout', 'light', 'harvest_ready', 'harvested', 'completed', 'cancelled'
    )),
    stage_started_at TIMESTAMP WITH TIME ZONE,
    
    -- Important dates
    sowing_date DATE NOT NULL,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    
    -- Results tracking
    harvest_count INTEGER DEFAULT 0, -- For multiple harvest crops
    total_yield_grams DECIMAL(10,2),
    quality_score INTEGER CHECK (quality_score BETWEEN 1 AND 10),
    
    -- Environmental conditions
    avg_temperature DECIMAL(5,2),
    avg_humidity DECIMAL(5,2),
    
    -- Resource allocation
    assigned_equipment JSONB DEFAULT '{}'::jsonb, -- weights, trays, etc.
    
    -- Notes and observations
    notes TEXT,
    problems_encountered TEXT[],
    
    -- System fields
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(property_id, batch_number)
);

-- Batch stage events - Detailed audit trail of all batch activities
CREATE TABLE IF NOT EXISTS batch_stage_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES growing_batches(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    
    -- Event details
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
        'stage_start', 'stage_complete', 'observation', 'intervention', 'problem', 'harvest', 'maintenance', 'note'
    )),
    stage VARCHAR(50), -- Current stage when event occurred
    previous_stage VARCHAR(50), -- For stage transitions
    
    -- Event description
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Environmental conditions at time of event
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    light_level VARCHAR(50),
    
    -- Problem tracking
    problem_type VARCHAR(100), -- 'mold', 'poor_germination', 'pest', 'equipment_failure', etc.
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    resolution_action TEXT,
    
    -- Harvest specific data
    harvest_weight_grams DECIMAL(10,2),
    harvest_quality INTEGER CHECK (harvest_quality BETWEEN 1 AND 10),
    
    -- Documentation
    photos JSONB DEFAULT '[]'::jsonb, -- Array of photo URLs/metadata
    attachments JSONB DEFAULT '[]'::jsonb,
    
    -- System fields
    event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Batch resources - Resource usage and cost tracking
CREATE TABLE IF NOT EXISTS batch_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES growing_batches(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) NOT NULL,
    
    -- Resource details
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN (
        'seeds', 'growing_medium', 'trays', 'weights', 'chemicals', 'labor', 'utilities', 'equipment', 'packaging'
    )),
    resource_name VARCHAR(255) NOT NULL,
    supplier VARCHAR(255),
    batch_lot_number VARCHAR(100), -- For traceability
    
    -- Usage tracking
    quantity_used DECIMAL(10,4) NOT NULL,
    unit VARCHAR(20) NOT NULL, -- grams, pieces, hours, ml, etc.
    stage_used VARCHAR(50), -- Which stage this resource was used in
    
    -- Cost tracking
    unit_cost DECIMAL(10,4),
    total_cost DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Timing
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Additional details
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks - BuJo-style task management (enhanced for batch operations)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    assigned_to UUID REFERENCES auth.users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50) DEFAULT 'general' CHECK (task_type IN ('general', 'sowing', 'harvesting', 'maintenance', 'delivery', 'customer', 'stage_transition', 'monitoring')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'cancelled', 'deferred')),
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    estimated_duration_minutes INTEGER,
    actual_duration_minutes INTEGER,
    tags TEXT[] DEFAULT '{}',
    related_batch_id UUID REFERENCES growing_batches(id),
    related_stage VARCHAR(50), -- Which stage this task relates to
    auto_generated BOOLEAN DEFAULT FALSE, -- For system-generated stage transition tasks
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- CUSTOMER & SALES MANAGEMENT
-- =================================================
-- Customers - Customer relationship management
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    customer_type VARCHAR(20) DEFAULT 'individual' CHECK (customer_type IN ('individual', 'business', 'restaurant', 'retailer')),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address JSONB,
    contact_preferences JSONB DEFAULT '{}'::jsonb,
    preferred_communication VARCHAR(20) DEFAULT 'email' CHECK (preferred_communication IN ('email', 'phone', 'sms', 'whatsapp', 'telegram')),
    credit_limit DECIMAL(10,2) DEFAULT 0,
    payment_terms VARCHAR(50) DEFAULT 'immediate',
    tax_id VARCHAR(50),
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),====================================

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders - Sales order management
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    customer_id UUID REFERENCES customers(id),
    order_number VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) DEFAULT 'one_time' CHECK (order_type IN ('one_time', 'subscription', 'recurring')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    requested_delivery_date DATE,
    actual_delivery_date DATE,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded')),
    payment_method VARCHAR(50),
    delivery_address JSONB,
    special_instructions TEXT,
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(property_id, order_number)
);

-- Order items - Individual items within orders
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    crop_variety_id UUID REFERENCES crop_varieties(id),
    product_name VARCHAR(255) NOT NULL,
    quantity_grams DECIMAL(8,2) NOT NULL,
    unit_price DECIMAL(8,2) NOT NULL,
    line_total DECIMAL(10,2) NOT NULL,
    batch_id UUID REFERENCES growing_batches(id),
    special_requests TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- SENSOR & MONITORING
-- =====================================================================================

-- Sensor readings - Environmental data from Home Assistant
CREATE TABLE IF NOT EXISTS sensor_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    sensor_type VARCHAR(50) NOT NULL CHECK (sensor_type IN ('temperature', 'humidity', 'ph', 'light', 'co2', 'air_quality')),
    sensor_location VARCHAR(255),
    sensor_id VARCHAR(100) NOT NULL,
    value DECIMAL(10,4) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    quality_score DECIMAL(3,2) DEFAULT 1.0 CHECK (quality_score BETWEEN 0 AND 1),
    raw_data JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts - System and threshold alerts
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('sensor', 'task', 'harvest', 'order', 'system', 'compliance')),
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    source_id UUID, -- References the source entity (sensor, task, etc.)
    is_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_by UUID REFERENCES auth.users(id),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================================================

-- Property-based indexes (critical for multi-property architecture)
CREATE INDEX IF NOT EXISTS idx_user_property_access_user_id ON user_property_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_property_access_property_id ON user_property_access(property_id);
CREATE INDEX IF NOT EXISTS idx_user_property_access_composite ON user_property_access(user_id, property_id);

-- Agent and memory system indexes
CREATE INDEX IF NOT EXISTS idx_agent_sessions_user_property ON agent_sessions(user_id, active_property_id);
CREATE INDEX IF NOT EXISTS idx_memory_chunks_property ON memory_chunks(property_id);
CREATE INDEX IF NOT EXISTS idx_memory_chunks_embedding ON memory_chunks USING hnsw (dense_embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_conversation_history_property_user ON conversation_history(property_id, user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_history_embedding ON conversation_history USING hnsw (embedding vector_cosine_ops);

-- Operations indexes
CREATE INDEX IF NOT EXISTS idx_growing_batches_property ON growing_batches(property_id);
CREATE INDEX IF NOT EXISTS idx_growing_batches_stage ON growing_batches(current_stage);
CREATE INDEX IF NOT EXISTS idx_growing_batches_harvest_date ON growing_batches(expected_harvest_date);
CREATE INDEX IF NOT EXISTS idx_growing_batches_crop_variety ON growing_batches(crop_variety_id);

-- Batch stage events indexes
CREATE INDEX IF NOT EXISTS idx_batch_stage_events_batch ON batch_stage_events(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_stage_events_property ON batch_stage_events(property_id);
CREATE INDEX IF NOT EXISTS idx_batch_stage_events_type_timestamp ON batch_stage_events(event_type, event_timestamp);
CREATE INDEX IF NOT EXISTS idx_batch_stage_events_stage ON batch_stage_events(stage);

-- Batch resources indexes
CREATE INDEX IF NOT EXISTS idx_batch_resources_batch ON batch_resources(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_resources_property ON batch_resources(property_id);
CREATE INDEX IF NOT EXISTS idx_batch_resources_type ON batch_resources(resource_type);

-- Enhanced task indexes
CREATE INDEX IF NOT EXISTS idx_tasks_property_assigned ON tasks(property_id, assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status_due ON tasks(status, due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_batch_stage ON tasks(related_batch_id, related_stage);

-- Customer and sales indexes
CREATE INDEX IF NOT EXISTS idx_customers_property ON customers(property_id);
CREATE INDEX IF NOT EXISTS idx_orders_property_customer ON orders(property_id, customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status_date ON orders(status, order_date);

-- Sensor data indexes (time-series optimization)
CREATE INDEX IF NOT EXISTS idx_sensor_readings_property_type ON sensor_readings(property_id, sensor_type);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_recorded_at ON sensor_readings(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_property_severity ON alerts(property_id, severity);

-- =====================================================================================
-- CONSTRAINTS AND TRIGGERS
-- =====================================================================================

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers to relevant tables
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_property_access_updated_at BEFORE UPDATE ON user_property_access FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_memory_chunks_updated_at BEFORE UPDATE ON memory_chunks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_memory_access_control_updated_at BEFORE UPDATE ON memory_access_control FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crop_varieties_updated_at BEFORE UPDATE ON crop_varieties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_growing_batches_updated_at BEFORE UPDATE ON growing_batches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE properties IS 'Core entity for multi-property architecture - represents physical farm locations';
COMMENT ON TABLE user_property_access IS 'Property-specific user permissions and roles';
COMMENT ON TABLE memory_chunks IS 'Agent knowledge base with vector embeddings for semantic search';
COMMENT ON TABLE conversation_history IS 'Agent conversation tracking with property context';
COMMENT ON TABLE crop_varieties IS 'Comprehensive microgreens parameters from growing guide - master data for all crop types';
COMMENT ON TABLE growing_batches IS 'Enhanced batch tracking with stage management and resource allocation';
COMMENT ON TABLE batch_stage_events IS 'Detailed audit trail of all batch activities, stage transitions, and interventions';
COMMENT ON TABLE batch_resources IS 'Resource usage and cost tracking for comprehensive batch economics';
COMMENT ON TABLE tasks IS 'Enhanced BuJo-style task management with batch and stage integration';
COMMENT ON TABLE customers IS 'Customer relationship management';
COMMENT ON TABLE orders IS 'Sales order management and fulfillment';
COMMENT ON TABLE sensor_readings IS 'Environmental data from Home Assistant integration'; 