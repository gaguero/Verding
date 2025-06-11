# Verding Database Schema Documentation

## Overview

The Verding database schema is designed as a comprehensive, agent-first microgreens management platform with multi-property support, advanced AI memory systems, and complete operational tracking. The schema implements a property-centric architecture with row-level security, vector-enabled AI capabilities, and comprehensive audit trails.

## Architecture Principles

### 1. Property-Centric Multi-Tenancy
- **Central Hub Pattern**: `properties` table serves as the organizational hub
- **Complete Isolation**: All operational data scoped to specific properties
- **Hierarchical Support**: Properties can have parent-child relationships
- **Scalable Design**: Supports unlimited properties per installation

### 2. Agent-First Design
- **Natural Language Interface**: Database optimized for conversational AI interaction
- **Memory Architecture**: 6-layer memory system for AI learning and context
- **Vector Search**: pgvector integration for semantic search capabilities
- **MCP Integration**: Model Context Protocol support for tool interactions

### 3. Comprehensive Security
- **Row-Level Security**: 70+ RLS policies for complete data isolation
- **Role-Based Access**: Granular permissions (view, edit, manage) per property
- **Audit Trails**: Complete user attribution and operation logging
- **API Security**: Property-scoped API key management

## Core Tables Structure

### Properties and Access Control

#### `properties`
**Purpose**: Central hub for multi-property organization
```sql
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    parent_id UUID REFERENCES properties(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Key Features**:
- Hierarchical structure via `parent_id`
- Complete contact information
- Soft deletion via `is_active`
- Automatic timestamp management

#### `user_property_access`
**Purpose**: Role-based access control for properties
```sql
CREATE TABLE user_property_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'employee', 'viewer', 'client')),
    can_view BOOLEAN DEFAULT true,
    can_edit BOOLEAN DEFAULT false,
    can_manage BOOLEAN DEFAULT false,
    can_manage_children BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    granted_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);
```

**Role Hierarchy**:
- `owner`: Full system access, can manage all properties
- `admin`: Property administration, user management
- `manager`: Operational management, team oversight
- `employee`: Day-to-day operations, task execution
- `viewer`: Read-only access to property data
- `client`: Limited access to relevant orders/deliveries

#### `user_profiles`
**Purpose**: Extended user information with property context
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    active_property_id UUID REFERENCES properties(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Key Features**:
- Extends Supabase auth.users with business data
- Active property context for session management
- Internationalization support (timezone, language)
- Avatar and contact information

## Agent Memory Architecture

The agent memory system implements a 6-layer architecture inspired by cognitive science, enabling sophisticated AI learning and context management.

### Memory Types Overview

1. **Short-term Memory**: Conversation context with layered recency
2. **Working Memory**: Active task state with multi-workspace support
3. **Long-term Memory**: Learned patterns across knowledge dimensions
4. **Procedural Memory**: MCP tool procedures and workflows
5. **Episodic Memory**: Experience tracking with temporal organization
6. **Semantic Memory**: Domain knowledge in structured graph format

### `agent_short_term_memory`
**Purpose**: Conversation context with layered recency management
```sql
CREATE TABLE agent_short_term_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id UUID NOT NULL,
    
    -- Memory organization
    memory_layer TEXT NOT NULL CHECK (memory_layer IN ('primary', 'secondary', 'tertiary')),
    sequence_number INTEGER NOT NULL,
    
    -- Content
    content TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('conversation', 'decision', 'action', 'observation')),
    
    -- Context and metadata
    context_tags TEXT[] DEFAULT '{}',
    related_entities JSONB DEFAULT '[]'::jsonb,
    
    -- Retrieval optimization
    embedding vector(1536),
    importance_score FLOAT DEFAULT 0.5 CHECK (importance_score >= 0 AND importance_score <= 1),
    
    -- Lifecycle management
    expires_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Memory Layers**:
- `primary`: Most recent, immediately relevant context
- `secondary`: Recent but less critical information
- `tertiary`: Background context, candidates for archival

### `agent_working_memory`
**Purpose**: Active task state with multi-workspace architecture
```sql
CREATE TABLE agent_working_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id UUID NOT NULL,
    
    -- Workspace organization
    workspace_type TEXT NOT NULL CHECK (workspace_type IN ('primary', 'background', 'planning', 'monitoring')),
    workspace_name TEXT NOT NULL,
    
    -- Task context
    task_id UUID,
    task_state JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Content and reasoning
    content TEXT,
    reasoning_chain JSONB DEFAULT '[]'::jsonb,
    
    -- Checkpointing
    checkpoint_data JSONB,
    is_checkpoint BOOLEAN DEFAULT false,
    
    -- Priority and lifecycle
    priority_score FLOAT DEFAULT 0.5 CHECK (priority_score >= 0 AND priority_score <= 1),
    is_active BOOLEAN DEFAULT true,
    
    -- Retrieval optimization
    embedding vector(1536),
    last_checkpoint_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Workspace Types**:
- `primary`: Main active workspace for current tasks
- `background`: Secondary tasks running in parallel
- `planning`: Future task planning and preparation
- `monitoring`: Ongoing monitoring and alerts

### `agent_long_term_memory`
**Purpose**: Pattern learning and user preferences across dimensions
```sql
CREATE TABLE agent_long_term_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Knowledge organization
    knowledge_dimension TEXT NOT NULL CHECK (knowledge_dimension IN ('crop', 'environmental', 'user', 'outcome')),
    knowledge_category TEXT NOT NULL,
    
    -- Pattern data
    pattern_data JSONB NOT NULL,
    pattern_type TEXT NOT NULL CHECK (pattern_type IN ('correlation', 'sequence', 'classification', 'prediction')),
    
    -- Learning metadata
    learning_mechanism TEXT NOT NULL CHECK (learning_mechanism IN ('supervised', 'unsupervised', 'reinforcement', 'transfer')),
    confidence_score FLOAT NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    
    -- Hierarchy and evolution
    parent_pattern_id UUID REFERENCES agent_long_term_memory(id) ON DELETE SET NULL,
    taxonomy_path TEXT[],
    
    -- Pattern lifecycle
    usage_count INTEGER DEFAULT 0,
    success_rate FLOAT DEFAULT 0.5,
    superseded_by UUID REFERENCES agent_long_term_memory(id) ON DELETE SET NULL,
    
    -- Retrieval optimization
    embedding vector(1536),
    last_validated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Knowledge Dimensions**:
- `crop`: Crop-specific patterns and preferences
- `environmental`: Environmental conditions and responses
- `user`: User behavior and preference patterns
- `outcome`: Result patterns and success factors

## Operational Tables

### Growing Operations

#### `crop_varieties`
**Purpose**: Master data for microgreen varieties
```sql
CREATE TABLE crop_varieties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    category VARCHAR(100),
    
    -- Growing characteristics
    germination_days INTEGER,
    harvest_days INTEGER,
    difficulty_level VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    
    -- Specifications
    seed_density_per_tray DECIMAL(8,2),
    optimal_temperature_range JSONB,
    optimal_humidity_range JSONB,
    light_requirements JSONB,
    
    -- Business data
    market_price_per_lb DECIMAL(10,2),
    shelf_life_days INTEGER,
    
    -- Metadata
    growing_notes TEXT,
    special_requirements TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `growing_batches`
**Purpose**: Individual growing batch tracking
```sql
CREATE TABLE growing_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    batch_number VARCHAR(50) NOT NULL,
    crop_variety_id UUID REFERENCES crop_varieties(id),
    
    -- Batch specifications
    tray_count INTEGER NOT NULL DEFAULT 1,
    seed_amount_grams DECIMAL(8,2),
    growing_medium VARCHAR(100),
    location_identifier VARCHAR(100),
    
    -- Stage tracking
    current_stage VARCHAR(50) DEFAULT 'planned' CHECK (current_stage IN (
        'planned', 'soaking', 'sowing', 'germination', 'growing', 'harvesting', 'completed', 'failed'
    )),
    
    -- Timeline
    sowing_date DATE NOT NULL,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    
    -- Quality and yield
    quality_score INTEGER CHECK (quality_score BETWEEN 1 AND 10),
    estimated_yield_lbs DECIMAL(8,2),
    actual_yield_lbs DECIMAL(8,2),
    
    -- Metadata
    notes TEXT,
    growing_conditions JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(property_id, batch_number)
);
```

### Task Management

#### `tasks`
**Purpose**: Comprehensive task tracking and assignment
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    batch_id UUID REFERENCES growing_batches(id),
    assigned_to UUID REFERENCES auth.users(id),
    
    -- Task details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50) DEFAULT 'general' CHECK (task_type IN (
        'general', 'sowing', 'harvesting', 'maintenance', 'delivery', 'customer', 'stage_transition', 'monitoring'
    )),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'cancelled', 'deferred')),
    
    -- Scheduling
    due_date TIMESTAMP WITH TIME ZONE,
    estimated_duration_minutes INTEGER,
    actual_duration_minutes INTEGER,
    
    -- Completion tracking
    completion_notes TEXT,
    completion_photos TEXT[],
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by UUID REFERENCES auth.users(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Customer and Sales

#### `customers`
**Purpose**: Customer relationship management
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    
    -- Customer information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    customer_type VARCHAR(20) DEFAULT 'individual' CHECK (customer_type IN ('individual', 'business', 'restaurant', 'retailer')),
    
    -- Communication preferences
    preferred_communication VARCHAR(20) DEFAULT 'email' CHECK (preferred_communication IN ('email', 'phone', 'sms', 'whatsapp', 'telegram')),
    
    -- Business details
    company_name VARCHAR(255),
    billing_address JSONB,
    delivery_address JSONB,
    
    -- Relationship tracking
    customer_since DATE DEFAULT CURRENT_DATE,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    last_order_date DATE,
    
    -- Preferences
    preferred_varieties TEXT[],
    delivery_instructions TEXT,
    special_requirements TEXT,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `orders`
**Purpose**: Order management and fulfillment tracking
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    
    -- Order identification
    order_number VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) DEFAULT 'one_time' CHECK (order_type IN ('one_time', 'subscription', 'recurring')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
    
    -- Financial
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded')),
    
    -- Fulfillment
    requested_delivery_date DATE,
    confirmed_delivery_date DATE,
    actual_delivery_date DATE,
    delivery_method VARCHAR(50),
    delivery_address JSONB,
    
    -- Metadata
    notes TEXT,
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(property_id, order_number)
);
```

## Monitoring and Analytics

### Sensor Data

#### `sensor_readings`
**Purpose**: Environmental monitoring data collection
```sql
CREATE TABLE sensor_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    batch_id UUID REFERENCES growing_batches(id),
    
    -- Sensor identification
    sensor_type VARCHAR(50) NOT NULL CHECK (sensor_type IN ('temperature', 'humidity', 'ph', 'light', 'co2', 'air_quality')),
    sensor_location VARCHAR(100),
    sensor_id VARCHAR(100),
    
    -- Reading data
    value DECIMAL(10,4) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    quality_score DECIMAL(3,2) DEFAULT 1.0 CHECK (quality_score BETWEEN 0 AND 1),
    
    -- Timing
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `alerts`
**Purpose**: System alerts and notifications
```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) NOT NULL,
    batch_id UUID REFERENCES growing_batches(id),
    
    -- Alert classification
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('sensor', 'task', 'harvest', 'order', 'system', 'compliance')),
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    
    -- Alert content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    alert_data JSONB DEFAULT '{}'::jsonb,
    
    -- Resolution tracking
    is_resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES auth.users(id),
    resolution_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Storage and File Management

### Storage Buckets
The system uses Supabase Storage with property-scoped access control:

- **avatars**: User profile images (public read, user write)
- **documents**: Property business documents (property-scoped)
- **batch-photos**: Growing batch documentation (property-scoped)
- **harvest-images**: Harvest documentation (property-scoped)
- **facility-photos**: Property facility images (property-scoped)
- **growing-guides**: Property-specific guides (property-scoped)
- **variety-images**: Crop variety images (public read, admin write)
- **temp-uploads**: Temporary file storage (user-scoped)

### Storage Policies
Each bucket implements comprehensive RLS policies:
- Property-scoped access based on user permissions
- Role-based upload/edit/delete permissions
- Public access for appropriate content (avatars, variety images)
- Automatic cleanup for temporary uploads

## Workflow Monitoring

### `n8n_workflow_metrics`
**Purpose**: Comprehensive n8n workflow execution metrics and monitoring data
```sql
CREATE TABLE n8n_workflow_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    workflow_id TEXT NOT NULL,
    workflow_name TEXT NOT NULL,
    execution_id TEXT NOT NULL,
    
    -- Granular monitoring
    node_name TEXT,
    metric_type TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    status TEXT,
    
    -- Enhanced timing and user tracking
    user_id UUID REFERENCES auth.users(id),
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    execution_time_ms INTEGER,
    
    -- Flexible data storage
    metadata JSONB DEFAULT '{}'::jsonb,
    error_details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

**Key Features**:
- **Multi-Level Monitoring**: Supports both workflow-level and node-level metrics
- **Property Context**: All metrics scoped to specific properties for multi-tenant analysis
- **User Attribution**: Tracks which users trigger workflows for usage analytics
- **Timing Data**: Comprehensive execution timing for performance analysis
- **Flexible Metrics**: `metric_type` and `metric_value` allow various measurement types
- **Error Tracking**: Detailed error information for debugging and alerting
- **AI Context**: `metadata` field stores AI model usage, tokens, and other contextual data

**Supported Metric Types**:
- `execution`: Overall workflow execution tracking
- `performance`: Timing and resource usage metrics
- `error`: Error occurrence and classification
- `ai_usage`: AI model usage statistics (tokens, costs, etc.)
- `user_interaction`: User behavior and interaction patterns

## API Management

### `custom_api_keys`
**Purpose**: Property-scoped API key management
```sql
CREATE TABLE custom_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id),
    key_name TEXT NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix TEXT NOT NULL,
    
    -- Permissions and scope
    permissions JSONB DEFAULT '{}'::jsonb,
    allowed_endpoints TEXT[] DEFAULT '{}',
    rate_limit_per_hour INTEGER DEFAULT 1000,
    
    -- Lifecycle management
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(property_id, key_name)
);
```

## Constraints and Validation

### Data Integrity Constraints

#### CHECK Constraints (50+ validations)
- **Enumerated Values**: All status fields, types, and categories
- **Score Ranges**: Quality scores (1-10), confidence scores (0-1)
- **Business Logic**: Valid state transitions and combinations

#### NOT NULL Constraints (80+ requirements)
- **Business Critical**: All essential operational data
- **System Integrity**: Core system fields for proper operation
- **Audit Compliance**: User attribution and timestamps

#### UNIQUE Constraints (15+ uniqueness rules)
- **Business Uniqueness**: Batch numbers, order numbers per property
- **System Uniqueness**: Email addresses, API key hashes
- **Access Control**: One access record per user-property pair

#### Foreign Key Constraints (40+ relationships)
- **Property Scoping**: All operational data linked to properties
- **User Attribution**: Proper user tracking with deletion policies
- **Referential Integrity**: Hierarchical relationships maintained

### Deletion Policies

#### CASCADE Deletions
- Property deletion removes all associated operational data
- User deletion removes direct user-owned data

#### SET NULL Policies
- Preserve historical data when referenced entities are deleted
- Maintain audit trails while allowing cleanup

## Indexing Strategy

### Performance Optimization (60+ indexes)

#### B-Tree Indexes (Primary)
- **Property Scoping**: Fast property-based filtering
- **User Operations**: Efficient user-based queries
- **Time-based Queries**: Optimized date/timestamp searches
- **Status Filtering**: Quick status-based operations

#### Vector Indexes (AI/ML)
- **IVFFlat Indexes**: Approximate nearest neighbor search
- **HNSW Indexes**: High-performance vector similarity
- **Cosine Distance**: Semantic similarity calculations

#### Specialized Indexes
- **GIN Indexes**: JSONB and array operations
- **Partial Indexes**: Conditional indexing for active records
- **Composite Indexes**: Multi-column query optimization

## Row-Level Security (RLS)

### Security Architecture (70+ policies)

#### Property-Scoped Access
- Complete multi-tenant isolation
- Property-based data filtering
- Hierarchical property support

#### Role-Based Permissions
- Granular access control (view, edit, manage)
- Role hierarchy enforcement
- Operation-specific security

#### Helper Functions
- `get_user_properties()`: Property access retrieval
- `can_view_property()`: View permission validation
- `can_edit_property()`: Edit permission validation
- `can_manage_property()`: Management permission validation
- `is_super_admin()`: System admin identification

## Triggers and Automation

### Automated Data Management (18+ triggers)

#### Timestamp Automation
- Automatic `updated_at` maintenance
- Consistent audit trail creation
- Zero-maintenance timestamp handling

#### User Management
- Automatic profile creation on registration
- Property assignment for new users
- Profile synchronization with auth changes

#### Memory Management
- Expired memory cleanup
- Working memory consolidation
- Access pattern tracking

## Migration Strategy

### Schema Versioning
- Sequential migration files (01-11)
- Incremental schema evolution
- Rollback capability maintenance

### Migration Files
1. `01_initial_schema.sql`: Core tables and relationships
2. `02_row_level_security.sql`: RLS policies and functions
3. `03_test_data.sql`: Sample data for development
4. `04_agent_memory_architecture.sql`: AI memory system
5. `05_agent_memory_sample_data.sql`: Memory system test data
6. `06_authentication_integration.sql`: Auth triggers and functions
7. `07_storage_buckets.sql`: Storage configuration and policies
8. `08_backup_configuration.sql`: Backup and monitoring setup
9. `09_api_key_management.sql`: API key system
10. `10_api_key_fixes.sql`: API key system refinements
11. `11_api_key_final_fix.sql`: Final API key optimizations

## Performance Considerations

### Query Optimization
- Comprehensive indexing strategy
- RLS policy efficiency
- Vector search optimization
- JSONB query performance

### Scalability Features
- Property-based horizontal scaling
- Memory system optimization
- Efficient constraint validation
- Automated cleanup processes

### Monitoring and Maintenance
- Performance metric collection
- Automated backup configuration
- Health check procedures
- Capacity planning support

## Development and Testing

### Test Data Strategy
- Comprehensive sample data sets
- Realistic operational scenarios
- Memory system test cases
- Performance testing data

### Validation Procedures
- Schema integrity verification
- RLS policy testing
- Constraint validation
- Performance benchmarking

## Conclusion

The Verding database schema provides a comprehensive foundation for an agent-first microgreens management platform. Key achievements include:

- **Complete Multi-Tenancy**: Property-centric architecture with full isolation
- **Advanced AI Integration**: 6-layer memory system with vector search
- **Comprehensive Security**: 70+ RLS policies with role-based access
- **Operational Excellence**: Complete microgreens workflow support
- **Performance Optimization**: 60+ indexes with efficient query patterns
- **Data Integrity**: 150+ constraints ensuring business rule compliance
- **Scalable Design**: Architecture supports unlimited growth
- **Audit Compliance**: Complete operation tracking and user attribution

The schema successfully balances complexity with performance, providing a robust foundation for sophisticated agricultural operations management while maintaining the simplicity needed for natural language interaction. 