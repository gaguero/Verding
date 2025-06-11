# Memory System Access Control Research

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## Overview

This document presents research findings on different approaches to implementing
access control for the Verding memory system. It explores attribute-based access
control (ABAC), row-level security (RLS) in Supabase, dynamic role-based
permissions, and various implementation patterns. These findings serve as the
foundation for the detailed implementation plan outlined in
[Memory System Access Control Implementation](memory_system_access_control_implementation.md).

This document tracks our research on role-based and attribute-based access
control concepts for the Verding memory system. We're exploring a flexible,
tag-based approach to memory access control that allows for dynamic permission
configuration.

## Research Goals

1. Understand attribute-based access control (ABAC) principles and how they
   apply to our memory system
2. Explore Row Level Security (RLS) in Supabase/PostgreSQL for enforcing access
   control
3. Identify best practices for implementing dynamic role-based permissions
4. Find patterns for efficient data filtering based on user roles and attributes
5. Research implementation approaches for memory access control in n8n workflows

## Key Requirements from User Input

- System should be versatile in handling roles, with standard roles but full
  freedom to edit and build custom roles
- A library of tags should be used to define what different roles can access
- Permissions should be configurable at a granular level (e.g., an admin can see
  memories of client conversations but not other admins)
- Permissions should be easily adjustable (e.g., changing settings to allow
  admins to access other admins' chat memories)
- Different permission types (viewing, editing, deleting) should be separately
  configurable

## Research Plan

We will research each of the following concepts and document our findings:

1. **Attribute-based access control (ABAC)** - The formal term for tag-based,
   flexible permission systems
2. **Row Level Security (RLS) in Supabase/PostgreSQL** - Database-level
   enforcement of access control
3. **Dynamic role-based permissions** - Approaches for flexible role definitions
   and assignment
4. **Permission models for conversation history** - Special considerations for
   chat/conversation data
5. **Efficient data filtering patterns** - Performance considerations for access
   control
6. **Access control implementation in n8n workflows** - How to enforce
   permissions in external workflows

## Research Findings

Each concept will be researched using Context7 MCP tools to gather best
practices and implementation approaches.

### 1. Attribute-based access control (ABAC)

Based on our research of the AccessControl library, we've identified the
following key concepts and implementation patterns for attribute-based access
control:

1. **Core ABAC Concepts**:

   - ABAC allows permissions to be granted based on attributes rather than just
     roles
   - Permissions can be defined for specific operations (create, read, update,
     delete) and ownership types (own, any)
   - Attribute-level control allows fine-grained specification of which data
     fields can be accessed
   - Permissions can include or exclude specific attributes using wildcards and
     negation (`*`, `!attribute_name`)
   - Roles can inherit from other roles, creating a hierarchy of permissions

2. **Implementation Patterns**:

   - Grant permissions using a combination of roles, resources, actions, and
     attributes
   - Use wildcard (`*`) to grant access to all attributes of a resource
   - Use negation (`!attribute_name`) to exclude specific attributes from a
     granted permission
   - Check permissions before performing operations using `.can()` method
   - Filter data based on granted attributes using `.filter()` method
   - Store permissions in a structured format that can be persisted in a
     database

3. **Relevant Examples for Verding**:

   - Granting read access to a resource for specific roles with attribute-level
     filtering:
     ```js
     ac.grant('admin').readAny('video', ['*']); // All attributes
     ac.grant('user').readOwn('video', ['*', '!id']); // All attributes except id
     ```
   - Checking permissions before performing operations:
     ```js
     const permission = ac.can('user').readOwn('account');
     if (permission.granted) {
       // Filter data based on allowed attributes
       const filteredData = permission.filter(data);
       // Proceed with operation
     }
     ```
   - Defining role inheritance:
     ```js
     ac.grant('admin').extend(['user', 'editor']);
     ```

4. **Applying to Verding Memory System**:
   - We can define a set of memory resource types (e.g., 'conversation', 'task',
     'knowledge')
   - Each resource type can have a set of attributes that can be controlled
   - We can define role-based permissions with attribute-level control
   - We can implement inheritance to create role hierarchies (e.g., admin
     inherits from user)
   - We can use attribute filtering to implement the tag-based approach
     requested by the user

### 2. Row Level Security (RLS) in Supabase/PostgreSQL

From our research on Supabase and PostgreSQL RLS, we've identified the following
key patterns and implementation approaches:

1. **Core RLS Concepts**:

   - RLS allows restricting access to rows in a table based on policies
   - Policies are defined at the table level and can be applied to specific
     operations (SELECT, INSERT, UPDATE, DELETE)
   - Policies can be targeted to specific roles or users
   - Policies can use user metadata from JWT tokens for dynamic access control
   - Multiple policies can be combined for complex access control rules

2. **Implementation Patterns**:

   - Enable RLS on a table: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
   - Create policies for specific operations:
     `CREATE POLICY "policy_name" ON table_name FOR select USING (condition);`
   - Use `auth.uid()` function to access the current user's ID
   - Use `auth.jwt()` function to access the current user's JWT claims
     (including custom claims)
   - Use security definer functions for complex access control logic to improve
     performance
   - Create indexes on columns used in RLS policies for better performance

3. **Advanced Techniques**:

   - Using tag/attribute columns for flexible access control:
     ```sql
     CREATE POLICY "Data access by tags" ON memories
     FOR SELECT USING (
       tags && (SELECT allowed_tags FROM user_permissions WHERE user_id = auth.uid())
     );
     ```
   - Using JSON operators for complex attribute access:
     ```sql
     CREATE POLICY "Access by metadata" ON memories
     FOR SELECT USING (
       metadata->>'visibility' = 'public' OR
       auth.uid()::text = ANY(metadata->>'allowed_users')
     );
     ```
   - Using MFA level for sensitive operations:
     ```sql
     CREATE POLICY "Restrict updates to MFA users" ON sensitive_data
     AS RESTRICTIVE
     FOR UPDATE USING (
       (SELECT auth.jwt()->>'aal') = 'aal2'
     );
     ```

4. **Applying to Verding Memory System**:
   - We can use RLS to enforce access control at the database level
   - We can create memory tables with appropriate columns for tags/attributes
   - We can implement access control based on user roles and memory attributes
   - We can use security definer functions for complex access control logic
   - We can create policies for different operation types (SELECT, INSERT,
     UPDATE, DELETE)
   - We can optimize performance with appropriate indexes and query patterns

### 3. Dynamic role-based permissions

Based on our research, here are the key patterns for implementing dynamic
role-based permissions:

1. **Core Concepts**:

   - Dynamic role systems allow roles to be defined and modified at runtime
   - Permissions can be assigned to roles and dynamically checked
   - Role hierarchies can be used to inherit permissions
   - Roles can be assigned to users and groups
   - Permissions can be granted or revoked dynamically

2. **Implementation Approaches**:

   - Store roles, permissions, and role-permission mappings in database tables
   - Implement a role management API for creating, updating, and deleting roles
   - Use caching for frequently accessed permission checks
   - Implement attribute-based extensions to role-based access control
   - Support both predefined and custom roles

3. **Database Schema Example**:

   ```sql
   -- Roles table
   CREATE TABLE roles (
     id SERIAL PRIMARY KEY,
     name TEXT UNIQUE NOT NULL,
     description TEXT,
     is_system BOOLEAN DEFAULT false -- indicate if this is a system-defined role
   );

   -- Permissions table
   CREATE TABLE permissions (
     id SERIAL PRIMARY KEY,
     resource TEXT NOT NULL, -- e.g., 'conversation', 'task'
     action TEXT NOT NULL, -- e.g., 'read', 'write', 'delete'
     attributes JSONB -- attributes this permission applies to
   );

   -- Role-Permission mapping
   CREATE TABLE role_permissions (
     role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
     permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
     PRIMARY KEY (role_id, permission_id)
   );

   -- User-Role mapping
   CREATE TABLE user_roles (
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
     PRIMARY KEY (user_id, role_id)
   );
   ```

4. **Applying to Verding Memory System**:
   - We can implement a dynamic role system with predefined roles (client,
     employee, admin)
   - We can allow for custom role creation with specific permission sets
   - We can use a tag-based approach by implementing attribute-based extensions
   - We can store role definitions and permissions in the database
   - We can implement a role management API for creating and modifying roles
   - We can use Supabase RLS to enforce permissions at the database level

### 4. Permission models for conversation history

From our research, here are specific considerations for implementing permission
models for conversation history:

1. **Special Considerations for Conversation Data**:

   - Conversations often involve multiple participants
   - Conversations may contain sensitive information
   - Access patterns may differ for participants vs. observers
   - Historical access may need to be preserved even if permissions change
   - Different levels of access may be needed (metadata only, content,
     attachments)

2. **Implementation Approaches**:

   - Store participant information with the conversation data
   - Implement RLS policies based on participant status
   - Use conversation metadata to control visibility
   - Implement time-based access controls for historical data
   - Support different access levels for different parts of conversations

3. **Example Schema and Policies**:

   ```sql
   -- Conversations table
   CREATE TABLE conversations (
     id UUID PRIMARY KEY,
     title TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     metadata JSONB DEFAULT '{}'::JSONB -- for storing visibility settings, etc.
   );

   -- Conversation participants
   CREATE TABLE conversation_participants (
     conversation_id UUID REFERENCES conversations(id),
     user_id UUID REFERENCES auth.users(id),
     role TEXT NOT NULL, -- 'owner', 'participant', 'observer'
     PRIMARY KEY (conversation_id, user_id)
   );

   -- Messages
   CREATE TABLE messages (
     id UUID PRIMARY KEY,
     conversation_id UUID REFERENCES conversations(id),
     sender_id UUID REFERENCES auth.users(id),
     content TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
   ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

   -- Example RLS policy for conversation access
   CREATE POLICY "Users can view conversations they participate in" ON conversations
   FOR SELECT USING (
     EXISTS (
       SELECT 1 FROM conversation_participants
       WHERE conversation_id = conversations.id AND user_id = auth.uid()
     )
   );

   -- Example RLS policy for messages
   CREATE POLICY "Users can view messages in conversations they participate in" ON messages
   FOR SELECT USING (
     EXISTS (
       SELECT 1 FROM conversation_participants
       WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
     )
   );
   ```

4. **Applying to Verding Memory System**:
   - We can implement conversation-specific permission models
   - We can store participant information and roles with conversation data
   - We can use RLS to enforce access control based on participation
   - We can implement tag-based filtering for conversations
   - We can support role-based access with different permission levels

### 5. Efficient data filtering patterns

Based on our research, here are key patterns for implementing efficient data
filtering based on user roles and attributes:

1. **Performance Considerations**:

   - RLS policies can impact query performance
   - Complex access control logic can slow down queries
   - Inefficient joins in RLS policies can cause performance issues
   - Large permission sets can impact lookup times

2. **Optimization Techniques**:

   - Use indexes on columns used in RLS policies
   - Use security definer functions for complex access control logic
   - Optimize subqueries in RLS policies
   - Use IN clauses instead of joins when possible
   - Cache permission results for frequently accessed resources
   - Explicitly filter by user ID in application queries when possible

3. **Example Optimizations**:

   - Create appropriate indexes:
     ```sql
     CREATE INDEX idx_user_id ON memories(user_id);
     CREATE INDEX idx_tags ON memories USING GIN(tags);
     ```
   - Use security definer functions:

     ```sql
     CREATE FUNCTION private.get_user_permissions(user_id UUID)
     RETURNS TABLE(resource TEXT, action TEXT, attributes JSONB)
     LANGUAGE SQL SECURITY DEFINER AS $$
       -- Complex permission lookup logic
       SELECT p.resource, p.action, p.attributes
       FROM permissions p
       JOIN role_permissions rp ON p.id = rp.permission_id
       JOIN user_roles ur ON rp.role_id = ur.role_id
       WHERE ur.user_id = get_user_permissions.user_id;
     $$;

     -- Use in RLS policy
     CREATE POLICY "Access control" ON memories
     FOR SELECT USING (
       EXISTS (
         SELECT 1 FROM private.get_user_permissions(auth.uid())
         WHERE resource = 'memory' AND action = 'read'
       )
     );
     ```

   - Optimize application queries:
     ```javascript
     // Explicitly filter by user ID in application code
     const { data } = supabase.from('memories').select().eq('user_id', userId);
     ```

4. **Applying to Verding Memory System**:
   - We can implement efficient RLS policies with appropriate indexes
   - We can use security definer functions for complex access control logic
   - We can optimize query patterns in both database and application code
   - We can implement caching for frequently accessed permissions
   - We can design our schema to support efficient filtering

### 6. Access control implementation in n8n workflows

For implementing access control in n8n workflows, our research indicates the
following approaches:

1. **Core Concepts**:

   - n8n workflows can make HTTP requests to the Supabase API
   - Authentication tokens can be passed to authenticate requests
   - RLS policies in Supabase will be enforced for all API requests
   - n8n can implement additional access control logic in workflow nodes
   - Workflows can check permissions before performing operations

2. **Implementation Approaches**:

   - Use Supabase credentials node to authenticate requests
   - Pass user context in workflow data
   - Check permissions in workflow nodes before performing operations
   - Implement custom logic for complex permission scenarios
   - Use workflow variables to store and check permissions

3. **Example Workflow Patterns**:

   - Authenticate with Supabase:
     ```
     Supabase node > Authentication > Login with email/password
     Store JWT token in workflow variables
     ```
   - Check permissions before database operations:
     ```
     HTTP Request node > GET /rest/v1/user_permissions?user_id=eq.${userId}
     IF node > Check if permission exists
     Supabase node > Only execute database operation if permission check passes
     ```
   - Implement custom permission logic:
     ```
     Function node > Implement custom permission check logic
     IF node > Only proceed if permission check passes
     ```

4. **Applying to Verding Memory System**:
   - n8n workflows can authenticate with Supabase using JWT tokens
   - Workflows can check permissions before performing operations
   - RLS policies in Supabase will enforce access control for API requests
   - Workflows can implement additional access control logic as needed
   - Workflows can use the MCP interface to communicate with the main backend
   - We can implement custom permission checks in workflow nodes
