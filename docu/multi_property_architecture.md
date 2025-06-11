# Multi-Property Architecture

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## Overview

This document defines the foundational multi-property architecture for the
Verding system. The system is designed to manage 1 to an infinite number of
farms and/or locations, requiring property-level context awareness throughout
all system components. This document outlines the implications of this
architecture on data models, access control, user interfaces, agent behavior,
and system operations.

## Core Architecture Principles

1. **Property as First-Class Entity**

   - Properties represent physical farm locations or management domains
   - Every property has a unique identifier in the system
   - Properties can be hierarchically organized (parent-child relationships)
   - System maintains a global registry of all properties

2. **Property Context Persistence**

   - User sessions maintain property context
   - System operations occur within property context
   - Cross-property operations are explicitly defined
   - Agent maintains awareness of current property context

3. **Property-Scoped Access Control**

   - User permissions are defined at property level
   - Some users have access to multiple properties
   - Super-admin role has access to all properties
   - Access control policies enforce property boundaries

4. **Cross-Property Capabilities**
   - Data aggregation across properties
   - Resource sharing between properties
   - Comparative analytics between properties
   - Bulk operations across multiple properties

## Data Architecture

### Database Schema Implications

1. **Property Identifier**

   - `property_id` column in most data tables
   - Foreign key relationship to properties table
   - Indexed for query performance
   - Used in all queries to enforce property boundaries

2. **Properties Table**

   ```sql
   CREATE TABLE properties (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name VARCHAR NOT NULL,
     description TEXT,
     location GEOGRAPHY,
     parent_id UUID REFERENCES properties(id),
     metadata JSONB,
     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
     updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
   );
   ```

3. **Property Relationships**

   - Hierarchical organization (parent-child)
   - Property groups for management purposes
   - Ownership relationships
   - Partnership/collaboration relationships

4. **Property Metadata**
   - Climate/geographical information
   - Facility specifications
   - Production capabilities
   - Business metrics

### Row Level Security

1. **Property-Scoped Policies**

   ```sql
   CREATE POLICY property_isolation_policy ON [table_name]
     USING (property_id IN (
       SELECT property_id FROM user_property_access
       WHERE user_id = auth.uid() AND can_view = true
     ));
   ```

2. **Cross-Property Access**

   ```sql
   CREATE POLICY super_admin_policy ON [table_name]
     USING (
       EXISTS (
         SELECT 1 FROM user_roles
         WHERE user_id = auth.uid() AND role = 'super_admin'
       )
     );
   ```

3. **Property Hierarchy Access**
   ```sql
   CREATE POLICY hierarchy_access_policy ON [table_name]
     USING (property_id IN (
       WITH RECURSIVE property_tree AS (
         SELECT id FROM properties WHERE id IN (
           SELECT property_id FROM user_property_access
           WHERE user_id = auth.uid() AND can_manage_children = true
         )
         UNION
         SELECT p.id FROM properties p
         JOIN property_tree pt ON p.parent_id = pt.id
       )
       SELECT id FROM property_tree
     ));
   ```

### Data Queries

1. **Property Context in Queries**

   - All standard queries include property_id filter
   - Example: `SELECT * FROM crops WHERE property_id = :current_property_id`

2. **Cross-Property Queries**

   - Explicitly identified as cross-property
   - Permission checks for each property
   - Example:
     `SELECT property_id, COUNT(*) FROM crops WHERE property_id IN (:property_ids) GROUP BY property_id`

3. **Query Optimization**
   - Indexes on property_id columns
   - Partitioning by property_id for large tables
   - Materialized views for common cross-property queries
   - Caching strategies respecting property boundaries

## Access Control

### User-Property Relationships

1. **Property-Specific Roles**

   ```sql
   CREATE TABLE user_property_access (
     user_id UUID REFERENCES auth.users(id),
     property_id UUID REFERENCES properties(id),
     role VARCHAR NOT NULL,
     can_view BOOLEAN DEFAULT TRUE,
     can_edit BOOLEAN DEFAULT FALSE,
     can_manage BOOLEAN DEFAULT FALSE,
     can_manage_children BOOLEAN DEFAULT FALSE,
     specific_permissions JSONB,
     PRIMARY KEY (user_id, property_id)
   );
   ```

2. **Role Hierarchy**

   - Super Admin (all properties)
   - Property Admin (specific properties)
   - Property Manager (specific properties, limited permissions)
   - Property User (specific properties, limited permissions)
   - Client (specific properties, very limited permissions)

3. **Permission Inheritance**
   - Parent property permissions can cascade to child properties
   - Explicit permissions override inherited permissions
   - Property groups share permission templates

### Permission Enforcement

1. **Database Level**

   - Row Level Security policies
   - Security definer functions
   - Property-aware helper functions

2. **API Level**

   - Property context in request headers or tokens
   - Middleware for property validation
   - Permission checks including property context

3. **UI Level**
   - Property selector visibility based on access
   - UI element visibility based on property permissions
   - Property context indicators

## User Interface

### Property Selection

1. **Property Selector Component**

   - Prominent in global navigation
   - Shows only properties user has access to
   - Includes search/filter for users with many properties
   - Shows property hierarchy when applicable

2. **Property Context Indicators**

   - Visual indicator of current property
   - Color coding or badging for different properties
   - Clear indication of cross-property views

3. **Context Switching**
   - Session maintains property context
   - URL parameters include property context
   - Browser history preserves property context
   - Quick-switch between recent properties

### Dashboard & Reporting

1. **Property-Specific Dashboards**

   - Default dashboards customized for property
   - Property metrics and KPIs
   - Property-specific alerts and notifications
   - Role-based dashboard variants per property

2. **Cross-Property Dashboards**

   - Comparative metrics between properties
   - Aggregation of data across property groups
   - Filtering and segmentation by property
   - Permission-aware data visibility

3. **Reporting**
   - Property as primary dimension in reports
   - Cross-property report access based on permissions
   - Report sharing respects property access boundaries
   - Export options include property context

## Agent Integration

### Property Context Awareness

1. **Context Maintenance**

   - Agent maintains awareness of current property context
   - Property context is included in agent memory
   - Agent understands property switching commands
   - Property-specific greeting and customization

2. **Natural Language Processing**

   - Property name recognition in queries
   - Disambiguation for property-ambiguous requests
   - Default to current property if unspecified
   - Permission verification for property references

3. **Multi-Property Commands**
   - Explicit syntax for cross-property operations
   - Confirmation for bulk operations across properties
   - Clear feedback on property scope of actions
   - Permission verification for each property

### Property-Specific Knowledge

1. **Property Profiles**

   - Property characteristics in agent memory
   - Property-specific terminology and nomenclature
   - Historical context for each property
   - Property goals and priorities

2. **Contextual Responses**
   - Tailoring responses to property context
   - Property-specific recommendations
   - Reference to property-specific resources
   - Property-appropriate tone and formality

## MCP Tool Modifications

### Property Context in Tools

1. **Standard Parameter Addition**

   - Add `property_id` parameter to most MCP tools
   - Default to current context if not specified
   - Permission validation for specified property
   - Support for arrays of property IDs in cross-property tools

2. **Tool Categories Requiring Updates**

   - Farm/Crop Management
   - Inventory Management
   - Task Management
   - Order Management
   - User Management
   - Reporting/Analytics
   - Device/Sensor Management

3. **New Property Management Tools**
   - `list_properties` - List available properties
   - `get_property` - Get property details
   - `switch_property_context` - Change current property context
   - `compare_properties` - Generate comparison between properties
   - `get_property_hierarchy` - Get hierarchical property structure

### Tool Implementation Changes

1. **Permission Checks**

   ```javascript
   async function validatePropertyAccess(
     userId,
     propertyId,
     requiredPermission
   ) {
     const { data, error } = await supabase
       .from('user_property_access')
       .select('can_view, can_edit, can_manage')
       .eq('user_id', userId)
       .eq('property_id', propertyId)
       .single();

     if (error || !data) return false;
     return data[requiredPermission] === true;
   }
   ```

2. **Cross-Property Functions**

   ```javascript
   async function getAccessibleProperties(userId) {
     const { data, error } = await supabase
       .from('user_property_access')
       .select('property_id')
       .eq('user_id', userId)
       .eq('can_view', true);

     if (error || !data) return [];
     return data.map(row => row.property_id);
   }
   ```

3. **Property Context in Workflows**
   ```javascript
   // Example n8n workflow node maintaining property context
   {
     "parameters": {
       "keepOnlySet": true,
       "values": {
         "string": [
           {
             "name": "propertyId",
             "value": "={{ $node[\"Previous Node\"].json[\"propertyId\"] }}"
           }
         ]
       }
     }
   }
   ```

## Integration with Other Components

### Memory System Integration

1. **Property Tags in Memory**

   - Add property tag to memory records
   - Query memory within property context
   - Cross-property memory access for authorized users
   - Property-specific memory retrieval optimization

2. **Modified Memory Access Control**

   ```sql
   CREATE POLICY memory_property_isolation ON memory_items
     USING (
       (property_id = current_setting('app.current_property_id')::uuid)
       OR
       (property_id IS NULL AND is_global = true)
     );
   ```

3. **Memory Contexts**
   - Property-specific conversation history
   - Property-specific knowledge base
   - Global knowledge shared across properties
   - Property context in RAG retrieval

### Messaging Platform Integration

1. **Property Context in Chats**

   - Property identifier in chat metadata
   - Group chats associated with specific properties
   - Property switching commands in chat
   - Property context indicators in chat interface

2. **Message Routing**
   - Property-specific message channels
   - Message routing based on property context
   - Property-specific notification settings
   - Cross-property announcement capabilities

### Monitoring Screens Integration

1. **Property Selector in Dashboards**

   - Property selection component in dashboard header
   - Property context preserved in dashboard URLs
   - Property-specific dashboard templates
   - Cross-property comparison widgets

2. **Property-Specific Widgets**
   - Widget configuration includes property context
   - Multi-property widgets for comparison
   - Property filtering in data visualization
   - Property context in widget actions

### n8n Workflow Integration

1. **Property Context Maintenance**

   - Workflows pass property context between nodes
   - Property validation in workflow entry points
   - Property-specific workflow branches
   - Property context in workflow execution logs

2. **Cross-Property Workflows**
   - Iterator patterns for multi-property operations
   - Property batching for efficient processing
   - Error handling respecting property boundaries
   - Permission validation per property

## Implementation Strategy

1. **Database Schema Updates**

   - Add property_id to existing tables
   - Create properties table
   - Establish user-property relationships
   - Implement property-based RLS policies

2. **API Layer Updates**

   - Add property context to authentication tokens
   - Implement property middleware
   - Update API endpoints to include property context
   - Add property management endpoints

3. **UI Updates**

   - Implement global property selector
   - Add property context indicators
   - Update forms to include property context
   - Implement cross-property views

4. **Agent/n8n Updates**

   - Update MCP tools to include property context
   - Implement property context in agent memory
   - Create property switching conversational flows
   - Implement property-aware permission checks

5. **Testing Strategy**
   - Property isolation testing
   - Cross-property operation testing
   - Permission boundary testing
   - Performance testing with multiple properties
