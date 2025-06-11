# Agent Memory System Design

The agent's memory architecture is designed as an integral component of the n8n
workflows, allowing direct database interactions for both ingestion and
retrieval. This approach provides flexibility, performance, and simplifies the
architecture by leveraging the agent's direct access to the database.

## Core Principles

1. **Direct Database Access:** The n8n agent workflows will connect directly to
   the Supabase database for memory operations, eliminating unnecessary API
   layers.
2. **Role-Based Access Control:** Memory retrieval will be strictly controlled
   based on user roles (client, employee, admin) and context-specific
   permissions.
3. **Multi-Context Awareness:** The agent will maintain contextual awareness
   across different interaction channels, including one-on-one chats and group
   conversations.
4. **Global Learning with Filtered Expression:** The agent will learn from all
   interactions across users and contexts, but will carefully filter what
   information it can share, use, or reference based on the current context and
   user permissions.
5. **Property Context Awareness:** Memory data will be associated with a
   specific `property_id`, and retrieval and access will be filtered based on
   the user's permissions for that property.

## Technical Components

### 1. Memory Storage Architecture

- **Hybrid RAG (Retrieval-Augmented Generation):** Combining dense and sparse
  vectors for more accurate and comprehensive information retrieval.
- **PostgreSQL with pgvector and TSVector:** Leveraging Supabase's vector
  capabilities for semantic search and TSVector for keyword-based retrieval.
- **Access Control Metadata:** Each memory record includes metadata specifying
  who can access it, under what circumstances, and for what purposes.
- **User Interface Configurations:** While detailed, structured UI
  configurations (e.g., specific dashboard layouts, widget settings defined via
  MCP tools like `create_dashboard` or `configure_widget`) are typically stored
  in dedicated tables within the main application database, the memory system
  can store:
  - Metadata or references related to these configurations (e.g.,
    `dashboard_id`, `widget_id`).
  - User preferences learned over time (e.g., "user X often accesses dashboard Y
    for property Z").
  - Summaries or logs of significant interactions with monitoring features, if
    they inform future agent assistance.

### 2. Database Schema (in Supabase)

- `memory_chunks` table: Stores the processed document/content chunks.

  - `id`: UUID (Primary Key)
  - `document_id`: UUID (Foreign Key to `documents` table)
  - `chunk_text`: TEXT (The actual text content of the chunk)
  - `dense_embedding`: vector (Vector storing the dense embedding, requires
    `pgvector` extension)
  - `sparse_embedding`: JSONB (Storing sparse embedding data)
  - `context`: TEXT (Additional contextual information)
  - `metadata`: JSONB DEFAULT '{}'::JSONB, -- Flexible field for other relevant
    data, including access control tags, **and potentially references to UI
    configurations or monitoring interaction summaries.**
  - `created_at`: TIMESTAMP (Timestamp of ingestion)
  - **`property_id`: UUID REFERENCES properties(id) -- Added to link memory
    chunks to a property**

- `conversation_history` table: Stores the turns of conversations.

  - `id`: UUID (Primary Key)
  - `user_id`: UUID REFERENCES auth.users(id),
  - `session_id`: UUID (To group related messages)
  - `chat_id`: UUID (Identifies specific chat channel, including group chats)
  - `role`: TEXT (e.g., "user", "assistant")
  - `content`: TEXT (The actual message)
  - `embedding`: vector (Vector representation of the content)
  - `message_index`: INT (To maintain message order within a session)
  - `metadata`: JSONB DEFAULT '{}'::JSONB, -- Additional data, including privacy
    level, context markers, sharing permissions, **and logs of
    monitoring-related commands or significant dashboard interactions initiated
    via agent.**
  - `created_at`: TIMESTAMP (When the message was sent)
  - **`property_id`: UUID REFERENCES properties(id) -- Added to link
    conversation history to a property**

- `user_memory_access` table: Defines access control for memory records.
  - `id`: UUID (Primary Key)
  - `user_id`: UUID (User this access rule applies to)
  - `user_role`: TEXT (client, employee, admin)
  - `access_level`: INT (Numeric representation of access level)
  - `allowed_contexts`: JSONB (Array of contexts where access is permitted)
  - `allowed_tags`: JSONB (Memory tags this user can access)
  - `visibility_scope`: TEXT (private, team, public)
  - `created_at`: TIMESTAMP
  - `updated_at`: TIMESTAMP

### 3. Memory Access Control Mechanisms

The memory system will enforce strict access control through several mechanisms:

- **Role-Based Permissions:** Different user roles (client, employee, admin)
  have predefined baseline access rights
- **Context-Aware Filtering:** The agent considers the current context (private
  chat, group chat, specific application area) when determining what information
  to retrieve and share
- **Session-Based Separation:** Conversation sessions are kept separate with
  explicit sharing only when authorized
- **Metadata Tagging:** All memory entries include metadata that specifies
  accessibility requirements
- **Query-Time Filtering:** Memory retrieval queries automatically include
  access control parameters based on the current user and context
- **Property-Scoped Access:** Access to memory data is restricted based on the
  user's permissions for the specific property the memory item is associated
  with.

### 4. Chat Platform Integration

The agent will be capable of participating in:

- **One-on-One Chats:** Direct conversations with a single user
- **Group Chats:** Conversations with multiple participants, such as in Telegram
  or WhatsApp groups
- **Multi-Platform Sessions:** Maintaining context across different platforms
  when the same user interacts through multiple channels

For group chats, special considerations include:

- **Context Management:** Understanding the group's purpose and history,
  **including its associated property ID**.
- **Information Sharing Boundaries:** Carefully filtering what private
  information can be shared in group settings, **respecting property
  boundaries**.
- **User Identification:** Properly identifying and tracking individual users
  across platforms.
- **Command Handling:** Processing commands from authorized users within groups.

## Implementation Approach

### Agent's Memory System Design (Direct DB Access from n8n)

The agent's memory will be implemented as a knowledge base using a
vector-capable database that supports hybrid RAG. The n8n workflows will handle
the direct database interactions for both ingestion and retrieval. **This design
will include mechanisms for role-based access control to ensure that memory
records are retrieved and presented only to users with appropriate
permissions.**

**1. Database Selection:** Supabase (PostgreSQL with pgvector extension)
provides:

- Strong vector search capabilities
- Support for hybrid retrieval approaches (dense + sparse/keyword)
- Ability to store and query both structured data and embeddings
- Support for complex access control rules

**2. Document Ingestion Workflow (in n8n):**

- Input paths/files from the management interface or directly from Google Drive
- Process documents into chunks
- Generate embeddings (dense vectors) using an embedding model
- Extract keywords and build sparse vectors
- Store chunk text, embeddings, and metadata in the Supabase database
- Apply appropriate access control tags based on document context, sensitivity,
  and intended audience
- **Include the relevant `property_id` when storing memory chunks, based on the
  source of the document or explicit user tagging.**
- **Ingest comprehensive documentation regarding monitoring features, dashboard
  functionalities, and widget behaviors to enable RAG-based contextual help for
  users interacting with these systems (e.g., answering "How do I use the yield
  forecast widget?").**

**3. Memory Retrieval Workflow (in n8n):**

- Receive a query from the user via the Web/Mobile UI or chat platforms
- Identify the user and retrieve their role and access permissions, including
  the active property context.
- Generate embeddings for the query
- Use hybrid search combining:
  - Dense retrieval: Vector similarity search using pgvector
  - Sparse retrieval: Keyword matching using PostgreSQL text search
- Filter results based on user's access permissions and the active property
  context.
- **Consider recent monitoring-related interactions or stored preferences (e.g.,
  from `conversation_history` metadata or `memory_chunks` metadata) if relevant
  to the query (e.g., "Show me my usual production dashboard").**
- Rerank and process the combined results
- Return the most relevant context (filtered for appropriate access)
- Log the interaction and outcome in the conversation history

This design ensures the agent can access detailed document knowledge directly,
leveraging hybrid RAG for improved accuracy, while keeping MCP reserved for
communication with the main backend services. **It also incorporates necessary
access control measures to protect sensitive information while providing
appropriate personalization.**

**4. Conversation History Management (in n8n):**

- Store user inputs and agent responses in the `conversation_history` table as
  they occur.
- **Include the `property_id` associated with the conversation session when
  storing history.**
- Retrieve recent conversation turns from `conversation_history` for context,
  **filtering by the active property ID.**
- Ensure access to conversation history is restricted based on user permissions
  for the relevant property.

## 5. Implications for Other Specifications

- The `bases_editing_multi_property_architecture.md` document outlines the
  overall strategy for incorporating multi-property context across all
  specifications, including the memory system.
- The `memory_system_access_control_implementation.md` document provides the
  detailed database schema and RLS policies for property-scoped memory access
  control.
- The `mcp_specification.md` and `mcp_specification_property_updates.md`
  documents define the MCP tools that will interact with the memory system,
  ensuring they include `property_id` parameters for memory operations.
- The `customizable_monitoring_screens_specification.md` provides context on the
  types of user interactions, data, and configurations related to monitoring
  that may need to be referenced or learned by the memory system.

## 6. Future Enhancements

- **Cross-Property Memory Search:** Implement explicit mechanisms for searching
  memory across multiple properties, with appropriate permission checks.
- **Property-Specific Knowledge Bases:** Allow for separate knowledge bases or
  filtering of knowledge based on property context.
- **Data Migration:** Define procedures for migrating memory data between
  properties if needed.
