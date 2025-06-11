# Verding Database Validation Logic Documentation

## Overview

The Verding database implements comprehensive validation logic through a multi-layered approach combining database constraints, business rules, and application-level validation. This document details all validation mechanisms, their purposes, and implementation patterns.

## Validation Architecture

### 1. Database-Level Validation
- **CHECK Constraints**: Business logic and enumerated value validation
- **NOT NULL Constraints**: Required field enforcement
- **UNIQUE Constraints**: Uniqueness validation
- **Foreign Key Constraints**: Referential integrity
- **Custom Triggers**: Complex business rule enforcement

### 2. Application-Level Validation
- **Input Sanitization**: Data cleaning and normalization
- **Business Rule Validation**: Complex multi-table validations
- **User Permission Validation**: Access control verification
- **Data Transformation**: Format standardization

### 3. Security Validation
- **Row-Level Security**: Property-scoped access control
- **Role-Based Validation**: Permission-based operations
- **API Key Validation**: Authentication and authorization
- **Audit Trail Validation**: Operation tracking

## Database Constraint Validation

### CHECK Constraints (50+ Validations)

#### Enumerated Value Constraints

**User Roles and Access Control**
```sql
-- User property access roles
role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'employee', 'viewer', 'client'))

-- Validation Logic:
-- - Ensures only valid roles are assigned
-- - Prevents typos and invalid role assignments
-- - Supports role-based permission checking
-- - Enables consistent role hierarchy enforcement
```

**Task Management Validation**
```sql
-- Task types for operational categorization
task_type VARCHAR(50) DEFAULT 'general' CHECK (task_type IN (
    'general', 'sowing', 'harvesting', 'maintenance', 'delivery', 'customer', 'stage_transition', 'monitoring'
))

-- Task priority levels
priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'))

-- Task status workflow
status VARCHAR(20) DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'cancelled', 'deferred'))

-- Validation Logic:
-- - Enforces valid task categorization
-- - Ensures consistent priority handling
-- - Validates workflow state transitions
-- - Prevents invalid status assignments
```

**Growing Batch Stage Validation**
```sql
-- Growing batch lifecycle stages
current_stage VARCHAR(50) DEFAULT 'planned' CHECK (current_stage IN (
    'planned', 'soaking', 'sowing', 'germination', 'growing', 'harvesting', 'completed', 'failed'
))

-- Validation Logic:
-- - Enforces microgreens growing workflow
-- - Prevents invalid stage transitions
-- - Supports stage-based automation
-- - Enables progress tracking validation
```

**Communication Channel Validation**
```sql
-- Supported communication channels
channel VARCHAR(50) NOT NULL CHECK (channel IN ('web', 'mobile', 'telegram', 'whatsapp', 'email', 'phone'))

-- Customer communication preferences
preferred_communication VARCHAR(20) DEFAULT 'email' CHECK (preferred_communication IN (
    'email', 'phone', 'sms', 'whatsapp', 'telegram'
))

-- Validation Logic:
-- - Ensures valid communication methods
-- - Supports multi-channel agent interaction
-- - Validates customer preference settings
-- - Enables channel-specific message routing
```

**Order and Payment Validation**
```sql
-- Order types for business model support
order_type VARCHAR(20) DEFAULT 'one_time' CHECK (order_type IN ('one_time', 'subscription', 'recurring'))

-- Order status workflow
status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'))

-- Payment status tracking
payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded'))

-- Validation Logic:
-- - Enforces business model constraints
-- - Validates order fulfillment workflow
-- - Ensures payment status consistency
-- - Supports automated order processing
```

**Sensor and Monitoring Validation**
```sql
-- Supported sensor types
sensor_type VARCHAR(50) NOT NULL CHECK (sensor_type IN ('temperature', 'humidity', 'ph', 'light', 'co2', 'air_quality'))

-- Alert classification
alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('sensor', 'task', 'harvest', 'order', 'system', 'compliance'))

-- Severity levels
severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical'))

-- Validation Logic:
-- - Validates sensor data types
-- - Ensures consistent alert categorization
-- - Enforces severity level standards
-- - Supports automated alert routing
```

#### Agent Memory System Validation

**Memory Layer Validation**
```sql
-- Short-term memory organization
memory_layer TEXT NOT NULL CHECK (memory_layer IN ('primary', 'secondary', 'tertiary'))

-- Content type classification
content_type TEXT NOT NULL CHECK (content_type IN ('conversation', 'decision', 'action', 'observation'))

-- Validation Logic:
-- - Enforces memory hierarchy structure
-- - Validates content categorization
-- - Supports memory lifecycle management
-- - Enables efficient memory retrieval
```

**Working Memory Validation**
```sql
-- Workspace type organization
workspace_type TEXT NOT NULL CHECK (workspace_type IN ('primary', 'background', 'planning', 'monitoring'))

-- Validation Logic:
-- - Enforces workspace organization
-- - Validates multi-tasking architecture
-- - Supports workspace-based operations
-- - Enables context switching validation
```

**Long-term Memory Validation**
```sql
-- Knowledge dimension categorization
knowledge_dimension TEXT NOT NULL CHECK (knowledge_dimension IN ('crop', 'environmental', 'user', 'outcome'))

-- Pattern type classification
pattern_type TEXT NOT NULL CHECK (pattern_type IN ('correlation', 'sequence', 'classification', 'prediction'))

-- Learning mechanism validation
learning_mechanism TEXT NOT NULL CHECK (learning_mechanism IN ('supervised', 'unsupervised', 'reinforcement', 'transfer'))

-- Validation Logic:
-- - Enforces knowledge organization
-- - Validates pattern classification
-- - Ensures learning mechanism consistency
-- - Supports AI model integration
```

**Procedural Memory Validation**
```sql
-- Procedure type categorization
procedure_type TEXT NOT NULL CHECK (procedure_type IN ('microgreens_operation', 'mcp_tool_usage', 'system_integration', 'maintenance'))

-- Validation Logic:
-- - Enforces procedure categorization
-- - Validates MCP tool procedures
-- - Supports automated workflow execution
-- - Enables procedure template validation
```

**Episodic Memory Validation**
```sql
-- Episode type classification
episode_type TEXT NOT NULL CHECK (episode_type IN ('problem_detected', 'solution_applied', 'milestone_reached', 'user_decision', 'observation', 'outcome'))

-- Validation Logic:
-- - Enforces experience categorization
-- - Validates event classification
-- - Supports learning from experience
-- - Enables pattern recognition
```

**Semantic Memory Validation**
```sql
-- Concept type classification
concept_type TEXT NOT NULL CHECK (concept_type IN ('crop_variety', 'technique', 'equipment', 'problem', 'nutrient', 'environmental_factor'))

-- Knowledge validation status
validation_status TEXT DEFAULT 'unvalidated' CHECK (validation_status IN ('validated', 'unvalidated', 'disputed', 'deprecated'))

-- Memory cross-reference validation
source_memory_type TEXT NOT NULL CHECK (source_memory_type IN ('short_term', 'working', 'long_term', 'procedural', 'episodic', 'semantic'))
target_memory_type TEXT NOT NULL CHECK (target_memory_type IN ('short_term', 'working', 'long_term', 'procedural', 'episodic', 'semantic'))
reference_type TEXT NOT NULL CHECK (reference_type IN ('derived_from', 'supports', 'contradicts', 'enhances', 'applies_to'))

-- Validation Logic:
-- - Enforces domain knowledge structure
-- - Validates knowledge relationships
-- - Supports knowledge graph construction
-- - Enables semantic reasoning
```

#### Range and Score Validation

**Quality Score Validation**
```sql
-- Integer-based quality scores (1-10 scale)
quality_score INTEGER CHECK (quality_score BETWEEN 1 AND 10)
harvest_quality INTEGER CHECK (harvest_quality BETWEEN 1 AND 10)

-- Decimal-based quality scores (0-1 scale)
quality_score DECIMAL(3,2) DEFAULT 1.0 CHECK (quality_score BETWEEN 0 AND 1)

-- Validation Logic:
-- - Enforces consistent scoring scales
-- - Prevents invalid score values
-- - Supports quality tracking
-- - Enables performance analytics
```

**Confidence and Performance Scores**
```sql
-- Confidence scores (0.0 to 1.0 range)
importance_score FLOAT DEFAULT 0.5 CHECK (importance_score >= 0 AND importance_score <= 1)
confidence_score FLOAT NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1)
evidence_strength FLOAT DEFAULT 0.5 CHECK (evidence_strength >= 0 AND evidence_strength <= 1)
priority_score FLOAT DEFAULT 0.5 CHECK (priority_score >= 0 AND priority_score <= 1)
reference_strength FLOAT DEFAULT 0.5 CHECK (reference_strength >= 0 AND reference_strength <= 1)
success_rate FLOAT DEFAULT 0.0 CHECK (success_rate >= 0 AND success_rate <= 1)
solution_effectiveness FLOAT CHECK (solution_effectiveness >= 0 AND solution_effectiveness <= 1)

-- Validation Logic:
-- - Normalizes all confidence metrics to 0-1 scale
-- - Ensures consistent probability representation
-- - Supports machine learning integration
-- - Enables statistical analysis
```

### NOT NULL Constraints (80+ Requirements)

#### Business Critical Fields

**Core Entity Requirements**
```sql
-- Essential business identifiers
name VARCHAR(255) NOT NULL                    -- Properties, varieties, customers
email VARCHAR(255) NOT NULL UNIQUE           -- User profiles
property_id UUID NOT NULL                    -- All property-scoped tables
session_id UUID NOT NULL                     -- Agent sessions and memory

-- Validation Logic:
-- - Ensures essential business data is always present
-- - Prevents incomplete entity creation
-- - Supports reliable business operations
-- - Enables consistent data processing
```

**Operational Requirements**
```sql
-- Growing operation essentials
batch_number VARCHAR(50) NOT NULL            -- Growing batches
sowing_date DATE NOT NULL                    -- Growing batches
tray_count INTEGER NOT NULL DEFAULT 1        -- Growing batches

-- Task management essentials
title VARCHAR(255) NOT NULL                  -- Tasks, events
content TEXT NOT NULL                        -- Conversations, memory

-- API and system essentials
endpoint TEXT NOT NULL                       -- API logs
method TEXT NOT NULL                         -- API logs

-- Validation Logic:
-- - Ensures operational data completeness
-- - Prevents incomplete workflow execution
-- - Supports reliable task tracking
-- - Enables consistent API monitoring
```

#### Agent Memory Requirements

**Memory System Essentials**
```sql
-- Memory organization requirements
memory_layer TEXT NOT NULL                   -- Short-term memory
workspace_name TEXT NOT NULL                 -- Working memory
knowledge_category TEXT NOT NULL             -- Long-term memory
procedure_name TEXT NOT NULL                 -- Procedural memory
episode_title TEXT NOT NULL                  -- Episodic memory
narrative TEXT NOT NULL                      -- Episodic memory
entity_name TEXT NOT NULL                    -- Semantic memory
subject TEXT NOT NULL                        -- Semantic memory

-- Validation Logic:
-- - Ensures memory system data integrity
-- - Prevents incomplete memory records
-- - Supports reliable AI operations
-- - Enables consistent memory retrieval
```

#### System Requirements

**Timestamp and Tracking**
```sql
-- System tracking essentials
event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL
task_state JSONB NOT NULL DEFAULT '{}'::jsonb
event_data JSONB NOT NULL DEFAULT '{}'::jsonb
pattern_data JSONB NOT NULL
procedure_template JSONB NOT NULL
properties JSONB NOT NULL DEFAULT '{}'::jsonb

-- Measurement requirements
quantity_used DECIMAL(10,4) NOT NULL
unit VARCHAR(20) NOT NULL

-- Validation Logic:
-- - Ensures system data completeness
-- - Prevents incomplete audit trails
-- - Supports reliable system operations
-- - Enables consistent data tracking
```

### UNIQUE Constraints (15+ Uniqueness Rules)

#### Business Uniqueness

**User and Access Uniqueness**
```sql
-- User profile uniqueness
email VARCHAR(255) NOT NULL UNIQUE           -- User profiles

-- Access control uniqueness
UNIQUE(user_id, property_id)                 -- User property access

-- Validation Logic:
-- - Prevents duplicate user accounts
-- - Ensures one access record per user-property pair
-- - Supports reliable authentication
-- - Enables consistent permission management
```

**Operational Uniqueness**
```sql
-- Growing operation uniqueness
UNIQUE(property_id, batch_number)            -- Growing batches

-- Order management uniqueness
UNIQUE(property_id, order_number)            -- Orders

-- Validation Logic:
-- - Prevents duplicate batch identifiers within properties
-- - Ensures unique order numbers per property
-- - Supports reliable operational tracking
-- - Enables consistent business operations
```

#### System Uniqueness

**API and Security Uniqueness**
```sql
-- API key uniqueness
key_hash TEXT NOT NULL UNIQUE                -- API key hashes
UNIQUE(property_id, key_name)                -- API keys

-- Validation Logic:
-- - Prevents duplicate API keys
-- - Ensures unique key names per property
-- - Supports secure API access
-- - Enables reliable authentication
```

### Foreign Key Constraints (40+ Relationships)

#### Core Relationships

**Property and User Relationships**
```sql
-- Property scoping
property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE

-- User attribution
user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL

-- User profile extension
id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE

-- Validation Logic:
-- - Ensures all data is properly scoped to properties
-- - Maintains user attribution for audit trails
-- - Supports multi-tenant data isolation
-- - Enables consistent relationship management
```

**Operational Relationships**
```sql
-- Growing operation relationships
batch_id UUID REFERENCES growing_batches(id) ON DELETE CASCADE
crop_variety_id UUID REFERENCES crop_varieties(id)

-- Order management relationships
order_id UUID REFERENCES orders(id) ON DELETE CASCADE
customer_id UUID REFERENCES customers(id) NOT NULL

-- Validation Logic:
-- - Maintains operational data relationships
-- - Supports cascading deletions for cleanup
-- - Ensures referential integrity
-- - Enables reliable business operations
```

#### Agent Memory Relationships

**Memory System Relationships**
```sql
-- Property scoping for all memory types
property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE

-- User attribution with soft deletion
user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL

-- Memory hierarchy relationships
parent_pattern_id UUID REFERENCES agent_long_term_memory(id) ON DELETE SET NULL
superseded_by UUID REFERENCES agent_long_term_memory(id) ON DELETE SET NULL

-- Operational context relationships
batch_id UUID REFERENCES growing_batches(id) ON DELETE SET NULL
primary_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL

-- Validation Logic:
-- - Ensures memory data is properly scoped
-- - Maintains memory hierarchy relationships
-- - Supports memory evolution and supersession
-- - Enables context-aware memory operations
```

## Business Rule Validation

### Workflow State Validation

**Growing Batch Workflow**
```sql
-- Valid stage transitions
'planned' → 'soaking' → 'sowing' → 'germination' → 'growing' → 'harvesting' → 'completed'
                                                                              ↘ 'failed'

-- Business Rules:
-- - Batches must progress through stages sequentially
-- - Failed batches can occur at any stage after planning
-- - Completed batches cannot be modified
-- - Stage transitions must be logged with timestamps
```

**Task Workflow**
```sql
-- Valid status transitions
'todo' → 'in_progress' → 'done'
       ↘ 'cancelled'
       ↘ 'deferred' → 'todo'

-- Business Rules:
-- - Tasks can be cancelled from any status except done
-- - Deferred tasks can be reactivated to todo
-- - Done tasks cannot be modified
-- - Status changes must be attributed to users
```

**Order Workflow**
```sql
-- Valid status transitions
'pending' → 'confirmed' → 'preparing' → 'ready' → 'delivered'
          ↘ 'cancelled'

-- Business Rules:
-- - Orders can be cancelled before delivery
-- - Delivered orders cannot be modified
-- - Payment status must align with order status
-- - Delivery dates must be logical
```

### Data Consistency Validation

**Date and Time Validation**
```sql
-- Logical date relationships
sowing_date <= expected_harvest_date
expected_harvest_date <= actual_harvest_date (when set)
created_at <= updated_at
granted_at <= created_at (for access records)

-- Business Rules:
-- - Harvest dates must be after sowing dates
-- - Update timestamps must be after creation
-- - Access grants must be after record creation
-- - Future dates validated against business logic
```

**Quantity and Measurement Validation**
```sql
-- Positive quantity requirements
tray_count > 0
seed_amount_grams >= 0
estimated_yield_lbs >= 0
actual_yield_lbs >= 0
quantity_used >= 0

-- Business Rules:
-- - Physical quantities must be non-negative
-- - Tray counts must be positive integers
-- - Yield estimates must be realistic
-- - Resource usage must be tracked accurately
```

### Permission and Access Validation

**Role-Based Access Control**
```sql
-- Role hierarchy validation
owner > admin > manager > employee > viewer > client

-- Permission matrix validation
role = 'owner' → can_view = true, can_edit = true, can_manage = true, can_manage_children = true
role = 'admin' → can_view = true, can_edit = true, can_manage = true, can_manage_children = false
role = 'manager' → can_view = true, can_edit = true, can_manage = false, can_manage_children = false
role = 'employee' → can_view = true, can_edit = true, can_manage = false, can_manage_children = false
role = 'viewer' → can_view = true, can_edit = false, can_manage = false, can_manage_children = false
role = 'client' → can_view = limited, can_edit = false, can_manage = false, can_manage_children = false

-- Business Rules:
-- - Higher roles inherit lower role permissions
-- - Permission flags must align with role capabilities
-- - Property hierarchy affects permission inheritance
-- - Access must be explicitly granted
```

## Application-Level Validation

### Input Sanitization

**Text Field Sanitization**
```typescript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => emailRegex.test(email);

// Phone number normalization
const normalizePhone = (phone: string) => phone.replace(/\D/g, '');

// Text content sanitization
const sanitizeText = (text: string) => text.trim().replace(/\s+/g, ' ');

// Validation Logic:
// - Ensures data format consistency
// - Prevents injection attacks
// - Normalizes user input
// - Supports reliable data processing
```

**Numeric Validation**
```typescript
// Score validation
const validateScore = (score: number, min: number, max: number) => 
  score >= min && score <= max;

// Quantity validation
const validateQuantity = (quantity: number) => quantity >= 0;

// Date validation
const validateDate = (date: Date) => date instanceof Date && !isNaN(date.getTime());

// Validation Logic:
// - Ensures numeric data integrity
// - Prevents invalid calculations
// - Supports business rule enforcement
// - Enables reliable analytics
```

### Complex Business Rule Validation

**Multi-Table Validation**
```typescript
// Batch capacity validation
const validateBatchCapacity = async (propertyId: string, trayCount: number) => {
  const property = await getProperty(propertyId);
  const currentCapacity = await getCurrentTrayUsage(propertyId);
  return currentCapacity + trayCount <= property.maxTrayCapacity;
};

// Order fulfillment validation
const validateOrderFulfillment = async (orderId: string) => {
  const order = await getOrder(orderId);
  const availableInventory = await getAvailableInventory(order.propertyId);
  return order.items.every(item => 
    availableInventory[item.varietyId] >= item.quantity
  );
};

// Validation Logic:
// - Enforces complex business constraints
// - Validates cross-table relationships
// - Supports operational feasibility
// - Enables resource planning
```

### Agent Memory Validation

**Memory Consistency Validation**
```typescript
// Memory layer consistency
const validateMemoryLayer = (layer: string, importance: number) => {
  const layerThresholds = {
    primary: 0.7,
    secondary: 0.4,
    tertiary: 0.0
  };
  return importance >= layerThresholds[layer];
};

// Working memory workspace validation
const validateWorkspace = (workspaceType: string, taskId?: string) => {
  if (workspaceType === 'primary' && !taskId) {
    throw new Error('Primary workspace requires active task');
  }
  return true;
};

// Validation Logic:
// - Ensures memory system consistency
// - Validates AI operation parameters
// - Supports intelligent memory management
// - Enables efficient context switching
```

## Security Validation

### Row-Level Security Validation

**Property Access Validation**
```sql
-- Property access function
CREATE OR REPLACE FUNCTION can_view_property(property_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_property_access upa
    WHERE upa.user_id = auth.uid()
      AND upa.property_id = $1
      AND upa.can_view = true
      AND upa.is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Validation Logic:
-- - Ensures users can only access authorized properties
-- - Validates active access permissions
-- - Supports hierarchical property access
-- - Enables fine-grained access control
```

**Operation-Specific Validation**
```sql
-- Edit permission validation
CREATE OR REPLACE FUNCTION can_edit_property(property_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_property_access upa
    WHERE upa.user_id = auth.uid()
      AND upa.property_id = $1
      AND upa.can_edit = true
      AND upa.is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Validation Logic:
-- - Validates operation-specific permissions
-- - Ensures proper authorization for modifications
-- - Supports role-based operation control
-- - Enables audit trail creation
```

### API Key Validation

**API Key Authentication**
```sql
-- API key validation function
CREATE OR REPLACE FUNCTION validate_api_key(key_value TEXT)
RETURNS TABLE(property_id UUID, permissions JSONB) AS $$
DECLARE
  key_record RECORD;
BEGIN
  -- Check if key exists and is valid
  SELECT * INTO key_record
  FROM custom_api_keys
  WHERE key_hash = crypt(key_value, key_hash)
    AND is_active = true;

  -- Check if key is expired
  IF key_record.expires_at IS NOT NULL AND key_record.expires_at < NOW() THEN
    RAISE EXCEPTION 'API key has expired';
  END IF;

  -- Return property and permissions
  RETURN QUERY SELECT key_record.property_id, key_record.permissions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Validation Logic:
-- - Validates API key authenticity
-- - Checks key expiration status
-- - Returns authorized property scope
-- - Enables property-scoped API access
```

## Error Handling and Validation Messages

### Constraint Violation Messages

**CHECK Constraint Violations**
```sql
-- Custom error messages for business rules
CONSTRAINT chk_valid_role CHECK (role IN ('owner', 'admin', 'manager', 'employee', 'viewer', 'client'))
-- Error: "Invalid role specified. Must be one of: owner, admin, manager, employee, viewer, client"

CONSTRAINT chk_score_range CHECK (quality_score BETWEEN 1 AND 10)
-- Error: "Quality score must be between 1 and 10"

CONSTRAINT chk_valid_stage CHECK (current_stage IN ('planned', 'soaking', 'sowing', 'germination', 'growing', 'harvesting', 'completed', 'failed'))
-- Error: "Invalid growing stage. Must be a valid stage in the microgreens lifecycle"
```

**Foreign Key Violation Messages**
```sql
-- Referential integrity error messages
FOREIGN KEY (property_id) REFERENCES properties(id)
-- Error: "Referenced property does not exist or access is denied"

FOREIGN KEY (user_id) REFERENCES auth.users(id)
-- Error: "Referenced user does not exist"

FOREIGN KEY (batch_id) REFERENCES growing_batches(id)
-- Error: "Referenced growing batch does not exist or access is denied"
```

### Application Error Handling

**Validation Error Response Format**
```typescript
interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Example validation response
{
  isValid: false,
  errors: [
    {
      field: "email",
      message: "Email address is required",
      code: "REQUIRED_FIELD",
      value: null
    },
    {
      field: "quality_score",
      message: "Quality score must be between 1 and 10",
      code: "INVALID_RANGE",
      value: 15
    }
  ]
}
```

## Performance Considerations

### Validation Optimization

**Index-Supported Validation**
```sql
-- Constraints using indexed columns
CREATE INDEX idx_user_property_access_active ON user_property_access(user_id, property_id) WHERE is_active = true;
CREATE INDEX idx_growing_batches_stage ON growing_batches(current_stage) WHERE is_active = true;
CREATE INDEX idx_tasks_status ON tasks(status, property_id);

-- Validation Logic:
-- - Constraints leverage existing indexes
-- - Fast validation for common checks
-- - Efficient permission validation
-- - Optimized status filtering
```

**Efficient Constraint Checking**
```sql
-- Simple constraint expressions
CHECK (role IN ('owner', 'admin', 'manager', 'employee', 'viewer', 'client'))
-- Fast: Uses simple equality comparison

CHECK (quality_score BETWEEN 1 AND 10)
-- Fast: Uses range comparison

CHECK (importance_score >= 0 AND importance_score <= 1)
-- Fast: Uses simple numeric comparison
```

## Conclusion

The Verding validation logic provides comprehensive data integrity through:

- **Database Constraints**: 150+ constraints ensuring data validity at the storage level
- **Business Rules**: Complex multi-table validations supporting operational requirements
- **Security Validation**: Property-scoped access control with role-based permissions
- **Application Logic**: Input sanitization and complex business rule enforcement
- **Performance Optimization**: Index-supported validation for efficient operations
- **Error Handling**: Clear, actionable error messages for validation failures

This multi-layered approach ensures data integrity, business rule compliance, and operational reliability while maintaining high performance and clear error reporting. 