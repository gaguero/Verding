# Verding Feature Specifications

## File System

### Frontend Repository Structure

```
verding-frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images, fonts, etc.
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Shared components (buttons, inputs, etc.)
│   │   ├── layout/            # Layout components (header, footer, etc.)
│   │   └── features/          # Feature-specific components
│   │       ├── agent/         # Agent interaction components
│   │       ├── operations/    # Operations management components
│   │       ├── customers/     # Customer management components
│   │       ├── inventory/     # Inventory management components
│   │       ├── knowledge/     # Knowledge base components
│   │       ├── bujo/          # Bullet journal components
│   │       └── settings/      # Settings and profile components
│   ├── contexts/              # React contexts for state management
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── operations/        # Operations management pages
│   │   ├── customers/         # Customer management pages
│   │   ├── inventory/         # Inventory management pages
│   │   ├── knowledge/         # Knowledge base pages
│   │   ├── bujo/              # Bullet journal pages
│   │   └── settings/          # Settings pages
│   ├── services/              # API service functions
│   │   ├── api.ts             # Base API configuration
│   │   ├── agent.ts           # Agent API services
│   │   ├── auth.ts            # Authentication services
│   │   ├── operations.ts      # Operations management services
│   │   ├── customers.ts       # Customer management services
│   │   ├── inventory.ts       # Inventory management services
│   │   ├── knowledge.ts       # Knowledge base services
│   │   └── settings.ts        # Settings services
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── i18n/                  # Internationalization
│   ├── App.tsx                # Main application component
│   ├── index.tsx              # Entry point
│   └── routes.tsx             # Application routes
├── .env.development           # Development environment variables
├── .env.production            # Production environment variables
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

### Mobile App Repository Structure (React Native/Expo)

```
verding-mobile/
├── assets/                    # Images, fonts, etc.
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Shared components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature-specific components
│   │       ├── agent/         # Agent interaction components
│   │       ├── operations/    # Operations management components
│   │       ├── customers/     # Customer management components
│   │       ├── inventory/     # Inventory management components
│   │       ├── knowledge/     # Knowledge base components
│   │       ├── bujo/          # Bullet journal components
│   │       └── settings/      # Settings and profile components
│   ├── contexts/              # React contexts for state management
│   ├── hooks/                 # Custom React hooks
│   ├── screens/               # Screen components
│   │   ├── auth/              # Authentication screens
│   │   ├── dashboard/         # Dashboard screens
│   │   ├── operations/        # Operations management screens
│   │   ├── customers/         # Customer management screens
│   │   ├── inventory/         # Inventory management screens
│   │   ├── knowledge/         # Knowledge base screens
│   │   ├── bujo/              # Bullet journal screens
│   │   └── settings/          # Settings screens
│   ├── services/              # API service functions
│   │   ├── api.ts             # Base API configuration
│   │   ├── agent.ts           # Agent API services
│   │   ├── auth.ts            # Authentication services
│   │   ├── operations.ts      # Operations management services
│   │   ├── customers.ts       # Customer management services
│   │   ├── inventory.ts       # Inventory management services
│   │   ├── knowledge.ts       # Knowledge base services
│   │   └── settings.ts        # Settings services
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── i18n/                  # Internationalization
│   ├── App.tsx                # Main application component
│   └── navigation.tsx         # Navigation configuration
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

### Backend Repository Structure

```
verding-backend/
├── src/
│   ├── api/                   # API routes and controllers
│   │   ├── agent/             # Agent API endpoints
│   │   ├── auth/              # Authentication endpoints
│   │   ├── operations/        # Operations management endpoints
│   │   ├── customers/         # Customer management endpoints
│   │   ├── inventory/         # Inventory management endpoints
│   │   ├── knowledge/         # Knowledge base endpoints
│   │   ├── sensors/           # Sensor data endpoints
│   │   └── settings/          # Settings endpoints
│   ├── config/                # Configuration files
│   ├── db/                    # Database models and migrations
│   │   ├── migrations/        # Database migrations
│   │   ├── models/            # Database models
│   │   └── seeds/             # Seed data
│   ├── integrations/          # Third-party integrations
│   │   ├── llm/               # LLM integration
│   │   ├── homeAssistant/     # Home Assistant integration
│   │   ├── telegram/          # Telegram integration
│   │   ├── email/             # Email integration
│   │   └── stripe/            # Stripe integration
│   ├── middleware/            # Express middleware
│   ├── services/              # Business logic services
│   │   ├── agent/             # Agent services
│   │   ├── auth/              # Authentication services
│   │   ├── operations/        # Operations management services
│   │   ├── customers/         # Customer management services
│   │   ├── inventory/         # Inventory management services
│   │   ├── knowledge/         # Knowledge base services
│   │   ├── sensors/           # Sensor data services
│   │   └── notifications/     # Notification services
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── app.ts                 # Express application setup
│   └── server.ts              # Server entry point
├── n8n-workflows/             # n8n workflow definitions
│   ├── agent-workflows/       # Agent interaction workflows
│   ├── sensor-workflows/      # Sensor data processing workflows
│   ├── notification-workflows/# Notification workflows
│   └── integration-workflows/ # Third-party integration workflows
├── .env.development           # Development environment variables
├── .env.production            # Production environment variables
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

### Database Schema Structure (Supabase)

```
verding-db/
├── migrations/                # Database migrations
│   ├── 001_initial_schema.sql # Initial schema creation
│   ├── 002_auth_schema.sql    # Authentication schema
│   ├── 003_operations.sql     # Operations schema
│   ├── 004_customers.sql      # Customers schema
│   ├── 005_inventory.sql      # Inventory schema
│   ├── 006_knowledge.sql      # Knowledge base schema
│   ├── 007_sensors.sql        # Sensor data schema
│   └── 008_bujo.sql           # Bullet journal schema
├── seeds/                     # Seed data
│   ├── 001_seed_users.sql     # Seed users
│   ├── 002_seed_products.sql  # Seed products
│   └── 003_seed_settings.sql  # Seed settings
└── functions/                 # Database functions
    ├── vector_search.sql      # Vector search functions
    ├── auth_functions.sql     # Authentication functions
    └── trigger_functions.sql  # Trigger functions
```

## Feature Specifications

### 1. Agent Core & Natural Language Processing

#### Feature Goal

Create a sophisticated agent system that understands and processes natural
language commands across all modules, serving as the primary interface for users
to interact with the Verding system.

#### API Relationships

- Integrates with LLM API (OpenAI)
- Connects to n8n for workflow orchestration
- Interfaces with Supabase/pgvector for vector embeddings and semantic search
- Communicates with Telegram and email APIs for multi-channel support

#### Detailed Feature Requirements

1. **Natural Language Understanding**

   - Process and understand domain-specific microgreens terminology
   - Recognize intents related to all system operations (sowing, harvesting,
     customer management, etc.)
   - Extract entities from user queries (dates, products, customers, etc.)
   - Handle conversational context and reference resolution
   - Support English language with architecture ready for Spanish expansion

2. **Context Management**

   - Maintain conversation history for contextual understanding
   - Track conversation state across multiple interactions
   - Handle context switching between different topics
   - Implement fallback mechanisms for unclear queries
   - Store and retrieve conversation sessions

3. **Hybrid Memory System**

   - Long-term knowledge storage for persistent information
   - Short-term memory for conversation context
   - Integration with document knowledge base
   - Vector-based semantic search for relevant information retrieval
   - Memory update mechanisms for learning from interactions

4. **Memory System Access Control**

   - Tag-based access control for memory records
   - Role-based and attribute-based permissions
   - Property-scoped memory access
   - Flexible permission management without rigid categories
   - Integration with user authentication and property access

5. **Multi-channel Support**

   - Telegram integration for chat-based interactions
   - Email integration for asynchronous communication
   - Consistent experience across different channels
   - Channel-specific formatting and capabilities
   - Seamless context sharing between channels

6. **Response Generation**
   - Natural language response generation based on system data
   - Consistent tone and style across interactions
   - Appropriate formatting for different types of information
   - Error handling and clarification requests
   - Confirmation of actions and transactions

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Implement a modular agent architecture with separate
     components for understanding, processing, and responding
   - **Technology Stack**:
     - OpenAI API for LLM capabilities
     - n8n for workflow orchestration
     - Supabase/pgvector for vector embeddings and semantic search
     - Node.js with Express for API endpoints
   - **Integration Points**:
     - LLM API for natural language processing
     - Telegram Bot API for chat interactions
     - Email service (SMTP/IMAP) for email interactions
     - Supabase for data storage and retrieval

2. **Database Schema Design**

   - **Properties Table**:

     - `id`: UUID (primary key)
     - `name`: VARCHAR (property name)
     - `description`: TEXT (optional property description)
     - `location`: GEOGRAPHY (geographical location)
     - `parent_id`: UUID (foreign key to properties table for hierarchy)
     - `metadata`: JSONB (additional property metadata)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **User_Property_Access Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `role`: ENUM ('admin', 'manager', 'employee', 'viewer')
     - `permissions`: JSONB (specific permissions for this property)
     - `created_at`: TIMESTAMP

   - **Conversation_History Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table) **NEW: Property
       context**
     - `channel`: ENUM ('web', 'telegram', 'whatsapp', 'email', 'phone')
     - `message`: TEXT
     - `response`: TEXT
     - `timestamp`: TIMESTAMP
     - `metadata`: JSONB

   - **Memory_Chunks Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table) **NEW: Property
       context**
     - `content`: TEXT
     - `embedding`: VECTOR
     - `metadata`: JSONB
     - `access_tags`: JSONB (tag-based access control)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Agent_Sessions Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `active_property_id`: UUID (foreign key to properties table) **NEW:
       Session property context**
     - `session_token`: VARCHAR
     - `created_at`: TIMESTAMP
     - `last_active`: TIMESTAMP

   - **Indexing Strategy**:
     - Create index on `conversation_history.user_id`
     - Create index on `conversation_history.property_id` **NEW: Property-based
       queries**
     - Create index on `conversation_history.channel`
     - Create index on `conversation_history.timestamp`
     - Create composite index on `conversation_history(property_id, user_id)`
       **NEW: Property-user queries**
     - Create HNSW index on `memory_chunks.embedding` for vector search
     - Create TSVector index on `memory_chunks.content` for full-text search
     - Create index on `memory_chunks.property_id` **NEW: Property-scoped
       memory**
     - Create composite index on `memory_chunks(property_id, user_id)` **NEW:
       Property-user memory**
     - Create index on `user_property_access(user_id, property_id)` **NEW:
       Permission lookups**
     - Create index on `properties.parent_id` **NEW: Hierarchy queries**

   **Memory System Access Control Implementation:**

   The memory system implements a flexible, tag-based access control mechanism
   that combines aspects of Role-Based Access Control (RBAC) and Attribute-Based
   Access Control (ABAC) to provide granular, context-aware permissions for
   memory records.

   **Memory Tags Framework:** Memory records are assigned tags that determine
   their visibility and access rules. These tags form the foundation of the
   access control system and enable flexible permission management without rigid
   predefined categories.

   Tag types include:

   - User-specific: `user:123e4567-e89b-12d3-a456-426614174000`
   - Role-based: `role:admin`, `role:employee`, `role:client`
   - Content-based: `type:conversation`, `type:document`, `type:knowledge`
   - Sensitivity-based: `sensitivity:public`, `sensitivity:internal`,
     `sensitivity:confidential`
   - Context-based: `context:support`, `context:sales`, `context:technical`
   - Property-scoped: `property:f47ac10b-58cc-4372-a567-0e02b2c3d479`

   Tags can be combined to create sophisticated access patterns, such as
   `role:admin AND property:123` or
   `user:456 OR role:manager AND context:support`.

   **Database Schema for Memory Access Control:**

   - **Memory_Records Table**:

     - `id`: UUID (primary key)
     - `content`: TEXT (memory content)
     - `embedding`: VECTOR(1536) (vector embedding)
     - `metadata`: JSONB (additional metadata)
     - `tags`: TEXT[] (access control tags)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Access_Rules Table**:

     - `id`: UUID (primary key)
     - `name`: VARCHAR (rule name)
     - `description`: TEXT (rule description)
     - `rule_expression`: TEXT (access rule logic)
     - `priority`: INTEGER (rule priority, default 100)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **User_Permissions Table**:
     - `user_id`: UUID (foreign key to auth.users)
     - `permission_key`: VARCHAR (permission identifier)
     - `permission_value`: VARCHAR (permission value)
     - `created_at`: TIMESTAMP

   **Row Level Security Implementation:**

   Row Level Security (RLS) in Supabase enforces access control at the database
   level, ensuring that users can only retrieve memory records they have
   permission to access.

   Example RLS Policy:

   ```sql
   CREATE POLICY memory_access_policy ON memory_records
     USING (
       EXISTS (
         SELECT 1 FROM user_permissions up
         WHERE up.user_id = auth.uid()
         AND (
           -- User has direct access to this record
           ('user:' || up.user_id::text) = ANY(memory_records.tags)
           OR
           -- User has role-based access
           ('role:' || up.permission_value) = ANY(memory_records.tags)
           OR
           -- User has property-based access
           (up.permission_key = 'property_access' AND
            ('property:' || up.permission_value) = ANY(memory_records.tags))
         )
       )
     );
   ```

3. **API Design**

   - **POST /api/agent/message**

     - Request:
       ```json
       {
         "message": "Plan my sowing for next week",
         "conversation_id": "optional-existing-conversation-id",
         "property_id": "property-uuid-for-context",
         "channel": "telegram",
         "channel_metadata": {}
       }
       ```
     - Response:
       ```json
       {
         "response": "I've planned your sowing schedule for next week...",
         "conversation_id": "conversation-uuid",
         "property_id": "property-uuid",
         "actions": [
           {
             "type": "sowing_plan",
             "data": { ... },
             "property_id": "property-uuid"
           }
         ]
       }
       ```

   - **GET /api/agent/conversations**

     - Request: Query parameters for pagination and filtering, including
       optional property_id filter
     - Response: List of conversations with metadata, including property context

   - **GET /api/agent/conversations/:id/messages**

     - Request: Query parameters for pagination
     - Response: List of messages in the conversation with property context

   - **GET /api/agent/properties**

     - Request: Query parameters for user-accessible properties
     - Response:
       ```json
       {
         "properties": [
           {
             "id": "property-uuid",
             "name": "Main Farm",
             "description": "Primary microgreens facility",
             "role": "admin",
             "permissions": ["read", "write", "manage"]
           }
         ]
       }
       ```

   - **POST /api/agent/property-context**

     - Request:
       ```json
       {
         "property_id": "property-uuid",
         "conversation_id": "conversation-uuid"
       }
       ```
     - Response: Confirmation of property context switch

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 403: Forbidden (insufficient property access)
     - 404: Not Found (conversation or property not found)
     - 500: Internal Server Error (processing error)

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `AgentChat` (parent)
       - `MessageList` (displays conversation history)
       - `MessageInput` (user input field)
       - `ResponseActions` (action buttons based on agent response)
       - `TypingIndicator` (shows when agent is processing)

   - **State Management**:

     - Use React Context for conversation state
     - Implement WebSocket for real-time updates
     - Store conversation history in local storage for persistence

   - **Responsive Design**:
     - Mobile-first approach with adaptive layout
     - Collapsible sidebar for navigation on small screens
     - Touch-friendly input controls

5. **CRUD Operations**

   - **Create**:

     - Create new conversations
     - Add messages to conversations
     - Store memory items

   - **Read**:

     - Retrieve conversation history
     - Search memory for relevant information
     - Get conversation metadata

   - **Update**:

     - Update conversation metadata
     - Modify memory items
     - Mark conversations as read/unread

   - **Delete**:
     - Implement soft delete for conversations
     - Allow memory item expiration
     - Provide data retention controls

6. **User Experience Flow**

   - **Initial Interaction**:

     - User sends message through preferred channel
     - System creates conversation if none exists
     - Agent processes message and generates response
     - Response is delivered through same channel

   - **Conversation Continuation**:

     - System maintains context across messages
     - Agent references previous interactions when relevant
     - User can switch channels while maintaining context

   - **Error Handling**:
     - Clear error messages for misunderstood queries
     - Suggestions for clarification
     - Fallback options for critical operations

7. **Security Considerations**

   - **Authentication**:

     - JWT-based authentication for API access
     - Channel-specific authentication (Telegram token, email verification)
     - Session management with appropriate timeouts

   - **Authorization**:

     - Role-based access control for different operations
     - User-specific data isolation
     - Audit logging for sensitive operations

   - **Data Protection**:
     - Encryption of sensitive conversation data
     - Secure handling of API keys and credentials
     - Compliance with data protection regulations

8. **Testing Strategy**

   - **Unit Tests**:

     - Test intent recognition accuracy
     - Validate entity extraction
     - Verify context management

   - **Integration Tests**:

     - Test end-to-end conversation flows
     - Verify channel integration
     - Test LLM integration

   - **Performance Tests**:
     - Measure response time under load
     - Test concurrent conversation handling
     - Evaluate memory retrieval performance

9. **Data Management**

   - **Conversation Lifecycle**:

     - Active conversations (recent interactions)
     - Archived conversations (older, completed)
     - Deleted conversations (soft delete)

   - **Memory Management**:

     - Short-term memory (conversation context)
     - Long-term memory (user preferences, common patterns)
     - Document knowledge (extracted from uploaded documents)

   - **Caching Strategy**:
     - Cache frequent queries and responses
     - Cache user context during active sessions
     - Implement TTL for cached items

10. **Error Handling & Logging**

    - **Structured Logging**:

      - Log all agent interactions with appropriate context
      - Track processing time and resource usage
      - Record error conditions and recovery attempts

    - **Error Classification**:

      - Input errors (misunderstood queries)
      - Processing errors (workflow failures)
      - Integration errors (API failures)
      - System errors (internal failures)

    - **Monitoring**:
      - Track success rate of intent recognition
      - Monitor response time and quality
      - Alert on repeated failures or degraded performance

### 2. Progressive Setup & Onboarding

#### Feature Goal

Provide a guided first-run experience that collects essential information and
progressively unlocks system features, ensuring users follow a logical sequence
when setting up their microgreens business. **This system includes comprehensive
account management capabilities with multi-property support, enabling users to
manage one or multiple properties (farms/locations) with appropriate access
control and billing plan relationships.**

#### API Relationships

- Interfaces with Agent Core for conversational onboarding
- Connects to Stripe API for billing plan management
- Integrates with n8n for setup workflow orchestration
- Utilizes Supabase for user data storage
- **Implements property-aware access control for multi-property scenarios**
- **Integrates with Row Level Security (RLS) for property-scoped data access**

#### Detailed Feature Requirements

1. **User Profile Creation**

   - Collect basic user information (name, email, company)
   - Set up authentication credentials
   - Capture business details (size, focus areas)
   - Store preferences (units, date format, language)
   - Create initial user profile
   - **Property Assignment: Assign users to properties with specific roles and
     permissions**
   - **Multi-Property Support: Handle users with access to multiple properties**

2. **Billing Plan Management**

   - Present available subscription tiers
   - Process plan selection
   - Handle payment information securely
   - Manage trial periods
   - Track subscription status
   - **Property-Level Billing: Support property-specific billing plans and
     subscriptions**
   - **Billing Hierarchy: Handle account-level and property-level billing
     relationships**
   - **Usage-Based Billing: Track property-specific usage for billing purposes**

3. **Progressive Feature Unlocking**

   - Implement dependency tree for features
   - Track setup progress
   - Unlock features as prerequisites are completed
   - Provide guidance for next steps
   - Allow skipping optional steps
   - **Property-Scoped Unlocking: Feature unlocking per property context**
   - **Cross-Property Features: Unlock features that span multiple properties**

4. **Initial Data Collection**

   - Guide users through adding seed suppliers
   - Facilitate grow medium setup
   - Help create product categories
   - Assist with customer creation
   - Support inventory initialization
   - **Property Context Collection: Gather property-specific configuration and
     preferences**
   - **Property Relationships: Set up relationships between properties
     (parent/child, shared resources)**

5. **Setup Checklist**

   - Display overall setup progress
   - Show completed and pending tasks
   - Provide estimated time for remaining tasks
   - Allow returning to previous steps
   - Celebrate milestone completions
   - **Property-Specific Checklists: Individual setup progress for each
     property**
   - **Cross-Property Dependencies: Show setup dependencies between properties**

6. **Account Management & User Administration**

   - **User Role Management: Comprehensive role-based access control with
     property-specific permissions**
   - **Property Access Control: Manage user access to multiple properties with
     different permission levels**
   - **Account Settings: Property-aware preferences and configuration
     management**
   - **Team Management: Invite and manage team members with property-specific
     roles**
   - **Access Auditing: Track and audit user access patterns across properties**

7. **Property Management**
   - **Property Creation: Guide users through creating new properties
     (farms/locations)**
   - **Property Configuration: Set up property-specific settings, preferences,
     and parameters**
   - **Property Relationships: Establish hierarchical relationships between
     properties**
   - **Property Switching: Enable seamless context switching between
     properties**
   - **Property Permissions: Manage fine-grained permissions at the property
     level**

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Implement a state-machine based onboarding flow with
     clear progression stages
   - **Technology Stack**:
     - n8n for workflow orchestration
     - Stripe for billing management
     - Supabase for user data storage
     - React/React Native for UI
   - **Integration Points**:
     - Stripe API for subscription management
     - Agent Core for conversational guidance
     - Email service for verification and notifications

2. **Database Schema Design**

   - **Users Table**:

     - `id`: UUID (primary key)
     - `email`: VARCHAR (unique)
     - `password_hash`: VARCHAR
     - `first_name`: VARCHAR
     - `last_name`: VARCHAR
     - `company_name`: VARCHAR
     - `global_role`: ENUM ('super_admin', 'account_admin', 'user') DEFAULT
       'user'
     - `last_property_id`: UUID (foreign key to properties table, tracks last
       active property)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP
     - `last_login`: TIMESTAMP

   - **Properties Table**:

     - `id`: UUID (primary key)
     - `name`: VARCHAR NOT NULL
     - `description`: TEXT
     - `location`: GEOGRAPHY
     - `parent_id`: UUID (foreign key to properties table, for hierarchical
       organization)
     - `owner_id`: UUID (foreign key to users table)
     - `metadata`: JSONB (property-specific settings and configuration)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **User_Property_Access Table** (manages multi-property access control):

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `role`: ENUM ('owner', 'admin', 'manager', 'employee', 'viewer')
     - `permissions`: JSONB (fine-grained permissions object)
     - `granted_by`: UUID (foreign key to users table, who granted this access)
     - `granted_at`: TIMESTAMP
     - `revoked_at`: TIMESTAMP (nullable, for access revocation tracking)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Profiles Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `language`: VARCHAR (default 'en')
     - `date_format`: VARCHAR
     - `weight_unit`: VARCHAR
     - `timezone`: VARCHAR
     - `notification_preferences`: JSONB
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Subscriptions Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table, nullable for
       account-level subscriptions)
     - `billing_scope`: ENUM ('account', 'property') DEFAULT 'property'
     - `stripe_customer_id`: VARCHAR
     - `stripe_subscription_id`: VARCHAR
     - `plan_id`: VARCHAR
     - `plan_type`: ENUM ('basic', 'professional', 'enterprise') DEFAULT 'basic'
     - `billing_interval`: ENUM ('monthly', 'yearly') DEFAULT 'monthly'
     - `status`: ENUM ('trialing', 'active', 'past_due', 'canceled', 'unpaid')
     - `trial_start`: TIMESTAMP
     - `trial_end`: TIMESTAMP
     - `current_period_start`: TIMESTAMP
     - `current_period_end`: TIMESTAMP
     - `usage_limits`: JSONB (property-specific usage limits and tracking)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Setup_Progress Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `step_id`: VARCHAR
     - `status`: ENUM ('not_started', 'in_progress', 'completed', 'skipped')
     - `completed_at`: TIMESTAMP
     - `data`: JSONB (step-specific data)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **User_Sessions Table** (tracks property context for sessions):

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `session_token`: VARCHAR (unique)
     - `current_property_id`: UUID (foreign key to properties table)
     - `login_at`: TIMESTAMP
     - `last_activity`: TIMESTAMP
     - `expires_at`: TIMESTAMP
     - `ip_address`: INET
     - `user_agent`: TEXT
     - `created_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create unique index on `users.email`
     - Create index on `profiles.user_id`
     - Create index on `profiles.property_id`
     - Create composite index on `user_property_access(user_id, property_id)`
     - Create index on `user_property_access.property_id`
     - Create index on `subscriptions.user_id`
     - Create index on `subscriptions.property_id`
     - Create index on `setup_progress.user_id`
     - Create index on `setup_progress.property_id`
     - Create composite index on `setup_progress(step_id, user_id, property_id)`
     - Create index on `user_sessions.user_id`
     - Create index on `user_sessions.session_token`
     - Create index on `properties.parent_id`
     - Create index on `properties.owner_id`

3. **API Design**

   - **POST /api/auth/register**

     - Request:
       ```json
       {
         "email": "user@example.com",
         "password": "secure_password",
         "first_name": "John",
         "last_name": "Doe",
         "company_name": "Green Sprouts Inc.",
         "initial_property_name": "Main Farm"
       }
       ```
     - Response:
       ```json
       {
         "user_id": "user-uuid",
         "email": "user@example.com",
         "token": "jwt-token",
         "default_property": {
           "id": "property-uuid",
           "name": "Main Farm",
           "role": "owner"
         }
       }
       ```

   - **POST /api/auth/login**

     - Request:
       ```json
       {
         "email": "user@example.com",
         "password": "secure_password",
         "property_id": "property-uuid"
       }
       ```
     - Response:
       ```json
       {
         "user_id": "user-uuid",
         "token": "jwt-token",
         "current_property": {
           "id": "property-uuid",
           "name": "Main Farm",
           "role": "owner",
           "permissions": ["read", "write", "admin"]
         },
         "accessible_properties": [
           {
             "id": "property-uuid",
             "name": "Main Farm",
             "role": "owner"
           },
           {
             "id": "property-uuid-2",
             "name": "Secondary Location",
             "role": "manager"
           }
         ]
       }
       ```

   - **POST /api/auth/switch-property**

     - Request:
       ```json
       {
         "property_id": "property-uuid-2"
       }
       ```
     - Response:
       ```json
       {
         "current_property": {
           "id": "property-uuid-2",
           "name": "Secondary Location",
           "role": "manager",
           "permissions": ["read", "write"]
         },
         "session_updated": true
       }
       ```

   - **GET /api/user/properties**

     - Response:
       ```json
       {
         "properties": [
           {
             "id": "property-uuid",
             "name": "Main Farm",
             "role": "owner",
             "permissions": ["read", "write", "admin"],
             "subscription_status": "active",
             "last_accessed": "2023-01-15T14:30:00Z"
           },
           {
             "id": "property-uuid-2",
             "name": "Secondary Location",
             "role": "manager",
             "permissions": ["read", "write"],
             "subscription_status": "active",
             "last_accessed": "2023-01-10T09:15:00Z"
           }
         ],
         "current_property_id": "property-uuid"
       }
       ```

   - **POST /api/properties**

     - Request:
       ```json
       {
         "name": "New Farm Location",
         "description": "Secondary growing facility",
         "location": {
           "lat": 40.7128,
           "lng": -74.006,
           "address": "123 Farm Road, City, State"
         },
         "parent_id": null,
         "metadata": {
           "growing_area_sqft": 2000,
           "climate_zone": "4a"
         }
       }
       ```
     - Response:
       ```json
       {
         "property": {
           "id": "property-uuid-3",
           "name": "New Farm Location",
           "description": "Secondary growing facility",
           "owner_id": "user-uuid",
           "created_at": "2023-01-15T14:30:00Z"
         },
         "user_access": {
           "role": "owner",
           "permissions": ["read", "write", "admin"]
         }
       }
       ```

   - **POST /api/properties/{property_id}/users**

     - Request:
       ```json
       {
         "email": "employee@example.com",
         "role": "employee",
         "permissions": {
           "operations": ["read", "write"],
           "inventory": ["read"],
           "customers": ["read"],
           "reports": ["read"]
         },
         "send_invitation": true
       }
       ```
     - Response:
       ```json
       {
         "user_access": {
           "id": "access-uuid",
           "user_id": "invited-user-uuid",
           "property_id": "property-uuid",
           "role": "employee",
           "granted_at": "2023-01-15T14:30:00Z"
         },
         "invitation_sent": true
       }
       ```

   - **GET /api/properties/{property_id}/users**

     - Response:
       ```json
       {
         "users": [
           {
             "user_id": "user-uuid",
             "email": "owner@example.com",
             "name": "John Doe",
             "role": "owner",
             "permissions": ["read", "write", "admin"],
             "granted_at": "2023-01-01T00:00:00Z",
             "last_accessed": "2023-01-15T14:30:00Z"
           },
           {
             "user_id": "employee-uuid",
             "email": "employee@example.com",
             "name": "Jane Smith",
             "role": "employee",
             "permissions": {
               "operations": ["read", "write"],
               "inventory": ["read"]
             },
             "granted_at": "2023-01-10T09:15:00Z",
             "last_accessed": "2023-01-14T16:45:00Z"
           }
         ]
       }
       ```

   - **POST /api/onboarding/subscription**
     - Request:
       ```json
       {
         "plan_id": "basic_monthly",
         "payment_method_id": "pm_card_visa",
         "property_id": "property-uuid",
         "billing_scope": "property"
       }
       ```
     - Response:
       ```json
       {
         "subscription_id": "subscription-uuid",
         "status": "active",
         "property_id": "property-uuid",
         "billing_scope": "property",
         "current_period_end": "2023-12-31T23:59:59Z",
         "usage_limits": {
           "max_crops": 50,
           "max_customers": 100,
           "max_orders_per_month": 500
         },
         "next_steps": [
           {
             "id": "seed_supplier",
             "name": "Create Seed Supplier",
             "description": "Add your first seed supplier"
           }
         ]
       }
       ```

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `OnboardingFlow` (parent)
       - `ProgressIndicator` (shows overall progress)
       - `StepContainer` (displays current step)
       - `ProfileForm` (profile setup step)
       - `BillingPlanSelector` (subscription step)
       - `DataEntryForm` (for various data collection steps)
       - `NavigationControls` (next/back buttons)

   - **State Management**:

     - Use React Context for onboarding state
     - Implement form state management with Formik or React Hook Form
     - Store progress in local storage for persistence

   - **Routing**:
     - Define routes for each onboarding step
     - Implement route guards for step dependencies
     - Allow deep linking with state restoration

5. **CRUD Operations**

   - **Create**:

     - Create user account
     - Create user profile
     - Create subscription
     - Create initial business data (suppliers, mediums, etc.)

   - **Read**:

     - Retrieve onboarding progress
     - Get available plans
     - Fetch step requirements

   - **Update**:

     - Update profile information
     - Modify subscription details
     - Update step status

   - **Delete**:
     - Cancel subscription (soft delete)
     - Remove draft data entries

6. **User Experience Flow**

   - **Registration**:

     - User enters email and password
     - System sends verification email
     - User confirms email and continues to profile setup

   - **Profile Setup**:

     - User enters personal and business information
     - System stores profile and proceeds to billing

   - **Billing Setup**:

     - User selects plan and enters payment information
     - System processes payment and activates subscription
     - User proceeds to initial data setup

   - **Data Setup**:

     - System guides user through adding seed suppliers
     - User adds grow mediums and product categories
     - System unlocks features as prerequisites are completed

   - **Completion**:
     - System congratulates user on completing setup
     - User is directed to main dashboard
     - Remaining optional steps are highlighted

7. **Security Considerations**

   - **Authentication**:

     - Secure password hashing (bcrypt)
     - Email verification for new accounts
     - JWT-based session management

   - **Payment Security**:

     - PCI-compliant payment processing via Stripe
     - No storage of credit card details
     - Secure handling of payment tokens

   - **Data Protection**:
     - Encryption of sensitive user data
     - Role-based access control
     - Audit logging for account changes

8. **Testing Strategy**

   - **Unit Tests**:

     - Validate form validation logic
     - Test step progression rules
     - Verify subscription handling

   - **Integration Tests**:

     - Test end-to-end registration flow
     - Verify Stripe integration
     - Test email verification

   - **User Testing**:
     - Measure completion rate of onboarding
     - Identify drop-off points
     - Gather feedback on clarity and ease of use

9. **Data Management**

   - **User Data Lifecycle**:

     - Initial creation during registration
     - Progressive enrichment during onboarding
     - Regular updates during normal usage

   - **Subscription Data**:

     - Synchronization with Stripe
     - Handling of subscription changes
     - Management of trial periods

   - **Progress Tracking**:
     - Persistent storage of step completion
     - Calculation of overall progress
     - Dependency tracking for feature unlocking

10. **Error Handling & Logging**

    - **Form Validation**:

      - Client-side validation for immediate feedback
      - Server-side validation for security
      - Clear error messages with resolution guidance

    - **Payment Error Handling**:

      - Specific handling for common payment issues
      - Retry mechanisms for transient failures
      - Alternative payment options

    - **Progress Recovery**:
      - Automatic saving of partial progress
      - Resume capability for interrupted sessions
      - Data recovery for browser crashes

### 3. Sensor Integration

#### Feature Goal

Connect to Home Assistant for automated environmental data collection, enabling
real-time monitoring, compliance record generation, and data-driven insights for
microgreens operations.

#### API Relationships

- Integrates with Home Assistant API via MQTT bridge
- Connects to n8n for sensor data processing workflows
- Interfaces with Supabase for time-series data storage
- Feeds into Agent Core for natural language queries about sensor data

#### Detailed Feature Requirements

1. **Sensor Connection Management**

   - Establish secure connection to Home Assistant
   - Discover available sensors
   - Configure sensor polling frequency
   - Monitor connection health
   - Handle reconnection automatically

2. **Data Collection & Storage**

   - Collect temperature readings
   - Monitor humidity levels
   - Track pH measurements (if available)
   - Store time-series data efficiently
   - Implement data retention policies

3. **Compliance Record Generation**

   - Create temperature records for GAP compliance
   - Generate humidity logs
   - Document environmental conditions
   - Support audit trail requirements
   - Enable report generation

4. **Anomaly Detection & Alerting**

   - Define normal ranges for environmental parameters
   - Detect out-of-range conditions
   - Generate alerts for anomalies
   - Escalate critical conditions
   - Track resolution of issues

5. **Data Visualization & Reporting**
   - Display real-time sensor readings
   - Show historical trends
   - Generate compliance reports
   - Export data in standard formats
   - Support custom reporting periods

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Implement a sensor integration layer with data
     collection, processing, and storage components
   - **Technology Stack**:
     - Home Assistant MQTT bridge for sensor connectivity
     - n8n for sensor data processing workflows
     - Supabase for time-series data storage
     - Node.js with Express for API endpoints
   - **Integration Points**:
     - Home Assistant API for sensor data
     - n8n workflows for data processing
     - Notification services for alerts

2. **Database Schema Design**

   - **Sensors Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `name`: VARCHAR
     - `type`: ENUM ('temperature', 'humidity', 'ph', 'other')
     - `location`: VARCHAR
     - `home_assistant_id`: VARCHAR
     - `metadata`: JSONB
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Sensor_Readings Table**:

     - `id`: UUID (primary key)
     - `sensor_id`: UUID (foreign key to sensors table)
     - `timestamp`: TIMESTAMP
     - `value`: DECIMAL
     - `unit`: VARCHAR
     - `metadata`: JSONB

   - **Compliance_Records Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `type`: ENUM ('temperature', 'humidity', 'ph', 'other')
     - `start_time`: TIMESTAMP
     - `end_time`: TIMESTAMP
     - `data`: JSONB
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP
     - `created_by`: UUID (foreign key to users table)

   - **Alerts Table**:

     - `id`: UUID (primary key)
     - `sensor_id`: UUID (foreign key to sensors table)
     - `type`: ENUM ('high', 'low', 'offline', 'other')
     - `severity`: ENUM ('info', 'warning', 'critical')
     - `message`: TEXT
     - `timestamp`: TIMESTAMP
     - `resolved_at`: TIMESTAMP
     - `resolved_by`: UUID (foreign key to users table)
     - `metadata`: JSONB

   - **Indexing Strategy**:
     - Create index on `sensors.user_id`
     - Create index on `sensors.property_id`
     - Create composite index on `sensors(user_id, property_id)` for efficient
       property-scoped queries
     - Create index on `sensor_readings.sensor_id`
     - Create index on `sensor_readings.timestamp`
     - Create index on `compliance_records.user_id`
     - Create index on `compliance_records.property_id`
     - Create composite index on `compliance_records(user_id, property_id)`
     - Create index on `compliance_records.type, compliance_records.start_time`
     - Create index on `alerts.sensor_id`
     - Create index on `alerts.timestamp`
     - Implement TimescaleDB hypertable for `sensor_readings` if using
       PostgreSQL extension

3. **API Design**

   - **POST /api/sensors/connect**

     - Request:
       ```json
       {
         "home_assistant_url": "http://homeassistant.local:8123",
         "api_token": "long-lived-access-token"
       }
       ```
     - Response:
       ```json
       {
         "connection_id": "connection-uuid",
         "status": "connected",
         "available_sensors": [
           {
             "id": "sensor.greenhouse_temperature",
             "name": "Greenhouse Temperature",
             "type": "temperature",
             "unit": "°C"
           },
           {
             "id": "sensor.greenhouse_humidity",
             "name": "Greenhouse Humidity",
             "type": "humidity",
             "unit": "%"
           }
         ]
       }
       ```

   - **POST /api/sensors/configure**

     - Request:
       ```json
       {
         "sensors": [
           {
             "home_assistant_id": "sensor.greenhouse_temperature",
             "name": "Main Greenhouse Temperature",
             "location": "Greenhouse Zone A",
             "polling_interval": 300,
             "alert_thresholds": {
               "high": 30,
               "low": 15
             }
           }
         ]
       }
       ```
     - Response:
       ```json
       {
         "configured_sensors": [
           {
             "id": "sensor-uuid",
             "name": "Main Greenhouse Temperature",
             "status": "active"
           }
         ]
       }
       ```

   - **GET /api/sensors/readings/:sensor_id**

     - Request: Query parameters for time range and aggregation
     - Response:
       ```json
       {
         "sensor": {
           "id": "sensor-uuid",
           "name": "Main Greenhouse Temperature",
           "type": "temperature",
           "unit": "°C"
         },
         "readings": [
           {
             "timestamp": "2023-01-15T14:00:00Z",
             "value": 22.5
           },
           {
             "timestamp": "2023-01-15T14:05:00Z",
             "value": 22.7
           }
         ],
         "statistics": {
           "min": 22.5,
           "max": 22.7,
           "avg": 22.6
         }
       }
       ```

   - **GET /api/compliance/records**

     - Request: Query parameters for record type and time range
     - Response: List of compliance records with metadata

   - **POST /api/compliance/generate**

     - Request:
       ```json
       {
         "type": "temperature",
         "start_time": "2023-01-01T00:00:00Z",
         "end_time": "2023-01-31T23:59:59Z",
         "sensors": ["sensor-uuid-1", "sensor-uuid-2"]
       }
       ```
     - Response:
       ```json
       {
         "record_id": "record-uuid",
         "type": "temperature",
         "status": "generated",
         "download_url": "/api/compliance/records/record-uuid/download"
       }
       ```

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 404: Not Found (sensor not found)
     - 503: Service Unavailable (Home Assistant connection issue)

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `SensorDashboard` (parent)
       - `SensorList` (displays configured sensors)
       - `SensorDetail` (shows individual sensor data)
       - `SensorChart` (visualizes readings over time)
       - `AlertPanel` (displays active alerts)
       - `ComplianceRecordList` (shows generated records)

   - **State Management**:

     - Use React Context for sensor state
     - Implement WebSocket for real-time updates
     - Use React Query for data fetching and caching

   - **Visualization**:
     - Line charts for time-series data
     - Gauge charts for current readings
     - Heat maps for spatial visualization
     - Exportable reports in PDF/CSV formats

5. **CRUD Operations**

   - **Create**:

     - Configure new sensors
     - Generate compliance records
     - Create alert thresholds

   - **Read**:

     - Retrieve sensor readings
     - Get sensor configuration
     - Access compliance records
     - View alert history

   - **Update**:

     - Modify sensor configuration
     - Update alert thresholds
     - Resolve alerts

   - **Delete**:
     - Remove sensor configuration
     - Delete historical data (with retention policy)
     - Archive compliance records

6. **User Experience Flow**

   - **Initial Setup**:

     - User provides Home Assistant connection details
     - System discovers available sensors
     - User selects and configures sensors for monitoring
     - System begins collecting data

   - **Daily Monitoring**:

     - User views current readings on dashboard
     - System displays alerts for out-of-range conditions
     - User can drill down into historical data

   - **Compliance Reporting**:
     - User selects report type and period
     - System generates compliance record
     - User reviews and exports report
     - System archives report for future reference

7. **Security Considerations**

   - **Authentication**:

     - Secure storage of Home Assistant API tokens
     - Role-based access to sensor data
     - Audit logging for configuration changes

   - **Data Integrity**:

     - Validation of incoming sensor data
     - Tamper-evident compliance records
     - Digital signatures for official reports

   - **Network Security**:
     - Encrypted communication with Home Assistant
     - Firewall rules for sensor network
     - Rate limiting for API requests

8. **Testing Strategy**

   - **Unit Tests**:

     - Test data processing functions
     - Validate alert threshold logic
     - Verify report generation

   - **Integration Tests**:

     - Test Home Assistant connectivity
     - Verify data storage and retrieval
     - Test alert generation and notification

   - **Simulation Testing**:
     - Simulate sensor data for edge cases
     - Test system response to anomalies
     - Verify performance under high data volume

9. **Data Management**

   - **Time-Series Data**:

     - Efficient storage with appropriate resolution
     - Automatic downsampling for older data
     - Retention policies based on data importance

   - **Compliance Data**:

     - Long-term storage for regulatory requirements
     - Immutable storage for audit purposes
     - Structured format for official reporting

   - **Alert Management**:
     - Prioritization based on severity
     - Aggregation of related alerts
     - Escalation paths for critical issues

10. **Error Handling & Logging**

    - **Sensor Connectivity**:

      - Detection of offline sensors
      - Automatic reconnection attempts
      - Notification of persistent connection issues

    - **Data Quality**:

      - Identification of anomalous readings
      - Handling of missing data points
      - Interpolation strategies where appropriate

    - **System Monitoring**:
      - Log all sensor interactions
      - Track data collection performance
      - Monitor storage usage and growth

### 4. Operations Management

#### Feature Goal

Provide core functionality for day-to-day microgreens operations with BuJo-style
task management, enabling efficient planning, tracking, and optimization of
growing activities.

#### API Relationships

- Interfaces with Agent Core for natural language task creation
- Connects to Sensor Integration for environmental data
- Integrates with Inventory Management for resource tracking
- Feeds into Customer & Order Management for delivery planning

#### Detailed Feature Requirements

1. **Sowing Planning & Scheduling**

   - Create sowing plans based on product requirements
   - Schedule sowing activities with dependencies
   - Calculate seed and medium requirements
   - Generate sowing cheat sheets
   - Track sowing completion and germination

2. **Harvest Management**

   - Schedule harvests based on product maturity
   - Track harvest weights and yields
   - Compare actual vs. expected yields
   - Generate harvest to-do lists
   - Plan delivery routes based on harvests

3. **BuJo-Style Task Management**

   - Implement Bullet Journal task notation
   - Support task categorization and prioritization
   - Enable task migration and rescheduling
   - Track task completion and productivity
   - Visualize daily, weekly, and monthly tasks

4. **Growing Process Tracking**

   - Monitor plant development stages
   - Track environmental conditions
   - Record interventions and treatments
   - Document issues and resolutions
   - Analyze growing performance

5. **Operational Analytics**
   - Calculate key performance indicators
   - Track resource efficiency
   - Analyze yield variations
   - Identify optimization opportunities
   - Generate operational reports

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Implement a task-centric operations management system
     with BuJo principles
   - **Technology Stack**:
     - n8n for workflow automation
     - Supabase for operational data
     - React/React Native for UI
     - Node.js with Express for API endpoints
   - **Integration Points**:
     - Agent Core for natural language commands
     - Sensor Integration for environmental data
     - Inventory Management for resource tracking

2. **Database Schema Design**

   - **Tasks Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `title`: VARCHAR
     - `description`: TEXT
     - `type`: ENUM ('task', 'event', 'note')
     - `status`: ENUM ('pending', 'completed', 'migrated', 'canceled')
     - `priority`: ENUM ('low', 'medium', 'high', 'urgent')
     - `due_date`: DATE
     - `completed_at`: TIMESTAMP
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP
     - `metadata`: JSONB

   - **Task_Collections Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `name`: VARCHAR
     - `type`: ENUM ('daily', 'weekly', 'monthly', 'custom')
     - `date`: DATE
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Task_Collection_Items Table**:

     - `id`: UUID (primary key)
     - `collection_id`: UUID (foreign key to task_collections table)
     - `task_id`: UUID (foreign key to tasks table)
     - `order`: INTEGER
     - `created_at`: TIMESTAMP

   - **Sowing_Plans Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `name`: VARCHAR
     - `start_date`: DATE
     - `end_date`: DATE
     - `status`: ENUM ('draft', 'active', 'completed', 'canceled')
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP
     - `metadata`: JSONB

   - **Sowing_Plan_Items Table**:

     - `id`: UUID (primary key)
     - `plan_id`: UUID (foreign key to sowing_plans table)
     - `product_id`: UUID (foreign key to products table)
     - `quantity`: INTEGER
     - `sowing_date`: DATE
     - `expected_harvest_date`: DATE
     - `seed_amount`: DECIMAL
     - `medium_amount`: DECIMAL
     - `status`: ENUM ('pending', 'sowed', 'germinated', 'harvested',
       'disposed')
     - `actual_sowing_date`: DATE
     - `actual_harvest_date`: DATE
     - `actual_yield`: DECIMAL
     - `notes`: TEXT
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Harvests Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `date`: DATE
     - `status`: ENUM ('planned', 'in_progress', 'completed')
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP
     - `metadata`: JSONB

   - **Harvest_Items Table**:

     - `id`: UUID (primary key)
     - `harvest_id`: UUID (foreign key to harvests table)
     - `sowing_plan_item_id`: UUID (foreign key to sowing_plan_items table)
     - `product_id`: UUID (foreign key to products table)
     - `expected_yield`: DECIMAL
     - `actual_yield`: DECIMAL
     - `unit`: VARCHAR
     - `status`: ENUM ('pending', 'harvested', 'packaged', 'delivered')
     - `notes`: TEXT
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create index on `tasks.user_id`
     - Create index on `tasks.property_id`
     - Create composite index on `tasks(user_id, property_id)` for efficient
       property-scoped queries
     - Create index on `tasks.due_date`
     - Create index on `tasks.status`
     - Create index on `task_collections.user_id`
     - Create index on `task_collections.property_id`
     - Create composite index on `task_collections(user_id, property_id)`
     - Create index on `task_collections.date`
     - Create index on `sowing_plans.user_id`
     - Create index on `sowing_plans.property_id`
     - Create composite index on `sowing_plans(user_id, property_id)`
     - Create index on `sowing_plans.start_date, sowing_plans.end_date`
     - Create index on `sowing_plan_items.plan_id`
     - Create index on `sowing_plan_items.sowing_date`
     - Create index on `sowing_plan_items.expected_harvest_date`
     - Create index on `harvests.user_id`
     - Create index on `harvests.property_id`
     - Create composite index on `harvests(user_id, property_id)`
     - Create index on `harvests.date`
     - Create index on `harvest_items.harvest_id`

3. **API Design**

   - **POST /api/tasks**

     - Request:
       ```json
       {
         "title": "Water seedlings in Zone A",
         "description": "Check moisture levels and water as needed",
         "type": "task",
         "priority": "high",
         "due_date": "2023-01-16",
         "metadata": {
           "location": "Zone A",
           "estimated_duration": 15
         }
       }
       ```
     - Response:
       ```json
       {
         "id": "task-uuid",
         "title": "Water seedlings in Zone A",
         "status": "pending",
         "due_date": "2023-01-16"
       }
       ```

   - **GET /api/tasks**

     - Request: Query parameters for filtering by date, status, type
     - Response: List of tasks matching criteria

   - **PATCH /api/tasks/:id**

     - Request:
       ```json
       {
         "status": "completed",
         "completed_at": "2023-01-16T10:30:00Z"
       }
       ```
     - Response: Updated task object

   - **POST /api/collections**

     - Request:
       ```json
       {
         "name": "Daily Log - January 16, 2023",
         "type": "daily",
         "date": "2023-01-16",
         "tasks": ["task-uuid-1", "task-uuid-2"]
       }
       ```
     - Response: Created collection object

   - **POST /api/sowing-plans**

     - Request:
       ```json
       {
         "name": "Week 3 Sowing Plan",
         "start_date": "2023-01-16",
         "end_date": "2023-01-22",
         "items": [
           {
             "product_id": "product-uuid",
             "quantity": 10,
             "sowing_date": "2023-01-17",
             "seed_amount": 50
           }
         ]
       }
       ```
     - Response: Created sowing plan object

   - **GET /api/sowing-plans/:id/cheatsheet**

     - Response: Sowing cheat sheet data for the specified plan

   - **POST /api/harvests**

     - Request:
       ```json
       {
         "date": "2023-01-16",
         "items": [
           {
             "sowing_plan_item_id": "sowing-item-uuid",
             "expected_yield": 5.2,
             "unit": "oz"
           }
         ]
       }
       ```
     - Response: Created harvest object

   - **GET /api/harvests/:id/todo**

     - Response: Harvest to-do list data for the specified harvest

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 404: Not Found (resource not found)
     - 409: Conflict (resource conflict)
     - 500: Internal Server Error

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `OperationsDashboard` (parent)
       - `DailyLog` (BuJo daily log view)
       - `TaskList` (displays tasks with filtering)
       - `SowingPlanCalendar` (visualizes sowing schedule)
       - `HarvestCalendar` (shows upcoming harvests)
       - `PerformanceMetrics` (displays KPIs)

   - **BuJo Components**:

     - `BujoCollection` (represents a collection of tasks)
     - `BujoTask` (individual task with BuJo notation)
     - `BujoMigration` (handles task migration)
     - `BujoIndex` (collection index/table of contents)

   - **Planning Components**:
     - `SowingPlanner` (interface for creating sowing plans)
     - `HarvestPlanner` (interface for planning harvests)
     - `CheatSheetGenerator` (creates printable guides)
     - `RouteOptimizer` (plans efficient delivery routes)

5. **CRUD Operations**

   - **Create**:

     - Create tasks (manual or via agent)
     - Create collections (daily logs, etc.)
     - Create sowing plans
     - Create harvest schedules

   - **Read**:

     - Retrieve tasks by various criteria
     - Get collections by date or type
     - View sowing plans and cheat sheets
     - Access harvest schedules and to-do lists

   - **Update**:

     - Update task status
     - Modify sowing plans
     - Adjust harvest expectations
     - Record actual yields

   - **Delete**:
     - Cancel tasks
     - Remove items from collections
     - Cancel sowing plans
     - Delete harvest records

6. **User Experience Flow**

   - **Daily Operations**:

     - User views daily log of tasks
     - System highlights priority items
     - User marks tasks as completed
     - System updates related records

   - **Sowing Planning**:

     - User creates sowing plan for period
     - System calculates resource requirements
     - User prints or views sowing cheat sheet
     - User records actual sowing activities

   - **Harvest Management**:

     - System identifies plants ready for harvest
     - User creates harvest schedule
     - System generates harvest to-do list
     - User records actual yields

   - **Performance Review**:
     - User views operational metrics
     - System highlights variations from expected
     - User analyzes trends and patterns
     - System suggests optimization opportunities

7. **Security Considerations**

   - **Authentication**:

     - Role-based access to operational data
     - Permission levels for different actions
     - Audit logging for critical operations

   - **Data Integrity**:

     - Validation of input data
     - Consistency checks for related records
     - Prevention of conflicting operations

   - **Backup & Recovery**:
     - Regular backup of operational data
     - Point-in-time recovery capability
     - Disaster recovery procedures

8. **Testing Strategy**

   - **Unit Tests**:

     - Test task management functions
     - Validate planning algorithms
     - Verify calculation accuracy

   - **Integration Tests**:

     - Test workflow integrations
     - Verify data consistency across modules
     - Test notification systems

   - **User Testing**:
     - Evaluate BuJo interface usability
     - Test planning tools with real scenarios
     - Measure efficiency improvements

9. **Data Management**

   - **Task Lifecycle**:

     - Creation (manual or automated)
     - Tracking (status updates)
     - Completion or migration
     - Archival for historical analysis

   - **Plan Management**:

     - Draft creation and refinement
     - Active plan execution
     - Completion and performance analysis
     - Historical reference for future planning

   - **Performance Data**:
     - Collection of actual vs. planned metrics
     - Aggregation for trend analysis
     - Long-term storage for seasonal comparisons

10. **Error Handling & Logging**

    - **Task Management**:

      - Detection of overdue tasks
      - Notification of priority conflicts
      - Handling of dependency failures

    - **Planning Errors**:

      - Identification of resource conflicts
      - Detection of unrealistic schedules
      - Handling of unexpected delays

    - **Performance Monitoring**:
      - Tracking of significant deviations
      - Alert on persistent underperformance
      - Notification of exceptional results

### 5. Customer & Order Management

#### Feature Goal

Provide comprehensive tools for managing customer relationships and order
fulfillment, enabling efficient subscription management, order processing, and
delivery coordination.

#### API Relationships

- Interfaces with Agent Core for natural language customer interactions
- Connects to Operations Management for harvest planning
- Integrates with Stripe API for payment processing
- Feeds into Inventory Management for product availability

#### Detailed Feature Requirements

1. **Customer Profile Management**

   - Create and maintain customer records
   - Track customer status and engagement
   - Store contact information and preferences
   - Manage customer-specific pricing
   - Record customer notes and history

2. **Subscription Management**

   - Set up recurring product subscriptions
   - Process subscription changes
   - Handle pauses and cancellations
   - Manage billing cycles
   - Track subscription performance

3. **One-Time Order Processing**

   - Create and manage one-time orders
   - Process custom product requests
   - Handle order modifications
   - Track order status
   - Process returns or credits

4. **Delivery Management**

   - Schedule deliveries based on orders
   - Optimize delivery routes
   - Track delivery status
   - Manage pickup locations
   - Handle delivery exceptions

5. **Customer Communication**
   - Send order confirmations
   - Provide delivery notifications
   - Process customer inquiries
   - Manage marketing communications
   - Track communication history

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Implement a customer-centric order management system with
     subscription capabilities
   - **Technology Stack**:
     - Supabase for customer and order data
     - Stripe for payment processing
     - n8n for order workflow automation
     - React/React Native for UI
   - **Integration Points**:
     - Stripe API for payment processing
     - Email/Telegram for customer communications
     - Operations Management for harvest planning

2. **Database Schema Design**

   - **Customers Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `company_name`: VARCHAR
     - `contact_first_name`: VARCHAR
     - `contact_last_name`: VARCHAR
     - `email`: VARCHAR
     - `phone`: VARCHAR
     - `status`: ENUM ('active', 'inactive', 'postponed')
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Customer_Addresses Table**:

     - `id`: UUID (primary key)
     - `customer_id`: UUID (foreign key to customers table)
     - `type`: ENUM ('billing', 'shipping', 'both')
     - `street_address`: VARCHAR
     - `street_address2`: VARCHAR
     - `city`: VARCHAR
     - `state`: VARCHAR
     - `postal_code`: VARCHAR
     - `country`: VARCHAR
     - `is_default`: BOOLEAN
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Customer_Notes Table**:

     - `id`: UUID (primary key)
     - `customer_id`: UUID (foreign key to customers table)
     - `user_id`: UUID (foreign key to users table)
     - `content`: TEXT
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Subscriptions Table**:

     - `id`: UUID (primary key)
     - `customer_id`: UUID (foreign key to customers table)
     - `status`: ENUM ('active', 'paused', 'canceled')
     - `start_date`: DATE
     - `next_delivery_date`: DATE
     - `billing_day`: INTEGER
     - `stripe_subscription_id`: VARCHAR
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Subscription_Items Table**:

     - `id`: UUID (primary key)
     - `subscription_id`: UUID (foreign key to subscriptions table)
     - `product_id`: UUID (foreign key to products table)
     - `quantity`: INTEGER
     - `price`: DECIMAL
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Orders Table**:

     - `id`: UUID (primary key)
     - `customer_id`: UUID (foreign key to customers table)
     - `property_id`: UUID (foreign key to properties table)
     - `subscription_id`: UUID (foreign key to subscriptions table, nullable)
     - `type`: ENUM ('subscription', 'one-time')
     - `status`: ENUM ('draft', 'confirmed', 'processing', 'ready', 'delivered',
       'canceled')
     - `order_date`: DATE
     - `delivery_date`: DATE
     - `subtotal`: DECIMAL
     - `tax`: DECIMAL
     - `total`: DECIMAL
     - `payment_status`: ENUM ('pending', 'paid', 'failed', 'refunded')
     - `stripe_payment_intent_id`: VARCHAR
     - `notes`: TEXT
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Order_Items Table**:

     - `id`: UUID (primary key)
     - `order_id`: UUID (foreign key to orders table)
     - `product_id`: UUID (foreign key to products table)
     - `quantity`: INTEGER
     - `unit_price`: DECIMAL
     - `total_price`: DECIMAL
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Deliveries Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `date`: DATE
     - `status`: ENUM ('planned', 'in_progress', 'completed')
     - `notes`: TEXT
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Delivery_Stops Table**:

     - `id`: UUID (primary key)
     - `delivery_id`: UUID (foreign key to deliveries table)
     - `order_id`: UUID (foreign key to orders table)
     - `sequence`: INTEGER
     - `estimated_arrival`: TIME
     - `actual_arrival`: TIME
     - `status`: ENUM ('pending', 'completed', 'skipped')
     - `notes`: TEXT
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Pickup_Locations Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `name`: VARCHAR
     - `address`: VARCHAR
     - `hours`: VARCHAR
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create index on `customers.user_id`
     - Create index on `customers.property_id`
     - Create composite index on `customers(user_id, property_id)` for efficient
       property-scoped queries
     - Create index on `customers.email`
     - Create index on `customers.status`
     - Create index on `customer_addresses.customer_id`
     - Create index on `subscriptions.customer_id`
     - Create index on `subscriptions.next_delivery_date`
     - Create index on `orders.customer_id`
     - Create index on `orders.property_id`
     - Create composite index on `orders(customer_id, property_id)`
     - Create index on `orders.delivery_date`
     - Create index on `orders.status`
     - Create index on `order_items.order_id`
     - Create index on `deliveries.date`
     - Create index on `deliveries.property_id`
     - Create composite index on `deliveries(user_id, property_id)`
     - Create index on `delivery_stops.delivery_id`

3. **API Design**

   - **POST /api/customers**

     - Request:
       ```json
       {
         "company_name": "Green Eats Cafe",
         "contact_first_name": "Jane",
         "contact_last_name": "Smith",
         "email": "jane@greeneats.com",
         "phone": "555-123-4567",
         "addresses": [
           {
             "type": "both",
             "street_address": "123 Main St",
             "city": "Portland",
             "state": "OR",
             "postal_code": "97201",
             "country": "USA",
             "is_default": true
           }
         ]
       }
       ```
     - Response:
       ```json
       {
         "id": "customer-uuid",
         "company_name": "Green Eats Cafe",
         "status": "inactive"
       }
       ```

   - **GET /api/customers**

     - Request: Query parameters for filtering and pagination
     - Response: List of customers matching criteria

   - **POST /api/customers/:id/subscriptions**

     - Request:
       ```json
       {
         "start_date": "2023-02-01",
         "billing_day": 1,
         "items": [
           {
             "product_id": "product-uuid",
             "quantity": 2
           }
         ],
         "payment_method_id": "pm_card_visa"
       }
       ```
     - Response:
       ```json
       {
         "id": "subscription-uuid",
         "status": "active",
         "next_delivery_date": "2023-02-01"
       }
       ```

   - **POST /api/orders**

     - Request:
       ```json
       {
         "customer_id": "customer-uuid",
         "type": "one-time",
         "delivery_date": "2023-01-20",
         "items": [
           {
             "product_id": "product-uuid",
             "quantity": 3
           }
         ],
         "payment_method_id": "pm_card_visa"
       }
       ```
     - Response:
       ```json
       {
         "id": "order-uuid",
         "status": "confirmed",
         "total": 45.0
       }
       ```

   - **POST /api/deliveries**

     - Request:
       ```json
       {
         "date": "2023-01-20",
         "orders": ["order-uuid-1", "order-uuid-2"]
       }
       ```
     - Response:
       ```json
       {
         "id": "delivery-uuid",
         "date": "2023-01-20",
         "stops": [
           {
             "order_id": "order-uuid-1",
             "sequence": 1,
             "estimated_arrival": "09:30:00"
           },
           {
             "order_id": "order-uuid-2",
             "sequence": 2,
             "estimated_arrival": "10:15:00"
           }
         ]
       }
       ```

   - **GET /api/deliveries/:id/route**

     - Response: Optimized delivery route with map data

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 402: Payment Required (payment issues)
     - 404: Not Found (resource not found)
     - 409: Conflict (resource conflict)
     - 500: Internal Server Error

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `CustomerDashboard` (parent)
       - `CustomerList` (displays customer list with filtering)
       - `CustomerDetail` (shows customer information)
       - `SubscriptionManager` (manages subscriptions)
       - `OrderManager` (handles orders)
       - `DeliveryPlanner` (plans deliveries)

   - **Customer Components**:

     - `CustomerForm` (create/edit customer)
     - `CustomerNotes` (manage customer notes)
     - `CustomerHistory` (view interaction history)
     - `CustomerStatus` (display/change status)

   - **Order Components**:

     - `SubscriptionForm` (create/edit subscription)
     - `OrderForm` (create/edit order)
     - `OrderList` (display orders with filtering)
     - `OrderDetail` (show order details)

   - **Delivery Components**:
     - `DeliveryCalendar` (visualize delivery schedule)
     - `RouteMap` (display delivery route)
     - `DeliveryChecklist` (track delivery progress)
     - `PickupLocationManager` (manage pickup locations)

5. **CRUD Operations**

   - **Create**:

     - Create customers
     - Set up subscriptions
     - Create one-time orders
     - Plan deliveries

   - **Read**:

     - View customer information
     - Check subscription status
     - Track order history
     - Monitor delivery routes

   - **Update**:

     - Update customer details
     - Modify subscriptions
     - Change order status
     - Adjust delivery routes

   - **Delete**:
     - Deactivate customers
     - Cancel subscriptions
     - Void orders
     - Remove pickup locations

6. **User Experience Flow**

   - **Customer Creation**:

     - User enters customer information
     - System validates and stores data
     - User adds notes or special instructions
     - System assigns default status

   - **Subscription Setup**:

     - User selects customer
     - User configures subscription products and schedule
     - System calculates pricing
     - User confirms and system processes payment

   - **Order Processing**:

     - System generates subscription orders automatically
     - User creates one-time orders as needed
     - System tracks order status
     - User manages fulfillment process

   - **Delivery Management**:
     - System identifies orders for delivery
     - User creates delivery schedule
     - System optimizes delivery route
     - User tracks delivery progress

7. **Security Considerations**

   - **Customer Data Protection**:

     - Encryption of sensitive customer information
     - Compliance with data protection regulations
     - Access controls for customer data

   - **Payment Security**:

     - PCI-compliant payment processing
     - Secure handling of payment information
     - Audit logging for financial transactions

   - **Order Verification**:
     - Authentication for order modifications
     - Verification of delivery completion
     - Prevention of unauthorized changes

8. **Testing Strategy**

   - **Unit Tests**:

     - Test customer management functions
     - Validate subscription calculations
     - Verify order processing logic

   - **Integration Tests**:

     - Test payment processing
     - Verify email notifications
     - Test delivery route optimization

   - **User Testing**:
     - Evaluate order creation workflow
     - Test subscription management
     - Assess delivery planning tools

9. **Data Management**

   - **Customer Lifecycle**:

     - Acquisition (creation)
     - Engagement (orders, subscriptions)
     - Retention (ongoing management)
     - Reactivation (for inactive customers)

   - **Order Processing**:

     - Creation (manual or automated)
     - Confirmation (payment processing)
     - Fulfillment (preparation)
     - Delivery (transportation)
     - Completion (delivery confirmation)

   - **Subscription Management**:
     - Setup (initial configuration)
     - Maintenance (modifications)
     - Renewal (automatic continuation)
     - Cancellation (termination)

10. **Error Handling & Logging**

    - **Customer Management**:

      - Duplicate detection
      - Address validation
      - Contact information verification

    - **Order Processing**:

      - Payment failure handling
      - Inventory shortage management
      - Delivery exception handling

    - **Subscription Management**:
      - Failed renewal handling
      - Payment method expiration alerts
      - Subscription conflict resolution

### 6. Knowledge Base & Document Management

#### Feature Goal

Create a system for processing and organizing uploaded documents into the
agent's knowledge base, enabling intelligent retrieval and utilization of
information during agent interactions.

#### API Relationships

- Interfaces with Agent Core for knowledge retrieval
- Connects to Supabase/pgvector for semantic storage
- Integrates with document processing pipeline
- Feeds into all other modules for domain-specific knowledge

#### Detailed Feature Requirements

1. **Document Upload & Processing**

   - Support multiple document formats (PDF, DOCX, TXT, etc.)
   - Process document content for text extraction
   - Handle document metadata
   - Manage document versions
   - Track document upload history

2. **Knowledge Extraction & Organization**

   - Extract key information from documents
   - Categorize knowledge by topic
   - Create semantic embeddings for retrieval
   - Establish relationships between knowledge items
   - Maintain knowledge hierarchy

3. **Agent Memory Integration**

   - Connect document knowledge to agent memory
   - Enable semantic search for relevant information
   - Support context-aware knowledge retrieval
   - Update memory when documents change
   - Track knowledge utilization

4. **Document Version Control**

   - Track document revisions
   - Compare document versions
   - Maintain version history
   - Support rollback to previous versions
   - Handle conflicting updates

5. **Knowledge Search & Retrieval**
   - Implement semantic search capabilities
   - Support natural language queries
   - Provide relevance-ranked results
   - Enable filtering by metadata
   - Track search history for optimization

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Implement a document processing pipeline with
     vector-based knowledge storage
   - **Technology Stack**:
     - Document processing libraries (pdf.js, docx-parser, etc.)
     - Supabase/pgvector for vector embeddings
     - OpenAI API for embedding generation
     - React/React Native for UI
   - **Integration Points**:
     - Agent Core for knowledge retrieval
     - OpenAI API for text embedding
     - File storage system for document storage

2. **Database Schema Design**

   - **Documents Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `title`: VARCHAR
     - `description`: TEXT
     - `file_path`: VARCHAR
     - `file_type`: VARCHAR
     - `file_size`: INTEGER
     - `status`: ENUM ('processing', 'processed', 'error')
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP
     - `metadata`: JSONB

   - **Document_Versions Table**:

     - `id`: UUID (primary key)
     - `document_id`: UUID (foreign key to documents table)
     - `version`: INTEGER
     - `file_path`: VARCHAR
     - `file_size`: INTEGER
     - `created_at`: TIMESTAMP
     - `created_by`: UUID (foreign key to users table)
     - `change_summary`: TEXT

   - **Knowledge_Items Table**:

     - `id`: UUID (primary key)
     - `document_id`: UUID (foreign key to documents table)
     - `document_version_id`: UUID (foreign key to document_versions table)
     - `content`: TEXT
     - `embedding`: VECTOR
     - `metadata`: JSONB
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Knowledge_Categories Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `name`: VARCHAR
     - `description`: TEXT
     - `parent_id`: UUID (foreign key to knowledge_categories table, nullable)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Knowledge_Item_Categories Table**:

     - `id`: UUID (primary key)
     - `knowledge_item_id`: UUID (foreign key to knowledge_items table)
     - `category_id`: UUID (foreign key to knowledge_categories table)
     - `created_at`: TIMESTAMP

   - **Knowledge_Search_History Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `query`: TEXT
     - `results_count`: INTEGER
     - `created_at`: TIMESTAMP
     - `metadata`: JSONB

   - **Indexing Strategy**:
     - Create index on `documents.user_id`
     - Create index on `documents.property_id`
     - Create composite index on `documents(user_id, property_id)` for efficient
       property-scoped queries
     - Create index on `documents.status`
     - Create index on `document_versions.document_id`
     - Create index on `knowledge_items.document_id`
     - Create HNSW index on `knowledge_items.embedding` for vector search
     - Create index on `knowledge_categories.user_id`
     - Create index on `knowledge_categories.property_id`
     - Create composite index on `knowledge_categories(user_id, property_id)`
     - Create index on `knowledge_categories.parent_id`
     - Create index on `knowledge_item_categories.knowledge_item_id`
     - Create index on `knowledge_item_categories.category_id`
     - Create index on `knowledge_search_history.user_id`
     - Create index on `knowledge_search_history.property_id`
     - Create composite index on
       `knowledge_search_history(user_id, property_id)`

3. **API Design**

   - **POST /api/documents/upload**

     - Request: Multipart form data with file and metadata
     - Response:
       ```json
       {
         "id": "document-uuid",
         "title": "Growing Guide - Sunflower Microgreens",
         "status": "processing",
         "processing_job_id": "job-uuid"
       }
       ```

   - **GET /api/documents**

     - Request: Query parameters for filtering and pagination
     - Response: List of documents matching criteria

   - **GET /api/documents/:id/versions**

     - Response: List of document versions with metadata

   - **POST /api/documents/:id/versions**

     - Request: Multipart form data with file and change summary
     - Response: Created version object

   - **GET /api/knowledge/search**

     - Request:
       ```json
       {
         "query": "What is the optimal temperature for sunflower microgreens?",
         "limit": 5,
         "categories": ["growing-conditions"]
       }
       ```
     - Response:
       ```json
       {
         "results": [
           {
             "id": "knowledge-item-uuid",
             "content": "Sunflower microgreens grow best at temperatures between 65-75°F (18-24°C).",
             "relevance_score": 0.92,
             "document_id": "document-uuid",
             "document_title": "Growing Guide - Sunflower Microgreens"
           }
         ]
       }
       ```

   - **GET /api/knowledge/categories**

     - Response: Hierarchical list of knowledge categories

   - **POST /api/knowledge/categories**

     - Request:
       ```json
       {
         "name": "Growing Conditions",
         "description": "Information about optimal growing conditions",
         "parent_id": null
       }
       ```
     - Response: Created category object

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 404: Not Found (resource not found)
     - 413: Payload Too Large (file size exceeds limit)
     - 415: Unsupported Media Type (file format not supported)
     - 500: Internal Server Error (processing error)

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `KnowledgeBase` (parent)
       - `DocumentLibrary` (displays document list)
       - `DocumentUploader` (handles document upload)
       - `DocumentViewer` (displays document content)
       - `KnowledgeExplorer` (browses knowledge items)
       - `KnowledgeSearch` (searches knowledge base)

   - **Document Components**:

     - `DocumentCard` (displays document summary)
     - `VersionHistory` (shows document versions)
     - `DocumentMetadata` (displays/edits metadata)
     - `FileUploader` (handles file selection and upload)

   - **Knowledge Components**:
     - `CategoryTree` (displays category hierarchy)
     - `KnowledgeItem` (displays knowledge content)
     - `RelatedKnowledge` (shows related items)
     - `SearchInterface` (provides search capabilities)

5. **CRUD Operations**

   - **Create**:

     - Upload documents
     - Create document versions
     - Add knowledge categories
     - Generate knowledge items

   - **Read**:

     - View documents and versions
     - Browse knowledge categories
     - Search knowledge items
     - Retrieve document metadata

   - **Update**:

     - Update document metadata
     - Create new document versions
     - Modify knowledge categories
     - Recategorize knowledge items

   - **Delete**:
     - Archive documents
     - Remove knowledge items
     - Delete categories
     - Purge search history

6. **User Experience Flow**

   - **Document Upload**:

     - User selects document file
     - User provides title and description
     - System uploads and begins processing
     - User receives notification when processing completes

   - **Knowledge Exploration**:

     - User browses category hierarchy
     - User selects category to view items
     - System displays relevant knowledge items
     - User can drill down into specific items

   - **Knowledge Search**:

     - User enters natural language query
     - System performs semantic search
     - Results are displayed with relevance scores
     - User can refine search or explore results

   - **Document Management**:
     - User views document library
     - User can upload new versions
     - System tracks version history
     - User can compare versions or restore previous ones

7. **Security Considerations**

   - **Document Access Control**:

     - Role-based access to documents
     - Permission management for sensitive documents
     - Audit logging for document access

   - **Content Security**:

     - Virus scanning for uploaded files
     - Content validation for supported formats
     - Sanitization of extracted text

   - **Knowledge Privacy**:
     - Control over knowledge visibility
     - Redaction capabilities for sensitive information
     - Compliance with data protection regulations

8. **Testing Strategy**

   - **Unit Tests**:

     - Test document processing functions
     - Validate embedding generation
     - Verify search algorithms

   - **Integration Tests**:

     - Test end-to-end document processing
     - Verify vector search functionality
     - Test category management

   - **Performance Tests**:
     - Measure document processing time
     - Test search performance with large knowledge base
     - Evaluate embedding generation throughput

9. **Data Management**

   - **Document Processing Pipeline**:

     - Upload (file receipt)
     - Validation (format checking)
     - Text Extraction (content parsing)
     - Embedding Generation (vector creation)
     - Knowledge Segmentation (content chunking)
     - Indexing (storage and retrieval preparation)

   - **Knowledge Organization**:

     - Hierarchical categories
     - Tag-based classification
     - Semantic relationships
     - Cross-document references

   - **Version Control**:
     - Linear version history
     - Change tracking
     - Diff generation
     - Rollback capability

10. **Error Handling & Logging**

    - **Document Processing**:

      - Format compatibility issues
      - Text extraction failures
      - Embedding generation errors
      - Storage failures

    - **Search Functionality**:

      - Query parsing errors
      - Vector calculation issues
      - Result ranking problems
      - Empty result handling

    - **System Monitoring**:
      - Processing queue monitoring
      - Storage usage tracking
      - Embedding quality assessment
      - Search performance metrics

### 7. Complete GUI Interface

#### Feature Goal

Provide a full graphical interface with feature parity to agent interactions,
enabling users to access all system functionality through a visual interface
when preferred over conversational interaction.

#### API Relationships

- Interfaces with all backend services
- Connects to Agent Core for optional conversational assistance
- Integrates with all data models and workflows
- Provides alternative access to all system features

#### Detailed Feature Requirements

1. **Responsive Web Interface**

   - Implement responsive design for all screen sizes
   - Support desktop and mobile browsers
   - Ensure accessibility compliance
   - Optimize performance for various devices
   - Provide consistent experience across platforms

2. **Mobile Application**

   - Develop React Native application for iOS and Android
   - Implement native device features
   - Support offline capabilities
   - Optimize for touch interaction
   - Ensure performance on mobile devices

3. **Customizable Monitoring Dashboards & System Navigation**

   **Dashboard Framework**

   - Enable users to create personalized dashboard views with a comprehensive
     widget library
   - Support multiple dashboard configurations per user with save/load
     capabilities
   - Provide drag-and-drop interface for widget arrangement and dashboard
     customization
   - Allow dashboard naming, duplication, and sharing within property context
   - Implement property-specific default dashboards and role-based templates

   **Widget Library & Types**

   - **Sensor Data Widgets:**
     - Real-time sensor reading displays with customizable thresholds and visual
       indicators
     - Historical trend charts with interactive zoom/pan and multi-sensor
       comparison
     - Sensor status overview showing online/offline states and alert conditions
   - **Operational Performance Widgets:**
     - KPI displays with target values and performance indicators
     - Sowing/harvest performance summaries with success rate tracking
     - Growth cycle overviews showing batch stages and estimated harvest times
   - **Task Management Widgets:**
     - Upcoming tasks lists with filtering by type, priority, and timeframe
     - Overdue task highlights with completion rate tracking
     - Task completion rate analytics for selected periods
   - **Inventory Widgets:**
     - Low stock alerts for seeds, mediums, and packaging materials
     - Current inventory level displays for selected items
   - **Compliance Widgets:**
     - Compliance record summaries with quick access to reporting sections
     - Upcoming compliance task lists and audit preparation status

   **Property Context Integration**

   - Global property selector filtering all dashboard data to selected property
     context
   - Property-aware widget configuration with resource lists scoped to current
     property
   - Cross-property data aggregation for users with multi-property access
   - Property context preservation across navigation and user sessions
   - Role-based access control enforced at property level for all dashboard
     operations

   **Interactive Capabilities**

   - Direct action execution from dashboard widgets (acknowledge alerts, update
     task status)
   - Drill-down navigation from widget data points to detailed system views
   - Widget-level customization including data source selection and display
     preferences
   - Real-time data updates using WebSockets or efficient polling mechanisms
   - Interactive chart elements with hover details and contextual information

   **System Navigation Integration**

   - Intuitive navigation structure with dashboard as central hub
   - Quick access to common functions through dashboard shortcuts and widgets
   - Seamless transition between dashboard views and detailed system areas
   - Breadcrumb navigation maintaining property and dashboard context
   - Mobile-responsive navigation supporting touch-based dashboard interaction

   **Security & Performance**

   - Secure dashboard configuration storage with user-specific access controls
   - Property-scoped data access with permission validation for all widgets
   - Optimized query performance for real-time dashboard data retrieval
   - Caching strategies for frequently accessed monitoring data
   - Agent integration enabling natural language dashboard queries and
     modifications

4. **User Experience Flow**

   - **Customer Creation**:

     - User enters customer information
     - System validates and stores data
     - User adds notes or special instructions
     - System assigns default status

   - **Subscription Setup**:

     - User selects customer
     - User configures subscription products and schedule
     - System calculates pricing
     - User confirms and system processes payment

   - **Order Processing**:

     - System generates subscription orders automatically
     - User creates one-time orders as needed
     - System tracks order status
     - User manages fulfillment process

   - **Delivery Management**:
     - System identifies orders for delivery
     - User creates delivery schedule
     - System optimizes delivery route
     - User tracks delivery progress

5. **Security Considerations**

   - **Customer Data Protection**:

     - Encryption of sensitive customer information
     - Compliance with data protection regulations
     - Access controls for customer data

   - **Payment Security**:

     - PCI-compliant payment processing
     - Secure handling of payment information
     - Audit logging for financial transactions

   - **Order Verification**:
     - Authentication for order modifications
     - Verification of delivery completion
     - Prevention of unauthorized changes

6. **Testing Strategy**

   - **Unit Tests**:

     - Test customer management functions
     - Validate subscription calculations
     - Verify order processing logic

   - **Integration Tests**:

     - Test payment processing
     - Verify email notifications
     - Test delivery route optimization

   - **User Testing**:
     - Evaluate order creation workflow
     - Test subscription management
     - Assess delivery planning tools

7. **Data Management**

   - **Customer Lifecycle**:

     - Acquisition (creation)
     - Engagement (orders, subscriptions)
     - Retention (ongoing management)
     - Reactivation (for inactive customers)

   - **Order Processing**:

     - Creation (manual or automated)
     - Confirmation (payment processing)
     - Fulfillment (preparation)
     - Delivery (transportation)
     - Completion (delivery confirmation)

   - **Subscription Management**:
     - Setup (initial configuration)
     - Maintenance (modifications)
     - Renewal (automatic continuation)
     - Cancellation (termination)

8. **Error Handling & Logging**

   - **Customer Management**:

     - Duplicate detection
     - Address validation
     - Contact information verification

   - **Order Processing**:

     - Payment failure handling
     - Inventory shortage management
     - Delivery exception handling

   - **Subscription Management**:
     - Failed renewal handling
     - Payment method expiration alerts
     - Subscription conflict resolution

### 8. Agent Core Integration

#### Feature Goal

Integrate the external n8n agent with the main Verding backend, enabling
real-time communication, data sharing, and coordination between the two systems.

#### API Relationships

- Interfaces with the main Verding backend via the Model Context Protocol (MCP)
- Connects to Supabase for agent memory and data storage
- Integrates with the external n8n agent for workflow automation
- Feeds into all other modules for enhanced functionality

#### Detailed Feature Requirements

1. **Model Context Protocol (MCP) Interface**

   - Define the MCP interface for communication between the backend and the
     agent
   - Implement MCP endpoints for data retrieval, updates, and synchronization
   - **Property Context Awareness**: All MCP requests include property context
     to ensure data isolation and proper access control
   - **Property Management**: Full support for multi-property operations
     including property switching, hierarchy management, and cross-property
     analytics
   - Ensure secure and efficient communication with property-scoped data access

2. **Property Context in MCP Protocol**

   - **Request Structure Enhancement**: All MCP requests include optional
     `property_id` parameter
   - **Session Property Context**: Users maintain active property context across
     requests
   - **Default Behavior**: When `property_id` is omitted, system uses user's
     current active property
   - **Access Control**: Property-level permissions enforced for all MCP
     operations
   - **Cross-Property Operations**: Explicitly defined tools for operations
     spanning multiple properties

3. **Property Management Tools**

   - **Property Selection & Context**: Tools for listing properties, switching
     context, and managing property hierarchy
   - **Property Administration**: Create, update, and delete properties with
     proper role-based access control
   - **Permission Management**: Tools for managing user permissions at the
     property level
   - **Cross-Property Analytics**: Comparative analysis and aggregated reporting
     across multiple properties
   - **Property Hierarchy**: Support for hierarchical property organization with
     nested access controls

4. **Agent Memory System**

   - Design and implement the agent's memory system in Supabase
   - Store conversation history, user interactions, and system events
   - Enable real-time updates and synchronization
   - Implement RAG (Retrieval-Augmented Generation) with pgvector and TSVector

5. **n8n Workflows**

   - Design and implement n8n workflows for ingesting data from various sources
   - Create workflows for retrieving and updating data in the backend
   - Integrate with external systems and services
   - Ensure data consistency and integrity

6. **Conversation History**

   - Store conversation history in Supabase
   - Implement real-time updates and synchronization
   - Enable search and filtering by user, channel, and date
   - Integrate with the agent's memory system for context-aware responses

7. **Data Sharing and Coordination**
   - Implement secure and efficient data sharing between the backend and the
     agent
   - Enable real-time updates and synchronization
   - Coordinate workflows and processes between the two systems
   - Ensure data consistency and integrity

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Integrate the external n8n agent with the main Verding
     backend
   - **Technology Stack**:
     - Supabase for agent memory and data storage
     - n8n for workflow automation
     - Model Context Protocol (MCP) for communication
     - React/React Native for UI
   - **Integration Points**:
     - MCP endpoints for data retrieval, updates, and synchronization
     - Supabase for agent memory and data storage
     - n8n workflows for data ingestion and processing

2. **Database Schema Design**

   - **Conversation_History Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `channel`: ENUM ('web', 'telegram', 'whatsapp', 'email', 'phone')
     - `message`: TEXT
     - `response`: TEXT
     - `timestamp`: TIMESTAMP
     - `metadata`: JSONB

   - **Memory_Chunks Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `content`: TEXT
     - `embedding`: VECTOR
     - `metadata`: JSONB
     - `access_tags`: JSONB (tag-based access control)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create index on `conversation_history.user_id`
     - Create index on `conversation_history.property_id`
     - Create index on `conversation_history.channel`
     - Create index on `conversation_history.timestamp`
     - Create composite index on `conversation_history(property_id, user_id)`
     - Create HNSW index on `memory_chunks.embedding` for vector search
     - Create TSVector index on `memory_chunks.content` for full-text search
     - Create index on `memory_chunks.property_id`
     - Create composite index on `memory_chunks(property_id, user_id)`
     - Create index on `user_property_access(user_id, property_id)`
     - Create index on `properties.parent_id`

3. **API Design**

   - **GET /api/mcp/data**

     - Request: Query parameters for filtering and pagination
       - `property_id` (optional): Property context for data filtering
     - Response: List of data matching criteria within property scope

   - **POST /api/mcp/data**

     - Request: JSON data to be updated or created
       - `property_id` (optional): Property context for the operation
     - Response: Updated or created data

   - **Property Management Endpoints**:
   - **GET /api/mcp/properties**

     - Request: Query parameters for property listing
       - `includeInactive` (optional): Include inactive properties
       - `parentId` (optional): Filter by parent property
     - Response: List of properties user has access to

   - **POST /api/mcp/properties**

     - Request: JSON data for property creation
       - `name` (required): Property name
       - `description` (optional): Property description
       - `location` (optional): Geographical location
       - `parentId` (optional): Parent property for hierarchy
     - Response: Created property details

   - **GET /api/mcp/properties/:id**

     - Response: Detailed property information

   - **PUT /api/mcp/properties/:id**

     - Request: JSON data for property updates
     - Response: Updated property information

   - **POST /api/mcp/properties/switch-context**

     - Request: JSON data with property_id to switch to
     - Response: Success status and new property context

   - **GET /api/mcp/properties/hierarchy**

     - Request: Query parameters for hierarchy retrieval
       - `rootPropertyId` (optional): Root property to start from
       - `depth` (optional): Maximum depth to retrieve
     - Response: Hierarchical structure of properties

   - **Enhanced Conversation & Memory Endpoints**:
   - **GET /api/mcp/conversation_history**

     - Request: Query parameters for filtering and pagination
       - `property_id` (optional): Property context filter
       - `user_id` (optional): User filter
       - `channel` (optional): Channel filter
     - Response: List of conversation history matching criteria within property
       scope

   - **POST /api/mcp/conversation_history**

     - Request: JSON conversation data to be stored
       - `property_id` (optional): Property context for conversation
     - Response: Stored conversation data

   - **GET /api/mcp/memory_chunks**

     - Request: Query parameters for filtering and pagination
       - `property_id` (optional): Property context filter
       - `access_tags` (optional): Tag-based access filter
     - Response: List of memory chunks matching criteria within property scope

   - **POST /api/mcp/memory_chunks**

     - Request: JSON memory chunk data to be stored
       - `property_id` (optional): Property context for memory
       - `access_tags` (optional): Tag-based access control settings
     - Response: Stored memory chunk data

   - **Error Handling**:

     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 403: Forbidden (insufficient property permissions)
     - 404: Not Found (resource not found)
     - 409: Conflict (resource conflict)
     - 422: Unprocessable Entity (property context required but not provided)
     - 500: Internal Server Error

   - **Property Access Control Errors**:
     - Property access validation failures
     - Invalid property context switching attempts
     - Cross-property operation permission violations
     - Property hierarchy access control violations

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `AgentDashboard` (parent)
       - `ConversationHistory` (displays conversation history)
       - `MemoryChunks` (manages memory chunks)
       - `WorkflowManager` (handles n8n workflows)
       - `DataSync` (synchronizes data between backend and agent)

   - **Agent Components**:

     - `ConversationSearch` (searches conversation history)
     - `MemorySearch` (searches memory chunks)
     - `WorkflowEditor` (creates/edits n8n workflows)
     - `DataSyncStatus` (displays data synchronization status)

   - **CRUD Operations**

     - **Create**:

       - Create conversation history
       - Create memory chunks
       - Create n8n workflows

     - **Read**:

       - View conversation history
       - View memory chunks
       - View n8n workflows

     - **Update**:

       - Update conversation history
       - Update memory chunks
       - Update n8n workflows

     - **Delete**:
       - Delete conversation history
       - Delete memory chunks
       - Delete n8n workflows

5. **User Experience Flow**

   - **Conversation History**:

     - User views conversation history
     - User can filter by user, channel, and date
     - User can search for specific conversations

   - **Memory Chunks**:

     - User views memory chunks
     - User can filter by user and metadata
     - User can search for specific memory content

   - **n8n Workflows**:

     - User creates/edits n8n workflows
     - User can view workflow status and logs
     - User can trigger workflows manually

   - **Data Synchronization**:
     - User views data synchronization status
     - User can trigger manual synchronization
     - User can view synchronization logs

6. **Security Considerations**

   - **Data Protection**:

     - Encryption of sensitive data
     - Compliance with data protection regulations
     - Access controls for data

   - **Communication Security**:

     - Secure communication channels
     - Authentication and authorization
     - Encryption of data in transit

   - **Workflow Security**:
     - Access controls for workflows
     - Audit logging for workflow execution
     - Prevention of unauthorized workflow execution

7. **Testing Strategy**

   - **Unit Tests**:

     - Test MCP communication
     - Validate data synchronization
     - Verify workflow execution

   - **Integration Tests**:

     - Test end-to-end communication
     - Verify data consistency
     - Test workflow coordination

   - **Performance Tests**:
     - Measure communication latency
     - Test data synchronization speed
     - Evaluate workflow execution time

8. **Data Management**

   - **Conversation History**:

     - Storage in Supabase
     - Real-time updates and synchronization
     - Search and filtering capabilities

   - **Memory Chunks**:

     - Storage in Supabase
     - Vector-based retrieval
     - Full-text search capabilities

   - **n8n Workflows**:

     - Design and implementation
     - Integration with external systems
     - Coordination with backend and agent

   - **Data Synchronization**:
     - Real-time updates and synchronization
     - Efficient data transfer
     - Data consistency and integrity

9. **Error Handling & Logging**

   - **Communication Errors**:

     - Error handling for MCP communication
     - Retry mechanisms for failed requests
     - Error logging and monitoring

   - **Data Synchronization**:

     - Error handling for data transfer
     - Conflict resolution strategies
     - Error logging and monitoring

   - **Workflow Errors**:
     - Error handling for workflow execution
     - Retry mechanisms for failed tasks
     - Error logging and monitoring

### 9. Agent Memory Replication

#### Feature Goal

Replicate the agent's memory in a human-readable format for backup, analysis,
and offline access.

#### API Relationships

- Interfaces with the agent's memory system
- Connects to Google Drive for replication
- Integrates with the main Verding backend for data consistency
- Feeds into the Knowledge Base & Document Management module

#### Detailed Feature Requirements

1. **Memory Replication**

   - Replicate the agent's memory to Google Drive
   - Store memory chunks in a human-readable format
   - Enable offline access and analysis
   - Maintain data consistency with the main Verding backend

2. **Google Drive Integration**

   - Implement secure and efficient integration with Google Drive
   - Create a dedicated folder for memory replication
   - Handle file uploads, downloads, and updates
   - Ensure data consistency and integrity

3. **Data Consistency**

   - Maintain data consistency between the main Verding backend and Google Drive
   - Implement real-time updates and synchronization
   - Handle conflicts and ensure data integrity

4. **Offline Access and Analysis**
   - Enable offline access to replicated memory
   - Provide tools for analysis and exploration
   - Support various file formats for export and import

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Replicate the agent's memory to Google Drive
   - **Technology Stack**:
     - Google Drive API for file storage and management
     - Supabase for agent memory and data storage
     - React/React Native for UI
   - **Integration Points**:
     - Google Drive API for file storage and management
     - Supabase for agent memory and data storage
     - Main Verding backend for data consistency

2. **Database Schema Design**

   - **Memory_Replication Table**:

     - `id`: UUID (primary key)
     - `memory_chunk_id`: UUID (foreign key to memory_chunks table)
     - `file_id`: VARCHAR (Google Drive file ID)
     - `status`: ENUM ('pending', 'replicating', 'completed', 'failed')
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create index on `memory_replication.memory_chunk_id`
     - Create index on `memory_replication.status`

3. **API Design**

   - **POST /api/memory_replication**

     - Request: JSON data for memory replication
     - Response: Replication job details

   - **GET /api/memory_replication**

     - Request: Query parameters for filtering and pagination
     - Response: List of replication jobs matching criteria

   - **GET /api/memory_replication/:id**

     - Response: Details of a specific replication job

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 404: Not Found (resource not found)
     - 409: Conflict (resource conflict)
     - 500: Internal Server Error

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `MemoryReplication` (parent)
       - `ReplicationJobs` (displays replication jobs)
       - `ReplicationStatus` (shows replication status)
       - `OfflineAccess` (manages offline access)
       - `AnalysisTools` (provides analysis tools)

   - **Memory Replication Components**:

     - `ReplicationJob` (displays replication job details)
     - `ReplicationLogs` (shows replication logs)
     - `FileExport` (handles file export)
     - `FileImport` (handles file import)

   - **CRUD Operations**

     - **Create**:

       - Create replication jobs

     - **Read**:

       - View replication jobs
       - View replication status
       - Access offline memory

     - **Update**:

       - Update replication jobs
       - Update offline memory

     - **Delete**:
       - Delete replication jobs
       - Remove offline memory

5. **User Experience Flow**

   - **Memory Replication**:

     - User triggers memory replication
     - System creates replication jobs
     - User monitors replication status

   - **Offline Access**:

     - User downloads replicated memory
     - User accesses offline memory for analysis
     - User can export and import memory data

   - **Analysis Tools**:
     - User analyzes memory data
     - System provides visualizations and insights
     - User can generate reports and dashboards

6. **Security Considerations**

   - **Data Protection**:

     - Encryption of sensitive data
     - Compliance with data protection regulations
     - Access controls for data

   - **Google Drive Integration**:

     - Secure communication with Google Drive
     - Authentication and authorization
     - Encryption of data in transit

   - **Offline Access**:
     - Secure storage of replicated memory
     - Access controls for offline data
     - Encryption of offline data

7. **Testing Strategy**

   - **Unit Tests**:

     - Test Google Drive integration
     - Validate data replication
     - Verify offline access

   - **Integration Tests**:

     - Test end-to-end replication
     - Verify data consistency
     - Test offline analysis

   - **Performance Tests**:
     - Measure replication speed
     - Test offline access performance
     - Evaluate analysis tools performance

8. **Data Management**

   - **Memory Replication**:

     - Storage in Google Drive
     - Real-time updates and synchronization
     - Data consistency with main Verding backend

   - **Offline Access**:

     - Downloadable memory chunks
     - Support for various file formats
     - Data consistency with main Verding backend

   - **Analysis Tools**:
     - Visualizations and insights
     - Reporting and dashboarding
     - Integration with external tools

9. **Error Handling & Logging**

   - **Replication Errors**:

     - Error handling for Google Drive integration
     - Retry mechanisms for failed replication
     - Error logging and monitoring

   - **Offline Access Errors**:

     - Error handling for file downloads
     - Error logging and monitoring

   - **Analysis Tool Errors**:
     - Error handling for data processing
     - Error logging and monitoring

### 10. Agent Memory Management

#### Feature Goal

Manage the agent's memory efficiently, including pruning, compression, and
optimization strategies to ensure optimal performance and resource utilization.

#### API Relationships

- Interfaces with the agent's memory system
- Connects to the main Verding backend for data consistency
- Integrates with the Knowledge Base & Document Management module
- Feeds into the Complete GUI Interface module

#### Detailed Feature Requirements

1. **Memory Pruning**

   - Implement memory pruning strategies
   - Remove irrelevant or outdated memory chunks
   - Ensure optimal memory utilization

2. **Memory Compression**

   - Implement memory compression techniques
   - Reduce memory footprint without losing information
   - Ensure efficient storage and retrieval

3. **Memory Optimization**

   - Implement memory optimization strategies
   - Improve memory retrieval performance
   - Ensure optimal resource utilization

4. **Memory Analysis**
   - Implement memory analysis tools
   - Analyze memory usage and performance
   - Identify bottlenecks and optimization opportunities

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Manage the agent's memory efficiently
   - **Technology Stack**:
     - Supabase for agent memory and data storage
     - React/React Native for UI
   - **Integration Points**:
     - Supabase for agent memory and data storage
     - Main Verding backend for data consistency
     - Knowledge Base & Document Management module
     - Complete GUI Interface module

2. **Database Schema Design**

   - **Memory_Chunks Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `content`: TEXT
     - `embedding`: VECTOR
     - `metadata`: JSONB
     - `access_tags`: JSONB (tag-based access control)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create HNSW index on `memory_chunks.embedding` for vector search
     - Create TSVector index on `memory_chunks.content` for full-text search
     - Create index on `memory_chunks.property_id`
     - Create composite index on `memory_chunks(property_id, user_id)`
     - Create index on `user_property_access(user_id, property_id)`
     - Create index on `properties.parent_id`

3. **API Design**

   - **POST /api/memory_management/prune**

     - Request: JSON data for pruning criteria
     - Response: Pruning job details

   - **POST /api/memory_management/compress**

     - Request: JSON data for compression criteria
     - Response: Compression job details

   - **POST /api/memory_management/optimize**

     - Request: JSON data for optimization criteria
     - Response: Optimization job details

   - **GET /api/memory_management/analysis**

     - Request: Query parameters for analysis criteria
     - Response: Analysis results

   - **Error Handling**:
     - 400: Bad Request (invalid input)
     - 401: Unauthorized (authentication required)
     - 404: Not Found (resource not found)
     - 409: Conflict (resource conflict)
     - 500: Internal Server Error

4. **Frontend Architecture**

   - **Component Hierarchy**:

     - `MemoryManagement` (parent)
       - `Pruning` (handles memory pruning)
       - `Compression` (handles memory compression)
       - `Optimization` (handles memory optimization)
       - `Analysis` (provides memory analysis tools)

   - **Memory Management Components**:

     - `PruningCriteria` (defines pruning criteria)
     - `CompressionCriteria` (defines compression criteria)
     - `OptimizationCriteria` (defines optimization criteria)
     - `AnalysisTools` (provides analysis tools)

   - **CRUD Operations**

     - **Create**:

       - Create pruning jobs
       - Create compression jobs
       - Create optimization jobs

     - **Read**:

       - View pruning jobs
       - View compression jobs
       - View optimization jobs
       - Access analysis results

     - **Update**:

       - Update pruning jobs
       - Update compression jobs
       - Update optimization jobs

     - **Delete**:
       - Delete pruning jobs
       - Delete compression jobs
       - Delete optimization jobs

5. **User Experience Flow**

   - **Memory Pruning**:

     - User defines pruning criteria
     - System executes pruning jobs
     - User monitors pruning status

   - **Memory Compression**:

     - User defines compression criteria
     - System executes compression jobs
     - User monitors compression status

   - **Memory Optimization**:

     - User defines optimization criteria
     - System executes optimization jobs
     - User monitors optimization status

   - **Memory Analysis**:
     - User accesses analysis tools
     - System provides insights and recommendations
     - User can generate reports and dashboards

6. **Security Considerations**

   - **Data Protection**:

     - Encryption of sensitive data
     - Compliance with data protection regulations
     - Access controls for data

   - **Memory Management**:
     - Access controls for memory management operations
     - Audit logging for memory management activities
     - Prevention of unauthorized memory management

7. **Testing Strategy**

   - **Unit Tests**:

     - Test memory pruning
     - Validate memory compression
     - Verify memory optimization

   - **Integration Tests**:

     - Test end-to-end memory management
     - Verify data consistency
     - Test analysis tools

   - **Performance Tests**:
     - Measure memory management speed
     - Test resource utilization
     - Evaluate analysis tools performance

8. **Data Management**

   - **Memory Pruning**:

     - Removal of irrelevant or outdated memory chunks
     - Optimization of memory utilization

   - **Memory Compression**:

     - Reduction of memory footprint
     - Efficient storage and retrieval

   - **Memory Optimization**:

     - Improvement of memory retrieval performance
     - Optimal resource utilization

   - **Memory Analysis**:
     - Insights and recommendations
     - Identification of bottlenecks and optimization opportunities

9. **Error Handling & Logging**

   - **Memory Management Errors**:

     - Error handling for memory management operations
     - Retry mechanisms for failed jobs
     - Error logging and monitoring

   - **Analysis Tool Errors**:
     - Error handling for data processing
     - Error logging and monitoring

### 11. Agent Memory Visualization

#### Feature Goal

Visualize the agent's memory and its relationships, enabling better
understanding and exploration of the knowledge base.

#### API Relationships

- Interfaces with the agent's memory system
- Connects to the main Verding backend for data consistency
- Integrates with the Knowledge Base & Document Management module
- Feeds into the Complete GUI Interface module

#### Detailed Feature Requirements

1. **Memory Visualization**

   - Implement memory visualization tools
   - Visualize memory chunks and their relationships
   - Enable exploration and analysis of the knowledge base

2. **Relationship Mapping**

   - Implement relationship mapping
   - Visualize the connections between memory chunks
   - Enable exploration of knowledge networks

3. **Interactive Exploration**

   - Implement interactive exploration tools
   - Enable users to interact with the visualization
   - Support zooming, panning, and filtering

4. **Analysis and Insights**
   - Implement analysis and insights tools
   - Provide insights into memory usage and performance
   - Identify patterns and trends in the knowledge base

### 12. Error Handling and Recovery Framework

#### Feature Goal

Implement a comprehensive error handling and recovery framework to ensure system
reliability, data integrity, and excellent user experience even when unexpected
issues occur. This framework covers both the main backend and the n8n agent
components of the system, providing a unified approach to error detection,
categorization, response, and recovery across all system components.

#### API Relationships

- Integrates with all system components for centralized error handling
- Connects to monitoring services for error detection and alerting
- Interfaces with notification system for user communication during errors
- Utilizes logging aggregation services for error analysis and debugging
- Coordinates with backup and recovery systems for data protection

#### Detailed Feature Requirements

1. **Error Categorization**

   - **Critical System Errors**: Affecting core system functionality, data
     integrity, or security. Examples include database connection failures,
     authentication system failures, or security breaches.
   - **Service Integration Errors**: Issues with external service connections,
     including Home Assistant, n8n, messaging platforms, Google Drive, and other
     integrated services.
   - **Application Logic Errors**: Issues within the application business logic,
     such as invalid state transitions, constraint violations, or calculation
     errors.
   - **User Input Errors**: Problems with data provided by users, including
     validation failures, format errors, or business rule violations.
   - **Performance and Resource Errors**: Issues related to system resources,
     such as timeouts, memory limits, or processing capacity constraints.

   **Severity Levels**:

   - **Level 1 (Fatal)**: System-wide impact, requires immediate intervention
   - **Level 2 (Critical)**: Significant feature or module impact, requires
     urgent attention
   - **Level 3 (Major)**: Important function impacted, requires scheduled
     resolution
   - **Level 4 (Minor)**: Limited impact, can be addressed in regular
     maintenance
   - **Level 5 (Cosmetic)**: User experience issues with no functional impact

2. **Error Detection and Reporting** **Detection Mechanisms**:

   - **Exception Monitoring**: Centralized exception capture system across all
     system components
   - **Health Checks**: Proactive monitoring of system components and services
   - **Telemetry**: Continuous collection of performance metrics and anomaly
     detection
   - **User Feedback**: Structured channels for user-reported issues
   - **Agent Error Detection**: Specialized error monitoring for n8n workflows

   **Logging Strategy**:

   - **Structured Logging**: JSON-formatted logs with standardized fields
   - **Context Enrichment**: Attaching user, session, property, and request
     context to errors

### 8a. Memory System Architecture (Comprehensive Hybrid RAG Implementation)

#### Enhanced Memory System Design

The Verding memory system implements a sophisticated hybrid RAG
(Retrieval-Augmented Generation) approach that combines multiple retrieval
strategies for optimal information access. This system is built directly on
Supabase PostgreSQL with pgvector extension, enabling high-performance vector
operations and complex query capabilities.

#### Database Schema Enhancements

**Memory_Chunks Table** (Enhanced for hybrid RAG):

- `id`: UUID (primary key)
- `document_id`: UUID (foreign key to documents table, nullable for
  conversation-derived chunks)
- `user_id`: UUID (foreign key to users table)
- `property_id`: UUID (foreign key to properties table)
- `chunk_text`: TEXT (the actual text content of the memory chunk)
- `dense_embedding`: VECTOR(1536) (OpenAI embedding for semantic search)
- `sparse_embedding`: VECTOR (for keyword-based sparse retrieval, optional)
- `context`: TEXT (surrounding context information for better understanding)
- `metadata`: JSONB (chunk-specific metadata: source, tags, importance,
  timestamp)
- `access_tags`: JSONB (tag-based access control for granular permissions)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

**Documents Table** (Google Drive integration and document lifecycle tracking):

- `id`: UUID (primary key)
- `gdrive_drop_path`: VARCHAR (path in Google Drive drop folder)
- `gdrive_replica_path`: VARCHAR (path in Google Drive replica folder)
- `file_name`: VARCHAR (original file name)
- `file_type`: VARCHAR (MIME type or file extension)
- `file_size`: BIGINT (file size in bytes)
- `checksum`: VARCHAR (for detecting changes)
- `last_modified_agent`: TIMESTAMP (last modification by agent processing)
- `last_modified_human`: TIMESTAMP (last modification by human via Google Drive)
- `processing_status`: ENUM ('pending', 'processing', 'completed', 'error',
  'human_modified')
- `property_id`: UUID (foreign key to properties table)
- `metadata`: JSONB (document-specific metadata and processing history)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

#### Direct Database Access Architecture

- The n8n agent workflows connect directly to Supabase PostgreSQL for all memory
  operations
- No API intermediaries for memory access, ensuring optimal performance and
  reduced latency
- Direct database connections enable complex queries combining vector
  similarity, full-text search, and metadata filtering
- Property-scoped access enforced through Row Level Security (RLS) policies at
  the database level

#### Hybrid RAG Implementation

- **Dense Vector Search**: Utilizes pgvector extension for semantic similarity
  using OpenAI embeddings (1536 dimensions)
- **Sparse Vector/Keyword Search**: Implements full-text search using
  PostgreSQL's TSVector for keyword-based retrieval
- **Fusion Ranking**: Combines results from both dense and sparse retrieval
  methods using reciprocal rank fusion or weighted scoring
- **Context-Aware Retrieval**: Incorporates conversation context, property
  context, and user access permissions in retrieval decisions
- **Metadata Filtering**: Leverages JSONB metadata fields for advanced filtering
  based on tags, importance, recency, and source

#### Google Drive Integration Architecture

- **Two-Way Sync**: Bidirectional synchronization between Supabase memory
  storage and Google Drive for human readability
- **Document Ingestion Workflow**: Automated processing of documents dropped
  into designated Google Drive folders
- **Human-Readable Replication**: Memory chunks and conversation history
  replicated to Google Drive in markdown format for human review and editing
- **Change Detection**: Monitoring Google Drive for human modifications and
  updating database accordingly
- **Conflict Resolution**: Handling conflicts between agent-generated content
  and human edits through versioning and merge strategies

#### Property-Scoped Memory Access

- All memory operations maintain strict property context isolation
- Memory chunks tagged with property_id for access control and data segmentation
- Cross-property memory access requires explicit permissions and is logged for
  audit purposes
- Hierarchical property relationships supported for inherited memory access
  patterns

### 13. Messaging Platform Integration

#### Feature Goal

Integrate the Verding system with popular messaging platforms (initially
Telegram and WhatsApp) to provide users with natural, accessible interfaces to
interact with the agent across multiple channels while maintaining consistent
context, capabilities, and property-scoped access control.

#### API Relationships

- Interfaces with Agent Core for message processing and response generation
- Connects to n8n workflows for webhook processing and message routing
- Integrates with Memory System for conversation context preservation
- Utilizes property management system for context-aware interactions
- Coordinates with Authentication system for user identity verification

#### Detailed Feature Requirements

1. **Integration Architecture**

   - **Webhook-Based Communication**: Receive messages from messaging platforms
     via secured webhook endpoints
   - **n8n Workflow Processing**: Process incoming messages through dedicated
     n8n workflows for each platform
   - **Message Transformation**: Convert between platform-specific formats and
     internal representation
   - **Bi-Directional Message Flow**: Handle both incoming user messages and
     outgoing agent responses
   - **Multi-Platform Framework**: Unified handling of multiple messaging
     platforms within a single architecture
   - **Property Context Preservation**: Maintain property context across
     messaging channels for proper data isolation

2. **Authentication and Security**

   - **User Identity Verification**: Establish and verify user identity through
     platform-specific authentication methods
   - **Account Linking**: Connect messaging platform accounts to existing
     Verding user accounts
   - **Session Management**: Maintain secure sessions with token-based
     authentication across messaging interactions
   - **Permission Enforcement**: Apply property-specific access controls based
     on authenticated user identity
   - **Sensitive Information Handling**: Secure processing and storage of
     sensitive information transmitted via messages
   - **Property-Specific Access Control**: Enforce property access permissions
     within messaging contexts

3. **Platform-Specific Implementation** **Telegram Integration**:

   - **Bot Creation and Configuration**: Setup and configure Telegram bot with
     proper permissions and webhook configuration
   - **Command Structure**: Implement slash commands for specific actions
     (/help, /status, /property, /summary)
   - **Group vs Private Chat Handling**: Different interaction patterns for
     group chats versus private conversations
   - **Media Message Processing**: Handle images, documents, voice messages, and
     other media types
   - **Telegram UI Elements**: Utilize inline keyboards, buttons, and custom
     markup for enhanced interaction
   - **Webhook Security**: Implement proper webhook verification and security
     measures

   **WhatsApp Integration**:

   - **Business API Integration**: Utilize WhatsApp Business API for official
     business communication
   - **Message Templates**: Create and manage approved message templates for
     automated responses
   - **Media Handling**: Process images, documents, audio, and video messages
   - **User Opt-In Management**: Handle user consent and opt-in processes for
     WhatsApp communication
   - **Contact Management**: Verify and manage WhatsApp contact information
   - **Rate Limiting Compliance**: Implement rate limiting and compliance with
     WhatsApp Business policies

4. **Context Management**

   - **Session Identification**: Track conversation sessions across separate
     message exchanges
   - **Context Preservation**: Maintain conversational context between separate
     conversations and interactions
   - **Cross-Platform Context**: Share context and preferences between different
     messaging platforms
   - **Long-Term Memory**: Persist user preferences, interaction history, and
     learned patterns
   - **Property Context Management**: Maintain active property context
     throughout messaging interactions
   - **Timeout and Expiration**: Implement appropriate timeout policies for
     conversation context and session management

5. **Message Handling and Processing**

   - **Incoming Message Validation**: Validate and normalize incoming messages
     from different platforms
   - **Platform-Specific Preprocessing**: Handle platform-specific message
     formats, emojis, and special characters
   - **Entity Extraction**: Extract relevant entities, intents, and context from
     user messages
   - **Agent Processing**: Route processed messages to Agent Core for response
     generation
   - **Response Formatting**: Format agent responses with platform-specific
     features and limitations
   - **Unsupported Message Types**: Handle unsupported message types with
     appropriate fallback responses

6. **Group Chat Model**

   - **Agent Mention/Activation**: Detect when the agent is mentioned or should
     respond in group contexts
   - **Multi-User Conversation Tracking**: Track multiple users and their
     individual contexts within group chats
   - **Permission Management**: Apply appropriate permissions for group chat
     interactions
   - **Privacy Considerations**: Maintain privacy and data isolation between
     users in group settings
   - **Property Context in Groups**: Handle property context when multiple users
     with different property access are present
   - **Administrative Commands**: Provide administrative controls for group chat
     management

7. **Error Handling and Recovery**
   - **Platform Service Disruption**: Handle temporary outages or disruptions in
     messaging platform services
   - **Message Delivery Failures**: Implement retry mechanisms and alternative
     delivery methods for failed messages
   - **Rate Limiting Strategies**: Handle platform-imposed rate limits with
     appropriate throttling and queuing
   - **User Error Feedback**: Provide clear feedback to users when errors occur
     during message processing
   - **Conversation Recovery**: Recover interrupted conversations and maintain
     context across service disruptions
   - **Monitoring and Logging**: Comprehensive logging and monitoring specific
     to messaging platform interactions

#### Detailed Implementation Guide

1. **System Architecture Overview**

   - **Architecture**: Webhook-based messaging platform integration with n8n
     workflow processing
   - **Technology Stack**:
     - n8n for webhook processing and message routing
     - Platform-specific APIs (Telegram Bot API, WhatsApp Business API)
     - Supabase for conversation storage and context management
     - JWT tokens for authentication and session management
   - **Integration Points**:
     - Messaging platform webhook endpoints
     - Agent Core for message processing
     - Memory System for context preservation
     - Authentication system for user verification

2. **Database Schema Design**

   - **Messaging_Channels Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `platform`: ENUM ('telegram', 'whatsapp', 'signal')
     - `platform_user_id`: VARCHAR (platform-specific user identifier)
     - `platform_username`: VARCHAR (platform-specific username, nullable)
     - `verification_status`: ENUM ('pending', 'verified', 'blocked')
     - `preferences`: JSONB (channel-specific preferences and settings)
     - `created_at`: TIMESTAMP
     - `updated_at`: TIMESTAMP

   - **Message_Sessions Table**:

     - `id`: UUID (primary key)
     - `user_id`: UUID (foreign key to users table)
     - `property_id`: UUID (foreign key to properties table)
     - `messaging_channel_id`: UUID (foreign key to messaging_channels table)
     - `session_token`: VARCHAR (unique session identifier)
     - `platform_chat_id`: VARCHAR (platform-specific chat/group identifier)
     - `context_data`: JSONB (session context and conversation state)
     - `last_activity`: TIMESTAMP
     - `expires_at`: TIMESTAMP
     - `created_at`: TIMESTAMP

   - **Platform_Messages Table**:

     - `id`: UUID (primary key)
     - `message_session_id`: UUID (foreign key to message_sessions table)
     - `platform_message_id`: VARCHAR (platform-specific message identifier)
     - `direction`: ENUM ('inbound', 'outbound')
     - `message_type`: ENUM ('text', 'image', 'document', 'audio', 'video',
       'location', 'contact')
     - `content`: TEXT (message content)
     - `metadata`: JSONB (platform-specific metadata, attachments, etc.)
     - `processing_status`: ENUM ('pending', 'processed', 'failed', 'delivered')
     - `created_at`: TIMESTAMP
     - `processed_at`: TIMESTAMP

   - **Indexing Strategy**:
     - Create index on `messaging_channels.user_id`
     - Create index on `messaging_channels.platform_user_id`
     - Create composite index on
       `messaging_channels(platform, platform_user_id)`
     - Create index on `message_sessions.user_id`
     - Create index on `message_sessions.messaging_channel_id`
     - Create index on `message_sessions.session_token`
     - Create index on `platform_messages.message_session_id`
     - Create index on `platform_messages.platform_message_id`
     - Create index on `platform_messages.created_at`

3. **API Design**

   - **Platform Webhook Endpoints**:
   - **POST /webhooks/telegram**

     - Request: Telegram webhook payload with message updates
     - Response: 200 OK (webhook acknowledgment)
     - Processing: Route to n8n workflow for Telegram message processing

   - **POST /webhooks/whatsapp**

     - Request: WhatsApp webhook payload with message updates
     - Response: 200 OK (webhook acknowledgment)
     - Processing: Route to n8n workflow for WhatsApp message processing

   - **Channel Management Endpoints**:
   - **GET /api/messaging/channels**

     - Request: Query parameters for filtering user's messaging channels
       - `property_id` (optional): Filter by property context
       - `platform` (optional): Filter by messaging platform
     - Response: List of user's connected messaging channels

   - **POST /api/messaging/channels/link**

     - Request: JSON data for linking messaging account
       - `platform`: Messaging platform name
       - `verification_code`: Platform-specific verification code
       - `property_id` (optional): Property context for channel
     - Response: Channel linking status and details

   - **DELETE /api/messaging/channels/{id}**

     - Request: Channel ID to unlink
     - Response: Unlink confirmation

   - **Session Management Endpoints**:
   - **GET /api/messaging/sessions**

     - Request: Query parameters for active sessions
       - `property_id` (optional): Filter by property context
     - Response: List of active messaging sessions

   - **POST /api/messaging/sessions/{id}/context**

     - Request: JSON data for updating session context
       - `property_id` (optional): Update property context
       - `context_data`: Updated context information
     - Response: Updated session details

   - **Error Handling**:
     - 400: Bad Request (invalid webhook payload or request data)
     - 401: Unauthorized (invalid or missing authentication)
     - 403: Forbidden (insufficient permissions for property access)
     - 404: Not Found (messaging channel or session not found)
     - 409: Conflict (channel already linked or session conflict)
     - 422: Unprocessable Entity (verification failed or invalid platform data)
     - 429: Too Many Requests (rate limiting active)
     - 500: Internal Server Error
     - 502: Bad Gateway (external messaging platform unavailable)
     - 503: Service Unavailable (messaging service temporarily disabled)

4. **n8n Workflow Implementation** **Telegram Message Processing Workflow**:

   - **Step 1**: Receive webhook POST from Telegram with message payload
   - **Step 2**: Validate Telegram signature and webhook security token
   - **Step 3**: Parse message content, user ID, chat ID, and metadata
   - **Step 4**: Identify Verding user associated with Telegram user ID
     - If not found, initiate account linking process with verification code
     - If found, validate user permissions and status
   - **Step 5**: Determine property context from conversation history or user
     default
   - **Step 6**: Normalize message to internal format with user/property context
   - **Step 7**: Process message through Agent Core with appropriate memory
     access
   - **Step 8**: Format agent response for Telegram (text, buttons, inline
     keyboards)
   - **Step 9**: Send response via Telegram Bot API
   - **Step 10**: Update conversation history and session context

   **WhatsApp Message Processing Workflow**:

   - **Step 1**: Receive webhook POST from WhatsApp Business API
   - **Step 2**: Validate WhatsApp webhook signature and verify payload
   - **Step 3**: Parse message content, contact information, and metadata
   - **Step 4**: Check user opt-in status and consent for communication
   - **Step 5**: Identify Verding user and validate account linking
   - **Step 6**: Determine property context and apply access controls
   - **Step 7**: Process message through Agent Core with context
   - **Step 8**: Format response according to WhatsApp Business policies
   - **Step 9**: Send response via WhatsApp Business API
   - **Step 10**: Update conversation history and compliance records

5. **Frontend Architecture**

   - **Component Hierarchy**:

     - `MessagingDashboard` (parent)
       - `ChannelManager` (manage connected messaging channels)
       - `ConversationHistory` (view conversations across platforms)
       - `ChannelPreferences` (configure platform-specific settings)
       - `PropertyContextSelector` (select property context for messaging)

   - **Messaging Components**:
     - `ChannelLinking` (link new messaging accounts)
     - `ConversationViewer` (display conversation history with platform context)
     - `MessageComposer` (send messages to users via platform)
     - `ChannelStatus` (display channel status and health)

6. **Security Considerations**

   - **Webhook Security**: Implement proper signature verification for all
     platform webhooks
   - **User Authentication**: Secure user identity verification across messaging
     platforms
   - **Data Privacy**: Ensure compliance with messaging platform privacy
     policies and regulations
   - **Message Encryption**: Implement end-to-end encryption where supported by
     platforms
   - **Access Control**: Enforce property-specific access controls in messaging
     contexts
   - **Audit Logging**: Comprehensive logging of all messaging interactions for
     security and compliance

7. **Testing Strategy**

   - **Platform Integration Tests**: Test webhook processing and API
     communication for each platform
   - **Security Tests**: Validate authentication, authorization, and webhook
     security mechanisms
   - **Context Management Tests**: Verify conversation context preservation
     across platforms and sessions
   - **Error Handling Tests**: Test error scenarios including platform outages
     and rate limiting
   - **Property Access Tests**: Validate property-scoped access control in
     messaging contexts

8. **Performance Considerations**
   - **Message Processing Latency**: Optimize webhook processing for fast
     response times
   - **Rate Limiting Compliance**: Implement efficient rate limiting to comply
     with platform restrictions
   - **Concurrent Message Handling**: Support concurrent processing of messages
     from multiple users
   - **Context Retrieval Optimization**: Efficient retrieval of conversation
     context and user preferences
   - **Platform API Optimization**: Minimize API calls and implement caching
     where appropriate
