# Technical Context

**IMPORTANT: Begin with [Project Brief](projectbrief.md) for the complete Memory
Bank navigation guide before reviewing this document.**

This document outlines the technical stack and architecture of the Verding
system, including key implementation approaches and dependencies. **Please also
review the
[Error Handling and Recovery Procedures](error_handling_and_recovery_procedures.md)
and
[Messaging Platform Integration Specifications](messaging_platform_integration_specifications.md)
for critical architectural details.**

## Core Technologies

**Frontend:**

- React.js with TypeScript for web interface
- React Native for mobile applications
- Tailwind CSS for styling
- NextJS for server-side rendering and API routes

**Backend:**

- Node.js with Express for API services
- Supabase (PostgreSQL) as the primary database
  - pgvector extension for vector embeddings
  - Row Level Security (RLS) for fine-grained access control
  - PostgREST for automatic REST API generation
- Railway for main backend deployment and hosting

**Agent Core:**

- n8n for workflow orchestration and agent logic
- Integration with various AI services for NLP processing
- WebSocket connections for real-time communication
- Supabase for agent memory storage and management, and backend integration via
  MCP. This approach allows for visual workflow design while maintaining the
  power and flexibility needed for a sophisticated agent.

**Model Context Protocol (MCP):** Used as the communication protocol between the
external n8n Agent and the main Verding backend. This protocol provides a
structured way for the agent to access ALL system functionality that is
available through the web/mobile UI.

**External Integrations:**

- Home Assistant for sensor data collection
- Stripe for payment processing
- Telegram API for messaging
- WhatsApp Business API for messaging
- Email services (SendGrid/Mailgun) for email communication
- Various AI providers for language model access

## Development and Deployment

**Development Environment:**

- Git for version control
- GitHub for repository hosting
- ESLint and Prettier for code quality
- Jest for testing
- Docker for containerization
- TypeScript for type safety

**Deployment Strategy:**

- Railway for main backend and database hosting
- GitHub Actions for CI/CD pipeline
- n8n self-hosting for Agent Core (deployment strategy TBD)
- Supabase hosted instance for database and authentication

## Key Technical Requirements

**Security and Privacy:**

- JWT-based authentication
- Row Level Security (RLS) for data access control
- End-to-end encryption for sensitive communications
- GDPR and data privacy compliance
- Attribute-based access control for agent memory

**Performance:**

- Efficient vector search for memory retrieval
- Caching strategies for frequently accessed data
- Optimized database queries and indexing
- Asynchronous processing for long-running tasks

**Scalability:**

- Horizontal scaling for backend services
- Connection pooling for database access
- Queue-based processing for high-load operations
- Serverless functions for sporadic workloads

## Component Relationships

**Key Subsystems:**

- Agent Core (n8n)
- Main Backend (Node.js/Express)
- Database Layer (Supabase/PostgreSQL)
- Web/Mobile UI (React/React Native)
- External Integrations (Home Assistant, Stripe, etc.)

**Key Integration Points:**

- MCP implementation for agent communication
- REST API for web/mobile frontend
- WebSocket for real-time updates
- Webhook endpoints for external triggers
- Database access patterns

**Key Data Flows:**

- User input → Agent → MCP → Backend → Database
- Sensor data → Home Assistant → Backend → Database
- Database → Backend → Web/Mobile UI
- Agent memory → Vector search → Agent response

## System Dependencies

**Critical Dependencies:**

- n8n for agent workflow orchestration
- Supabase for database and authentication
- AI providers for language model access
- MCP client for backend communication
- Railway for deployment and hosting

**Optional Dependencies:**

- Home Assistant for sensor integration
- Stripe for payment processing
- External messaging services (Telegram, WhatsApp)

## Key Technical Decisions

**Agent Architecture:**

- External n8n-based agent versus embedded agent
- MCP for structured communication
- Supabase for memory storage

**Database Design:**

- Relational structure with PostgreSQL
- Vector embeddings for semantic search
- Row Level Security for access control
- Direct database access for performance-critical operations

**Communication Patterns:**

- MCP communication between n8n agent and backend
- REST API for web/mobile UI
- WebSockets for real-time updates
- Webhooks for external triggers

**Access Patterns:**

- Agent access via n8n workflows
- User access via Web/Mobile UI
- Direct database access via admin tools
- Sensor access via Home Assistant

**Error Handling Strategy:**

- Structured error categorization and logging
- Automatic retry mechanisms for transient failures
- Graceful degradation for non-critical features
- Comprehensive monitoring and alerting

## Implementation Priorities

1. Agent Core and MCP protocol implementation
2. Database schema and access control
3. Memory system and vector search
4. Basic backend API endpoints
5. Integration with messaging platforms
6. Web/Mobile UI development
7. Sensor integration
8. Payment processing and subscriptions

## Alternatives Considered

1. **Embedded Agent vs. External n8n Agent:** Chose external n8n agent for
   flexibility, visual workflow design, and separation of concerns.
2. **REST API vs. MCP:** Chose MCP for structured, agent-specific communication
   that maps cleanly to all backend functionality.
3. **Firebase vs. Supabase:** Chose Supabase for PostgreSQL foundation, vector
   search capabilities, and powerful Row Level Security.
4. **Serverless vs. Traditional Backend:** Chose Railway for simplified
   deployment, scaling, and maintenance.

## Constraints and Limitations

1. n8n workflow complexity may increase with sophisticated agent logic
2. Vector search performance dependent on database optimization
3. MCP protocol requires careful versioning and backward compatibility
4. External dependencies create potential failure points

## Integration Points

**User-Facing Integrations:**

- Web browser via React web app
- Mobile devices via React Native app
- Telegram via bot API
- WhatsApp via Business API
- Email via mail service APIs

**System Integrations:**

- AI providers via API
- Sensor systems via Home Assistant
- Payment processing via Stripe
- Main backend via MCP
- Database via Supabase client
- n8n agent via MCP

## Next Technical Priorities

1. Finalize MCP specification
2. Complete database schema design
3. Implement core backend services
4. Develop agent workflows in n8n
5. Establish deployment pipeline
6. Implement error handling and monitoring

### Frontend Technologies

- **Web:** React with TypeScript. Potential UI libraries: Material UI, Ant
  Design, or a custom design system based on the UX/UI Style Guide.
- **Mobile:** React Native (Expo) with TypeScript.
- **State Management:** Context API, Redux, or Zustand (to be decided based on
  complexity).
- **Data Fetching:** React Query or SWR for managing server state, caching, and
  optimistic updates.
- **Charting/Visualization:** A suitable JavaScript charting library will be
  selected for displaying sensor data and operational analytics (e.g., Recharts,
  Chart.js, Nivo). This is particularly relevant for the Customizable Monitoring
  Screens.

### Backend Technologies

- **Runtime:** Node.js with TypeScript.
- **Framework:** Express.js (or potentially NestJS for a more structured
  approach if preferred).
- **Database:** Supabase (PostgreSQL).
- **ORM/Query Builder:** Prisma or a lightweight query builder like Knex.js
  (Supabase client library can also be used directly).

### Agent & Workflow Automation

- **Engine:** n8n (cloud-hosted at n8n.io).
- **Communication Protocol (Agent-Backend):** Custom Model-Context-Protocol
  (MCP) over HTTPS.

### AI & NLP

- **LLM Provider:** OpenAI (GPT-4, GPT-3.5-turbo, or newer models as they become
  available and cost-effective).
- **Embeddings:** OpenAI embeddings API (e.g., `text-embedding-ada-002` or
  newer).
- **Vector Database:** Supabase with the `pgvector` extension.

### Messaging & Real-Time Communication

- **Telegram:** Telegram Bot API.
- **WhatsApp:** Twilio API for WhatsApp or WhatsApp Business API directly.
- **Email:** Standard SMTP/IMAP libraries (e.g., Nodemailer, ImapFlow).
- **Real-time UI Updates:** WebSockets (e.g., using Socket.IO, or native
  WebSocket API) or Server-Sent Events (SSE) will be considered for features
  like the Customizable Monitoring Screens and live agent interactions.

### Deployment & Infrastructure

- **Main Backend:** Railway (Platform as a Service).
- **n8n Agent:** n8n.com Cloud service.
- **Database:** Supabase (managed PostgreSQL).
- **Version Control:** Git (hosted on GitHub).
- **CI/CD:** GitHub Actions.

### Sensor Integration

- **Protocol:** MQTT (via Home Assistant MQTT bridge).
- **Platform:** Home Assistant.

### Billing & Payments

- **Provider:** Stripe API.

### Key Technical Decisions & Trade-offs

- **MCP vs. REST API for Agent:** MCP was chosen to provide a more structured,
  tool-oriented communication model better suited for AI agent interactions,
  allowing for richer context and capability exchange than a standard REST API.
- **Supabase for Dual Roles:** Using Supabase for both the main application
  database and the agent's vector/memory store simplifies the stack and
  leverages PostgreSQL's strengths. The trade-off is a tighter coupling, but RLS
  and careful schema design mitigate risks.
- **n8n Cloud vs. Self-Hosted n8n:** n8n Cloud was chosen to reduce operational
  overhead and benefit from managed updates and infrastructure, at the cost of a
  subscription fee.
- **Modular Monolith vs. Microservices (Backend):** A modular monolith is the
  initial approach for simplicity and faster development. Microservices can be
  considered later if specific components require independent scaling or
  development cycles.
- **Real-time Communication Strategy:** The choice between WebSockets and SSE
  for real-time UI updates will depend on the specific needs of features like
  monitoring dashboards (bidirectional vs. unidirectional data flow, complexity
  of implementation).

This `techContext.md` should be updated as new decisions are made or
technologies are chosen for specific unassigned components.
