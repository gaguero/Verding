# Project Brief: Verding - Agent-First Microgreens Management System

## Memory Bank Navigation Guide

**⚠️ CRITICAL: READ THIS FIRST ⚠️** - This Memory Bank contains crucial
architectural specifications that must be thoroughly understood before beginning
implementation work. All memory resets result in complete loss of context,
making this guide essential for orienting to the project.

### Reading Order for First Interaction

For your first interaction with this Memory Bank, please read these documents in
the exact order specified:

1. **Project Brief** (this document) - High-level overview and navigation guide
2. **[Product Context](productContext.md)** - Business purpose and user value
3. **[System Patterns](systemPatterns.md)** - Core architectural patterns
4. **[Technical Context](techContext.md)** - Technology stack and implementation
   approach
5. **[Active Context](activeContext.md)** - Current focus and immediate next
   steps
6. **[Progress](progress.md)** - Accomplishments and project status

### Complete Documentation Structure

The Memory Bank is organized into the following categories:

1. **Core Architecture Documents:**

   - [Project Brief](projectbrief.md) - This document, providing the high-level
     overview
   - [Product Context](productContext.md) - Why this system exists and its
     business context
   - [System Patterns](systemPatterns.md) - Key architectural patterns and
     principles
   - [Technical Context](techContext.md) - Technical stack and implementation
     approach

2. **Current Status:**

   - [Active Context](activeContext.md) - Current focus and next steps
   - [Progress](progress.md) - Current project status and accomplishments
   - [Missing Specifications](missing_specifications.md) - Tracking remaining
     specifications to complete

3. **Core Specifications:**

   - [MCP Specification](mcp_specification.md) - Comprehensive definition of the
     Model Context Protocol
   - [MCP Tools to BASES Features Mapping](mcp_tools_to_bases_features_mapping.md) -
     How MCP tools map to system features
   - [Memory System Design](memory_system_design.md) - Overall memory system
     architecture
   - [Memory System Access Control Implementation](memory_system_access_control_implementation.md) -
     Detailed access control implementation

4. **Integration Specifications:**

   - [Messaging Platform Integration Specifications](messaging_platform_integration_specifications.md) -
     Integration with messaging platforms
   - [Error Handling and Recovery Procedures](error_handling_and_recovery_procedures.md) -
     Comprehensive error handling strategy

5. **Research and Planning:**
   - [Memory Access Control Research](memory_access_control_research.md) -
     Research on access control approaches
   - [Proposed BASES Edits Summary](proposed_bases_edits_summary.md) - Planned
     changes to source files
   - [Agent Memory Design Visual](agent_memory_design_visual.md) - Visual
     representation of the memory system
   - [Todo MCP Implementation](todo_mcp_implementation.md) - Implementation
     roadmap for MCP

Each document contains critical information for understanding the system design.
**After each memory reset, always begin with this Project Brief, then follow the
reading order for first interaction listed above.**

## Project Overview

This project aims to develop 'Verding', an agent-first microgreens management
system. The core goal is to provide a sophisticated agent interface that allows
users to manage all aspects of their microgreens operations through natural
language commands across multiple channels (Telegram, email, web, mobile).
**Crucially, the core Agent functionality, including NLP, workflow
orchestration, and memory management, will be implemented as an external system
using n8n and will interact with the main Verding system via the Model Context
Protocol (MCP).**

The main Verding system will integrate with external services like Home
Assistant for sensor data, Stripe for billing, and potentially other APIs for
communication and services. It will provide the graphical user interface (GUI)
and the core data management backend.

The primary interface for users will be through the natural language agent (via
various channels), complemented by a full GUI interface with feature parity that
interacts with the same backend services via API.

Key features include the external Agent Core (handling NLP, memory,
multi-channel interaction logic, **MCP communication**), Progressive Setup,
Sensor Integration, Operations Management (including the Agent-managed BuJo
style task system), Customer & Order Management, Knowledge Base (**managed by
the external agent, leveraging Supabase for storage**), and a Complete GUI (web
and mobile) that interacts with the backend and the agent via API.

The MVP focuses on English language, Telegram and email channels, and core
management functions, all interacting with the external n8n agent.

Future features include expanded multilingual support for the agent, more
communication channels, enhanced sensor integration, advanced analytics, supply
chain optimization, and team collaboration, all built around the **MCP-driven
interaction** with the core system and the external agent. **The agent's
long-term memory will be managed in Supabase, separate from the main backend's
operational data.**

## Project Goal

Develop **Verding**, an intelligent, agent-first microgreens management system
designed to streamline all aspects of microgreens farming, from seed to sale.
The system will feature a conversational AI agent as the primary interface,
supported by a comprehensive GUI for visual management and detailed operations.
Key functionalities include sensor integration, operations management (sowing,
harvesting, BuJo tasks), customer and order management, and a robust knowledge
base. The system must be built with a **multi-property architecture** from the
ground up, allowing a single Verding instance to manage multiple distinct
farms/locations with proper data isolation and user permissions per property.

## Core Features (High-Level)

1.  **Agent Core & NLP:** Conversational interface for all system functions.
2.  **Progressive Setup & Onboarding:** Guided initial setup for users.
3.  **Sensor Integration (Home Assistant):** Real-time environmental monitoring.
4.  **Operations Management:** Sowing, harvesting, BuJo task system.
5.  **Customer & Order Management:** CRM and order processing.
6.  **Knowledge Base & Document Management:** Agent-accessible information
    store.
7.  **Complete GUI Interface:** Web and mobile GUIs with feature parity to
    agent.
    - **Includes highly customizable monitoring screens/dashboards** with
      property-specific data views and a comprehensive widget library for sensor
      data, operational KPIs, tasks, inventory, and compliance.

## Key Technical Pillars

- **Conversational AI (Agent-First):** Primary interaction model.
- **Externalized Agent Logic (n8n):** Workflows for agent behavior.
- **Model-Context-Protocol (MCP):** Agent-backend communication.
- **Multi-Property Architecture:** Core design for scalability and multiple site
  management.
- **Supabase & pgvector:** Database and vector store for RAG.
- **React/React Native:** For web and mobile UIs.

This Memory Bank is intended to be a living set of documents. Updates and new
specifications will be added as the design evolves. Always check
`activeContext.md` for the latest pointers.
