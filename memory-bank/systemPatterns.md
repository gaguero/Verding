# System Patterns: Verding

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           User Interfaces                             │
├─────────────┬─────────────┬──────────────┬────────────┬────────────┤
│   Telegram  │  WhatsApp   │     Web      │   Mobile   │   Email    │
│  (Planned)  │  (Planned)  │ (DEPLOYED ✅) │ (Ready)    │ (Planned)  │
└──────┬──────┴──────┬──────┴──────┬───────┴─────┬──────┴─────┬──────┘
       │             │             │             │            │
       └─────────────┴─────────────┴─────────────┴────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │      n8n Agent Core         │
                    │  (External Intelligence)    │
                    │ • NLP Processing (Planned)  │
                    │ • Workflow Orchestration    │
                    │ • Memory Management         │
                    │ • BuJo Task System          │
                    └──────────────┬──────────────┘
                                   │
                         Model Context Protocol
                              (MCP Tools)
                                   │
                    ┌──────────────▼──────────────┐
                    │    Main Verding Backend     │
                    │  (DEPLOYED ✅ Railway)      │
                    │  • Business Logic           │
                    │  • Data Management          │
                    │  • API Services             │
                    │  • Property Management      │
                    └──────────────┬──────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
       ┌────────▼────────┐ ┌──────▼──────┐ ┌────────▼────────┐
       │    Supabase     │ │Home Assistant│ │     Stripe      │
       │ (DEPLOYED ✅)   │ │ • Sensors    │ │ • Billing       │
       │ • Database      │ │ • MQTT       │ │ • Payments      │
       │ • Auth          │ │ (Planned)    │ │ (Planned)       │
       │ • pgvector      │ └──────────────┘ └─────────────────┘
       │ • Memory Store  │
       └─────────────────┘
```

## Production Deployment Patterns (OPERATIONAL ✅)

### 1. Railway Cloud Platform Architecture

**Deployment Status**: ✅ **FULLY OPERATIONAL**

#### Multi-Service Deployment

- **Backend Service**: Node.js API container
  (`https://verding-backend-production.up.railway.app/`)
- **Frontend Service**: React web application with nginx proxy
- **Database**: External Supabase PostgreSQL with pgvector
- **Storage**: Supabase Storage for file management
- **Authentication**: Supabase Auth for JWT-based security

#### Container Orchestration Patterns

```
┌─────────────────────────────────────────────────────────────────┐
│                        Railway Platform                         │
├─────────────────────────┬───────────────────────────────────────┤
│     Frontend Service    │          Backend Service             │
│  ┌─────────────────┐   │   ┌─────────────────────────────────┐ │
│  │  nginx Proxy    │   │   │     Node.js API Server         │ │
│  │  React SPA      │   │   │  • Express.js Framework        │ │
│  │  Static Assets  │   │   │  • TypeScript ES Modules       │ │
│  │  Environment    │   │   │  • Supabase Integration        │ │
│  │  Substitution   │   │   │  • JWT Authentication          │ │
│  └─────────────────┘   │   │  • Swagger Documentation       │ │
│                        │   │  • Health Monitoring           │ │
│                        │   └─────────────────────────────────┘ │
└─────────────────────────┴───────────────────────────────────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │    Supabase     │
                              │  Cloud Service  │
                              │ • PostgreSQL    │
                              │ • pgvector      │
                              │ • Auth Service  │
                              │ • File Storage  │
                              └─────────────────┘
```

### 2. ES Module Production Patterns

#### TypeScript to ES Module Compilation

- **Module Type**: `"type": "module"` in package.json
- **Import Extensions**: Explicit `.js` extensions for all relative imports
- **Index Files**: Proper barrel exports with explicit file references
- **Build Configuration**: TypeScript targeting ES2022 with Node16 module
  resolution

#### Critical Implementation Details

```typescript
// ✅ CORRECT: Explicit .js extension for ES modules
import { config } from './config/index.js';
import { logger } from './utils/logger.js';

// ❌ INCORRECT: Directory imports not supported
import { config } from './config';

// ✅ CORRECT: Proper index file structure
// config/index.ts exports individual modules
export { server } from './server.js';
export { database } from './database.js';
export { security } from './security.js';
```

### 3. Environment Management Patterns

#### Railway Environment Configuration

- **Secrets Management**: Railway dashboard for sensitive variables
- **Environment Isolation**: Separate development/production configurations
- **Variable Validation**: Startup-time environment validation
- **Secret Rotation**: Capability for secure key updates

#### Production Environment Structure

```bash
# Core Application
NODE_ENV=production
PORT=8080
RAILWAY_DOCKERFILE_PATH=packages/backend/Dockerfile

# Database & Authentication
SUPABASE_URL=https://peyneptmzomwjcbulyvf.supabase.co
SUPABASE_ANON_KEY=eyJ... (JWT token)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (Service role JWT)

# Security Keys (Generated via Node.js crypto)
JWT_SECRET=64-character-hex-string
SESSION_SECRET=64-character-hex-string
ENCRYPTION_KEY=32-character-hex-string
```

### 4. Docker Multi-Stage Build Patterns

#### Optimized Production Builds

```dockerfile
# Stage 1: Base dependencies
FROM node:20-alpine AS base
# Install production dependencies only

# Stage 2: Build stage
FROM base AS builder
# Copy source, install dev dependencies, build

# Stage 3: Production runtime
FROM node:20-alpine AS backend
# Copy only built assets and production dependencies
# Non-root user execution for security
```

#### Container Security Patterns

- **Non-root execution**: Dedicated `backend` user (UID 1001)
- **Minimal attack surface**: Alpine Linux base images
- **Layer optimization**: Efficient Docker layer caching
- **Resource limits**: Memory and CPU constraints

### 5. API Documentation & Monitoring

#### Swagger UI Integration

- **OpenAPI Specification**: YAML-based API documentation
- **Live Documentation**: `/api/v1/docs` endpoint in production
- **Interactive Testing**: Built-in API testing interface
- **Version Management**: API versioning through documentation

#### Health Monitoring Patterns

```typescript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});
```

### 6. Logging & Observability

#### Production Logging Strategy

- **Console-only logging**: Optimized for containerized environments
- **Structured logging**: JSON format for log aggregation
- **Log levels**: Configurable via environment variables
- **Request tracking**: Comprehensive request/response logging

#### Error Handling Patterns

```typescript
// Centralized error handling middleware
app.use(errorHandler);

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
```

## Core Architectural Patterns

### 1. Agent-First Design

- **Primary Interface**: Natural language conversation
- **Secondary Interface**: GUI with feature parity
- **Context Persistence**: Conversations maintain state across sessions
- **Multi-Channel Consistency**: Same capabilities across all interfaces

**Implementation Pattern**:

- All business logic accessible via MCP tools
- Agent orchestrates tool calls based on user intent
- GUI calls same backend APIs as agent
- Shared state management across channels

### 2. External n8n Agent

- **Separation of Concerns**: Intelligence layer separate from business logic
- **Visual Workflows**: Non-technical modification of agent behavior
- **Independent Scaling**: Agent and backend scale separately
- **Direct Database Access**: Performance optimization for complex queries

**Benefits**:

- Rapid iteration on agent behavior
- Non-developer workflow modification
- Reduced coupling between AI and business logic
- Better resource allocation

### 3. Model Context Protocol (MCP)

- **Structured Communication**: 140+ defined tools across 14 categories
- **Property-Aware Context**: All operations scoped to current property
- **Comprehensive Error Handling**: Graceful degradation and user feedback
- **Tool Categorization**: Logical grouping for discovery and organization

**Tool Categories**:

- Property Management
- Production Tracking
- Customer Management
- Order Processing
- Sensor Monitoring
- Analytics & Reporting
- System Administration

### 4. Multi-Property Architecture

- **Property as First-Class Entity**: Core organizing principle
- **Hierarchical Organization**: Parent-child property relationships
- **Data Isolation**: Property-scoped access control
- **Cross-Property Operations**: Analytics and bulk operations

**Data Patterns**:

- All entities linked to property_id
- Row-level security enforces property isolation
- Cross-property queries require explicit permission
- Property context switching maintains user state

### 5. Hybrid Memory System

- **Dense Vector Search**: Semantic similarity using embeddings
- **Sparse Vector Search**: Keyword-based retrieval
- **Fusion Ranking**: Combined scoring for optimal results
- **Property-Scoped Access**: Memory isolated by property

**Implementation**:

- pgvector extension for vector operations
- Embedding generation pipeline
- Hybrid search API endpoints
- Memory management and cleanup

### 6. UI Component Library Patterns

**Custom Component Library Architecture:**

- **Component-Driven Development**: Reusable, composable UI components
- **Design System Integration**: CSS custom properties for consistent theming
- **Type Safety**: Comprehensive TypeScript interfaces with full prop support
- **Accessibility First**: WCAG AA compliance with ARIA and keyboard navigation
- **Mobile-First Responsive**: Progressive enhancement from 320px to desktop

**Component Structure Patterns:**

```
components/ui/ComponentName/
├── ComponentName.tsx     # Main component with TypeScript interface
├── ComponentName.css     # BEM-styled CSS with design system integration
└── index.ts             # Clean exports
```

**Design System Implementation:**

- **BEM Naming Convention**: `vrd-component__element--modifier` structure
- **CSS Custom Properties**: Design tokens for colors, spacing, typography
- **Variant System**: Standardized variant patterns (default/filled/outlined)
- **Size System**: Consistent small/medium/large sizing across components
- **State Management**: Loading, error, success, disabled states

**Component API Patterns:**

- **Consistent Props**: Common patterns across components (variant, size,
  disabled)
- **ForwardRef Support**: Proper ref forwarding for DOM access
- **Event Handling**: Standardized onChange, onFocus, onBlur patterns
- **Icon Integration**: Left/right icon support with proper positioning
- **Validation Integration**: Error states, helper text, success feedback

**Accessibility Patterns:**

- **ARIA Integration**: Proper labeling and descriptive attributes
- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Reader Support**: Semantic HTML with proper announcements
- **Color Contrast**: WCAG AA compliance with high contrast mode support
- **Focus Management**: Visible focus indicators with brand colors

**Responsive Design Patterns:**

- **Mobile-First CSS**: Base styles for mobile with progressive enhancement
- **Breakpoint System**: 320px (mobile), 600px (tablet), 1024px (desktop)
- **Touch-Friendly**: 44dp minimum touch targets with proper spacing
- **Flexible Layouts**: Grid systems adapting to screen sizes
- **Performance**: Optimized CSS with minimal layout shifts

**Component Testing Patterns:**

- **Interactive Showcase**: Live component examples with state management
- **Visual Validation**: All variants, sizes, and states displayed
- **Integration Testing**: Components working with application state
- **Accessibility Testing**: Keyboard navigation and screen reader validation
- **Responsive Testing**: Multi-device testing and validation

**Unified Application Experience:**

- **Integrated Showcase**: Component library seamlessly integrated with
  application
- **Professional Presentation**: Production-ready interface for demonstrations
- **Self-Documenting**: Live examples serve as component documentation
- **Development Hub**: Central reference point for all component patterns

## Component Relationships

### Data Flow Patterns

#### User Request → Agent Response

1. User sends message via any channel
2. Channel adapter forwards to n8n agent
3. Agent processes NLP and determines intent
4. Agent calls appropriate MCP tools
5. Backend executes business logic
6. Results flow back through agent
7. Agent formats response for channel
8. User receives contextual response

#### Sensor Data → Alerts

1. Home Assistant collects sensor data
2. Data stored in time-series tables
3. Alert rules evaluated in real-time
4. Threshold breaches trigger notifications
5. Agent formats alerts for user preferences
6. Multi-channel delivery (Telegram, email, etc.)

### State Management

- **User Context**: Current property, conversation state
- **Property Context**: Active batches, schedules, settings
- **System State**: Sensor readings, alert status, task queues
- **Memory State**: Conversation history, learned preferences

## Design Principles

### 1. Simplicity First

- Natural language eliminates UI complexity
- Sensible defaults reduce configuration
- Progressive disclosure of advanced features
- Zero-training-required operation

### 2. Property-Centric Design

- Every operation scoped to a property
- Clear property switching mechanisms
- Property-specific customization
- Hierarchical property management

### 3. Offline-First Capabilities

- Core functions work without internet
- Intelligent sync when connection restored
- Local data caching strategies
- Graceful degradation patterns

### 4. Extensible Architecture

- Plugin system for custom integrations
- Configurable workflow templates
- Custom field definitions
- Third-party API integration points

### 5. Performance Optimization

- Database query optimization
- Caching strategies at multiple layers
- Lazy loading for large datasets
- Efficient vector search indexing

## Security Patterns

### Authentication & Authorization

- JWT-based authentication via Supabase
- Role-based access control (RBAC)
- Property-scoped permissions
- Multi-factor authentication support

### Data Protection

- Row-level security (RLS) policies
- Encryption at rest and in transit
- API rate limiting
- Input validation and sanitization

### Compliance

- Audit logging for all operations
- Data retention policies
- GDPR compliance features
- Export/import capabilities

## Development Infrastructure Patterns

### Monorepo Architecture

- **Turborepo**: High-performance build system with intelligent caching
- **Workspace Structure**: Logical separation of concerns
  - `packages/backend`: Node.js API server
  - `packages/web`: React web application
  - `packages/mobile`: React Native mobile app
  - `packages/shared`: Common types and utilities
- **Dependency Management**: Internal package linking with workspace references
- **Build Pipeline**: Parallel execution with dependency awareness

### Code Quality Patterns

- **ESLint Configuration**: Airbnb config + accessibility plugins + TypeScript
  rules
- **Prettier Integration**: Standalone formatting to avoid conflicts
- **Stylelint Setup**: CSS linting aligned to 8dp design system
- **Pre-commit Hooks**: Husky + lint-staged for performance optimization
- **Type Safety**: Strict TypeScript across all packages

### CI/CD Patterns

- **Multi-Node Testing**: CI matrix across Node.js 18.x and 20.x
- **Comprehensive Pipeline**: Lint → Test → Build → Deploy
- **Security Scanning**: Automated vulnerability detection with audit-ci
- **Dependency Management**: Automated updates with safety checks
- **Release Automation**: Semantic versioning and changelog generation

### Environment Management Patterns

- **Type-Safe Configuration**: Zod schemas for runtime validation
- **Package-Specific Configs**: Tailored environment variables per package
- **Build-Time Safety**: Fallback configurations prevent build failures
- **Security Separation**: Clear distinction between public and private
  variables
- **Deployment Ready**: Railway integration with comprehensive documentation

**Environment Flow**:

```
env.template → .env.local → config/environments.js → Package configs → Runtime validation
     ↓              ↓                ↓                    ↓                ↓
  Template      Developer        env-cmd           Zod schemas      Type-safe usage
   Guide        Local Vars      Environment        Validation        in Code
                                 Scripts
```

### Testing Infrastructure

- **Jest Configuration**: Unit and integration testing
- **Test Coverage**: Comprehensive coverage requirements
- **E2E Testing**: Preparation for full user journey testing
- **Package Isolation**: Independent test suites per package

### Development Workflow Patterns

- **Task-Driven Development**: Task Master integration for systematic progress
- **Collaborative Decision Making**: Present options, gather feedback, decide
  together
- **Visual Progress**: Early web development for observable progress
- **Documentation-First**: Memory bank and cursor rules maintain context

## Operations Management Schema Design

### Design Philosophy: Hybrid Approach (Option 3)

**Context**: Analyzed comprehensive microgreens growing guide with 40+ crop
varieties, each with complex growing parameters and stage requirements.

**Decision**: Hybrid approach balancing simplicity with detail:

- Core batch table for primary tracking
- Stage events table for detailed audit trail
- Enhanced crop parameters for comprehensive variety data
- Resource tracking for cost and efficiency analysis

### Schema Architecture

#### 1. Enhanced crop_varieties Table

```sql
-- Comprehensive crop variety parameters
- All growing guide parameters (sowing densities, stage durations)
- Difficulty levels (beginner/intermediate/advanced)
- Special requirements (burial, weight, mold prevention)
- Business data (pricing, yield expectations)
- Multiple tray size support (1020, 3.5×6)
```

#### 2. Enhanced growing_batches Table

```sql
-- Core batch tracking with state management
- Current stage tracking with proper state transitions
- Resource allocation (trays, medium, location)
- Results tracking (yield, quality, harvest count)
- Support for multiple harvests (nasturtium, wheatgrass)
- Environmental condition tracking
```

#### 3. NEW: batch_stage_events Table

```sql
-- Detailed audit trail and intervention tracking
- Event types: stage_start, stage_complete, observation, intervention, problem, harvest
- Environmental conditions at time of event
- Problem tracking and resolution documentation
- Photos and documentation support
- User attribution and timestamps
```

#### 4. NEW: batch_resources Table

```sql
-- Resource usage and cost tracking
- Resource types: seeds, medium, trays, weights, chemicals, labor
- Cost tracking per resource and stage
- Supplier information and batch tracking
- Efficiency metrics and waste tracking
```

### Agent Integration Benefits

**Natural Language Queries:**

- "What's the status of batch B-2024-001?"
- "Show me all sunflower batches from last month"
- "What problems did we have with pea shoots?"

**Easy Updates:**

- "Log that we moved pea shoots to light stage"
- "Record that we added weight to the basil trays"
- "Note mold issue on tray 3 of batch B-2024-015"

**Comprehensive Reporting:**

- Batch performance across varieties and time periods
- Resource usage and cost analysis
- Problem patterns and successful interventions
- Learning from historical data for optimization

### Design Patterns

**Property-Centric**: All tables include property_id for multi-tenancy
**Event-Driven**: Stage transitions and interventions as discrete events **Audit
Trail**: Complete history of all batch activities **Resource Tracking**:
Comprehensive cost and efficiency monitoring **Agent-Friendly**: Schema designed
for natural language interaction
