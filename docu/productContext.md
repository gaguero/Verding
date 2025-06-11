# Product Context

**IMPORTANT: Begin with [Project Brief](projectbrief.md) for the complete Memory
Bank navigation guide before reviewing this document.**

Verding is an agent-first microgreens management platform designed to provide a
sophisticated, natural language interface for managing all aspects of
microgreens operations. It addresses the challenges faced by microgreens growers
who need to track production stages, manage inventory, handle orders, monitor
sensors, and optimize their operations, all while having the flexibility to
interact with the system through various channels, including messaging platforms
like Telegram and WhatsApp.

The core value proposition of Verding is that users can manage their entire
operation through natural language commands across multiple channels (Telegram,
email, web, mobile), with the agent handling complex operations behind the
scenes. The agent interfaces with the main Verding system via the Model Context
Protocol (MCP), which enables it to access all system functionality that is
available through the web/mobile UI.

Verding targets both small-scale and commercial microgreens growers who value
efficiency, automation, and the ability to interact with their management system
in a natural, conversational way. The system is designed to scale with the
user's operation, starting with basic functionality and expanding to include
more advanced features as needed.

The agent-first approach is a key differentiator for Verding, as it allows users
to interact with the system in a way that feels natural and intuitive, without
requiring them to navigate complex menus or learn a new interface. This approach
is particularly valuable for users who are frequently on the move or who prefer
to use messaging platforms for day-to-day communication.

## Product Context: Verding - Agent-First Microgreens Management System

Verding is being developed to address the need for a more intuitive and less
manual way for tech-forward microgreens growers to manage their operations.
Existing systems often rely heavily on traditional GUI interfaces, which can be
cumbersome for day-to-day tasks.

The problem Verding solves is reducing manual data entry and complex navigation
by allowing users to interact with the system using natural language commands
processed by an **external n8n agent**. This agent interacts with the main
Verding backend via **Model Context Protocol (MCP)**, translating user intent
into structured actions. This approach is particularly beneficial for tasks like
scheduling sowing, tracking harvests, managing inventory, and interacting with
customers conversationally. **The agent's memory, crucial for context and
knowledge, will be managed in Supabase.**

The system should work by users interacting via various channels (GUI chat,
Telegram, email), with inputs routed to the external n8n agent. The agent's
workflows translate natural language commands into structured **MCP calls** to
the main Verding backend, triggering actions and data updates. The main Verding
system provides the GUI for visual representation, reporting, configuration, and
direct data viewing (including the Agent's BUJO), interacting with its own
backend API. The user experience goal is to make microgreens management as
simple and efficient as possible through this **MCP-driven** agent-first
approach.

Target users are primarily tech-savvy microgreens growers, including companies
of various sizes up to those with hundreds of employees, who require real-time
control, reduced manual effort via natural language interaction, and support for
compliance like GAP.
