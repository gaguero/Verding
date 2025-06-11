# System Patterns

**IMPORTANT: Begin with [Project Brief](projectbrief.md) for the complete Memory
Bank navigation guide before reviewing this document.**

## Key Architectural Patterns

1. **External n8n Agent Architecture:** The Agent Core, NLP processing, and
   knowledge base workflows are implemented as an external n8n instance,
   separate from the main backend. This separation allows for visual workflow
   design, easier debugging, and independent scaling.

2. **Model Context Protocol (MCP) Communication:** All interaction between the
   n8n agent and the main backend uses the structured MCP protocol instead of
   standard REST APIs. This ensures that all functionality available through the
   web/mobile UI is accessible via the agent.

3. **Unified Memory System:** The agent's memory system is implemented in the
   same Supabase instance as the main backend database, using pgvector for
   semantic search capabilities. This enables efficient vector-based retrieval
   and consistency between agent memory and system data.

4. **Tag-Based Access Control:** Memory access follows a flexible, tag-based
   approach combining RBAC and ABAC principles. This allows for dynamic
   configuration of permissions based on data attributes rather than just fixed
   roles.

5. **Multi-Channel Integration:** The agent supports interaction across multiple
   channels (Telegram, WhatsApp, web, mobile) with consistent context management
   and user experience. See the
   [Messaging Platform Integration Specifications](messaging_platform_integration_specifications.md)
   for details.

6. **Comprehensive Error Handling:** A structured approach to error
   categorization, detection, reporting, recovery, and user communication covers
   both the main backend and n8n agent. See the
   [Error Handling and Recovery Procedures](error_handling_and_recovery_procedures.md)
   for the complete framework.

7. **Progressive Setup:** The system supports incremental configuration,
   allowing users to start with minimal setup and gradually expand functionality
   as needed.

8. **BuJo Task Management:** The agent uses a bullet journal-inspired approach
   to task management, allowing for natural language task creation, tracking,
   and organization.

9. **Customizable Monitoring:** The GUI provides highly customizable monitoring
   screens that can be configured to display various system metrics and status
   information.

10. **Hybrid RAG Implementation:** The agent uses a combination of
    retrieval-augmented generation and traditional NLP to provide context-aware
    responses based on the knowledge base and conversation history.

11. **Row Level Security (RLS):** Database access control is implemented at the
    database level using Supabase RLS policies, providing efficient and secure
    data filtering.

12. **Workflow-Based Agent Logic:** The agent's behavior is defined through
    visual n8n workflows rather than traditional code, making it easier to
    understand, modify, and extend the agent's capabilities.

13. **Agent-First Design:** The primary mode of interaction and system control
    is through the conversational AI agent. All system functionalities available
    via GUI must also be exposed via MCP tools for agent access.

14. **Externalized Agent Core (n8n):** The agent's core logic (NLP, BUJO,
    Knowledge Base workflows, some memory operations) is handled by an external
    n8n instance, communicating with the main backend via MCP.

15. **Model-Context-Protocol (MCP):** A defined set of tools and data structures
    for communication between the n8n agent and the main backend. This replaces
    a traditional REST API for core agent-driven functionalities.

16. **Multi-Property Architecture:** The system is fundamentally designed to
    support multiple distinct properties (farms/locations) under a single
    Verding instance. This requires:

    - **Property-Scoped Data:** Most data entities (sensor readings, operational
      tasks, inventory, customer orders related to a property) must be
      associated with a `property_id`.
    - **Contextual UIs:** User interfaces must allow users to select and operate
      within the context of a specific property.
    - **Property-Level Permissions:** User access and actions are governed by
      their roles and permissions within a specific property.

17. **Hybrid RAG Memory System (Supabase/pgvector):** The agent utilizes a
    Retrieval-Augmented Generation approach, combining dense vector search
    (pgvector) and sparse/keyword search in Supabase for its knowledge base and
    long-term memory.

18. **Direct Database Access for Agent Memory:** The n8n agent workflows connect
    directly to the Supabase database for most memory operations (ingestion,
    retrieval of conversation history, RAG), bypassing the main backend for
    these specific tasks to optimize performance and flexibility.

19. **Role-Based Access Control (RBAC) with Attribute/Tag Enhancements:** A
    flexible access control model combining predefined roles (client, employee,
    admin) with fine-grained permissions based on tags/attributes attached to
    data, enforced by Supabase RLS. This system is property-aware.

20. **Modular Monolith for Main Backend:** While the agent core is externalized,
    the main backend (handling business logic, data persistence, GUI APIs) is a
    modular monolith deployed on Railway.

21. **Declarative UI (React/React Native):** Frontend interfaces are built using
    declarative JavaScript libraries for web and mobile.

22. **Event-Driven Workflows (n8n):** Many background processes, integrations,
    and agent logic sequences are implemented as event-driven workflows in n8n.

23. **Customizable Dashboard & Widget Architecture:**
    - **Concept:** Users can create and personalize dashboards by selecting,
      arranging, and configuring various data widgets.
    - **Property Context:** All dashboard data is filtered by a global property
      selector.
    - **Widget Library:** A collection of predefined widgets (sensor data,
      operational KPIs, task summaries, etc.) that users can add to dashboards.
    - **Configurability:** Each widget instance can be configured (e.g., select
      specific sensors, time ranges, alert thresholds) by the user.
    - **Real-time Updates:** Dashboards aim to display near real-time data,
      potentially using WebSockets or efficient polling.
    - **Data Flow:** Widgets request data from backend APIs, which fetch and
      filter data based on widget configuration and the active property context.

## Implementation Approach

These patterns guide our implementation decisions across all components of the
Verding system. When adding new features or modifying existing ones, ensure they
adhere to these established patterns to maintain architectural consistency.

**Agent-First Architecture:** The system follows an agent-first approach where
the Agent (implemented as an external n8n instance) is the primary intelligence
layer, with traditional GUI components as secondary interfaces.

**External n8n Agent:** The Agent Core and all associated logic for NLP
processing, BUJO interaction, Knowledge Base access, and contextual awareness
are implemented as workflows in an external n8n instance that communicates with
the main Verding backend exclusively through **Model Context Protocol (MCP)**.

**MCP Communication:** The Model Context Protocol is the exclusive means of
communication between the external n8n Agent and the main Verding backend,
providing a structured way for the agent to access ALL system functionality that
is available through the web/mobile UI.

**Backend Integration:** The main backend is a standard web service architecture
providing both REST API endpoints for the Web/Mobile UIs and MCP endpoints for
the external n8n agent. The backend handles data storage, business logic
execution, and interfacing with external systems.

**Decoupled UI Layers:** The web and mobile interfaces are decoupled from the
backend and agent, consuming the backend's API to render data and send user
actions. The agent has a separate communication path to the backend via MCP.

**Agent BUJO View (Not Edit):** The GUI provides users with a view into the
agent's BUJO but does not allow direct editing. All modifications to the BUJO
are handled by the agent through MCP communication with the backend.

**Hybrid Memory System using Supabase** is used by the external n8n Agent to
manage both short-term conversation context and long-term knowledge derived from
user interactions and the document base (RAG). The **Supabase database
(PostgreSQL with pgvector and TSVector)** is accessed directly by the n8n agent
for storing and querying vector embeddings and conversation history as part of
this system. **This memory system incorporates detailed access control
mechanisms to ensure that memory records are only accessible based on user roles
(client, employee, admin) and defined permissions.**

**Role-Based Memory Access:** The memory system enforces strict access control
based on user roles (client, employee, admin), context (private chats, group
chats, specific application areas), and explicit sharing permissions.

**Multi-Platform Support:** The agent is designed to interact with users across
multiple platforms, including the web/mobile interfaces, messaging apps
(Telegram, WhatsApp), email, and potentially other communication channels.

**Group Chat Management:** The agent maintains contextual awareness across group
chat scenarios, carefully managing information sharing boundaries based on
context and user permissions.

**Customizable Monitoring Screens:** The main GUI includes highly customizable
monitoring screens that provide visualizations of various system data, metrics,
and statuses to support operational oversight and management.

**Railway for Backend Deployment:** The main backend will be deployed via
Railway using GitHub integration. The deployment approach for the external n8n
agent and memory database is still to be determined.

## Data Flow Patterns

- **Agent Interaction -> MCP -> Backend -> Supabase:** Standard flow for agent
  commands that modify core business data or trigger complex backend operations.
- **Agent Memory Query -> n8n Workflow -> Supabase (pgvector):** Flow for
  agent's internal RAG queries or conversation history retrieval.
- **UI Interaction -> Backend API -> Supabase:** Standard flow for GUI-driven
  actions.
- **Sensor Data -> Home Assistant -> MQTT -> n8n Workflow -> Supabase:** Flow
  for ingesting environmental data.
- **User Message (Telegram/WhatsApp) -> n8n Webhook -> Agent Core (n8n) -> [MCP
  or Direct DB for Memory] -> Response to Platform:** Flow for messaging
  platform interactions.
- **Monitoring Dashboard UI -> Backend API (filtered by Property ID) ->
  Supabase:** Flow for populating customizable monitoring widgets.

## Key Technology Choices & Rationale

- **n8n:** For flexible workflow automation of agent logic, integrations, and
  background tasks. Enables rapid development and modification of complex
  processes.
- **MCP:** Provides a structured, tool-based interface for agent-backend
  communication, more suitable for AI agent interactions than a traditional REST
  API.
- **Supabase (PostgreSQL with pgvector):** Offers a robust relational database
  with integrated vector support, ideal for RAG, semantic search, and general
  data persistence. RLS provides a powerful mechanism for security.
- **React/React Native (Expo):** Modern, popular choices for building responsive
  and maintainable web and mobile UIs.
- **Railway:** PaaS for easy deployment and scaling of the main backend.
- **n8n.com Cloud:** Managed hosting for the n8n agent, reducing operational
  overhead.

## Future Architectural Considerations

- **Microservices:** Potential to break down the main backend into microservices
  if complexity grows significantly, though a modular monolith is preferred
  initially.
- **Dedicated Messaging Queue:** For more robust handling of asynchronous tasks
  between services (e.g., RabbitMQ, Kafka), though n8n's internal queuing may
  suffice for many scenarios.
- **Advanced Data Analytics Pipeline:** For more complex BI and predictive
  analytics, a dedicated data warehouse and ETL process might be needed beyond
  Supabase's capabilities.
