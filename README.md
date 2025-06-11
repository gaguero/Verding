# Verding

**Agent-First Microgreens Management Platform**

Verding revolutionizes agricultural operations through natural language
interaction, enabling users to manage their entire microgreens operation through
conversational commands across multiple channels.

## 🌱 Overview

Verding is an innovative platform that puts AI agents at the center of farm
management. Instead of navigating complex interfaces, users simply talk to their
farm through Telegram, WhatsApp, email, web, or mobile apps.

### Key Features

- **🤖 Agent-First Design**: Primary interaction through natural language
- **🏢 Multi-Property Support**: Manage unlimited farms from one platform
- **🧠 Hybrid Memory System**: AI remembers context and learns preferences
- **📱 Multi-Channel Access**: Telegram, WhatsApp, web, mobile, email
- **📊 Real-Time Monitoring**: Automated sensor integration via Home Assistant
- **📋 BuJo Task Management**: Bullet Journal-inspired task tracking
- **🔒 Enterprise Security**: Multi-tenant with property-scoped isolation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           User Interfaces                             │
├─────────────┬─────────────┬──────────────┬────────────┬────────────┤
│   Telegram  │  WhatsApp   │     Web      │   Mobile   │   Email    │
└──────┬──────┴──────┬──────┴──────┬───────┴─────┬──────┴─────┬──────┘
       │             │             │             │            │
       └─────────────┴─────────────┴─────────────┴────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │      n8n Agent Core         │
                    │  (External Intelligence)    │
                    └──────────────┬──────────────┘
                                   │
                         Model Context Protocol
                              (MCP Tools)
                                   │
                    ┌──────────────▼──────────────┐
                    │    Main Verding Backend     │
                    │  • Business Logic           │
                    │  • Data Management          │
                    │  • API Services             │
                    └──────────────┬──────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
       ┌────────▼────────┐ ┌──────▼──────┐ ┌────────▼────────┐
       │    Supabase     │ │Home Assistant│ │     Stripe      │
       │ • Database      │ │ • Sensors    │ │ • Billing       │
       │ • Auth          │ │ • MQTT       │ │ • Payments      │
       │ • pgvector      │ └──────────────┘ └─────────────────┘
       └─────────────────┘
```

## 🛠️ Technology Stack

### Core Infrastructure

- **Database**: Supabase (PostgreSQL 15+ with pgvector 0.5.0+)
- **Backend**: Node.js v18+ with TypeScript 5.0+
- **Agent Platform**: n8n (External workflow engine)
- **Authentication**: Supabase Auth (JWT-based)
- **Deployment**: Railway (Cloud platform)

### Frontend

- **Web**: React 18.2+ with TypeScript
- **Mobile**: React Native 0.72+ with Expo SDK 49+
- **Monorepo**: Turborepo
- **Package Manager**: npm workspaces

### External Integrations

- **Messaging**: Telegram Bot API, WhatsApp Business API
- **IoT/Sensors**: Home Assistant with MQTT
- **Payments**: Stripe
- **AI/NLP**: Multiple providers via MCP

## 📁 Project Structure

```
verding/
├── packages/
│   ├── backend/          # Node.js/TypeScript API
│   ├── web/              # React web application
│   ├── mobile/           # React Native mobile app
│   ├── shared/           # Shared types and utilities
│   └── docs/             # Documentation
├── scripts/              # Build and deployment scripts
├── .github/              # GitHub Actions workflows
├── memory-bank/          # Project documentation
├── tasks/                # Task Master files
├── turbo.json           # Turborepo configuration
├── package.json         # Root package configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- Git
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd verding
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

### Development Commands

```bash
# Install dependencies for all packages
npm install

# Start all development servers
npm run dev

# Build all packages
npm run build

# Run tests across all packages
npm run test

# Lint all packages
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 🏃‍♂️ Development Workflow

### Task Management

This project uses [Task Master](https://github.com/taskmaster-ai/taskmaster) for
project management:

```bash
# View current tasks
npm run tasks:list

# Get next task to work on
npm run tasks:next

# Update task status
npm run tasks:status <id> <status>
```

### Memory Bank

The `memory-bank/` directory contains comprehensive project documentation:

- `projectbrief.md` - Core requirements and goals
- `productContext.md` - User needs and market context
- `systemPatterns.md` - Architecture and design patterns
- `techContext.md` - Technology stack and constraints
- `activeContext.md` - Current work focus
- `progress.md` - Status tracking and milestones

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks

## 🔧 Configuration

### Environment Variables

The project uses environment-specific configuration managed through:

- **Development**: `.env` files with type-safe validation
- **Staging/Production**: Railway environment variables
- **Package-Specific**: Each package has tailored environment schemas

```bash
# Set up environment for development
npm run env:dev

# Environment-specific commands
npm run env:staging -- <command>
npm run env:production -- <command>
```

### Shared Code Management

The monorepo uses synchronized versioning and intelligent dependency management:

```bash
# Synchronize versions across all packages
npm run version:patch   # 0.1.0 → 0.1.1
npm run version:minor   # 0.1.0 → 0.2.0
npm run version:major   # 0.1.0 → 1.0.0

# Validate workspace dependencies
npm run deps:validate

# Automated releases
npm run release:patch
```

**Features:**
- ✅ **Synchronized Versioning**: All packages share the same version
- ✅ **Renovate Integration**: Automated dependency updates with smart grouping
- ✅ **Workspace Dependencies**: Optimized internal package linking
- ✅ **Dependency Validation**: Automated conflict detection
- ✅ **Selective Caching**: Optimized Turborepo build performance

## 📦 Package Overview

### @verding/shared
Shared types, utilities, and constants used across all packages.

**Exports:**
- `types` - TypeScript interfaces and types
- `utils` - Common utility functions  
- `env` - Environment validation schemas
- `constants` - Design system, business rules, configuration

```typescript
import { DESIGN_SYSTEM, type GrowthStage } from '@verding/shared';
```

### @verding/backend
Node.js API server with Express, Supabase integration, and MCP tools.

**Key Features:**
- Express.js REST API
- Supabase client integration
- JWT authentication
- MCP tools for agent communication
- Type-safe environment configuration

### @verding/web
React web application with modern tooling and responsive design.

**Tech Stack:**
- React 18.2+ with TypeScript
- Vite for fast development
- React Query for data fetching
- Zustand for state management
- Design system compliance

### @verding/mobile
Cross-platform mobile app built with React Native and Expo.

**Features:**
- Expo SDK 49+ for rapid development
- React Navigation for routing
- Native device integration
- Offline capability support
- Design system implementation

## 🧪 Testing Strategy

### Automated Testing
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific package tests
npm run test --workspace=@verding/shared

# Watch mode for development
npm run test:watch
```

### Test Structure
- **Unit Tests**: Individual function and component testing
- **Integration Tests**: Package interaction testing
- **E2E Tests**: Full user workflow testing (future)

### Quality Gates
- ✅ All tests must pass before merge
- ✅ Code coverage requirements
- ✅ Type checking validation
- ✅ Linting compliance

## 🚀 Deployment

### Staging Deployment
```bash
npm run build:staging
npm run deploy:staging
```

### Production Deployment
```bash
npm run build:production
npm run deploy:production
```

### CI/CD Pipeline
GitHub Actions workflows handle:
- ✅ **Continuous Integration**: Lint, test, build on all PRs
- ✅ **Dependency Management**: Automated updates with Renovate
- ✅ **Security Scanning**: Vulnerability detection and reporting
- ✅ **Deployment**: Automated staging and production deploys
- ✅ **Release Management**: Semantic versioning and Git tagging

## 🔐 Security

### Authentication & Authorization
- **Supabase Auth**: JWT-based authentication
- **Row-Level Security**: Database-level access control
- **Property Isolation**: Multi-tenant data separation
- **Role-Based Access**: Admin, operator, viewer permissions

### Data Protection
- **Environment Variables**: Secure credential management
- **API Rate Limiting**: DoS protection
- **Input Validation**: Zod schema validation
- **Audit Logging**: Action tracking and monitoring

## 🤝 Contributing

### Development Setup
1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Set up environment**: Copy `.env.example` to `.env`
4. **Start development**: `npm run dev`
5. **Run tests**: `npm run test`

### Code Standards
- **TypeScript**: Strict mode, no implicit any
- **ESLint**: Airbnb configuration + accessibility rules
- **Prettier**: Consistent formatting (100 char lines, single quotes)
- **Conventional Commits**: Semantic commit messages

### Pull Request Process
1. **Branch**: Create feature branch from `main`
2. **Develop**: Follow coding standards and write tests
3. **Test**: Ensure all tests pass and coverage is maintained
4. **Review**: Submit PR with clear description
5. **Merge**: Squash and merge after approval

### Task Management
Use Task Master for structured development:
```bash
# See what to work on next
npm run tasks:next

# Update progress
npm run tasks:status <id> in-progress
npm run tasks:status <id> done
```

## 📚 Documentation

### Architecture Documentation
- `memory-bank/systemPatterns.md` - System architecture and patterns
- `memory-bank/techContext.md` - Technology decisions and constraints
- `packages/docs/` - Package-specific documentation

### API Documentation
- **Backend API**: OpenAPI/Swagger documentation (future)
- **MCP Tools**: Model Context Protocol tool definitions
- **Database Schema**: Supabase schema and RLS policies

### User Documentation
- **Agent Interaction**: Natural language command guide
- **Web Interface**: User interface documentation
- **Mobile App**: Mobile-specific feature guide

## 🎯 Roadmap

### Current Status (Task 1 - 87.5% Complete)
- ✅ Repository setup and monorepo configuration
- ✅ Development environment with linting and testing
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Environment management with type-safe validation
- ✅ Shared code and dependency management system
- 🔄 **Current**: Project documentation (Task 1.8)

### Next Milestones
- **Task 2**: Supabase infrastructure setup
- **Task 3**: Database schema and authentication
- **Task 4**: Authorization framework
- **Task 8**: Core backend API implementation

### Long-term Vision
- **Agent-First Platform**: Natural language as primary interface
- **Multi-Channel Communication**: Telegram, WhatsApp, web, mobile
- **Smart Agriculture**: AI-driven growing optimization
- **Scalable SaaS**: Multi-property management platform

## 🆘 Support

### Getting Help
- **Issues**: GitHub Issues for bug reports and feature requests
- **Discussions**: GitHub Discussions for questions and ideas
- **Documentation**: Check `memory-bank/` for detailed context

### Development Resources
- **Task Master**: Project management and task tracking
- **Memory Bank**: Comprehensive project documentation
- **Code Reviews**: Collaborative development and knowledge sharing

---

**Built with ❤️ for sustainable agriculture and agent-first farming**
