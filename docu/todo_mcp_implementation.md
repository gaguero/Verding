## To-Do: MCP Implementation for Agent-Backend Communication & Agent Memory Design

This document outlines the key steps required to design and implement the Model
Context Protocol (MCP) for communication between the external n8n Agent Core and
the main Verding backend, and to design the agent's direct-access memory system
using Supabase and Google Drive.

- **Phase 1: Design & Documentation (Our Focus)**

  - Conduct detailed design discussions for n8n Agent workflows, specifically
    focusing on how they will interact using MCP calls (for backend services)
    and direct database access to Supabase (for memory).
  - **Design the MCP Interface for the Main Verding Backend (covering all
    frontend functionalities):**
    - Define specific MCP tools for backend actions (e.g., `bujo/addTask`,
      `bujo/getTasks`, `inventory/addItem`, `users/getUserProfile`). This will
      involve reviewing the `BASES/Verding Feature Specifications.md` file to
      identify all relevant actions.
    - Define specific MCP resources for backend data access (e.g.,
      `resources/sensorData`, `resources/knowledgeBaseMetadata`).
    - Specify the JSON-RPC message formats (methods, parameters, results,
      errors) for each defined MCP tool and resource.
    - Detail the underlying backend logic that will handle each MCP method call.
  - **Design the Agent's Memory System (Direct DB Access from n8n to Supabase &
    Google Drive Integration):**
    - **Confirm Supabase as the vector database accessible by n8n that supports
      hybrid RAG (semantic + keyword search) for long-term memory.**
    - **Design the schema for the Supabase memory database (for RAG content and
      conversation history):**
      - `memory_chunks` table: Define columns for `id`, `document_id` (FK to
        `documents`), `chunk_text`, `dense_embedding` (vector),
        `sparse_embedding` (JSONB), `context`, `metadata` (JSONB), `created_at`
        (TIMESTAMP).
      - `conversation_history` table: Define columns for `id`, `user_id` (FK),
        `session_id`, `message_index`, `speaker`, `message_text`, `timestamp`,
        `embedding` (vector, optional).
      - `documents` table: Define columns for `id` (UUID, PK),
        `gdrive_drop_path` (TEXT, path in drop folder), `gdrive_replica_path`
        (TEXT, path in memory replica), `last_modified_agent` (TIMESTAMP),
        `last_modified_human` (TIMESTAMP), `status` (TEXT, e.g., 'processing',
        'active', 'deleted').
    - **Plan the detailed n8n workflows for document ingestion from Google Drive
      into Supabase (RAG):** (Based on video concepts and Google Drive
      integration)
      - Google Drive Trigger (monitor drop folder and memory replica for
        changes).
      - Read Document from Google Drive.
      - Move/Copy document from drop folder to correct location in Google Drive
        memory replica.
      - Process Document (Chunking logic, Contextualization using n8n LLM node,
        Generate Embeddings - dense and sparse).
      - Store in Supabase (`memory_chunks` table, update `documents` table).
      - Update Google Drive `Index` and `README` files.
      - Handle updates/deletions from Google Drive memory replica (sync changes
        to Supabase, update `Index`/`README`).
    - **Plan the detailed n8n workflow for memory retrieval from Supabase
      (RAG):** (Based on video concepts)
      - Trigger (internal from main workflow).
      - Receive User Query.
      - Generate Query Embeddings.
      - Query Supabase (hybrid search on `memory_chunks` joining with
        `documents`).
      - Fuse/Re-rank Results.
      - Return Relevant Chunks (including source information from `documents`).
    - **Plan the detailed n8n workflow for conversation history management in
      Supabase:**
      - Storing conversation turns (`conversation_history` table).
      - Retrieving recent conversation history for context.
    - **Plan the detailed n8n workflows for ingesting information from other
      channels and agent-generated content:**
      - Channel Trigger (e.g., email, chat webhook) -> Extract content.
      - Process Content (similar to document ingestion but for smaller pieces).
      - Store in Supabase (`memory_chunks`, potentially linking to conversation
        history).
      - Replicate content/summary in Google Drive memory replica.
      - Update Google Drive `Index` and `README` files.
  - **Design MCP Interaction within n8n Workflows:**
    - Determine how n8n will make MCP tool calls based on user intent and
      workflow logic.
    - Plan how n8n will process responses and errors received via MCP.
    - Consider if custom n8n nodes are required for seamless MCP interaction.
  - **Design Multi-channel Input/Output Handling in n8n:**
    - Outline a standard workflow pattern: Channel Trigger -> Normalization ->
      Main Agent Workflow -> Response -> Output Routing.
  - **Design Knowledge Base Access via MCP/Supabase/Google Drive:**
    - Specify how the n8n agent will query the Knowledge Base, leveraging the
      RAG memory system in Supabase and the replicated content in Google Drive.
  - **Design Comprehensive Error Handling Strategy (based on industry standards
    for distributed systems/JSON-RPC):**
    - Define a standardized error format (JSON-RPC error object: `code`,
      `message`, `data`).
    - Define specific, meaningful error codes for MCP interactions and n8n
      workflows.
    - Ensure clear, secure, human-readable error messages.
    - Plan for structured error details (`data` field).
    - Implement retry mechanisms with exponential backoff for transient errors.
    - Ensure robust monitoring and logging.
  - **Design Progressive Setup Orchestration via MCP:**
    - Specify MCP tools to query setup status, mark steps complete, and retrieve
      setup information.
  - **Design Time-Series Data Access via MCP:**
    - Specify MCP tools to query historical and real-time sensor data.
  - Strategize specific, line-by-line edits required for the `BASES`
    documentation files to accurately reflect the n8n agent architecture,
    including the MCP communication design, the defined tools and resources, and
    the memory system design with direct Supabase and Google Drive interaction.
  - **Include documentation that the main Verding system GUI should have highly
    customizable monitoring screens.**
  - Obtain user approval for the proposed edits to the `BASES` files before
    making changes.

- **Phase 2: Documentation Update & Task Generation**

  - Apply the approved edits to the `BASES` files to update the source
    documentation.
  - Regenerate the comprehensive PRD (`scripts/comprehensive_prd.md`) from the
    updated `BASES` files.
  - Parse the new comprehensive PRD to generate a corrected and updated set of
    tasks in `tasks.json` that incorporate the detailed design.

- **Phase 3: Implementation (To be done by another team)**

  - Implement the MCP server logic within the main Verding backend to expose the
    defined MCP tools and resources.
  - Develop custom n8n nodes or configurations required for the n8n agent to act
    as an MCP client and interact with the backend's MCP interface.
  - Implement the n8n agent workflows that utilize the MCP communication to
    perform tasks (e.g., update BUJO tasks via MCP, query sensor data via MCP)
    and interact with Supabase and Google Drive for memory management.
  - Set up Supabase database for agent memory and main backend.
  - Set up Railway project for main backend deployment via GitHub.

- **Phase 4: Testing & Integration (To be done by another team)**

  - Develop and execute tests for the backend's MCP server implementation.
  - Develop and execute tests for the n8n agent's MCP client functionality and
    workflows, including memory interaction with Supabase and Google Drive.
  - Integrate and test the end-to-end MCP communication between the n8n agent
    and the backend.
  - Verify that agent commands received via various channels correctly trigger
    actions in the backend via MCP.

- **Phase 5: Refinement (Ongoing)**
  - Review and refine the MCP design and implementation based on testing and
    ongoing development.
  - Update documentation and tasks as needed based on lessons learned during
    implementation.
