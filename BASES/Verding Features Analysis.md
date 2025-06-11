# Verding Features Analysis

## Overview

Based on the FarmFlow documentation and user requirements, this document
outlines the potential MVP and post-MVP features for Verding, an agent-first
microgreens management system that transforms traditional UI-based workflows
into natural language interactions.

## Key Differentiators from FarmFlow

1. Agent-as-a-Service model (chat, text, email, or call instead of navigating
   menus)
2. Natural language commands for all operations
3. Home Assistant sensor integration for automated data collection
4. Multilingual support (English MVP, Spanish post-MVP)
5. Hybrid memory system with document knowledge base
6. BuJo (Bullet Journal) style system for task management
7. Multi-channel access (Telegram and email for MVP)

## Target Users

- Tech-forward microgreens growers
- Companies with up to hundreds of employees
- Users who need real-time control and reduced manual data entry
- Operations requiring GAP compliance

## MVP Features

### Agent Core & Natural Language Processing

**Strong foundation for understanding and processing natural language commands
across all modules**

- Natural language understanding for microgreens domain-specific terminology
- Command parsing and intent recognition for all core operations
- Context-aware conversations with memory of previous interactions
- English language support with architecture ready for Spanish expansion
- Hybrid memory system for long-term knowledge retention

#### Tech Involved

- LLM integration (likely OpenAI or similar)
- n8n for workflow orchestration
- Vector database for semantic search (Pinecone, Weaviate, or similar)
- Document processing pipeline

#### Main Requirements

- Domain-specific training for microgreens terminology
- Context management across conversation sessions
- Document ingestion and knowledge extraction system
- Conversation history storage and retrieval

### User Onboarding & Setup

**Guided first-run experience that collects essential information and sets up
the system**

- Profile creation and preference setting via conversation
- Billing plan selection and management
- Progressive setup guidance mirroring FarmFlow's dependency tree
- Initial data collection for seed suppliers, grow mediums, etc.

#### Tech Involved

- Conversational UI (Telegram for MVP)
- Stripe integration for billing
- PostgreSQL for user data storage
- n8n workflows for setup sequence

#### Main Requirements

- Conversational onboarding flow
- Secure billing information handling
- User preference storage
- Progressive feature unlocking based on setup completion

### Sensor Integration

**Connection to Home Assistant for automated environmental data collection**

- Temperature monitoring and logging
- Humidity tracking
- pH measurement (if available)
- Automated compliance record generation

#### Tech Involved

- Home Assistant MQTT bridge
- n8n for sensor data processing
- PostgreSQL for time-series data storage
- Notification system for anomalies

#### Main Requirements

- Secure connection to Home Assistant
- Regular polling or event-based data collection
- Data validation and anomaly detection
- Compliance record generation (GAP)

### Operations Management

**Core functionality for day-to-day microgreens operations**

- Sowing planning and scheduling
- Harvest management and tracking
- Task creation and assignment
- Inventory monitoring and alerts

#### Tech Involved

- n8n for workflow automation
- PostgreSQL for operational data
- Notification system for tasks and alerts
- BuJo-style task management system

#### Main Requirements

- Natural language task creation and management
- Automated scheduling based on growing parameters
- Inventory threshold monitoring
- Task prioritization and assignment

### Customer & Order Management

**Tools for managing customer relationships and order fulfillment**

- Customer profile creation and management
- Subscription and one-time order processing
- Delivery scheduling and routing
- Customer communication management

#### Tech Involved

- PostgreSQL for customer and order data
- Telegram/email for customer communications
- n8n for order workflow automation
- Stripe for payment processing

#### Main Requirements

- Customer data management
- Order lifecycle tracking
- Delivery optimization
- Payment processing and reconciliation

### Knowledge Base & Document Management

**System for processing and organizing uploaded documents**

- Document upload and processing
- Automatic knowledge extraction and organization
- Knowledge integration with agent memory
- Document version tracking

#### Tech Involved

- Document processing pipeline
- Vector database for semantic storage
- File storage system
- Version control for documents

#### Main Requirements

- Support for multiple document formats
- Automatic text extraction and processing
- Semantic indexing for retrieval
- Change detection and memory updates

### Customizable Monitoring Dashboards

**Provides a highly customizable and interactive dashboard system, allowing
users to create personalized views of real-time operational data and system
metrics using a library of widgets, all within a selected property context**

- User-driven dashboard creation, personalization (widget selection,
  arrangement, configuration)
- Extensive widget library covering sensors, operational KPIs, task summaries,
  inventory, compliance, etc.
- Property-specific data views driven by a global property context selector
- Interactive widgets allowing direct actions (e.g., acknowledging alerts,
  navigating to details)
- Real-time or near real-time data updates for dynamic monitoring

#### Tech Involved

- React for web interface
- Advanced charting/visualization libraries suitable for dynamic dashboards
  (e.g., Recharts, Nivo, or dedicated dashboard framework components)
- PostgreSQL (Supabase) for data queries
- Real-time data communication mechanisms (e.g., WebSockets, efficient polling)
- Backend API endpoints optimized for widget data retrieval and actions
- Framework for managing widget configurations and dashboard layouts

#### Main Requirements

- High degree of user configurability for dashboards and widgets
- Rich and extensible widget library
- Strict adherence to property context for data display and actions
- Performant real-time data visualization and interaction
- Intuitive interface for dashboard creation and modification
- Secure data handling and access control for dashboard configurations and
  displayed data

### Multi-Property Architecture

A foundational architectural principle of the Verding system is its ability to
manage multiple properties (farms/locations) within a single instance, with
comprehensive property-level context awareness throughout all system components.

The multi-property architecture affects every aspect of the system, including
data models, access control, user interfaces, agent behavior, and operational
workflows.

#### Core Principles

**Property as First-Class Entity:** Properties represent physical farm locations
or management domains. Each property has a unique identifier, can be
hierarchically organized, and is part of a global property registry.

**Property Context Persistence:** User sessions maintain property context.
System operations occur within property context. Cross-property operations are
explicitly defined. The agent maintains awareness of current property context.

**Property-Scoped Access Control:** User permissions are defined at the property
level. Some users have access to multiple properties. Super-admin role has
access to all properties. Access control policies enforce property boundaries.

**Cross-Property Capabilities:** The system supports data aggregation across
properties, resource sharing between properties, comparative analytics between
properties, and bulk operations across multiple properties.

#### Key Architectural Impacts

**Database Schema:** Most data tables include a `property_id` column as a
foreign key to the properties table. All queries include property context to
enforce boundaries.

**Row Level Security:** Implementation of property-scoped policies,
cross-property access controls, and property hierarchy access rules.

**User Interface:** Property selector component, property context indicators,
and context switching mechanisms. Property-specific and cross-property
dashboards and reports.

**Agent Integration:** Property context awareness in agent memory and NLP.
Support for multi-property commands with appropriate permissions.

## Future Features (Post-MVP)

### Enhanced Multilingual Support

- Spanish language support
- Additional languages based on market demand
- Language-specific reporting and documentation

#### Tech Involved

- Enhanced i18n implementation
- Language-specific LLM fine-tuning
- Multilingual document processing

#### Main Requirements

- Translation consistency across interfaces
- Language detection and switching
- Preservation of data integrity across languages

### Advanced Communication Channels

- Voice interface (Twilio)
- WhatsApp integration
- SMS support
- Custom mobile app notifications

#### Tech Involved

- Twilio for voice and SMS
- WhatsApp Business API
- Push notification services
- Speech-to-text and text-to-speech processing

#### Main Requirements

- Channel-specific interaction patterns
- Unified conversation history across channels
- Media handling capabilities
- Real-time notification delivery

### Enhanced Sensor Integration

- Expanded sensor types (light, CO2, water quality)
- Automated environmental control
- Predictive analytics for optimal growing conditions
- Advanced anomaly detection and alerting

#### Tech Involved

- Additional sensor APIs
- Machine learning for prediction
- Automated control systems integration
- Advanced analytics pipeline

#### Main Requirements

- Support for diverse sensor types
- Bidirectional control capabilities
- Predictive model training and deployment
- Real-time monitoring and response

### Advanced Analytics & Business Intelligence

- Yield prediction and optimization
- Cost analysis and profitability tracking
- Market trend analysis
- Business growth forecasting

#### Tech Involved

- Machine learning for predictions
- Advanced visualization tools
- Data warehouse for historical analysis
- ETL pipelines for data preparation

#### Main Requirements

- Historical data analysis
- Predictive modeling
- Customizable reporting
- Competitive benchmarking

### Supply Chain Optimization

- Automated supplier ordering
- Delivery route optimization
- Inventory forecasting
- Waste reduction analytics

#### Tech Involved

- Inventory management algorithms
- Route optimization services
- Supplier API integrations
- Forecasting models

#### Main Requirements

- Supplier integration capabilities
- Geospatial analysis for routing
- Demand forecasting
- Automated purchase order generation

### Team Collaboration & Training

- Team member task assignment and tracking
- Training material management
- Performance analytics
- Shift scheduling and management

#### Tech Involved

- Team management system
- Learning management components
- Calendar and scheduling tools
- Performance tracking analytics

#### Main Requirements

- User role management
- Training content delivery
- Schedule optimization
- Performance metric tracking

### Advanced BuJo System

- Enhanced task categorization and tagging
- Custom collections and spreads
- Habit tracking and statistics
- Future planning and migration

#### Tech Involved

- Advanced task management system
- Custom visualization components
- Habit tracking algorithms
- Calendar integration

#### Main Requirements

- Flexible categorization system
- Custom collection templates
- Habit streak tracking
- Task migration and rescheduling

### API & Integration Platform

- Public API for third-party integrations
- Webhook support for external triggers
- Custom integration builder
- Partner ecosystem development

#### Tech Involved

- API gateway
- Webhook management system
- SDK development
- Partner onboarding platform

#### Main Requirements

- Secure API authentication
- Rate limiting and usage tracking
- Documentation generation
- Partner certification process
