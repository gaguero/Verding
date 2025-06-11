# Memory System Access Control Implementation

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## Overview

This document details the implementation approach for the memory system access
control in the Verding system, building on the research findings documented in
[Memory Access Control Research](memory_access_control_research.md). It provides
a comprehensive design for a flexible, tag-based access control system that
combines elements of Role-Based Access Control (RBAC) and Attribute-Based Access
Control (ABAC) to manage permissions for different user types across various
memory data categories.

## System Overview

The Verding memory system will implement a flexible, tag-based access control
approach that combines the strengths of role-based access control (RBAC) and
attribute-based access control (ABAC). This approach allows for:

1. Standard predefined roles (client, employee, admin) with default permissions
2. Custom role creation and modification
3. Fine-grained control through tags/attributes attached to memory data
4. Different permission types (view, edit, delete) configurable separately
5. Efficient enforcement at the database level using Supabase RLS

## Database Schema

### Core Tables

```sql
-- Roles table for both system-defined and custom roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT false
);

-- Tags/attributes that can be applied to memory items
CREATE TABLE memory_tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Permissions define what operations can be performed
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  resource TEXT NOT NULL, -- 'conversation', 'knowledge', 'task', etc.
  action TEXT NOT NULL,   -- 'view', 'edit', 'delete'
  description TEXT
);

-- Memory items table (simplified, actual implementation will have multiple memory tables)
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content JSONB NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}'::TEXT[], -- Array of tags for attribute-based filtering
  property_id UUID REFERENCES properties(id) -- Added for multi-property architecture
);

-- Role-Permission mapping
CREATE TABLE role_permissions (
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
  resource_tags TEXT[] DEFAULT '{}'::TEXT[], -- Specific tags this permission applies to
  PRIMARY KEY (role_id, permission_id)
);

-- User-Role mapping
CREATE TABLE user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- New table to link users to properties and define their role within each property
CREATE TABLE user_property_access (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  role VARCHAR NOT NULL,
  can_view BOOLEAN DEFAULT TRUE,
  can_edit BOOLEAN DEFAULT FALSE,
  can_manage BOOLEAN DEFAULT FALSE,
  can_manage_children BOOLEAN DEFAULT FALSE,
  specific_permissions JSONB,
  PRIMARY KEY (user_id, property_id)
);
```

### Helper Functions

```sql
-- Create a private schema for security definer functions
CREATE SCHEMA IF NOT EXISTS private;

-- Check if user has a specific permission for a resource with given tags and property context
CREATE OR REPLACE FUNCTION private.user_has_permission(
  user_id UUID,
  resource_type TEXT,
  action TEXT,
  resource_tags TEXT[],
  target_property_id UUID -- Added for multi-property context
)
RETURNS BOOLEAN
LANGUAGE SQL SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1
    FROM role_permissions rp
    JOIN user_roles ur ON rp.role_id = ur.role_id
    JOIN permissions p ON rp.permission_id = p.id
    -- Join with user_property_access to check property-specific roles/permissions
    JOIN user_property_access upa ON ur.user_id = upa.user_id AND upa.property_id = target_property_id
    WHERE ur.user_id = user_has_permission.user_id
      AND p.resource = user_has_permission.resource_type
      AND p.action = user_has_permission.action
      -- Either the permission applies to all tags or there's a tag overlap
      AND (
        rp.resource_tags = '{}'::TEXT[]
        OR rp.resource_tags && user_has_permission.resource_tags
      )
      -- Add checks for property-specific permissions from user_property_access table
      AND (
          upa.can_view = TRUE -- Example: Check view permission for this property
          -- Add more specific checks based on action (edit, delete) and specific_permissions JSONB
          -- For example, check if the specific_permissions JSONB allows this action on this resource type
      )
  );
$$;

-- Get all permissions for a user across all properties they have access to
CREATE OR REPLACE FUNCTION private.get_user_permissions(user_id UUID)
RETURNS TABLE (
  resource TEXT,
  action TEXT,
  resource_tags TEXT[],
  property_id UUID -- Added to indicate which property the permission applies to
)
LANGUAGE SQL SECURITY DEFINER AS $$
  SELECT p.resource, p.action, rp.resource_tags, upa.property_id
  FROM role_permissions rp
  JOIN user_roles ur ON rp.role_id = ur.role_id
  JOIN permissions p ON rp.permission_id = p.id
  -- Join with user_property_access to get permissions for each property
  JOIN user_property_access upa ON ur.user_id = upa.user_id
  WHERE ur.user_id = get_user_permissions.user_id;
$$;
```

### Row Level Security Policies

```sql
-- Enable RLS on memories table
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- View permission policy (updated to include property context)
CREATE POLICY "Users can view memories they have permission for in their accessible properties" ON memories
FOR SELECT USING (
  -- Check if the user has view permission for the specific property of the memory item
  private.user_has_permission(
    auth.uid(),
    'memory',
    'view',
    tags,
    property_id -- Pass the memory item's property_id to the helper function
  )
);

-- Edit permission policy (updated to include property context)
CREATE POLICY "Users can update memories they have permission for in their accessible properties" ON memories
FOR UPDATE USING (
  -- Check if the user has edit permission for the specific property of the memory item
  private.user_has_permission(
    auth.uid(),
    'memory',
    'edit',
    tags,
    property_id -- Pass the memory item's property_id
  )
);

-- Delete permission policy (updated to include property context)
CREATE POLICY "Users can delete memories they have permission for in their accessible properties" ON memories
FOR DELETE USING (
  -- Check if the user has delete permission for the specific property of the memory item
  private.user_has_permission(
    auth.uid(),
    'memory',
    'delete',
    tags,
    property_id -- Pass the memory item's property_id
  )
);

-- Policy to allow super admins full access across all properties
CREATE POLICY "Super admins full access" ON memories
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() AND r.name = 'admin' -- Assuming 'admin' is the super admin role name
  )
);
```

## Role Configuration

### Predefined Roles

```sql
-- Insert predefined roles
INSERT INTO roles (name, description, is_system)
VALUES
  ('client', 'Standard client with access to own data only', true),
  ('employee', 'Employee with access to client data and some system data', true),
  ('admin', 'Administrator with broad system access', true);

-- Insert basic permissions
INSERT INTO permissions (resource, action, description)
VALUES
  ('memory', 'view', 'View memory items'),
  ('memory', 'edit', 'Edit memory items'),
  ('memory', 'delete', 'Delete memory items'),
  ('conversation', 'view', 'View conversations'),
  ('conversation', 'edit', 'Edit conversations'),
  ('conversation', 'delete', 'Delete conversations'),
  ('knowledge', 'view', 'View knowledge base items'),
  ('knowledge', 'edit', 'Edit knowledge base items'),
  ('knowledge', 'delete', 'Delete knowledge base items');

-- Set up default role permissions
-- Client role permissions
INSERT INTO role_permissions (role_id, permission_id, resource_tags)
SELECT
  (SELECT id FROM roles WHERE name = 'client'),
  (SELECT id FROM permissions WHERE resource = 'memory' AND action = 'view'),
  ARRAY['own', 'public']
;

-- Employee role permissions
INSERT INTO role_permissions (role_id, permission_id, resource_tags)
SELECT
  (SELECT id FROM roles WHERE name = 'employee'),
  (SELECT id FROM permissions WHERE resource = 'memory' AND action = 'view'),
  ARRAY['own', 'public', 'client']
;

-- Admin role permissions (full access)
INSERT INTO role_permissions (role_id, permission_id, resource_tags)
SELECT
  (SELECT id FROM roles WHERE name = 'admin'),
  (SELECT id FROM permissions WHERE resource = 'memory' AND action = 'view'),
  '{}'::TEXT[] -- Empty array means "all tags"
;
```

## API Endpoints for Role Management

The system will provide REST API endpoints to manage roles and permissions.
These will need to be updated to handle property-specific permission assignments
using the new `user_property_access` table.

1. **List Roles**

   - `GET /api/roles`
   - Returns all available roles (no property context needed here)

2. **Create Role**

   - `POST /api/roles`
   - Create a new custom role with specified permissions (no property context
     needed here, role is global)

3. **Update Role**

   - `PUT /api/roles/:id`
   - Update an existing role's permissions (no property context needed here)

4. **Delete Role**

   - `DELETE /api/roles/:id`
   - Delete a custom role (system roles cannot be deleted) (no property context
     needed here)

5. **Assign Role to User (Updated for Property Context)**

   - `POST /api/users/:userId/properties/:propertyId/roles`
   - Assign a role to a specific user for a specific property
   - Request body should include role and property-specific permissions if
     applicable

6. **Remove Role from User (Updated for Property Context)**

   - `DELETE /api/users/:userId/properties/:propertyId/roles/:roleId`
   - Remove a role from a specific user for a specific property

7. **Get User Property Access**
   - `GET /api/users/:userId/properties/:propertyId/access`
   - Get a user's specific access details and permissions for a property

## n8n Workflow Implementation

The n8n agent workflows will implement access control using the following
patterns. These workflows need to be updated to always include the relevant
`property_id` when making memory access requests or using helper functions.

1. **Authentication**

   - Workflows will authenticate with Supabase using JWT tokens
   - JWT will include user ID, global roles, and potentially a default active
     property ID

2. **Property Context Handling**

   - Workflows triggered by property-specific events (e.g., sensor reading from
     a farm) will automatically have the property context.
   - Workflows triggered by user interaction will use the user's current active
     property context or explicitly handle property selection.
   - All database operations and calls to helper functions must pass the current
     `property_id`.

3. **Permission Checking**
   - Before accessing memory data, workflows will:
     - Identify the current user context and active property ID.
     - Call the `private.user_has_permission` helper function, passing the
       relevant `property_id`.
     - Filter or adjust workflow logic based on the permission check result.

## Memory Data Access Patterns

### Client Access Pattern

- Clients can access:
  - Their own conversations and related memories
  - Public knowledge base items
  - Their own tasks and schedules

### Employee Access Pattern

- Employees can access:
  - Their own conversations and related memories
  - Client conversations and memories they are assigned to
  - Public and internal knowledge base items
  - Tasks and schedules for their assigned clients

### Admin Access Pattern

- Admins can access:
  - All conversations and memories
  - All knowledge base items
  - All tasks and schedules
  - System configuration and logs

## Implementation Timeline

1. **Phase 1: Database Schema Setup**

   - Create roles, permissions, and memory tables
   - Implement RLS policies
   - Set up helper functions

2. **Phase 2: API Development**

   - Implement role management endpoints
   - Create permission checking middleware
   - Develop tag-based filtering logic

3. **Phase 3: n8n Workflow Integration**

   - Implement authentication in workflows
   - Add permission checking to workflow nodes
   - Test access control with different user types

4. **Phase 4: UI Components**
   - Develop role management UI
   - Create permission visualization tools
   - Implement tag management interface

## Performance Considerations

1. **Indexing Strategy**

   ```sql
   -- Create indexes for performance
   CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
   CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
   CREATE INDEX idx_memories_user_id ON memories(user_id);
   CREATE INDEX idx_memories_tags ON memories USING GIN(tags);
   ```

2. **Caching Strategy**

   - Cache user permissions in application memory
   - Invalidate cache on role or permission changes
   - Use Redis for distributed caching in production

3. **Query Optimization**
   - Use the security definer functions to optimize complex permission checks
   - Explicitly filter by user ID and tags in application queries
   - Use prepared statements for frequent queries
