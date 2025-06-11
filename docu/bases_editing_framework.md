# BASES Editing Priority Framework

## Introduction

This BASES Editing Priority Framework provides a comprehensive, structured
approach for integrating new and updated specifications from the memory bank
into the BASES documentation. Its purpose is to systematically prioritize and
guide the enhancement of BASES files with critical implementation details that
are currently documented in the memory bank but not yet fully incorporated into
the official BASES specifications.

Engineers working with this framework should note several important guidelines:

1. **Work Directly with Original Files**: All edits MUST be made directly to the
   original BASES files specified in each item. Never attempt to recreate these
   files based on memory or the framework itself.

2. **Read Before Editing**: Always read the current content of the targeted
   BASES file sections before making any changes to ensure seamless integration
   with existing text.

3. **Source from Memory Bank**: The detailed information needed for each edit
   comes from the specified memory bank files. These files contain the
   authoritative source material to be incorporated.

4. **Maintain Document Structure**: Preserve the existing document structure,
   formatting, and style when making edits. New content should feel like a
   natural extension of the existing documentation.

5. **Follow the Methodology**: Adhere to the step-by-step methodology outlined
   in this framework for each edit to ensure consistency and thoroughness.

6. **Document Impact**: Consider the line impact of each edit to understand its
   scope and potential effects on the overall document structure.

The framework organizes edits by thematic areas, each focusing on a specific
aspect of the Verding system. For each theme, specific edit items are defined
with precise target documents, areas, and detailed edit plans.

## Methodology for Each Framework Item

For each item listed below, the following steps must be performed by the agent
to define the specific edits:

1.  **Identify Source Information:** Note the source specification document(s)
    in `memory-bank/` that detail the feature/change.
2.  **Identify Target BASES Document & General Area:** Note the target
    `BASES/*.md` file and the general feature or section within it that will be
    affected. The engineer MUST always work with the actual BASES files
    directly, not recreate them from memory or summaries. Each section
    explicitly specifies the target file name (e.g.,
    `BASES/Verding Feature Specifications.md`) that must be edited.
3.  **Locate Precise Section with Index:** Use the previously generated indexes
    of the target `BASES/*.md` file to find the _exact_ current section,
    subsection, and line numbers relevant to the change. Always refer to the
    actual line numbers in the original BASES files for accuracy.
4.  **Targeted Re-Read:** Perform a `read_file` operation _specifically on that
    identified small section_ of the BASES file. This is crucial to understand
    the current text and context accurately. The engineer must read the original
    content before making any edits to ensure seamless integration.
5.  **Design Detailed Edit Plan:** Based _only_ on the freshly re-read content
    and the source specification, formulate a precise plan. This plan should
    detail:
    - What needs to be changed (e.g., content addition, modification, deletion,
      restructuring).
    - Where the change should occur (specific file and exact line numbers or
      section headers identified in step 3).
    - How the change should be phrased or structured to integrate seamlessly
      with the existing, re-read text.
    - Any potential impacts on immediately adjacent content within the re-read
      section.
    - The output for this step is the detailed instruction set for the actual
      edit.

IMPORTANT: All edits must be made directly to the original BASES files as
indicated in each Framework Item. Never attempt to recreate files from memory or
from the Framework document itself. The Framework document is a guide for what
to edit, but the actual content should always come from reading and modifying
the original BASES files.

---

## Framework Items

### Theme: Customizable Monitoring Screens & Dashboards

(Source: `memory-bank/customizable_monitoring_screens_specification.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item 1.1: Integrate Customizable Dashboards into
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The existing subsection "3. Dashboard & Navigation"
  (currently lines 2364-2369) within "### 7. Complete GUI Interface".
- **Detailed Edit Plan (Based on re-read of lines 2364-2369 and
  `customizable_monitoring_screens_specification.md`):**
  - **Rename Subsection:** Consider renaming "3. **Dashboard & Navigation**" to
    "3. **Customizable Monitoring Dashboards & System Navigation**" to better
    reflect the expanded scope.
  - **Expand Content Significantly:** Replace or augment the current high-level
    points (lines 2365-2369) with a more detailed description derived from
    `customizable_monitoring_screens_specification.md`. The expansion should
    cover:
    - **Dashboard Framework:** Describe the core concept of customizable
      dashboards enabling users to create personalized views of system
      information.
    - **Widget Library:** Detail the availability of a diverse widget library
      (e.g., sensor data widgets, operational KPI widgets, task list widgets,
      inventory status widgets, compliance tracking widgets).
    - **User Customization:** Explain how users can select, arrange, resize, and
      configure individual widgets on their dashboards.
    - **Property Context:** Emphasize that dashboards and widgets are
      property-aware, with a global property selector filtering data, and
      widgets displaying information relevant to the selected property.
    - **Interactive Capabilities:** Describe how users can perform actions
      directly from dashboards or widgets (e.g., acknowledging alerts, updating
      task statuses, navigating to related system areas).
    - **Real-time Data:** Specify the goal of providing near real-time data
      updates on dashboards.
    - **Navigation Integration:** Retain and integrate the concept of "intuitive
      navigation structure" and "quick access to common functions" within the
      context of the dashboard being a central hub.
    - **Role-Based Views:** Retain and elaborate on "role-based dashboard
      views," ensuring appropriate data and widget visibility based on user
      roles and permissions (including property-specific roles).
    - **Key Performance Indicators (KPIs):** Detail how KPIs will be displayed,
      potentially through dedicated KPI widgets or configurable elements within
      other widgets.
    - **Security (Optional Mention):** Briefly touch upon secure public URL
      sharing for dashboards if appropriate for this section, or ensure it's
      covered elsewhere.
    - **Agent Integration:** Mention that the agent should be able to access and
      discuss information presented on dashboards, aligning with MCP
      capabilities.
  - **Structure:** Use clear sub-bullets for each aspect of the customizable
    dashboards, maintaining consistency with the formatting of other feature
    descriptions in the document.
  - **Line Impact:** This change will significantly increase the number of lines
    in this subsection, shifting subsequent content downwards.

**Item 1.2: Update System Overview for Dashboards in
`BASES/Verding_ Agent-First Microgreens Management System.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System.md`
- **General Target Area:** The "### Complete GUI Interface" subsection
  (currently starting line 119) under "Launch Features (MVP)".
- **Detailed Edit Plan (Based on re-read of lines 119-123 and
  `customizable_monitoring_screens_specification.md`):**
  - **Enhance Description:** Within the main description or bullet points for
    "### Complete GUI Interface":
    - Expand or replace the bullet point "\* Visual representations of all data"
      (line 122) to specifically introduce the **Customizable Monitoring
      Dashboards**.
    - The new description should briefly highlight key characteristics such as:
      user-configurable widgets, property-specific data views, real-time
      updates, and interactive elements allowing for direct actions or
      navigation.
    - Example phrasing for a new bullet or an expanded one: "\* Comprehensive
      and customizable monitoring dashboards with a rich widget library,
      providing property-specific visual insights and interactive system
      control."
  - **Review Supporting Sections (Optional for initial edit but flag for
    consistency check):**
    - Briefly review the "Tech Involved" (lines 125-128) and "Main Requirements"
      (lines 130-133) for the GUI to see if the introduction of detailed
      dashboard capabilities necessitates minor additions or clarifications
      (e.g., mentioning specific charting libraries if not already implied, or a
      requirement for widget configuration persistence). However, primary
      detailed tech/requirements for dashboards reside in
      `customizable_monitoring_screens_specification.md` and the edits to
      `BASES/Verding Feature Specifications.md` (Item 1.1).
  - **Structure:** Integrate the new description smoothly into the existing
    bulleted list.
  - **Line Impact:** Minimal, likely adding/modifying a few lines within the
    existing section.

**Item 1.3: Refine Dashboard Analysis in `BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** The "### Dashboard & Reporting" subsection (currently
  lines 137-153) under "MVP Features".
- **Detailed Edit Plan (Based on re-read of lines 137-153 and
  `customizable_monitoring_screens_specification.md`):**
  - **Rename Section Title:** Change "### Dashboard & Reporting" (line 137) to
    "### Customizable Monitoring Dashboards". This helps differentiate from
    potentially separate, more static reporting features.
  - **Update Main Description:** Revise the main description (line 138) from
    "Visual representation of key business metrics and operations" to something
    like: "Provides a highly customizable and interactive dashboard system,
    allowing users to create personalized views of real-time operational data
    and system metrics using a library of widgets, all within a selected
    property context."
  - **Revise Core Functionality Bullets:** Replace the existing bullets (lines
    139-142) with functionalities reflecting the dynamic dashboard system:
    - "User-driven dashboard creation, personalization (widget selection,
      arrangement, configuration)."
    - "Extensive widget library covering sensors, operational KPIs, task
      summaries, inventory, compliance, etc."
    - "Property-specific data views driven by a global property context
      selector."
    - "Interactive widgets allowing direct actions (e.g., acknowledging alerts,
      navigating to details)."
    - "Real-time or near real-time data updates for dynamic monitoring."
    - "(Consider if 'Export capabilities' from original list should be retained
      here or moved to a dedicated 'Reporting' feature analysis)."
  - **Update "Tech Involved" Section (lines 144-147):**
    - Retain "React for web interface" and "PostgreSQL for data queries"
      (Supabase).
    - Update/replace "Chart.js or similar for visualizations" to reflect a more
      comprehensive approach if needed, e.g., "Advanced charting/visualization
      libraries suitable for dynamic dashboards (e.g., Recharts, Nivo, or a
      dedicated dashboard framework component)."
    - Add: "Real-time data communication mechanisms (e.g., WebSockets, efficient
      polling)."
    - Add: "Backend API endpoints optimized for widget data retrieval and
      actions."
    - Add: "Framework for managing widget configurations and dashboard layouts."
  - **Update "Main Requirements" Section (lines 149-153):**
    - Replace existing requirements with those pertinent to customizable
      dashboards:
      - "High degree of user configurability for dashboards and widgets."
      - "Rich and extensible widget library."
      - "Strict adherence to property context for data display and actions."
      - "Performant real-time data visualization and interaction."
      - "Intuitive interface for dashboard creation and modification."
      - "Secure data handling and access control for dashboard configurations
        and displayed data."
      - "(Consider if 'Filterable reports' and 'Export capabilities' from
        original list should be moved to a dedicated 'Reporting' feature
        analysis)."
  - **Structure:** Ensure the updated section maintains the standard
    sub-headings (Description, Core Functionality implied by bullets, Tech
    Involved, Main Requirements).
  - **Line Impact:** This section will likely expand, shifting subsequent
    content.

**Item 1.4: Update Style Guide for Dashboard Components in
`BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- **General Target Area:** Add a new top-level section, likely after "###
  Special Elements" (around line 208) and before "## Spacing System".
- **Detailed Edit Plan (Based on review of Style Guide structure and
  `customizable_monitoring_screens_specification.md`):**
  - **Create New Top-Level Section:** Add a new section titled "### Dashboard &
    Widget Styling".
  - **Define Sub-Sections for Dashboard Elements:** Within this new section,
    create sub-sections to detail the styling for various dashboard-related UI
    components. These sub-sections should draw from the visual and interactive
    requirements in `customizable_monitoring_screens_specification.md` and align
    with the existing style guide's format.
    - **Dashboard Grid/Layout:**
      - Styling for the dashboard canvas (background, potential grid
        indicators).
      - Guidelines for responsive layout and column structure within dashboards.
      - Empty state styling (when a dashboard has no widgets).
    - **Widget Frames/Containers:**
      - Default widget appearance (background color - likely
        `Background Paper #FFFEF8`, corner radius - e.g., `16dp`, padding -
        e.g., `16dp`).
      - Border style (e.g., `Optional 1dp stroke, 5% black` or similar to
        `Data Card`).
      - Shadows (e.g., `Y-offset 2dp, Blur 10dp, Opacity 5%` or similar to
        `Data Card`).
      - Widget header styling (if applicable: typography for title, action icons
        like configure/remove).
    - **Widget Content Area Guidelines:**
      - General principles for typography, spacing, and common elements (titles,
        icons) within widgets to ensure consistency.
      - How to adapt existing styles (e.g., `Data Label`, `Body Small`) for
        widget content.
    - **Example Widget Archetypes (High-Level Styling Notes):**
      - _Sensor Data Widget:_ Reference `Sensor Data Chart` if applicable, or
        define styling for displaying single/multiple sensor readings (value
        typography, unit display, trend indicators).
      - _KPI Widget:_ Styling for displaying key performance indicators (large
        metric display, label, trend/goal comparison).
      - _Task List Widget:_ How tasks are presented within a widget ( leveraging
        `BuJo Task System` styles if appropriate but adapted for widget
        context).
    - **Widget Configuration Interface:**
      - Styling for modals or side panels used for widget settings.
      - Ensure these interfaces use standard input field styles (`Text Input`,
        `Selection Input`) and button styles (`Primary Button`,
        `Secondary Button`) already defined in the guide, but specify layout and
        context.
    - **Widget Library/Adder UI:**
      - How available widgets are presented for selection (e.g., card-based
        list, preview thumbnails).
      - Styling for search/filter functionality within the library.
    - **Drag-and-Drop Feedback:**
      - Visual cues for draggable widgets (e.g., raised appearance, shadow
        change).
      - Placeholder styling when dragging over potential drop zones on the
        dashboard grid.
  - **Leverage Existing Styles:** For all new dashboard elements, reference and
    reuse existing color palette definitions, typography scales, spacing units,
    and basic component styles (like buttons, inputs within configuration
    modals) wherever possible to maintain consistency.
  - **Placement:** Insert this new "### Dashboard & Widget Styling" section
    after the existing "### Special Elements" section (which ends around
    line 207) and before "## Spacing System" (which starts around line 209).
  - **Line Impact:** This will add a significant new section to the document,
    shifting subsequent content.

**(Further items for this theme will be added here following the methodology)**

### Theme: Multi-Property Architecture

(Source: `memory-bank/multi_property_architecture.md`,
`memory-bank/bases_editing_multi_property_architecture.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item MultiProperty.1: Add Core Multi-Property Principles to
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** Create a new top-level section after "### MVP
  Features" (likely around line 100-120).
- **Source Specifications:** `memory-bank/multi_property_architecture.md`
- **Detailed Edit Plan:**

  - **Create New Main Section:**

    - Add a new level-3 heading: "### Multi-Property Architecture"
    - Add an introductory statement: "A foundational architectural principle of
      the Verding system is its ability to manage multiple properties
      (farms/locations) within a single instance, with comprehensive
      property-level context awareness throughout all system components."
    - Add: "The multi-property architecture affects every aspect of the system,
      including data models, access control, user interfaces, agent behavior,
      and operational workflows."

  - **Add "Core Principles" subsection with these components:**

    - **Property as First-Class Entity:** Properties represent physical farm
      locations or management domains. Each property has a unique identifier,
      can be hierarchically organized, and is part of a global property
      registry.
    - **Property Context Persistence:** User sessions maintain property context.
      System operations occur within property context. Cross-property operations
      are explicitly defined. The agent maintains awareness of current property
      context.
    - **Property-Scoped Access Control:** User permissions are defined at the
      property level. Some users have access to multiple properties. Super-admin
      role has access to all properties. Access control policies enforce
      property boundaries.
    - **Cross-Property Capabilities:** The system supports data aggregation
      across properties, resource sharing between properties, comparative
      analytics between properties, and bulk operations across multiple
      properties.

  - **Add "Key Architectural Impacts" subsection with:**

    - **Database Schema:** Most data tables include a `property_id` column as a
      foreign key to the properties table. All queries include property context
      to enforce boundaries.
    - **Row Level Security:** Implementation of property-scoped policies,
      cross-property access controls, and property hierarchy access rules.
    - **User Interface:** Property selector component, property context
      indicators, and context switching mechanisms. Property-specific and
      cross-property dashboards and reports.
    - **Agent Integration:** Property context awareness in agent memory and NLP.
      Support for multi-property commands with appropriate permissions.

  - **Line Impact:** This will add a significant new section to the document,
    likely adding 50-70 lines covering the core multi-property architectural
    principles.

**Item MultiProperty.2: Update Database Schema Design in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Look for the section that defines the database schema
  (likely under "### System Implementation" or similar, around line 3000-3200).
- **Source Specifications:** `memory-bank/multi_property_architecture.md`
- **Detailed Edit Plan:**

  - **Add or Update Properties Table Schema:**

    - Add the complete properties table schema:

    ```sql
    CREATE TABLE properties (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR NOT NULL,
      description TEXT,
      location GEOGRAPHY,
      parent_id UUID REFERENCES properties(id),
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    ```

    - Add explanation: "The properties table is a foundational component of the
      system, representing physical farms or management domains. Properties can
      be organized hierarchically through the parent_id relationship."

  - **Add User-Property Relationship Table:**

    - Add the user_property_access table schema:

    ```sql
    CREATE TABLE user_property_access (
      user_id UUID REFERENCES auth.users(id),
      property_id UUID REFERENCES properties(id),
      role VARCHAR NOT NULL,
      can_view BOOLEAN DEFAULT TRUE,
      can_edit BOOLEAN DEFAULT FALSE,
      can_manage BOOLEAN DEFAULT FALSE,
      can_manage_children BOOLEAN DEFAULT FALSE,
      specific_permissions JSONB,
      PRIMARY KEY (user_id, property_id)
    );
    ```

    - Add explanation: "This table defines the relationship between users and
      properties, including role assignments and permissions. It enables
      granular access control at the property level."

  - **Update Core Data Tables:**

    - Add or update the schema for all core data tables to include property_id:

    ```sql
    -- Example for the crops table
    CREATE TABLE crops (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      property_id UUID NOT NULL REFERENCES properties(id),
      name VARCHAR NOT NULL,
      -- Other fields...
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    ```

    - Add a general note: "All data tables in the system include a property_id
      column, which creates a foreign key relationship to the properties table.
      This enables property-scoped data access and operations."

  - **Add Row Level Security Policies:**

    - Add example RLS policies for property isolation:

    ```sql
    -- Basic property isolation policy
    CREATE POLICY property_isolation_policy ON [table_name]
      USING (property_id IN (
        SELECT property_id FROM user_property_access
        WHERE user_id = auth.uid() AND can_view = true
      ));

    -- Super admin policy
    CREATE POLICY super_admin_policy ON [table_name]
      USING (
        EXISTS (
          SELECT 1 FROM user_roles
          WHERE user_id = auth.uid() AND role = 'super_admin'
        )
      );

    -- Property hierarchy access policy
    CREATE POLICY hierarchy_access_policy ON [table_name]
      USING (property_id IN (
        WITH RECURSIVE property_tree AS (
          SELECT id FROM properties WHERE id IN (
            SELECT property_id FROM user_property_access
            WHERE user_id = auth.uid() AND can_manage_children = true
          )
          UNION
          SELECT p.id FROM properties p
          JOIN property_tree pt ON p.parent_id = pt.id
        )
        SELECT id FROM property_tree
      ));
    ```

    - Add explanation: "These Row Level Security policies enforce property
      boundaries at the database level, ensuring that users can only access data
      from properties they have permission to view."

  - **Line Impact:** This will add significant content to the database schema
    section, likely adding 100-120 lines covering property-related tables,
    schema modifications, and RLS policies.

**Item MultiProperty.3: Update User Interface Design in
`BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- **General Target Area:** Look for sections covering navigation, global UI
  elements, and contextual awareness.
- **Source Specifications:** `memory-bank/multi_property_architecture.md`
- **Detailed Edit Plan:**

  - **Add Property Selector Component Specifications:**

    - Add a new component section: "### Property Selector Component"
    - Add design specifications:

    * Position: Prominent in global navigation, immediately below the main
      logo/header
    * Appearance: Dropdown with current property name, icon, and chevron
    * Expanded View: List of accessible properties with search/filter for users
      with many properties
    * Hierarchy Display: Visual indentation to show parent-child relationships
    * Quick Access: Recently accessed properties shown at top

    - Add behavior specifications:

    * Selection Change: Updating triggers page refresh with new property context
    * URL Integration: Property context included in URL parameters
    * History: Browser history preserves property context changes
    * Keyboard Navigation: Support for keyboard shortcuts to switch properties

  - **Add Property Context Indicators:**

    - Add a new section: "### Property Context Indicators"
    - Add design specifications:

    * Color Coding: Unique color assignment to each property (from a predefined
      palette)
    * Visual Indicators: Subtle property-colored border or accent on key UI
      elements
    * Status Bar: Persistent indicator of current property in status bar or
      header
    * Cross-Property Indicator: Special visual treatment for views showing
      cross-property data

    - Add mockups or examples of how these indicators appear in the interface

  - **Update Dashboard & Reporting Section:**

    - Add specifications for property-specific dashboards:

    * Default configurations tailored to property type
    * Property-specific KPIs and metrics
    * Property context filtering built into all widgets

    - Add specifications for cross-property dashboards:

    * Comparative views showing metrics across selected properties
    * Property grouping and filtering controls
    * Aggregation options (sum, average, min/max)
    * Clear visual distinction between single-property and cross-property views

  - **Line Impact:** This will add new sections and update existing ones in the
    style guide, likely adding 70-90 lines of content defining the UI/UX for
    property context management.

**Item MultiProperty.4: Update Agent Features in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Find the "Agent Core & Natural Language Processing"
  section (likely around line 1000-1500).
- **Source Specifications:** `memory-bank/multi_property_architecture.md`
- **Detailed Edit Plan:**

  - **Add Property Context Awareness to Agent Capabilities:**

    - Add a new feature subsection: "Property Context Management"
    - Add capability descriptions:

    * Context Maintenance: Agent maintains awareness of current property context
      in its memory system
    * Context Switching: Natural language commands to switch property context
      (e.g., "switch to North Farm")
    * Multi-Property Awareness: Agent can understand and disambiguate references
      to multiple properties
    * Permission Enforcement: Agent verifies user has appropriate permissions
      for property-specific actions

  - **Update Natural Language Processing Section:**

    - Add property-related NLP capabilities:

    * Property Name Recognition: Detection of property names in user queries
    * Disambiguation: Clarification when property reference is ambiguous
    * Default Context: Using current property when unspecified in query
    * Property Validation: Verification of property reference against accessible
      properties

  - **Add Multi-Property Command Capabilities:**

    - Add syntax and examples for multi-property commands:

    * Explicit Syntax: "Compare crop yields across all farms"
    * Permission Checks: Agent verifies access to each referenced property
    * Confirmation: Agent requests confirmation for bulk operations
    * Feedback: Clear indication of property scope in responses

  - **Add Property-Specific Knowledge Management:**

    - Add description of how agent maintains property-specific knowledge:

    * Property Profiles: Key characteristics, history, and specifics of each
      property
    * Contextual Memory: Property-specific memories and conversation history
    * Custom Terminology: Recognition of property-specific terms and
      nomenclature
    * Tailored Recommendations: Advice customized to property characteristics

  - **Line Impact:** This will enhance the agent capabilities section with
    property-related features, likely adding 80-100 lines of detailed
    functionality descriptions.

**(Further items for this theme and others will be added here following the
methodology)**

### Theme: Memory System Design

(Source: `memory-bank/memory_system_design.md`,
`memory-bank/agent_memory_design_visual.md`, and
`memory-bank/memory_system_access_control_implementation.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item Memory.1: Integrate Agent Memory System Design into
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** "### 8. Agent Core Integration" > "Database Schema
  Design" and "Integration Points" (likely around line 2915-2930).
- **Source Specifications:** `memory_system_design.md`,
  `agent_memory_design_visual.md`, and
  `memory_system_access_control_implementation.md`
- **Detailed Edit Plan:**

  - **Enhance "Database Schema Design" (lines 2915-2930):**

    - Replace or significantly expand the current database schema descriptions
      with the comprehensive memory system schema from `memory_system_design.md`
      and `agent_memory_design_visual.md`, including:
      - `memory_chunks` table with the full field list (id, document_id,
        chunk_text, dense_embedding, sparse_embedding, context, metadata,
        created_at, property_id)
      - `conversation_history` table with the full field list (id, user_id,
        session_id, chat_id, role, content, embedding, message_index, metadata,
        created_at, property_id)
      - `user_memory_access` table with its fields (id, user_id, user_role,
        access_level, allowed_contexts, allowed_tags, visibility_scope,
        created_at, updated_at)
      - `documents` table with metadata fields (id, gdrive_drop_path,
        gdrive_replica_path, last_modified_agent, last_modified_human, status)
      - Add explanatory comments for field purposes, especially for vector
        embeddings and JSONB metadata fields.

  - **Add "Memory System Architecture" Subsection (new subsection within
    "Detailed Implementation Guide"):**

    - Insert a new subsection that outlines the hybrid RAG approach using:
      - **Direct Database Access:** Explain how the n8n agent workflows connect
        directly to Supabase for memory operations without API intermediaries.
      - **Hybrid RAG Implementation:** Detail the combination of dense vectors
        (pgvector) and sparse vectors/keyword search (TSVector) for more
        comprehensive retrieval.
      - **Google Drive Integration:** Describe the two-way sync between Supabase
        memory and Google Drive for human-readable access, including the
        document ingestion workflow and replication process.
      - **Property-Scoped Access:** Emphasize how all memory operations respect
        the multi-property architecture through property_id fields and access
        control.

  - **Enhance "Integration Points" Section:**

    - Add specific details on how the memory system integrates with:
      - **Main Agent Workflow:** How memory retrieval results feed into the
        agent's response generation.
      - **Document Processing:** How documents from various sources are ingested
        into memory.
      - **Conversation History Management:** How conversations are stored and
        retrieved for context.
      - **Access Control System:** How the memory system enforces role-based,
        context-aware access controls.
      - **Multi-Property Context:** How memory operations maintain property
        isolation and context.

  - **Add "Memory Workflows" Subsection:**

    - Detail the two primary n8n workflows related to memory:
      - **Document/Content Ingestion Workflow:** Steps for processing new
        documents/content, including reading, chunking, embedding, storing in
        Supabase, and replicating to Google Drive.
      - **Memory Retrieval Workflow:** Steps for finding relevant information
        based on a query, including embedding generation, hybrid search, and
        result fusion/ranking.

  - **Add Visual Representations (Optional/Reference):**
    - If appropriate for the BASES file format, include references to or
      descriptions of the mermaid diagrams from `agent_memory_design_visual.md`,
      particularly the system architecture and database schema diagrams.

- **Line Impact:** This will significantly expand the Agent Core Integration
  section with detailed memory system specifications, likely adding 50-100 lines
  of content depending on the level of detail included.

**Item Memory.2: Update Agent Memory References in
`BASES/Verding_ Agent-First Microgreens Management System.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System.md`
- **General Target Area:** "### Agent Core & Natural Language Processing"
  section under "Launch Features (MVP)" (likely around line 20-35).
- **Source Specifications:** `memory_system_design.md` and
  `agent_memory_design_visual.md`
- **Detailed Edit Plan:**

  - **Enhance the Main Description:**

    - Expand the description to explicitly mention the hybrid RAG memory system
      implementation, highlighting the direct database access approach and
      Google Drive integration for human readability.
    - Example addition: "The agent leverages a sophisticated hybrid RAG
      (Retrieval-Augmented Generation) memory system implemented directly in
      Supabase (PostgreSQL with pgvector), allowing it to access and maintain
      both conversation context and knowledge base information efficiently. This
      memory system includes human-readable replication to Google Drive for
      transparency and manual editing."

  - **Update "Tech Involved" Subsection:**

    - Add bullet points specifically related to the memory system:
      - "Supabase with pgvector extension for vector-based memory storage"
      - "Hybrid RAG combining dense and sparse vectors for comprehensive
        retrieval"
      - "Google Drive integration for human-readable memory replication"
      - "n8n workflows for memory ingestion and retrieval operations"
      - "Property-aware memory storage and access controls"

  - **Update "Main Requirements" Subsection:**
    - Add bullet points related to memory system requirements:
      - "Direct database access for memory operations without API
        intermediaries"
      - "Role-based, context-aware memory access control"
      - "Hybrid semantic search with both vector similarity and keyword
        matching"
      - "Two-way sync between database memory and human-readable formats"
      - "Property-scoped memory storage and retrieval"

- **Line Impact:** This will moderately expand the Agent Core & NLP section,
  likely adding 10-15 lines to provide a clearer picture of the memory system
  architecture.

**Item Memory.3: Update Memory System References in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** "### Agent Core & Natural Language Processing" under
  "MVP Features" (likely around line 20-35).
- **Source Specifications:** `memory_system_design.md` and
  `agent_memory_design_visual.md`
- **Detailed Edit Plan:**

  - **Update Main Description:**

    - Enhance the description to clearly articulate the hybrid RAG memory system
      approach and its implementation within Supabase via direct database access
      from n8n.
    - Example enhancement: "The conversational AI agent serves as the primary
      interface for system interaction, enhanced by a sophisticated hybrid RAG
      memory system that combines dense vector embeddings and sparse/keyword
      search for comprehensive information retrieval. The memory system is
      implemented directly in Supabase (PostgreSQL with pgvector) and accessed
      by n8n workflows without API intermediaries."

  - **Update "Tech Involved" Subsection:**

    - Add or enhance bullet points specifically for the memory system:
      - "Supabase/PostgreSQL with pgvector for vector-based memory storage"
      - "Hybrid RAG system combining dense and sparse vectors"
      - "Google Drive integration for human-readable memory replication"
      - "Direct database access from n8n workflows"
      - "Row Level Security (RLS) for memory access control"

  - **Update "Main Requirements" Subsection:**
    - Add or enhance bullet points for memory system requirements:
      - "High-performance vector search capabilities"
      - "Property-scoped memory with role-based access control"
      - "Human-readable and editable memory representations"
      - "Flexible metadata tagging for granular access control"
      - "Efficient hybrid retrieval combining semantic and keyword search"

- **Line Impact:** This will moderately expand the Agent Core & NLP analysis
  section, likely adding 8-12 lines to provide more detail on the memory system
  implementation.

**Item 1.5: Integrate Monitoring Screen Capabilities into n8n Agent Deployment
Strategy in `BASES/Verding n8n Agent Deployment Strategy.md`**

- **Target BASES Document:** `BASES/Verding n8n Agent Deployment Strategy.md`
- **General Target Area:** The section discussing Agent Integration with System
  Components or a similar section covering agent capabilities.
- **Source Specifications:**
  `memory-bank/customizable_monitoring_screens_specification.md`
- **Detailed Edit Plan:**

  - **Add a New Section or Enhance Existing Section on "Agent Dashboard &
    Monitoring Integration":**

    - Create a dedicated subsection titled "Monitoring System Integration" that
      explains how the n8n agent deployment strategy accounts for the following
      capabilities:
      - **Dashboard State Reporting:** Describe how the agent workflows should
        be configured to access dashboard configuration data and widget states
        to report on monitoring data when asked.
      - **Alert & Threshold Monitoring:** Detail how the agent workflows should
        integrate with the alerting system to be aware of and report on
        threshold violations or critical alerts from any property dashboards.
      - **Natural Language Dashboard Queries:** Specify the n8n workflow design
        needed to enable the agent to respond to natural language queries about
        dashboard data (e.g., "What's the current temperature in Greenhouse 2?",
        "Show me yesterday's humidity trends").
      - **Dashboard Manipulation Via Agent:** Outline how the agent should be
        designed to handle requests to modify dashboard configurations (e.g.,
        "Add a temperature widget for Greenhouse 3 to my main dashboard")
        including necessary authorization checks.

  - **Update Infrastructure Requirements Section:**

    - Add considerations for monitoring-related n8n agent requirements:
      - **Real-time Data Access:** Specify that the n8n deployment needs
        efficient, direct access to the timeseries data stored in
        PostgreSQL/Supabase for sensors and operational metrics.
      - **Caching Strategy:** Recommend an approach for caching frequently
        accessed monitoring data to reduce database load while maintaining near
        real-time accuracy.
      - **Performance Optimization:** Provide guidelines for optimizing n8n
        workflows that process large volumes of timeseries data, potentially
        utilizing aggregation techniques or preprocessing steps.

  - **Enhance MCP Tool Integration Section:**

    - Specify the MCP tools the agent should expose for dashboard interaction:
      - **`monitoring.get_dashboard_data`:** Tool for retrieving data currently
        displayed on a specific dashboard or widget.
      - **`monitoring.describe_dashboard`:** Tool for providing a natural
        language description of what's on a specific dashboard.
      - **`monitoring.create_widget`:** Tool for adding a new widget to a user's
        dashboard.
      - **`monitoring.modify_widget`:** Tool for updating settings or data
        sources for an existing widget.
      - **`monitoring.get_alerts`:** Tool for retrieving current active alerts
        from monitoring dashboards.

  - **Add Security Considerations:**

    - Outline how the n8n agent deployment should enforce property-scoped access
      controls when accessing dashboard data:
      - **Context Preservation:** Ensure the agent maintains and respects the
        current property context when querying or modifying dashboard data.
      - **Permission Checking:** Detail the workflow steps required to verify a
        user's permissions before allowing dashboard modifications or access to
        sensitive monitoring data.
      - **Audit Logging:** Specify requirements for logging all agent-initiated
        dashboard queries and modifications for security and compliance
        purposes.

  - **Update Testing & Validation Section:**
    - Add testing scenarios specific to monitoring functionality:
      - **Data Accuracy Testing:** Procedures to verify that agent-reported
        monitoring data matches what's displayed in the actual UI dashboards.
      - **Performance Testing:** Guidelines for testing agent response times
        when handling complex monitoring data queries across various load
        conditions.
      - **Cross-Property Isolation Testing:** Procedures to ensure the agent
        maintains strict data boundaries between properties when reporting on
        monitoring data.

- **Line Impact:** This will add a significant new section or substantially
  expand an existing section, likely adding 30-50 lines covering the integration
  between the n8n agent deployment and the monitoring dashboard system.

**Item 9: Create n8n Agent Deployment Strategy Document in
`BASES/Verding n8n Agent Deployment Strategy.md`**

- **Target BASES Document:** `BASES/Verding n8n Agent Deployment Strategy.md`
  (new document to be created)
- **General Target Area:** Entire document
- **Source Specifications:** `memory-bank/n8n_agent_deployment_strategy.md` and
  `memory-bank/customizable_monitoring_screens_specification.md`
- **Detailed Edit Plan:**

  - **Create a New Document:**
    - Create a new document in the BASES/ directory titled "Verding n8n Agent
      Deployment Strategy.md"
    - Base the document structure and content on
      `memory-bank/n8n_agent_deployment_strategy.md`
    - Ensure all sections from the source document are included (Overview,
      Hosting Approach, Scaling Strategy, Backup and Recovery Procedures,
      Workflow Version Control, Security Framework, Integration with Main
      System, Monitoring and Maintenance)
  - **Adapt the Overview Section:**

    - Include a clear description of the n8n agent's role in the Verding system
      architecture
    - Highlight that the n8n agent handles Agent Core, NLP, BUJO, and Knowledge
      Base workflows
    - Emphasize that the n8n agent interacts with the main Verding backend via
      MCP
    - Include the multi-property architecture considerations as noted in the
      source document
    - Add mention of the agent's integration with monitoring screens
      functionality

  - **Incorporate Monitoring Screen Integration:**

    - **Add a New Section:** Create a new section titled "Monitoring System
      Integration" after the "Integration with Main System" section.
    - **Subsection: Dashboard Data Access:**

      - Detail how n8n workflows will be configured to access dashboard
        configuration data and widget states
      - Specify the database access patterns for retrieving property-specific
        dashboard layouts and widget configurations
      - Outline caching strategies for frequently accessed dashboard data
      - Describe how the agent will translate natural language queries about
        dashboard data into appropriate database queries

    - **Subsection: Alert & Threshold Monitoring:**

      - Detail how the agent workflows will subscribe to and process alert
        notifications from the monitoring system
      - Describe the pattern for querying current alert status across all
        widgets for a specific property
      - Outline how the agent should prioritize and present alert information
        when multiple alerts are active
      - Specify how agent workflows should handle threshold configuration
        adjustments requested by users

    - **Subsection: Natural Language Dashboard Interaction:**

      - Describe the NLP patterns needed to recognize and parse
        dashboard-related queries
      - Outline the workflow design for transforming user questions about
        monitored data into specific widget/data queries
      - Specify how the agent should format and present monitoring data in
        conversation
      - Include examples of expected query patterns and response formats

    - **Subsection: Dashboard Manipulation Workflows:**

      - Detail the workflow design for handling requests to create, update, or
        delete dashboard widgets
      - Specify the permission validation steps required before making dashboard
        changes
      - Outline the process for translating natural language widget requests
        into specific configuration parameters
      - Describe how the agent should confirm successful dashboard modifications
        and provide guidance on using new widgets

    - **Subsection: Performance Considerations:**
      - Discuss strategies for efficient retrieval of time-series data for
        dashboard queries
      - Outline techniques for optimizing n8n workflows that process large
        datasets from sensors or operational metrics
      - Recommend approaches for paginating or aggregating data when responding
        to queries about historical trends
      - Provide guidelines on setting appropriate timeouts for dashboard data
        processing workflows

  - **Enhance the MCP Communication Section:**

    - Add a subsection on "Monitoring-Specific MCP Tools" that details the
      following:
      - **`monitoring.get_dashboard_data`:** Tool for retrieving data currently
        displayed on a specific dashboard or widget.
      - **`monitoring.describe_dashboard`:** Tool for providing a natural
        language description of what's on a specific dashboard.
      - **`monitoring.create_widget`:** Tool for adding a new widget to a user's
        dashboard.
      - **`monitoring.modify_widget`:** Tool for updating settings or data
        sources for an existing widget.
      - **`monitoring.get_alerts`:** Tool for retrieving current active alerts
        from monitoring dashboards.
    - For each tool, specify the expected parameters (including required
      `property_id`), return format, and error handling

  - **Update the Security Framework Section:**

    - Add considerations for monitoring data security:
      - Specify how the n8n agent deployment enforces property-scoped access
        controls when accessing dashboard data
      - Detail the workflow steps for verifying a user's permissions before
        allowing dashboard modifications
      - Outline audit logging requirements for agent-initiated dashboard queries
        and modifications
      - Describe how sensitive sensor data or operational metrics should be
        handled when processed by workflows

  - **Add to the Testing and Validation Section:**
    - Include testing scenarios specific to monitoring functionality:
      - Procedures to verify that agent-reported monitoring data matches what's
        displayed in the UI dashboards
      - Guidelines for testing agent response times when handling complex
        monitoring data queries
      - Test cases for validating cross-property isolation when reporting on
        monitoring data
      - Validation approaches for dashboard modification commands

- **Line Impact:** This will create a new BASES document of approximately
  300-350 lines, incorporating all the content from
  `memory-bank/n8n_agent_deployment_strategy.md` with additional monitoring
  screen integration details adding approximately 50-70 lines.

### Theme: Error Handling and Recovery Procedures

(Source: `memory-bank/error_handling_and_recovery_procedures.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item ErrorHandling.1: Integrate Comprehensive Error Handling Framework into
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Create a new section under "### System
  Implementation" or enhance an existing error handling section if one exists.
- **Source Specifications:**
  `memory-bank/error_handling_and_recovery_procedures.md`
- **Detailed Edit Plan:**

  - **Create New Main Section:**

    - Add a new heading: "### Error Handling and Recovery Framework"
    - Add an introduction: "The Verding system implements a comprehensive error
      handling and recovery framework to ensure system reliability, data
      integrity, and excellent user experience even when unexpected issues
      occur. This framework covers both the main backend and the n8n agent
      components of the system."

  - **Add "1. Error Categorization" Subsection:**

    - Add subsection detailing the five-category error classification system:
      - **Critical System Errors:** Affecting core system functionality, data
        integrity, or security. Examples include database connection failures,
        authentication system failures, or security breaches.
      - **Service Integration Errors:** Issues with external service
        connections, including Home Assistant, n8n, messaging platforms, Google
        Drive, and other integrated services.
      - **Application Logic Errors:** Issues within the application business
        logic, such as invalid state transitions, constraint violations, or
        calculation errors.
      - **User Input Errors:** Problems with data provided by users, including
        validation failures, format errors, or business rule violations.
      - **Performance and Resource Errors:** Issues related to system resources,
        such as timeouts, memory limits, or processing capacity constraints.
    - Add severity level descriptions:
      - **Level 1 (Fatal):** System-wide impact, requires immediate intervention
      - **Level 2 (Critical):** Significant feature or module impact, requires
        urgent attention
      - **Level 3 (Major):** Important function impacted, requires scheduled
        resolution
      - **Level 4 (Minor):** Limited impact, can be addressed in regular
        maintenance
      - **Level 5 (Cosmetic):** User experience issues with no functional impact

  - **Add "2. Error Detection and Reporting" Subsection:**

    - Detail the error detection mechanisms:
      - **Exception Monitoring:** Centralized exception capture system across
        all system components
      - **Health Checks:** Proactive monitoring of system components and
        services
      - **Telemetry:** Continuous collection of performance metrics and anomaly
        detection
      - **User Feedback:** Structured channels for user-reported issues
      - **Agent Error Detection:** Specialized error monitoring for n8n
        workflows
    - Describe the comprehensive logging strategy:
      - **Structured Logging:** JSON-formatted logs with standardized fields
      - **Context Enrichment:** Attaching user, session, property, and request
        context to errors
      - **Sensitive Data Handling:** Masking of sensitive information in logs
      - **Log Aggregation:** Centralized collection and analysis of logs
      - **Retention Policies:** Tiered storage and retention based on error
        severity and relevance

  - **Add "3. Recovery Procedures" Subsection:**

    - Detail automatic recovery procedures:
      - **Retry Mechanisms:** Exponential backoff for transient errors,
        especially in service integrations
      - **Circuit Breakers:** Preventing cascading failures through service
        isolation
      - **Graceful Degradation:** Fallback behaviors when non-critical services
        are unavailable
      - **State Recovery:** Transaction management and state consistency
        mechanisms
      - **Data Validation and Repair:** Automated checks and corrections for
        data integrity
    - Outline manual recovery procedures:
      - **Administrative Alerts:** Escalation protocols for different error
        types and severities
      - **Recovery Dashboard:** Admin interface for monitoring and resolving
        system issues
      - **Guided Recovery Steps:** Documented procedures for manual intervention
      - **Rollback Capabilities:** Mechanisms to revert to known-good states
      - **Diagnostic Tools:** Administrative interfaces for diagnosing complex
        issues

  - **Add "4. User Experience During Errors" Subsection:**

    - Detail user communication strategies:
      - **User-Friendly Messages:** Guidelines for constructing helpful error
        messages
      - **Progressive Disclosure:** Layered error information from general to
        detailed
      - **Action Guidance:** Providing users with next steps or workarounds
      - **Transparency Level:** Balancing honesty about issues with maintaining
        trust
      - **Channel-Specific Communication:** Adapting error messages for web,
        mobile, and agent interfaces
    - Outline recovery assistance for users:
      - **Self-Service Recovery:** Tools and guides for users to resolve common
        issues
      - **Support Escalation:** Clear paths to human assistance when needed
      - **Status Updates:** Keeping users informed during extended incidents
      - **Affected Operations:** Clearly identifying which system functions are
        impacted

  - **Add "5. Implementation Patterns" Subsection:**

    - Provide implementation details for the main backend:
      - **Error Middleware:** Centralized error handling middleware for API
        endpoints
      - **Error Service:** Core service for processing, logging, and responding
        to errors
      - **Error Response Format:** Standardized structure for error responses
        from the API
      - **Validation Framework:** Comprehensive approach to request validation
      - **Health Check API:** Endpoints for monitoring system health
    - Detail implementation patterns for n8n agent:
      - **Workflow Error Handling:** Dedicated error handling nodes in each
        workflow
      - **Error Classification:** Standardized approach to categorizing errors
        in workflows
      - **State Management:** Ensuring workflow state consistency during errors
      - **Recovery Workflows:** Dedicated workflows for recovery operations
      - **Agent-Backend Communication:** Error reporting between n8n and the
        main system

  - **Add "6. Prevention and Continuous Improvement" Subsection:**

    - Outline error prevention strategies:
      - **Static Analysis:** Code linting and static analysis tools
      - **Testing Strategy:** Unit, integration, and end-to-end testing approach
      - **Chaos Engineering:** Controlled failure testing in staging
        environments
      - **Code Review:** Specific focus on error handling in code reviews
      - **Design Reviews:** Considering error scenarios during feature design
    - Detail continuous improvement processes:
      - **Error Analytics:** Regular analysis of error patterns and trends
      - **Postmortem Process:** Structured approach to learning from significant
        incidents
      - **Knowledge Base:** Maintaining documentation of known issues and
        solutions
      - **Error Handling Audits:** Regular reviews of error handling
        effectiveness
      - **User Feedback Loop:** Incorporating user experiences with errors into
        improvements

  - **Line Impact:** This will add a comprehensive new section, likely adding
    150-200 lines documenting the error handling framework.

**Item ErrorHandling.2: Update API Design with Error Handling Specifications in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The API Design section (likely under "### System
  Implementation").
- **Source Specifications:**
  `memory-bank/error_handling_and_recovery_procedures.md`
- **Detailed Edit Plan:**

  - **Add or Update API Error Response Section:**

    - Add a subsection: "#### Error Response Standards"
    - Detail the standardized error response format:

    ```json
    {
      "error": {
        "code": "SERVICE_UNAVAILABLE",
        "message": "The system is currently unable to connect to the sensor service.",
        "details": {
          "source": "home_assistant_integration",
          "suggestion": "Please check your Home Assistant connection or try again later.",
          "timestamp": "2023-08-15T14:22:33Z",
          "requestId": "req_a1b2c3d4e5",
          "severity": "major"
        },
        "developerInfo": {
          "exception": "ConnectionError",
          "component": "SensorDataService",
          "retryable": true
        }
      }
    }
    ```

    - Add explanation:

    * `code`: Standardized error code string
    * `message`: User-friendly error description
    * `details`: Contextual information about the error
    * `developerInfo`: Technical details (only included in development/test
      environments)

  - **Add HTTP Status Code Usage Guidelines:**

    - Add a section detailing appropriate HTTP status codes for different error
      scenarios:

    * 400 Bad Request: Client input validation errors
    * 401 Unauthorized: Authentication failures
    * 403 Forbidden: Permission/authorization issues
    * 404 Not Found: Resource not found
    * 409 Conflict: Business rule violations or state conflicts
    * 422 Unprocessable Entity: Validation passed but operation cannot be
      performed
    * 429 Too Many Requests: Rate limiting
    * 500 Internal Server Error: Unexpected system errors
    * 503 Service Unavailable: External service integration failures

  - **Add Property-Scoped Error Context:**

    - Add guidance for including property context in error responses:

    * Property identification in error context for property-specific errors
    * Special handling for cross-property operations
    * Property permission errors for unauthorized access attempts

  - **Add Validation Error Format:**

    - Add detailed specification for field-level validation errors:

    ```json
    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "The request contains invalid or missing data.",
        "details": {
          "fields": [
            {
              "field": "harvestDate",
              "message": "Harvest date cannot be in the past.",
              "value": "2023-01-01"
            },
            {
              "field": "cropId",
              "message": "The specified crop does not exist.",
              "value": "crop_xyz123"
            }
          ],
          "timestamp": "2023-08-15T14:22:33Z",
          "requestId": "req_f5e4d3c2b1"
        }
      }
    }
    ```

  - **Add Error Retryability Indicators:**

    - Add specifications for communicating whether errors are retryable:

    * `Retry-After` header usage for rate limiting and temporary issues
    * Boolean flag in error response for client-side retry guidance
    * Exponential backoff recommendations for integration partners

  - **Line Impact:** This will add approximately 70-90 lines to the API Design
    section, providing comprehensive error handling standards.

**Item ErrorHandling.3: Add n8n Agent Error Handling to
`BASES/Verding_ Agent-First Microgreens Management System.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System.md`
- **General Target Area:** The section describing the n8n agent implementation
  or system architecture.
- **Source Specifications:**
  `memory-bank/error_handling_and_recovery_procedures.md`
- **Detailed Edit Plan:**

  - **Add or Enhance n8n Agent Section:**

    - Add a new subsection: "#### Agent Error Handling"
    - Add introduction: "The externalized n8n agent implements robust error
      handling to ensure reliable operation and graceful recovery from failures,
      with specialized patterns for workflow errors and communication with the
      main system."

  - **Add "Workflow-Level Error Handling" Details:**

    - Add description of n8n workflow error handling patterns:

    * Error handler nodes in all workflows
    * Standardized error classification and logging
    * State management during failures
    * Retry logic for transient errors
    * Explicit failure paths for unrecoverable errors

  - **Add "Agent-Backend Error Communication" Details:**

    - Detail how errors are communicated between the n8n agent and the main
      backend:

    * Error reporting via MCP protocol
    * Synchronous vs. asynchronous error handling
    * Error context preservation across system boundaries
    * Coordination of recovery actions between agent and backend

  - **Add "User Communication During Agent Errors" Details:**

    - Describe how the agent communicates errors to users:

    * Natural language error explanations in agent responses
    * Distinguishing between retriable and non-retriable issues
    * Offering alternative approaches or workarounds
    * Escalation path for unresolvable issues

  - **Add "Agent Error Recovery" Details:**

    - Outline agent recovery mechanisms:

    * Conversation state preservation during errors
    * Context recovery after agent restarts
    * Self-healing workflows with automated recovery steps
    * Manual intervention triggers for complex issues

  - **Line Impact:** This will add approximately 50-70 lines to the n8n agent
    section, detailing specialized error handling for the agent component.

**Item ErrorHandling.4: Update System Monitoring in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The section on system monitoring, observability, or
  administration features.
- **Source Specifications:**
  `memory-bank/error_handling_and_recovery_procedures.md`
- **Detailed Edit Plan:**

  - **Add or Enhance System Monitoring Section:**

    - Add a subsection: "#### Error Monitoring and Analytics"
    - Add description of comprehensive error monitoring capabilities:

    * Real-time error dashboard for system administrators
    * Error trends and pattern analysis
    * Service health indicators and historical performance
    * Error rate alerting and thresholds
    * Critical error notification system

  - **Add "Error Analytics" Details:**

    - Describe the error analytics capabilities:

    * Error frequency and distribution analysis
    * Impact assessment by feature and user segment
    * Correlation with system changes and deployments
    * Performance impact tracking
    * Recovery effectiveness measurement

  - **Add "Administrator Tools" Details:**

    - Detail the tools available to system administrators:

    * Detailed error investigation interface
    * Log aggregation and search capabilities
    * Manual recovery action triggers
    * System component restart options
    * Configuration adjustment tools

  - **Add "Reporting and Compliance" Details:**

    - Outline error-related reporting capabilities:

    * Automated incident reports for significant issues
    * Error summary reports for management review
    * Compliance documentation for error handling
    * Service level agreement (SLA) tracking
    * Continuous improvement metrics

  - **Line Impact:** This will add approximately 40-60 lines to the system
    monitoring section, enhancing the error monitoring and analysis
    capabilities.

**(Further items for this theme will be added here following the methodology)**

### Theme: Messaging Platform Integration

(Source: `memory-bank/messaging_platform_integration_specifications.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item Messaging.1: Integrate Messaging Platform Architecture into
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Look for sections on communication channels,
  integrations, or create a new section.
- **Source Specifications:**
  `memory-bank/messaging_platform_integration_specifications.md`
- **Detailed Edit Plan:**

  - **Create New Section or Enhance Existing Content:**

    - Add heading: "### Messaging Platform Integration"
    - Add introduction: "The Verding system integrates with popular messaging
      platforms (initially Telegram and WhatsApp) to provide users with natural,
      accessible interfaces to interact with the agent across multiple channels
      while maintaining consistent context and capabilities."

  - **Add "1. Integration Architecture" Subsection:**

    - Detail the overall architecture for messaging platform integration:

    * Webhook-based communication with messaging platforms
    * n8n workflows for message processing and routing
    * Message transformation between platform formats and internal
      representation
    * Bi-directional message flow (user to agent, agent to user)
    * Multi-platform message handling within a unified framework
    * Property context preservation across messaging channels

  - **Add "2. Authentication and Security" Subsection:**

    - Detail the security model:

    * User identity verification process for messaging platforms
    * Account linking between messaging platforms and Verding accounts
    * Session management and token-based authentication
    * Permission enforcement based on authenticated identity
    * Secure handling of sensitive information in messages
    * Property-specific access control in messaging contexts

  - **Add "3. Platform-Specific Implementation" Subsection:**

    - Add detailed implementation for Telegram:

    * Bot creation and configuration process
    * Command structure and handling
    * Group chat vs. private chat handling
    * Media message processing (images, documents)
    * Telegram-specific UI elements (buttons, inline keyboards)
    * Webhook configuration and security

    - Add detailed implementation for WhatsApp:

    * Business API integration approach
    * Message templates and approval process
    * Media handling capabilities
    * User opt-in and consent management
    * Contact management and verification
    * Rate limiting and compliance considerations

  - **Add "4. Context Management" Subsection:**

    - Detail how conversational context is maintained:

    * Session identification across message exchanges
    * Context preservation between separate conversations
    * Cross-platform context sharing
    * Long-term memory for user preferences and history
    * Property context management across messaging platforms
    * Timeout and expiration policies for context

  - **Add "5. Message Handling and Processing" Subsection:**

    - Detail message processing flow:

    * Incoming message validation and normalization
    * Platform-specific message preprocessing
    * Entity extraction and intent classification
    * Agent processing and response generation
    * Response formatting for platform-specific features
    * Handling of unsupported message types

  - **Add "6. Group Chat Model" Subsection:**

    - Detail how group chats are handled:

    * Agent mention/activation in group contexts
    * Multi-user conversation tracking
    * Permission management in group settings
    * Privacy considerations for group interactions
    * Property context in group chat scenarios
    * Administrative commands and controls

  - **Add "7. Error Handling and Recovery" Subsection:**

    - Detail messaging-specific error handling:

    * Platform service disruption handling
    * Message delivery failure management
    * Rate limiting and throttling strategies
    * User feedback during messaging errors
    * Recovery procedures for interrupted conversations
    * Logging and monitoring specific to messaging platforms

  - **Line Impact:** This will add a comprehensive new section, likely adding
    150-180 lines documenting the messaging platform integration architecture.

**Item Messaging.2: Update Agent Core Integration for Messaging in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The "Agent Core & Natural Language Processing"
  section.
- **Source Specifications:**
  `memory-bank/messaging_platform_integration_specifications.md`
- **Detailed Edit Plan:**

  - **Enhance Agent Core Section:**

    - Add or update a subsection: "#### Multi-Channel Agent Capabilities"
    - Add description of how the agent handles multiple communication channels:

    * Channel-aware processing and response formatting
    * Context preservation across channels
    * Channel-specific feature adaptation
    * Consistent personality and capabilities regardless of entry point
    * Handling interrupted conversations across channels
    * Property context maintenance across channels

  - **Add "Channel-Specific NLP Considerations" Details:**

    - Detail how NLP processing adapts to different channels:

    * Handling shortened/informal text common in messaging
    * Emoji and sticker interpretation
    * Voice message processing capabilities
    * Handling platform-specific commands
    * Context inference from limited messages
    * Language detection and processing

  - **Add "Cross-Channel Context Synchronization" Details:**

    - Describe how user context is synchronized:

    * User identification across channels
    * Conversation history accessibility between channels
    * Seamless transition between web, mobile, and messaging platforms
    * Preference and setting consistency
    * Property context preservation when switching channels
    * Security verifications for cross-channel operations

  - **Line Impact:** This will add approximately 40-60 lines to the Agent Core
    section, enhancing the multi-channel capabilities description.

**Item Messaging.3: Add n8n Webhook Processing for Messaging in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The n8n integration or system implementation section.
- **Source Specifications:**
  `memory-bank/messaging_platform_integration_specifications.md`
- **Detailed Edit Plan:**

  - **Add or Enhance n8n Workflow Section:**

    - Add a subsection: "#### Messaging Platform Webhook Processing"
    - Add detailed workflow descriptions:

    * Webhook endpoints for each messaging platform
    * Message validation and security checks
    * Platform-specific payload parsing
    * Message normalization to standard format
    * User identification and authentication
    * Context retrieval and update
    * Property context determination
    * Agent invocation with appropriate context
    * Response formatting and delivery

  - **Add "Workflow Diagrams or Pseudocode" Details:**

    - Add structured representation of key workflows:

    ```
    Telegram Message Processing Workflow:
    1. Receive webhook POST from Telegram
    2. Validate Telegram signature and payload
    3. Parse message content, user ID, and metadata
    4. Identify Verding user associated with Telegram ID
       a. If not found, initiate account linking process
       b. If found, validate permissions
    5. Determine property context from conversation history or default
    6. Normalize message to internal format with user/property context
    7. Process message through agent with appropriate memory access
    8. Format agent response for Telegram (text, buttons, media)
    9. Send response via Telegram Bot API
    10. Update conversation history with interaction
    ```

  - **Add "Error Handling" Details:**

    - Describe specialized error handling for webhook processing:

    * Webhook verification failures
    * Platform API rate limiting
    * Message format incompatibilities
    * User authentication failures
    * Agent processing timeouts
    * Response delivery failures
    * Recovery and retry mechanisms

  - **Line Impact:** This will add approximately 50-70 lines to the n8n
    integration section, detailing messaging webhook processing.

**(Further items for this theme will be added here following the methodology)**

### Theme: Google Drive Integration with Agent Memory

(Source: `memory-bank/memory_system_design.md`,
`memory-bank/agent_memory_design_visual.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item GoogleDrive.1: Integrate Google Drive with Memory System in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Knowledge Base & Document Management section and
  Memory System section.
- **Source Specifications:** `memory-bank/memory_system_design.md`,
  `memory-bank/agent_memory_design_visual.md`
- **Detailed Edit Plan:**

  - **Add "Google Drive Integration" Subsection to Knowledge Base Section:**

    - Add introduction: "The Verding system integrates with Google Drive to
      provide a human-readable interface for document management and memory
      access, while maintaining a synchronized repository of all knowledge
      artifacts in both the Supabase vector store and Google Drive."

    - **Detail Two-Way Sync Architecture:**
      - Describe the bidirectional synchronization between Supabase and Google
        Drive:
      * Document ingestion from Google Drive to Supabase vector store
      * File replication from Supabase to organized Google Drive structure
      * Metadata preservation across both systems
      * Conflict resolution strategy
      * Property-specific folder organization
    - **Add Drop Folder Mechanism:**
      - Detail the implementation of Google Drive drop folders:
      * Structure for different document types (per property)
      * Automatic detection of new documents
      * Processing workflow for new documents
      * Status tracking and error handling
      * User notification for processing completion
      * Versioning approach for updated documents
    - **Add Replica Folder Organization:**
      - Describe the structured organization of processed documents:
      * Hierarchical folder structure by property, document type, and date
      * Naming conventions for files and folders
      * Metadata attachment to Google Drive files
      * Search and discovery optimizations
      * Access control alignment with Verding permissions
      * Retention policy implementation
    - **Add Document Processing Pipeline:**
      - Detail the document ingestion workflow:
      * Initial file detection in drop folders
      * Text extraction from various file formats (PDF, DOCX, etc.)
      * Chunking strategy for different document types
      * Embedding generation for vector search
      * Metadata extraction and enrichment
      * Property context assignment
      * Access control tag application
      * Replica creation with enhanced organization
    - **Add Agent Access Methods:**
      - Describe how the agent interacts with Google Drive content:
      * Searching documents via vector and keyword search
      * Retrieving specific files by name or identifier
      * Generating document summaries
      * Extracting specific information from documents
      * Creating and updating documents
      * Property-aware document operations
      * Permission-based access control
    - **Add User Access Interface:**
      - Detail the user interface for Google Drive integration:
      * Web interface for document upload and management
      * Messaging platform commands for document operations
      * Status tracking for document processing
      * Search capabilities across document repository
      * Version history and change tracking
      * Collaborative editing features

  - **Add Implementation Details to Memory System Section:**

    - Add Google Drive integration components to the memory system architecture:

    * Authentication and connection management
    * Webhook processing for file change notifications
    * Batch processing for large document sets
    * Error handling and retry mechanisms
    * Logging and monitoring approach
    * Scheduled synchronization jobs

    - Add n8n workflow specifications for Google Drive operations:

    * Document detection workflow
    * Processing and embedding workflow
    * Replication workflow
    * Cleanup and maintenance workflow
    * Error recovery workflow

  - **Line Impact:** This will add approximately 100-120 lines to the document
    management and memory system sections, detailing the Google Drive
    integration architecture.

**Item GoogleDrive.2: Add MCP Tools for Google Drive in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The MCP Tools section related to document management.
- **Source Specifications:** `memory-bank/memory_system_design.md`,
  `memory-bank/mcp_specification.md`
- **Detailed Edit Plan:**

  - **Add or Enhance Document Management MCP Tools Section:**

    - Add a subsection: "#### Google Drive Integration MCP Tools"
    - Add introduction: "The following MCP tools enable the agent to interact
      with documents stored in Google Drive and manage the synchronization
      between Google Drive and the Supabase memory system."

    - **Add Document Upload Tools:**
      - Detail MCP tools for document upload operations:
      ```
      mcp_drive_upload_file
      Parameters:
        - property_id (UUID): The property context for the file
        - file_data (Base64): The encoded file content
        - file_name (String): Name for the uploaded file
        - file_type (String): MIME type of the file
        - tags (Array<String>): Optional tags for categorization
        - access_level (String): Access control level (default: "standard")
      Returns: Object with file_id and status information
      ```
    - **Add Document Retrieval Tools:**

      - Detail MCP tools for document retrieval:

      ```
      mcp_drive_get_file
      Parameters:
        - file_id (String): Google Drive file ID or internal reference
        - property_id (UUID): Optional property context filter
        - include_content (Boolean): Whether to include file content
      Returns: Object with file metadata and optionally content

      mcp_drive_search_files
      Parameters:
        - query (String): Search query for files
        - property_id (UUID): Optional property context filter
        - file_types (Array<String>): Optional filter by file types
        - tags (Array<String>): Optional filter by tags
        - date_range (Object): Optional date range filter
        - limit (Number): Maximum number of results
      Returns: Array of matching files with metadata
      ```

    - **Add Document Management Tools:**

      - Detail MCP tools for document management:

      ```
      mcp_drive_update_file_metadata
      Parameters:
        - file_id (String): File identifier
        - property_id (UUID): Property context
        - metadata (Object): Updated metadata fields
      Returns: Updated file metadata object

      mcp_drive_move_file
      Parameters:
        - file_id (String): File identifier
        - source_property_id (UUID): Current property context
        - target_property_id (UUID): New property context
        - folder_path (String): Optional target folder path
      Returns: Status object with new location information

      mcp_drive_delete_file
      Parameters:
        - file_id (String): File identifier
        - property_id (UUID): Property context
        - permanent (Boolean): Whether deletion is permanent
      Returns: Status object confirming deletion
      ```

    - **Add Synchronization Management Tools:**

      - Detail MCP tools for managing synchronization:

      ```
      mcp_drive_sync_status
      Parameters:
        - property_id (UUID): Optional property context filter
      Returns: Synchronization status information

      mcp_drive_trigger_sync
      Parameters:
        - property_id (UUID): Property context
        - mode (String): "full" or "incremental" sync
        - folder_path (String): Optional specific folder
      Returns: Sync job status information

      mcp_drive_resolve_conflict
      Parameters:
        - conflict_id (String): Identifier for the conflict
        - resolution (String): Resolution strategy
        - property_id (UUID): Property context
      Returns: Resolution status information
      ```

  - **Add MCP Tool Usage Examples:**

    - Provide example scenarios for using these tools:

    * Agent processing a user request to upload a document
    * Agent searching for information across documents
    * Agent resolving a document synchronization issue
    * Agent managing document metadata
    * Agent moving documents between properties

  - **Line Impact:** This will add approximately 70-90 lines to the MCP Tools
    section, detailing the Google Drive integration tools.

**Item GoogleDrive.3: Update Knowledge Base Features in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** The "Knowledge Base & Document Management" section
  under MVP Features.
- **Source Specifications:** `memory-bank/memory_system_design.md`
- **Detailed Edit Plan:**

  - **Enhance Knowledge Base Section:**

    - Update the main description to include: "...with seamless Google Drive
      integration for human-readable document access alongside the agent's
      vector-based memory system."

    - **Add to Core Functionality:**

      - "Two-way synchronization between Supabase vector store and Google
        Drive."
      - "Drop folder mechanism for easy document ingestion by users."
      - "Structured organization of documents with property-specific contexts."
      - "Version tracking and change history for documents."
      - "Agent-accessible document repository with rich search capabilities."
      - "Property-aware document operations and access control."

    - **Add to Tech Involved:**

      - "Google Drive API integration via n8n workflows."
      - "Document processing pipeline for text extraction and embedding."
      - "Metadata synchronization between Google Drive and Supabase."
      - "WebSockets for real-time document status updates."

    - **Add to Main Requirements:**
      - "Seamless user experience for document upload and retrieval."
      - "Robust synchronization with conflict resolution."
      - "Comprehensive search across document repository."
      - "Strong access control aligned with Verding permissions."
      - "Support for common document formats (PDF, DOCX, XLSX, etc.)."
      - "Real-time status updates for document processing."

  - **Line Impact:** This will enhance the existing Knowledge Base section,
    adding approximately 20-30 lines of detailed functionality.

**Item GoogleDrive.4: Add Google Drive Authentication in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Authentication and security section.
- **Source Specifications:** `memory-bank/memory_system_design.md`
- **Detailed Edit Plan:**

  - **Add or Enhance Authentication Section:**

    - Add a subsection: "#### Google Drive Authentication"
    - Add description of the authentication approach:

    * OAuth 2.0 implementation for Google Drive access
    * Service account vs. user account authentication models
    * Credential management and security
    * Scope limitations for appropriate access
    * Token refresh and management
    * Permission mapping between Verding and Google Drive

    - Add user authorization flow details:

    * Initial setup and authorization by administrator
    * User-level permission granting
    * Revocation process
    * Audit logging for access events
    * Periodic revalidation of authentication

    - Add security considerations:

    * Secure storage of credentials
    * Encryption of sensitive data
    * Rate limiting for API operations
    * Monitoring for suspicious activity
    * Compliance with data protection regulations

  - **Line Impact:** This will add approximately 30-40 lines to the
    authentication section, detailing the Google Drive authentication approach.

**(Further items for this theme will be added here following the methodology)**

### Theme: MCP Specification Property Architecture

(Source: `memory-bank/mcp_specification.md`,
`memory-bank/mcp_specification_property_updates.md`,
`memory-bank/multi_property_architecture.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item MCPProperty.1: Update MCP Protocol with Property Context in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** MCP specification section under System
  Implementation.
- **Source Specifications:**
  `memory-bank/mcp_specification_property_updates.md`,
  `memory-bank/multi_property_architecture.md`
- **Detailed Edit Plan:**

  - **Enhance MCP Protocol Overview Section:**

    - Add description of property context in MCP: "The Model Context Protocol
      (MCP) is property-aware, with property context being a fundamental aspect
      of communication between the agent and the main backend. Every MCP request
      and response includes property context information to ensure operations
      are scoped to the appropriate farm or location."

    - Add property context requirements:

    * Explicit property_id parameter in most MCP tool calls
    * Property context persistence in agent sessions
    * Property validation against user permissions
    * Cross-property operation handling
    * Default property behavior

    - Add property context enforcement:

    * Backend validation of property access rights
    * Error responses for invalid property access
    * Context switching protocol
    * Multi-property aggregation approaches
    * Context inference when property is unspecified

  - **Update MCP Request/Response Format:**

    - Add property context to the standard request format:

    ```json
    {
      "request": {
        "tool": "tool_name",
        "parameters": {
          "property_id": "uuid-of-property"
          /* other parameters */
        },
        "context": {
          "session_id": "user-session-identifier",
          "user_id": "authenticated-user-id",
          "property_context": {
            "active_property_id": "uuid-of-property",
            "accessible_properties": ["uuid1", "uuid2", "..."]
          }
        }
      }
    }
    ```

    - Add property-specific fields to the standard response format:

    ```json
    {
      "response": {
        "status": "success",
        "data": {
          /* response data */
        },
        "context": {
          "property_id": "uuid-of-property",
          "property_name": "North Farm"
          /* other context information */
        }
      }
    }
    ```

  - **Add Property Context Management Tools:**

    - Add MCP tools for property context management:

    ```
    mcp_property_get_context
    Parameters: (none required)
    Returns: Object with active property and accessible properties

    mcp_property_set_context
    Parameters:
      - property_id (UUID): The property to set as active
    Returns: Status and updated context information

    mcp_property_list_accessible
    Parameters:
      - filter (Object): Optional filtering criteria
    Returns: Array of accessible properties with metadata
    ```

  - **Add Property-Related Error Codes:**

    - Add standardized error codes for property-related issues:

    * PROPERTY_NOT_FOUND: Specified property does not exist
    * PROPERTY_ACCESS_DENIED: User lacks permission for the property
    * PROPERTY_CONTEXT_REQUIRED: Operation requires property context
    * PROPERTY_INVALID_OPERATION: Operation not valid for property
    * PROPERTY_CONTEXT_MISMATCH: Data belongs to different property

  - **Line Impact:** This will add approximately 70-90 lines to the MCP
    specification section, enhancing it with comprehensive property context
    handling.

**Item MCPProperty.2: Add Property Context to All MCP Tool Categories in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** All MCP tool categories throughout the document.
- **Source Specifications:** `memory-bank/mcp_specification_property_updates.md`
- **Detailed Edit Plan:**

  - **Add General Property Context Note:**

    - Add a prominent note at the beginning of the MCP tools section:
      "**Property Context Note:** Unless explicitly stated otherwise, all MCP
      tools require a `property_id` parameter to specify the property context
      for the operation. Tools will validate that the user has appropriate
      permissions for the specified property before executing operations. Some
      tools designed for system-wide or user-specific operations may not require
      a property context."

  - **Update Farm Management MCP Tools:**

    - Add property context to all farm management tools, for example:

    ```
    mcp_farm_get_crops
    Parameters:
      - property_id (UUID): The property context for the operation
      - status (String): Optional filter by crop status
      - ...
    ```

  - **Update Production Management MCP Tools:**

    - Add property context to all production tools, for example:

    ```
    mcp_production_get_batches
    Parameters:
      - property_id (UUID): The property context for the operation
      - status (String): Optional filter by batch status
      - ...
    ```

  - **Update Sensor Management MCP Tools:**

    - Add property context to all sensor tools, for example:

    ```
    mcp_sensor_get_readings
    Parameters:
      - property_id (UUID): The property context for the operation
      - sensor_id (String): The sensor identifier
      - ...
    ```

  - **Update Customer Management MCP Tools:**

    - Add property context to customer management tools, for example:

    ```
    mcp_customer_get_list
    Parameters:
      - property_id (UUID): The property context for the operation
      - filter (Object): Optional filtering criteria
      - ...
    ```

  - **Update Order Management MCP Tools:**

    - Add property context to order management tools, for example:

    ```
    mcp_order_create
    Parameters:
      - property_id (UUID): The property context for the operation
      - customer_id (UUID): The customer placing the order
      - ...
    ```

  - **Update Task Management MCP Tools:**

    - Add property context to task management tools, for example:

    ```
    mcp_task_create
    Parameters:
      - property_id (UUID): The property context for the operation
      - title (String): Task title
      - ...
    ```

  - **Update Knowledge Base MCP Tools:**

    - Add property context to knowledge base tools, for example:

    ```
    mcp_knowledge_search
    Parameters:
      - property_id (UUID): The property context for the operation
      - query (String): The search query
      - ...
    ```

  - **Identify Cross-Property MCP Tools:**

    - Add special handling notes for tools that operate across properties:

    ```
    mcp_analytics_compare_properties
    Parameters:
      - property_ids (Array<UUID>): Array of property IDs to compare
      - metric (String): The metric to compare
      - ...
    Note: This tool requires the user to have access to all specified properties.
    ```

  - **Line Impact:** This update will affect multiple sections throughout the
    document, adding property context parameters to most MCP tool definitions.
    The overall line impact will be spread across the document, with
    approximately 2-3 additional lines per tool definition.

**Item MCPProperty.3: Add Property Relationship to Database Schema in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Database schema section.
- **Source Specifications:** `memory-bank/multi_property_architecture.md`,
  `memory-bank/mcp_specification_property_updates.md`
- **Detailed Edit Plan:**

  - **Add or Update Properties Table Definition:**

    - Add the complete properties table schema:

    ```sql
    CREATE TABLE properties (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      location GEOGRAPHY(POINT),
      address JSONB,
      parent_id UUID REFERENCES properties(id),
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    ```

    - Add explanation: "The properties table is fundamental to the
      multi-property architecture, representing physical farms or management
      domains that can be organized hierarchically."

  - **Add User-Property Relationship Table:**

    - Add the user-property relationship table:

    ```sql
    CREATE TABLE user_property_access (
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
      role VARCHAR(50) NOT NULL,
      access_level VARCHAR(50) NOT NULL DEFAULT 'standard',
      permissions JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      PRIMARY KEY (user_id, property_id)
    );
    ```

    - Add explanation: "This junction table defines the access relationship
      between users and properties, specifying roles and permissions at the
      property level."

  - **Add Property Foreign Keys to Core Tables:**

    - Add a note and examples of property_id in core tables:

    ```
    Note: All core data tables include a property_id column as a foreign key reference to the properties table. This enables property-scoped data access and operations. Examples:

    ALTER TABLE crops ADD COLUMN property_id UUID NOT NULL REFERENCES properties(id);
    ALTER TABLE batches ADD COLUMN property_id UUID NOT NULL REFERENCES properties(id);
    ALTER TABLE sensors ADD COLUMN property_id UUID NOT NULL REFERENCES properties(id);
    -- And similarly for all other operational data tables
    ```

  - **Add Row-Level Security Policies for Property Isolation:**

    - Add example RLS policies:

    ```sql
    -- Basic property access policy
    CREATE POLICY property_access_policy ON [table_name]
      USING (property_id IN (
        SELECT property_id FROM user_property_access
        WHERE user_id = auth.uid()
      ));

    -- Example of property hierarchy access
    CREATE POLICY property_hierarchy_policy ON [table_name]
      USING (EXISTS (
        WITH RECURSIVE property_tree AS (
          -- Direct access properties
          SELECT p.id FROM properties p
          JOIN user_property_access upa ON p.id = upa.property_id
          WHERE upa.user_id = auth.uid()

          UNION ALL

          -- Child properties if user has hierarchy access
          SELECT child.id FROM properties child
          JOIN property_tree parent ON child.parent_id = parent.id
          JOIN user_property_access upa ON parent.id = upa.property_id
          WHERE upa.user_id = auth.uid()
          AND upa.permissions->>'manage_children' = 'true'
        )
        SELECT 1 FROM property_tree
        WHERE id = [table_name].property_id
      ));
    ```

  - **Line Impact:** This will add approximately 50-70 lines to the database
    schema section, establishing the property relationships throughout the data
    model.

**(Further items for this theme will be added here following the methodology)**

### Theme: Memory System Access Control

(Source: `memory-bank/memory_system_access_control_implementation.md`,
`memory-bank/memory_access_control_research.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item MemoryAC.1: Add Memory Access Control Implementation to
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** The "Agent Core & Natural Language Processing"
  section, subsection dealing with agent memory (likely around line 1200-1400).
- **Source Specifications:**
  `memory-bank/memory_system_access_control_implementation.md`
- **Detailed Edit Plan:**

  - **Add or Update Memory System Access Control Section:**

    - Add a new subsection: "#### Memory System Access Control"
    - Add introductory text: "The memory system implements a flexible, tag-based
      access control mechanism that combines aspects of Role-Based Access
      Control (RBAC) and Attribute-Based Access Control (ABAC) to provide
      granular, context-aware permissions for memory records."

  - **Add Memory Tags Framework:**

    - Add description: "Memory records are assigned tags that determine their
      visibility and access rules. These tags form the foundation of the access
      control system and enable flexible permission management without rigid
      predefined categories."
    - Add tag types with examples:

    * User-specific: `user:123e4567-e89b-12d3-a456-426614174000`
    * Role-based: `role:admin`, `role:employee`, `role:client`
    * Content-based: `type:conversation`, `type:document`, `type:knowledge`
    * Sensitivity-based: `sensitivity:public`, `sensitivity:internal`,
      `sensitivity:confidential`
    * Context-based: `context:support`, `context:sales`, `context:technical`
    * Property-scoped: `property:f47ac10b-58cc-4372-a567-0e02b2c3d479`

    - Add section on tag combinations: "Tags can be combined to create
      sophisticated access patterns, such as `role:admin AND property:123` or
      `user:456 OR role:manager AND context:support`."

  - **Add Database Schema for Memory Access Control:**

    - Add table schema for memory_records:

    ```sql
    CREATE TABLE memory_records (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content TEXT NOT NULL,
      embedding VECTOR(1536),
      metadata JSONB,
      tags TEXT[] NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    ```

    - Add table schema for access_rules:

    ```sql
    CREATE TABLE access_rules (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR NOT NULL,
      description TEXT,
      rule_expression TEXT NOT NULL,
      priority INTEGER NOT NULL DEFAULT 100,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    ```

    - Add table schema for user_permissions:

    ```sql
    CREATE TABLE user_permissions (
      user_id UUID REFERENCES auth.users(id),
      permission_key VARCHAR NOT NULL,
      permission_value VARCHAR NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, permission_key)
    );
    ```

  - **Add Row Level Security Implementation:**

    - Add description: "Row Level Security (RLS) in Supabase enforces access
      control at the database level, ensuring that users can only retrieve
      memory records they have permission to access."
    - Add RLS policy example:

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

  - **Add Memory System Helper Functions:**

    - Add function for adding records with appropriate tags:

    ```sql
    CREATE OR REPLACE FUNCTION add_memory_record(
      p_content TEXT,
      p_metadata JSONB,
      p_tags TEXT[]
    ) RETURNS UUID AS $$
    DECLARE
      v_user_id UUID;
      v_new_id UUID;
    BEGIN
      v_user_id := auth.uid();

      -- Add user tag if not present
      IF NOT ('user:' || v_user_id::text = ANY(p_tags)) THEN
        p_tags := array_append(p_tags, 'user:' || v_user_id::text);
      END IF;

      INSERT INTO memory_records(content, metadata, tags)
      VALUES (p_content, p_metadata, p_tags)
      RETURNING id INTO v_new_id;

      RETURN v_new_id;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    ```

    - Add function for checking access to specific records:

    ```sql
    CREATE OR REPLACE FUNCTION can_access_memory(
      p_record_id UUID
    ) RETURNS BOOLEAN AS $$
    DECLARE
      v_user_id UUID;
      v_result BOOLEAN;
    BEGIN
      v_user_id := auth.uid();

      SELECT EXISTS (
        SELECT 1 FROM memory_records mr
        WHERE mr.id = p_record_id
        AND (
          -- Similar access logic as the RLS policy
          EXISTS (
            SELECT 1 FROM user_permissions up
            WHERE up.user_id = v_user_id
            AND (
              ('user:' || v_user_id::text) = ANY(mr.tags)
              OR
              ('role:' || up.permission_value) = ANY(mr.tags)
              OR
              (up.permission_key = 'property_access' AND
               ('property:' || up.permission_value) = ANY(mr.tags))
            )
          )
        )
      ) INTO v_result;

      RETURN v_result;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    ```

  - **Add MCP Integration:**

    - Describe how the agent integrates with the memory access control system:

    * Agent's MCP tools for memory access check permissions
    * Memory retrieval respects access boundaries
    * Memory storage applies appropriate tags
    * Cross-property memory operations handle multiple permission checks

  - **Line Impact:** This will add a significant amount of content to the memory
    system section, likely adding 120-150 lines covering the access control
    implementation, database schema, RLS policies, and helper functions.

**Item MemoryAC.2: Update Memory System Integration in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** The "Agent Core & Natural Language Processing"
  section (likely around line 20-35).
- **Source Specifications:**
  `memory-bank/memory_system_access_control_implementation.md`
- **Detailed Edit Plan:**

  - **Update Core Functionality:**

    - Add bullet point: "Tag-based flexible access control system for memory
      records"
    - Add bullet point: "Contextual memory retrieval respecting user permissions
      and property boundaries"
    - Add bullet point: "Row Level Security enforcement at the database level"

  - **Update Tech Involved:**

    - Add or update: "Supabase PostgreSQL with Row Level Security policies"
    - Add or update: "pgvector for vector similarity search with permission
      filters"
    - Add or update: "Tag-based hybrid RBAC/ABAC system"

  - **Update Main Requirements:**

    - Add or update: "Granular access control for memory data based on user
      roles, properties, and content sensitivity"
    - Add or update: "Performance-optimized memory retrieval with access control
      checks"
    - Add or update: "Flexible tag-based system allowing for evolving access
      patterns"

  - **Line Impact:** This will update the memory system references in the
    Features Analysis document, adding approximately 10-15 lines of content.

**(Further items for this theme and others will be added here following the
methodology)**

### Theme: Home Assistant/Sensor Integration

(Source: `memory-bank/systemPatterns.md`, `memory-bank/techContext.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item Sensor.1: Integrate Home Assistant Sensor Integration into
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Create a new section "### 14. Sensor Integration via
  Home Assistant" or update existing section on sensor management (if present).
- **Source Specifications:** `memory-bank/systemPatterns.md`,
  `memory-bank/techContext.md`
- **Detailed Edit Plan:**

  - **Create New Main Section (if not present):**

    - Add a new level-3 heading: "### 14. Sensor Integration via Home Assistant"
    - Add a feature goal statement: "Integrate Verding with Home Assistant to
      enable real-time environmental monitoring of multiple properties through a
      diverse array of sensors, with support for automated alerts, historical
      data analysis, and agent-accessible monitoring data."

  - **Create "1. Detailed Feature Requirements" subsection with these
    components:**

    - **Home Assistant Integration:** Implement bidirectional communication with
      Home Assistant instances, supporting one instance per property with
      appropriate authentication and data isolation.
    - **MQTT Bridge Configuration:** Set up MQTT bridge for efficient sensor
      data transmission, with proper topic structure to maintain property
      isolation and data categorization.
    - **Sensor Type Support:** Support for temperature, humidity, CO2, light
      level, water level, pH, EC/TDS, and custom sensor types, with appropriate
      metadata and calibration settings.
    - **Data Collection & Storage:** Define efficient time-series data
      collection, aggregation, and storage strategies optimized for both
      real-time access and historical analysis.
    - **Alert Configuration:** Allow for threshold-based alerts with
      customizable notification channels per property, including agent
      notification capability.
    - **Property-Aware Data Management:** Maintain strict property isolation for
      sensor data, with appropriate access controls based on user roles and
      property permissions.
    - **Agent Accessibility:** Ensure all sensor data and alert configurations
      are accessible to the agent via MCP tools, enabling natural language
      queries about environmental conditions.

  - **Create "2. Detailed Implementation Guide" subsection with:**

    - **Integration Architecture Overview:** Describe the overall architecture
      connecting Home Assistant, MQTT, and the Verding system, with emphasis on
      maintaining property boundaries.
    - **MQTT Topic Structure:** Define a standardized topic structure that
      incorporates property IDs and sensor types, e.g.,
      `verding/{property_id}/sensors/{sensor_type}/{sensor_id}`.
    - **Data Ingestion Workflow:** Detail the n8n workflow for subscribing to
      MQTT topics, processing incoming sensor data, and storing it in the
      Supabase database with property context.
    - **Database Schema for Sensor Data:** Provide the schema for sensor-related
      tables, including:

    ```sql
    CREATE TABLE sensors (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      property_id UUID NOT NULL REFERENCES properties(id),
      name VARCHAR NOT NULL,
      type VARCHAR NOT NULL,
      location VARCHAR,
      metadata JSONB,
      alert_thresholds JSONB,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );

    CREATE TABLE sensor_readings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sensor_id UUID NOT NULL REFERENCES sensors(id),
      property_id UUID NOT NULL REFERENCES properties(id),
      value DECIMAL NOT NULL,
      unit VARCHAR NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      metadata JSONB
    );

    CREATE TABLE sensor_alerts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sensor_id UUID NOT NULL REFERENCES sensors(id),
      property_id UUID NOT NULL REFERENCES properties(id),
      threshold_type VARCHAR NOT NULL,
      threshold_value DECIMAL NOT NULL,
      status VARCHAR NOT NULL,
      triggered_at TIMESTAMP WITH TIME ZONE,
      resolved_at TIMESTAMP WITH TIME ZONE,
      notification_sent BOOLEAN DEFAULT FALSE
    );
    ```

    - **Data Aggregation Strategy:** Detail the approach for aggregating
      high-frequency sensor data for efficient storage and querying, including
      rollup tables and retention policies.
    - **Alert Processing Workflow:** Describe the n8n workflow for monitoring
      sensor readings against thresholds, generating alerts, and sending
      notifications through appropriate channels.

  - **Create "3. Integration Points" subsection detailing how sensor integration
    connects with:**

    - **Agent Core:** How sensor data and alerts are made available to the agent
      through MCP tools.
    - **Monitoring Dashboards:** How sensor data feeds into the customizable
      monitoring screens.
    - **Property Context System:** How sensor data maintains property context
      throughout the system.
    - **n8n Workflows:** How sensor data processing is implemented through n8n
      workflow automation.
    - **Mobile Alerts:** How sensor alerts are delivered to mobile devices via
      messaging platforms.

  - **Add "4. MCP Tools for Sensor Management" subsection including:**

    - `get_sensors` - Retrieve a list of all sensors for a property
    - `get_sensor_data` - Retrieve readings for a specific sensor or sensor type
    - `get_sensor_alerts` - Retrieve active or historical alerts for sensors
    - `update_sensor_thresholds` - Modify alert thresholds for a sensor
    - `add_sensor` - Register a new sensor in the system
    - `delete_sensor` - Deactivate or remove a sensor from the system
    - `get_sensor_statistics` - Retrieve statistical data for sensor readings
    - `acknowledge_sensor_alert` - Mark an alert as seen/acknowledged

  - **Line Impact:** This will add a significant new section to the document,
    likely adding 150-200+ lines covering the comprehensive Home Assistant
    sensor integration strategy.

**Item Sensor.2: Update Sensor References in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** Add or update the "Sensor Integration" section under
  "MVP Features" (if present) or create a new section.
- **Source Specifications:** `memory-bank/systemPatterns.md`,
  `memory-bank/techContext.md`
- **Detailed Edit Plan:**

  - **Create or Update "### Sensor Integration (Home Assistant)" section:**

    - **Modify Description:** Add or update to "Real-time environmental
      monitoring through Home Assistant integration, with multi-property
      support, customizable alerts, and comprehensive agent access to sensor
      data."
    - **Add to Core Functionality:**
      - "Bidirectional communication with Home Assistant via MQTT bridge."
      - "Support for diverse sensor types across multiple properties."
      - "Real-time data collection with efficient storage and aggregation."
      - "Threshold-based alerts with multiple notification channels."
      - "Historical data analysis and trend visualization."
      - "Property-scoped sensor data access control."
      - "Agent-accessible environmental data via natural language queries."
    - **Add to Tech Involved:**
      - "Home Assistant for sensor management and initial data collection."
      - "MQTT for efficient publish/subscribe data transmission."
      - "n8n workflows for data processing and alert generation."
      - "Supabase (PostgreSQL) for time-series data storage."
      - "MCP tools for agent access to sensor data."
    - **Add to Main Requirements:**
      - "Support for one Home Assistant instance per property."
      - "Strict property isolation for sensor data and alerts."
      - "Efficient time-series data storage optimized for both real-time and
        historical queries."
      - "Customizable alerting thresholds with multi-channel notifications."
      - "Complete agent access to sensor data through natural language queries."
      - "Dashboard widgets for visual representation of sensor data."

  - **Line Impact:** This will add a significant new section or substantially
    expand an existing section, likely adding 30-50 lines covering the sensor
    integration architecture and capabilities.

**Item Sensor.3: Add Sensor UI Elements to
`BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- **General Target Area:** Add new elements under an appropriate section for
  sensor-related UI components.
- **Source Specifications:** `memory-bank/systemPatterns.md`,
  `memory-bank/techContext.md`
- **Detailed Edit Plan:**

  - **Create New Section:** "### Sensor Data Visualization Components"
  - **Define styling for:**
    - **Sensor Cards:**
      - Base layout and container styling
      - Current reading display (typography, units)
      - Status indicators (normal, warning, alert)
      - Trend indicators (up/down arrows, percent change)
    - **Sensor Charts:**
      - Line chart styling for time-series data
      - Multi-sensor comparison charts
      - Color schemes for different sensor types
      - Threshold visualization (warning/critical lines)
    - **Alert Components:**
      - Alert badge styling
      - Alert notification styling
      - Alert history list styling
    - **Sensor Management Interface:**
      - Sensor setup form styling
      - Threshold configuration controls
      - Calibration interface elements
    - **Sensor Dashboard Components:**
      - Layout guidelines for sensor dashboard sections
      - Property selector integration
      - Time range selector styling
  - **Include visual examples:** Show mockups of sensor cards, charts, and alert
    components
  - **Line Impact:** This will add a new section with detailed styling
    specifications for sensor-related UI components, likely adding 50-70 lines.

### Theme: MCP Core Implementation

(Source: `memory-bank/mcp_specification.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item MCPCore.1: Establish Core MCP Protocol in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** "### 8. Agent Core Integration" section, or create a
  dedicated MCP section if not present.
- **Source Specifications:** `memory-bank/mcp_specification.md`
- **Detailed Edit Plan:**

  - **Create or Enhance MCP Protocol Section:**

    - Add or update a section titled "Model Context Protocol (MCP)
      Specification"
    - Add an introduction: "The Model Context Protocol (MCP) is the exclusive
      communication mechanism between the external n8n Agent and the main
      Verding backend. It provides a structured, tool-based approach for the
      agent to access all system functionality that is available through the
      web/mobile UI."
    - Emphasize that MCP is preferred over a traditional REST API for agent
      interactions because it provides a more natural interface for AI agents
      with clear action boundaries and consistent response formats.

  - **Define Base Protocol Structure:**

    - Add subsection "MCP Request Format" with the standard structure:

    ```json
    {
      "action": "tool_name",
      "property_id": "uuid-of-property-context",
      "parameters": {
        "param1": "value1",
        "param2": "value2"
      },
      "context": {
        "user_id": "user-uuid",
        "session_id": "session-uuid",
        "chat_id": "chat-uuid",
        "message_id": "message-uuid"
      }
    }
    ```

    - Add subsection "MCP Response Format" with the standard structure:

    ```json
    {
      "status": "success|error",
      "data": {
        // Response data specific to the tool
      },
      "error": {
        "code": "error_code",
        "message": "Human-readable error message",
        "details": {}
      },
      "context_update": {
        // Optional context changes the agent should be aware of
      }
    }
    ```

  - **Add "Authentication and Security" subsection:**

    - Detail the JWT-based authentication approach for MCP requests
    - Explain how property-level access control is enforced at the MCP layer
    - Describe rate limiting and abuse prevention mechanisms
    - Outline logging and auditing requirements for all MCP transactions

  - **Add "Tool Categories Overview" subsection:**

    - Provide an overview of the 12 functional categories of MCP tools:

    1. User & Authentication Management
    2. Farm Management
    3. Production Management
    4. Inventory Management
    5. Customer Management
    6. Order Management
    7. Knowledge Base
    8. BuJo Task System
    9. Device & Sensor Management
    10. Notifications & Alerts
    11. System Administration
    12. Reporting & Analytics
    13. Property Management
    14. Monitoring & Dashboard Management

    - Include brief descriptions of each category's purpose and scope

  - **Add "Tool Implementation Guidelines" subsection:**

    - Define standard practices for tool implementation in the backend
    - Outline error handling patterns specific to MCP tools
    - Describe how tools should validate input parameters
    - Explain how tools should handle permission checks
    - Detail logging and performance monitoring requirements

  - **Add "Versioning and Backward Compatibility" subsection:**

    - Describe the versioning approach for the MCP protocol
    - Outline how backward compatibility will be maintained
    - Define the process for deprecating and removing tools

  - **Line Impact:** This will add a significant section establishing the core
    MCP protocol, likely adding 100-150 lines of detailed specifications.

**Item MCPCore.2: Document Core MCP Tools in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Following the MCP Protocol Specification section from
  Item MCPCore.1.
- **Source Specifications:** `memory-bank/mcp_specification.md`
- **Detailed Edit Plan:**

  - **Add "Core MCP Tools by Category" section:**

    - For each of the 12 functional categories, document the essential tools
      with:
      - Tool name
      - Purpose
      - Required parameters
      - Response format
      - Error conditions
      - Example usage

  - **Example format for User & Authentication Management tools:**

    ````
    #### 1. User & Authentication Management

    These tools manage user accounts, authentication, and permissions within the system.

    **`register_user`**
    - **Purpose:** Register a new user in the system
    - **Parameters:**
      - `email` (string, required): User's email address
      - `name` (string, required): User's full name
      - `role` (string, optional): Initial user role [default: "client"]
    - **Response:** User object including ID and created timestamp
    - **Errors:**
      - `email_exists`: Email is already registered
      - `invalid_email`: Email format is invalid
    - **Example:**
      ```json
      {
        "action": "register_user",
        "property_id": "123e4567-e89b-12d3-a456-426614174000",
        "parameters": {
          "email": "user@example.com",
          "name": "John Doe",
          "role": "client"
        }
      }
    ````

    **`authenticate_user`** ...

    ```

    ```

  - **Document all core tools across categories:**

    - Include at least 5-7 core tools for each functional category
    - Ensure consistent formatting and detail level across all tools
    - Include property context handling for each tool where applicable
    - Note any cross-category dependencies between tools

  - **Line Impact:** This will add an extensive documentation section for MCP
    tools, likely adding 300-400 lines of detailed specifications covering all
    functional categories.

**Item MCPCore.3: Update Agent References to MCP in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** "### Agent Core & Natural Language Processing"
  section.
- **Source Specifications:** `memory-bank/mcp_specification.md`
- **Detailed Edit Plan:**

  - **Update Agent Core description:**
    - Modify to explicitly mention MCP: "...using an external n8n agent that
      communicates with the main backend exclusively through the Model Context
      Protocol (MCP)."
  - **Add to Core Functionality:**
    - "Structured MCP-based communication between agent and backend."
    - "Tool-oriented interaction model for all system functions."
    - "Property-aware context management in all agent operations."
    - "Comprehensive error handling with appropriate user feedback."
  - **Add to Tech Involved:**
    - "Custom MCP protocol for agent-backend communication."
    - "JWT authentication for secure MCP requests."
    - "Webhook endpoints for MCP tool invocation."
  - **Add to Main Requirements:**

    - "All system functionality must be accessible via MCP tools."
    - "MCP protocol must enforce proper authentication and access control."
    - "Agent must maintain consistent context across MCP interactions."
    - "MCP tools must provide clear, structured responses suitable for agent
      consumption."

  - **Line Impact:** This will add several bullet points to the existing Agent
    Core section, likely adding 15-20 lines of MCP-specific details.

**Item MCPCore.4: Add MCP Protocol Documentation to Agent Integration in
`BASES/Verding_ Agent-First Microgreens Management System.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System.md`
- **General Target Area:** "### Agent Core & Natural Language Processing"
  section.
- **Source Specifications:** `memory-bank/mcp_specification.md`
- **Detailed Edit Plan:**

  - **Enhance the Main Description:**
    - Add explicit mention of MCP: "The agent core is implemented as an external
      n8n instance that communicates with the main Verding backend exclusively
      through the Model Context Protocol (MCP), a structured tool-based protocol
      designed specifically for agent-backend interaction."
  - **Update "Tech Involved" Subsection:**
    - Add bullet points specifically related to MCP:
      - "Model Context Protocol (MCP) for structured agent-backend
        communication"
      - "JWT-based authentication for secure MCP requests"
      - "Webhook endpoints for MCP tool invocation"
  - **Update "Main Requirements" Subsection:**

    - Add bullet points related to MCP:
      - "All backend functionality must be exposed through MCP tools"
      - "MCP protocol must enforce proper authentication and access control"
      - "MCP tools must provide consistent response formats"
      - "MCP implementation must include comprehensive error handling"

  - **Line Impact:** This will add several bullet points to the existing Agent
    Core section, likely adding 12-15 lines of MCP-specific details.

### Theme: Agent Core NLP and Workflows

(Source: `memory-bank/agent_core_nlp_capabilities.md`,
`memory-bank/workflow_automation_architecture.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item AgentCore.1: Document Agent NLP Capabilities in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** "### 7. Agent Core & Natural Language Processing"
  section or similar section focusing on agent capabilities.
- **Source Specifications:** `memory-bank/agent_core_nlp_capabilities.md`,
  `memory-bank/workflow_automation_architecture.md`
- **Detailed Edit Plan:**

  - **Enhance Agent Core Introduction:**

    - Expand the introduction to describe the agent's role as the primary
      interface for system interaction through natural language
    - Detail the hybrid architecture combining Verding's backend with n8n for
      workflow automation
    - Emphasize the agent's ability to understand domain-specific terminology
      and context-aware operations

  - **Add "Natural Language Understanding Capabilities" subsection:**

    - **Intent Recognition:** Detail the agent's ability to identify user
      intents across the system's functional domains (farm management,
      inventory, customer interactions, etc.)
    - **Entity Extraction:** Describe the capability to identify and extract key
      entities from user queries:
      - Property names and identifiers
      - Crop varieties and growing parameters
      - Inventory items and quantities
      - Date ranges and timeframes
      - Customer information
      - Numerical values and units of measurement
    - **Context Management:** Explain how the agent maintains conversational
      context:
      - Session-level context retention
      - Property context persistence
      - Topic switching detection
      - Follow-up question handling
      - Reference resolution (anaphora, cataphora)
    - **Domain-Specific Language Processing:** Detail the agent's specialized
      understanding of:
      - Microgreens terminology and jargon
      - Agricultural timeframes and seasons
      - Growth stage terminology
      - Inventory management terminology
      - Order processing terminology

  - **Add "Workflow Automation Architecture" subsection:**

    - **n8n Integration:** Document how the agent leverages n8n for workflow
      automation:
      - Webhook triggers for agent-initiated workflows
      - Structured data passing between agent and workflows
      - Error handling and reporting back to the agent
      - Asynchronous operation support for long-running workflows
    - **Core Workflow Categories:** List and describe the main workflow types:
      - Conversation processing workflows
      - Memory management workflows
      - Farm operation workflows
      - Inventory management workflows
      - Customer interaction workflows
      - Reporting and analytics workflows
      - Integration workflows (external systems)
    - **Workflow Design Principles:** Document the key principles for agent
      workflow implementation:
      - Property context preservation
      - Permission boundary enforcement
      - Error handling with meaningful agent responses
      - Performance optimization for real-time interaction
      - Data validation at key processing steps
      - Audit logging for critical operations

  - **Add "Agent Response Generation" subsection:**

    - **Natural Language Generation:** Detail how the agent formulates
      responses:
      - Response templating system
      - Dynamic content insertion
      - Contextual response adaptation
      - Tone and style consistency
    - **Response Types:** Document the different types of responses the agent
      can provide:
      - Direct answers to questions
      - Confirmations of actions taken
      - Requests for clarification or additional information
      - Suggestions and recommendations
      - Error explanations and recovery options
      - Complex data presentations (formatted tables, charts, etc.)
    - **Multi-modal Responses:** Detail support for non-text responses:
      - Links to dashboard views or reports
      - Image generation/retrieval for visual explanations
      - File attachments (PDFs, CSVs, etc.)
      - Interactive UI elements (forms, buttons, etc.)

  - **Line Impact:** This will significantly expand the Agent Core & NLP section
    with detailed capabilities and architecture, likely adding 120-150 lines of
    comprehensive documentation.

**Item AgentCore.2: Update Agent Capabilities in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** "### Agent Core & Natural Language Processing"
  section under "MVP Features"
- **Source Specifications:** `memory-bank/agent_core_nlp_capabilities.md`,
  `memory-bank/workflow_automation_architecture.md`
- **Detailed Edit Plan:**

  - **Update Main Description:**

    - Enhance to explicitly describe the agent's role: "The conversational AI
      agent serves as the primary interface for system interaction, providing
      natural language understanding, workflow automation, and intelligent
      assistance across all system domains, with deep integration into the
      multi-property architecture."

  - **Update "Core Functionality" bullets:**

    - Add or enhance bullets for NLP capabilities:
      - "Comprehensive intent recognition for all system operations."
      - "Context-aware entity extraction with domain-specific knowledge."
      - "Multi-turn conversation management with context preservation."
      - "Cross-property awareness and property context switching."
      - "Domain-specific language understanding for microgreens terminology."
    - Add or enhance bullets for workflow capabilities:
      - "n8n-based workflow automation for all agent-initiated operations."
      - "Webhook-triggered workflows with structured data exchange."
      - "Asynchronous operation support for long-running processes."
      - "Error handling with meaningful user feedback."
      - "Property context preservation across all workflows."

  - **Update "Tech Involved" bullets:**

    - Add or enhance bullets:
      - "n8n for workflow automation and orchestration."
      - "PostgreSQL/Supabase for data storage and RAG vector search."
      - "JWT authentication for secure API calls."
      - "Hybrid retrieval-augmented generation for knowledge access."
      - "Context management system with property isolation."

  - **Update "Main Requirements" bullets:**

    - Add or enhance bullets:
      - "Deep understanding of domain-specific terminology and operations."
      - "Seamless multi-property context awareness and management."
      - "Reliable workflow execution with proper error handling."
      - "Consistent response generation with appropriate tone and style."
      - "High performance for real-time conversational interaction."
      - "Comprehensive audit logging for critical operations."

  - **Line Impact:** This will enhance the Agent Core & NLP section in the
    Features Analysis document, adding approximately 20-30 lines of updated
    content.

**Item AgentCore.3: Document Agent Workflow Architecture in
`BASES/Verding n8n Agent Deployment Strategy.md`**

- **Target BASES Document:** `BASES/Verding n8n Agent Deployment Strategy.md`
- **General Target Area:** Create a new section "Core Agent Workflows" if not
  present, or enhance existing workflow documentation.
- **Source Specifications:** `memory-bank/workflow_automation_architecture.md`
- **Detailed Edit Plan:**

  - **Add or Enhance "Core Agent Workflows" section:**

    - Add introduction: "The n8n agent relies on a set of core workflows that
      manage conversation processing, memory operations, and system
      integrations. These workflows form the foundation of the agent's
      capabilities and must be carefully designed for performance, reliability,
      and security."

  - **Add "Conversation Processing Workflows" subsection:**

    - **Message Intake Workflow:** Document the workflow that receives incoming
      messages:
      - Webhook endpoint configuration
      - Initial message validation and preprocessing
      - User identification and authentication
      - Property context determination
      - Message routing to appropriate processing workflows
    - **Context Management Workflow:** Detail how conversation context is
      maintained:
      - Context storage and retrieval
      - Session management
      - Property context tracking
      - Context window management
    - **Response Generation Workflow:** Describe the workflow for generating
      agent responses:
      - Content planning
      - Template selection and filling
      - Response formatting
      - Delivery channel selection

  - **Add "Memory System Workflows" subsection:**

    - **Document Ingestion Workflow:** Detail the process for adding new content
      to memory:
      - Document preprocessing
      - Chunking strategy
      - Embedding generation
      - Metadata extraction
      - Storage in database
      - Replication to Google Drive
    - **Memory Retrieval Workflow:** Describe the retrieval process:
      - Query processing
      - Embedding generation
      - Vector search execution
      - Result ranking and filtering
      - Permission checking
      - Context assembly

  - **Add "Operational Workflows" subsection:**

    - **Farm Management Workflows:** Document workflows for core farming
      operations:
      - Crop planning and scheduling
      - Growing environment monitoring
      - Harvest tracking
      - Issue reporting and resolution
    - **Inventory Workflows:** Detail inventory management processes:
      - Stock level monitoring
      - Inventory adjustment
      - Expiration tracking
      - Reorder processing
    - **Customer Interaction Workflows:** Describe customer-facing processes:
      - Order processing
      - Status updates
      - Inquiry handling
      - Feedback collection

  - **Add "Integration Workflows" subsection:**

    - **External System Integration:** Document workflows for connecting with
      external systems:
      - Home Assistant sensor data integration
      - Third-party API connections
      - Email/SMS messaging integration
      - File storage system integration
    - **Reporting Workflows:** Detail processes for generating reports:
      - Data aggregation
      - Visualization generation
      - Report delivery
      - Scheduled reporting

  - **Line Impact:** This will add a substantial section on workflow
    architecture to the n8n Agent Deployment Strategy document, likely adding
    100-120 lines of detailed workflow documentation.

### Theme: n8n Agent Deployment Strategy

(Source: `memory-bank/n8n_agent_deployment_strategy.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item n8n.1: Create Dedicated n8n Agent Deployment Section in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Create a new top-level section after all existing
  feature sections (likely around line 3950, after Messaging Platform
  Integration).
- **Source Specifications:** `memory-bank/n8n_agent_deployment_strategy.md`
- **Detailed Edit Plan:**

  - **Create New Main Section:**

    - Add a new level-3 heading: "### 14. n8n Agent Deployment Strategy"
    - Add a feature goal statement: "Define a comprehensive deployment strategy
      for the n8n agent that powers Verding's Agent Core, NLP processing, BUJO
      functionality, and Knowledge Base workflows, ensuring robust performance,
      scalability, security, and seamless integration with the main Verding
      backend."

  - **Create "1. Detailed Feature Requirements" subsection with these
    components:**

    - **Hosting Approach:** Implement using n8n.com's cloud-hosted service (n8n
      Cloud) with a dedicated Professional plan subscription, leveraging its
      automated scaling, high availability, and managed infrastructure.
    - **Scaling Strategy:** Configure the n8n instance with sufficient resources
      to handle peak loads, with monitoring to proactively scale when
      approaching 70% resource utilization. Utilize built-in automatic scaling
      for workflow executions.
    - **Backup and Recovery:** Implement a comprehensive backup strategy with
      daily automated backups of workflows and data, clear restore procedures,
      and a target Recovery Time Objective (RTO) of 4 hours.
    - **Workflow Version Control:** Use GitHub integration for version control
      of all n8n workflows, with automated exports to a dedicated repository,
      clear branching strategy, and thorough PR reviews.
    - **Security Framework:** Implement robust security measures including VPC
      isolation, encrypted credentials, access control using RBAC, secrets
      management, and secure communication with the main backend.
    - **Integration with Main System:** Establish exclusive communication with
      the main Verding backend through MCP (Model Context Protocol), with no
      direct database access and clear API contracts.
    - **Monitoring and Maintenance:** Implement comprehensive monitoring using
      n8n Cloud's native tools and third-party monitoring services, with
      alerting, regular maintenance windows, and a defined incident response
      process.

  - **Create "2. Detailed Implementation Guide" subsection with:**

    - **System Architecture Overview:** Describe the overall architecture,
      showing the n8n agent as an external component communicating with the main
      backend via MCP, with no direct database access except to the dedicated
      memory system in Supabase.
    - **n8n Cloud Configuration:** Detail the specific configuration for the n8n
      Cloud instance, including resource allocation, networking setup, and
      feature enablement.
    - **Workflow Organization:** Outline the high-level organization of
      workflows within n8n, including:
      - Core Agent Workflows (message processing, context management)
      - BUJO Management Workflows
      - Knowledge Base Workflows
      - Messaging Platform Integration Workflows (Telegram, WhatsApp)
      - Utility and Helper Workflows
    - **Deployment Pipeline:** Describe the automated deployment process for
      workflows, including:
      - Development environments (local n8n instances)
      - Staging environment for testing
      - Production deployment process
      - Rollback procedures
    - **Monitoring Implementation:** Detail the specific monitoring tools and
      metrics to track:
      - Workflow execution metrics
      - Error rates and types
      - Response times
      - Resource utilization
      - Custom business metrics

  - **Create "3. Integration Points" subsection detailing how the n8n agent
    integrates with:**

    - **Main Backend (via MCP):** The exclusive communication channel, with
      authenticated API endpoints for MCP tool invocation.
    - **Memory System (Supabase):** Direct access to the memory database for
      efficient RAG operations, conversation history, and document management.
    - **External Messaging Platforms:** Integration with Telegram and WhatsApp
      through their respective APIs, with proper webhook configuration and
      message handling.
    - **Monitoring Systems:** Integration with CloudWatch, Datadog, or similar
      services for comprehensive monitoring and alerting.
    - **Version Control (GitHub):** Integration for automated workflow exports,
      version tracking, and collaboration.

  - **Create "4. Deployment Checklist" subsection outlining key deployment
    steps:**

    - **Pre-deployment Validation:**
      - Workflow testing in staging environment
      - Performance and load testing
      - Security assessment
      - Integration testing with main backend
    - **Deployment Process:**
      - n8n Cloud instance provisioning
      - Initial configuration and security setup
      - Workflow import
      - Credential configuration
      - Integration activation
    - **Post-deployment Verification:**
      - Connectivity testing
      - End-to-end functional testing
      - Monitoring configuration verification
      - Backup system validation

  - **Line Impact:** This will add a significant new section to the document,
    likely adding 150-200+ lines covering the comprehensive n8n agent deployment
    strategy.

**Item n8n.2: Update Agent Infrastructure References in
`BASES/Verding Features Analysis.md`**

- **Target BASES Document:** `BASES/Verding Features Analysis.md`
- **General Target Area:** Add or update references to n8n agent deployment in
  the "Agent Core & Natural Language Processing" section and potentially add a
  dedicated "System Infrastructure & Deployment" section if not already present.
- **Source Specifications:** `memory-bank/n8n_agent_deployment_strategy.md`
- **Detailed Edit Plan:**

  - **Update "### Agent Core & Natural Language Processing" section:**

    - **Add to Tech Involved:**
      - "n8n Cloud (Professional plan) for hosting the agent workflows"
      - "GitHub integration for workflow version control"
      - "Monitoring tools for workflow health and performance"
    - **Add to Main Requirements:**
      - "Reliable n8n Cloud deployment with high availability (99.9%+ uptime)"
      - "Comprehensive backup and recovery procedures with 4-hour RTO"
      - "Secure integration with the main backend exclusively through MCP"
      - "Robust monitoring and alerting for workflow health"

  - **Add a new "### System Infrastructure & Deployment" section (if not
    present):**

    - **Description:** "Comprehensive infrastructure and deployment strategy
      ensuring reliable, scalable, and secure operation of both the main backend
      and the n8n agent."
    - **Core Functionality:**
      - "Railway-based deployment for the main backend with GitHub integration"
      - "n8n Cloud hosting for the agent with automatic scaling"
      - "Supabase for database services (main application and agent memory)"
      - "Comprehensive backup and recovery procedures"
      - "Robust monitoring and alerting across all system components"
    - **Tech Involved:**
      - "Railway for main backend hosting"
      - "n8n Cloud (Professional plan) for agent hosting"
      - "GitHub for version control and deployment automation"
      - "Supabase (PostgreSQL) for database services"
      - "Monitoring tools (CloudWatch, Datadog, or similar)"
    - **Main Requirements:**
      - "99.9%+ system uptime across all components"
      - "4-hour Recovery Time Objective (RTO) for critical components"
      - "Secure communication between system components"
      - "Comprehensive monitoring and alerting"
      - "Automated scaling to handle variable load"

  - **Line Impact:** This will add several bullet points to the existing Agent
    Core section and potentially a new section on System Infrastructure &
    Deployment, adding approximately 30-50 lines.

### Theme: Missing Specifications

(Source: `memory-bank/missing_specifications.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item Missing.1: Add MCP Tools to BASES Features Mapping in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Create a new appendix section at the end of the
  document or add to the MCP section.
- **Source Specifications:** `memory-bank/missing_specifications.md`
- **Detailed Edit Plan:**

  - **Create a New Appendix or Section:**

    - Add a heading like "#### MCP Tools to Features Mapping" or create an
      appendix section
    - Add an introduction: "This mapping provides a reference between MCP tools
      and the specific Verding features they support. Each MCP tool category
      aligns with one or more feature areas, implementing the specific
      capabilities described in this document."

  - **Add Structured Mapping Table:**

    - Create a table or structured list showing:
      - MCP Tool Category (e.g., "Farm Management Tools")
      - Associated Feature Section(s) (e.g., "3. Farm Management")
      - Key Capabilities Implemented (brief summary of what these tools enable)
    - Include all major MCP tool categories from the MCP specification
    - Ensure each category is linked to relevant feature section(s)

  - **Add Cross-referencing Guidance:**

    - Explain how developers should reference this mapping
    - Note that tool documentation in the MCP specification should reference the
      feature sections they implement
    - Feature sections should reference the specific MCP tools used to implement
      them

  - **Line Impact:** This will add a structured reference section, likely adding
    40-60 lines documenting the MCP tools to features mapping.

**Item Missing.2: Add Notification System Integration in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Create a new section after "Messaging Platform
  Integration" or in an appropriate location, or enhance existing
  notification-related content.
- **Source Specifications:** `memory-bank/missing_specifications.md`
- **Detailed Edit Plan:**

  - **Create New Section or Enhance Existing Content:**

    - Add a new level-3 heading: "### Notification System"
    - Add a feature goal statement: "Implement a comprehensive notification
      system enabling timely alerts, updates, and information delivery to users
      across multiple channels, with support for customization, priorities, and
      property-specific notifications."

  - **Add "1. Detailed Feature Requirements" subsection with:**

    - **Multi-channel Support:** Describe support for push notifications, in-app
      alerts, email notifications, SMS (where critical), and messaging platform
      integration.
    - **Notification Categories:** Detail the categories including system
      alerts, property status updates, task reminders, user action
      notifications, and important events.
    - **Priority Levels:** Define critical (immediate attention), important
      (timely attention), and informational (awareness) priority levels.
    - **Property-specific Notifications:** Explain how notifications are scoped
      to specific properties, with multi-property administrators receiving
      consolidated notifications.
    - **Customization Options:** Detail how users can customize notification
      preferences by channel, category, and property.

  - **Add "2. Notification Delivery Architecture" subsection with:**

    - **Notification Service:** Describe the central notification service
      responsible for message formatting, prioritization, and delivery.
    - **Delivery Gateways:** Detail the various delivery mechanisms and
      integrations (email service, push notification service, SMS gateway,
      etc.).
    - **Notification Database:** Explain the persistent storage of notifications
      with read/unread status, expiration, and action tracking.

  - **Add "3. Notification Types and Templates" subsection with:**

    - **System Notifications:** System updates, maintenance windows, and
      critical alerts.
    - **Farm Management Notifications:** Sensor alerts, task completions,
      scheduled operations.
    - **Inventory Notifications:** Stock levels, expiration warnings, reorder
      alerts.
    - **Customer-related Notifications:** Order status changes, payment
      confirmations, customer inquiries.
    - **User Collaboration Notifications:** Mentions, assignments, shared
      resources.

  - **Add "4. Implementation Details" subsection with:**

    - **Notification Queue:** Describe the queue-based processing system for
      reliable notification delivery.
    - **Template Engine:** Explain the dynamic template system for consistent
      notification formatting.
    - **Retry Mechanism:** Detail the approach for handling delivery failures
      and retries.
    - **Notification History:** Describe how notification history is maintained
      and searchable.

  - **Line Impact:** This will add a comprehensive new section, likely adding
    80-100 lines documenting the notification system.

**Item Missing.3: Add User Hierarchy and Role-Based Permissions in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Enhance the existing user management or
  authentication section, or add a new section if not adequately covered.
- **Source Specifications:** `memory-bank/missing_specifications.md`
- **Detailed Edit Plan:**

  - **Update or Create User Management Section:**

    - If not already present, add a clear section on "User Hierarchy and
      Role-Based Permissions"
    - Add an introduction explaining the importance of granular permissions in a
      multi-property system

  - **Add "1. User Role Hierarchy" subsection detailing:**

    - **System Administrator:** Global access and configuration privileges
      across all properties
    - **Property Owner:** Full management rights for specific properties
    - **Property Manager:** Operational management rights for specific
      properties
    - **Team Leader:** Specialized area management within a property (e.g.,
      Production, Sales)
    - **Regular User:** Basic operational access based on assigned duties
    - **Guest/Viewer:** Read-only access to specific areas
    - **Customer Account:** External customer-specific access

  - **Add "2. Permission Categories" subsection with:**

    - **Property Access:** Controls which properties a user can access and at
      what level
    - **Feature Access:** Controls which system features/modules a user can use
    - **Data Access:** Controls what data a user can view/edit within accessible
      features
    - **Administrative Actions:** Controls what system configurations a user can
      modify
    - **Integrations Access:** Controls which external integrations a user can
      configure/use

  - **Add "3. Permission Implementation" subsection detailing:**

    - **Role Templates:** Pre-configured permission sets for common roles
    - **Custom Role Definition:** Process for creating custom roles with
      specific permissions
    - **Permission Inheritance:** How permissions cascade within the property
      hierarchy
    - **Permission Conflicts:** Resolution strategies for conflicting
      permissions
    - **Temporary Access:** Mechanism for granting time-limited access
      elevations

  - **Add "4. Permission Management Interface" subsection outlining:**

    - **User Administration Dashboard:** Interface for managing users and their
      roles
    - **Role Configuration:** Tools for defining and modifying role templates
    - **Permission Audit:** Capabilities for reviewing and auditing permission
      assignments
    - **Bulk Operations:** Tools for managing permissions across multiple
      users/properties

  - **Line Impact:** This will significantly enhance the user management
    section, adding approximately 80-100 lines of detailed specifications.

**Item Missing.4: Add User-Friendly Bug Reporting System in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Add to "Error Handling and Recovery Procedures"
  section or create a new subsection.
- **Source Specifications:** `memory-bank/missing_specifications.md`
- **Detailed Edit Plan:**

  - **Create New Subsection in Error Handling:**

    - Add a heading like "#### User-Friendly Bug Reporting System"
    - Add an introduction explaining the importance of user-driven bug reporting

  - **Add "1. In-App Bug Reporting Interface" detailing:**

    - **Accessibility:** One-click access to bug reporting from any screen
    - **Screenshot Capture:** Automatic capture of current screen state
    - **System State Collection:** Automatic collection of relevant system state
    - **User Description:** Simple form for users to describe what happened
    - **Reproduction Steps:** Interface for capturing steps to reproduce
    - **Severity Classification:** User-friendly options for indicating impact

  - **Add "2. Bug Report Processing" outlining:**

    - **Initial Triage:** Automatic categorization and prioritization
    - **Duplicate Detection:** System for identifying similar reported issues
    - **Developer Assignment:** Routing to appropriate development team
    - **Status Tracking:** Mechanism for tracking resolution progress
    - **User Communication:** Automated updates to reporting users

  - **Add "3. Integration with Development Workflow" describing:**

    - **GitHub Issues Integration:** Automatic creation of GitHub issues
    - **CI/CD Integration:** Links to relevant builds and deployments
    - **Test Case Generation:** Creation of regression tests from reports
    - **Resolution Verification:** Process for confirming bug fixes

  - **Add "4. User Feedback Loop" detailing:**

    - **Status Notifications:** Updates to users when bugs are fixed
    - **Version Notifications:** Information about when fixes will be deployed
    - **Verification Requests:** Asking users to confirm if issues are resolved
    - **Recognition System:** Acknowledging valuable user contributions

  - **Line Impact:** This will add a comprehensive subsection, adding
    approximately 60-80 lines detailing the bug reporting system.

**Item Missing.5: Add MCP Installation Guide in
`BASES/Verding MCP Implementation Guide.md`**

- **Target BASES Document:** `BASES/Verding MCP Implementation Guide.md`
- **General Target Area:** Beginning of the document, as a foundation for
  further MCP development.
- **Source Specifications:** `memory-bank/missing_specifications.md`
- **Detailed Edit Plan:**

  - **Create New Section:**

    - Add a heading like "## MCP Installation and Setup"
    - Add an introduction explaining the purpose of this section

  - **Add "1. Prerequisites" subsection listing:**

    - **Node.js Requirements:** Specify version requirements (e.g., Node.js
      v16+)
    - **Package Manager:** Instructions for npm or yarn setup
    - **Database Requirements:** PostgreSQL/Supabase setup requirements
    - **External Service Accounts:** Required API keys and services
    - **Development Tools:** Recommended IDE and extensions

  - **Add "2. Installation Steps" subsection with detailed instructions:**

    - **Clone Repository:** Git clone command and repository URL
    - **Install Dependencies:** npm/yarn commands with specific versions
    - **Environment Setup:** Creating and configuring .env file
    - **Database Initialization:** Commands for initializing the database
    - **Initial Configuration:** Setting up base configuration

  - **Add "3. Configuration Options" subsection detailing:**

    - **Server Configuration:** Port, host, and runtime settings
    - **Authentication Setup:** JWT configuration and auth providers
    - **Database Connection:** Connection string and pool settings
    - **Logging Configuration:** Log levels, formats, and storage
    - **Performance Tuning:** Cache settings, timeouts, and limits

  - **Add "4. Verification and Testing" subsection with:**

    - **Health Check:** Commands to verify successful installation
    - **Test Endpoints:** Basic API calls to test functionality
    - **Test Suite:** Running the integration test suite
    - **Common Issues:** Troubleshooting guide for installation problems
    - **Performance Validation:** Confirming acceptable performance

  - **Add "5. Development Environment Setup" subsection outlining:**

    - **Local Development:** Setting up for local development
    - **Hot Reloading:** Configuring for development efficiency
    - **Debug Configuration:** Setting up debugging tools
    - **Test Data:** Creating and using test datasets
    - **Development Workflows:** Recommended development practices

  - **Line Impact:** This will add a comprehensive installation guide, adding
    approximately 100-120 lines of detailed instructions.

### Theme: User Interface Component Library

(Source: `memory-bank/ui_component_library.md`,
`memory-bank/ui_component_standard.md`)

**Important: When implementing edits for this theme, you MUST directly access
and modify the original BASES files specified in each item. Always read the
current content before making changes to ensure seamless integration with
existing text.**

**Item UIComponents.1: Add Component Library Framework to
`BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- **General Target Area:** Create a new section toward the end of the document
  after existing UI styling sections.
- **Source Specifications:** `memory-bank/ui_component_library.md`,
  `memory-bank/ui_component_standard.md`
- **Detailed Edit Plan:**

  - **Create New Main Section:**

    - Add a new heading: "## Component Library Framework"
    - Add an introduction: "Verding implements a comprehensive component library
      to ensure consistency, accessibility, and development efficiency across
      the application. This framework establishes patterns for component
      creation, documentation, and usage that should be followed for all UI
      elements."

  - **Add "### Component Architecture" subsection:**

    - **Base Components:**

      - Detail the foundational atomic components that serve as building blocks
        (buttons, inputs, cards, etc.)
      - Explain how they encapsulate core styling, behavior, and accessibility
        features
      - Define the component hierarchy and inheritance patterns

    - **Composite Components:**

      - Describe how larger components are assembled from base components
      - Explain composability patterns and prop forwarding
      - Document layout and spacing conventions between nested components

    - **Pattern Components:**

      - Detail reusable interaction patterns (forms, tables, dialogs, etc.)
      - Explain state management within complex components
      - Document event handling and callback patterns

    - **Page Templates:**
      - Define standard page layouts and structures
      - Document content area organization and responsive behavior
      - Explain navigation integration within templates

  - **Add "### Component Documentation Standard" subsection:**

    - **Documentation Structure:**

      - Define required documentation sections for each component
      - Establish consistent format for props, methods, and events
      - Detail example code format and standards

    - **Visual Documentation:**

      - Specify requirements for component previews
      - Define states that must be visually represented
      - Establish standards for interactive examples

    - **Accessibility Documentation:**

      - Detail accessibility features and ARIA attribute usage
      - Document keyboard navigation support
      - Specify screen reader behavior expectations

    - **Implementation Notes:**
      - Define format for technical implementation details
      - Establish standards for performance considerations
      - Document browser compatibility information

  - **Add "### Component Development Process" subsection:**

    - **Development Workflow:**

      - Define the process for proposing new components
      - Document development and review procedures
      - Establish testing requirements and coverage expectations

    - **Component Versioning:**

      - Explain semantic versioning for components
      - Define backward compatibility requirements
      - Document deprecation process and timeline expectations

    - **Quality Assurance:**
      - Detail visual testing requirements
      - Establish accessibility testing procedures
      - Define performance benchmark expectations

  - **Line Impact:** This will add a comprehensive new section, likely adding
    100-120 lines documenting the component library framework.

**Item UIComponents.2: Document Core Component Specifications in
`BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- **General Target Area:** Following the Component Library Framework section.
- **Source Specifications:** `memory-bank/ui_component_library.md`,
  `memory-bank/ui_component_standard.md`
- **Detailed Edit Plan:**

  - **Add "### Core Component Specifications" section:**

    - Add introduction: "The following core components form the foundation of
      the Verding UI. Each component is documented with its visual
      specifications, behavioral characteristics, and implementation
      guidelines."

  - **Add "#### Button Components" subsection:**

    - **Primary Button:**

      - Visual specifications (size, padding, color, border-radius, typography)
      - States (default, hover, active, focus, disabled)
      - Variants (solid, outline, text-only)
      - Implementation guidelines and prop structure
      - Accessibility requirements

    - **Secondary Button:**

      - Visual differentiation from primary buttons
      - States and behavior consistency
      - Usage guidelines and context

    - **Icon Button:**

      - Size and spacing specifications
      - Icon guidelines and constraints
      - Tooltip requirements
      - Touch target considerations

    - **Button Group:**
      - Spacing and alignment between buttons
      - Visual treatment for connected buttons
      - Selection indicators for toggle groups

  - **Add "#### Input Components" subsection:**

    - **Text Input:**

      - Visual specifications (size, padding, border, typography)
      - States (default, focus, filled, error, disabled)
      - Label placement and behavior
      - Help text and error message styling
      - Validation indicators

    - **Select Input:**

      - Dropdown styling and behavior
      - Option list styling
      - Multiple selection handling
      - Search functionality within selects

    - **Checkbox and Radio:**

      - Visual specifications for both components
      - States and animations
      - Grouping behavior and layout
      - Label positioning and alignment

    - **Date and Time Inputs:**
      - Calendar picker styling
      - Time selection interface
      - Range selection behavior
      - Format consistency

  - **Add "#### Layout Components" subsection:**

    - **Card:**

      - Visual specifications (padding, shadow, border-radius)
      - Header, body, and footer areas
      - Interactive card variations
      - Nesting guidelines

    - **Table:**

      - Header and cell styling
      - Row states (selected, hover, alternate)
      - Sorting indicators
      - Pagination controls
      - Responsive behavior

    - **Tabs:**

      - Tab styling and positioning options
      - Active state indicators
      - Content area specifications
      - Responsive behavior

    - **Accordion:**
      - Header styling and icon animation
      - Expanded/collapsed states
      - Nested accordion handling
      - Accessibility requirements

  - **Add "#### Feedback Components" subsection:**

    - **Alert/Notification:**

      - Severity levels and color coding
      - Icon usage and positioning
      - Dismissible behavior
      - Action link styling

    - **Toast:**

      - Positioning and stacking
      - Duration guidelines
      - Animation specifications
      - Interaction behavior

    - **Progress Indicators:**

      - Linear and circular progress styling
      - Determinate vs. indeterminate states
      - Percentage and step indicators
      - Color usage for different states

    - **Skeleton Loading:**
      - Visual specifications for loading states
      - Animation properties
      - Implementation guidelines for different content types

  - **Line Impact:** This will add a comprehensive set of core component
    specifications, likely adding 150-200 lines of detailed documentation.

**Item UIComponents.3: Add Component Implementation in
`BASES/Verding Feature Specifications.md`**

- **Target BASES Document:** `BASES/Verding Feature Specifications.md`
- **General Target Area:** Under the GUI Implementation section.
- **Source Specifications:** `memory-bank/ui_component_library.md`
- **Detailed Edit Plan:**

  - **Add or Update GUI Implementation Section:**

    - Add a subsection: "#### Component Library Implementation"
    - Add introduction: "The Verding GUI is built on a comprehensive component
      library implementing the design system defined in the UX/UI Style Guide.
      This modular approach ensures consistency, accessibility, and development
      efficiency."

    - **Add "Technical Stack" details:**

      - React as the primary framework
      - TypeScript for type safety
      - Styled Components for styling
      - Storybook for component documentation and testing
      - Jest and React Testing Library for automated testing
      - Accessibility testing tools integration

    - **Add "Component Library Architecture" details:**

      - File and folder structure
      - Import/export patterns
      - Global style integration
      - Theme implementation
      - Build and bundle configuration

    - **Add "Development Workflow" details:**

      - Component-driven development approach
      - Testing requirements and coverage expectations
      - Review and approval process
      - Documentation requirements
      - Versioning and changelog management

    - **Add "Integration with Backend" details:**
      - Data fetching patterns
      - Error handling approach
      - Loading state management
      - Form submission and validation
      - Real-time updates handling

  - **Line Impact:** This will add approximately 50-70 lines to the GUI
    Implementation section, detailing the component library implementation
    approach.

**Item UIComponents.4: Update Style Guide Introduction with Component Library in
`BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`**

- **Target BASES Document:**
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- **General Target Area:** The introduction or overview section at the beginning
  of the document.
- **Source Specifications:** `memory-bank/ui_component_library.md`,
  `memory-bank/ui_component_standard.md`
- **Detailed Edit Plan:**

  - **Update Introduction Section:**

    - Add or enhance paragraph about the component library: "This style guide
      serves as the foundation for the Verding Component Library, a
      comprehensive collection of reusable UI elements that implement these
      design standards. The component library ensures consistency across the
      application while accelerating development through standardized,
      accessible, and thoroughly tested UI building blocks."

    - Add component library goals:

      - "Implement design system specifications with pixel-perfect accuracy"
      - "Ensure accessibility compliance across all interactive elements"
      - "Accelerate development through reusable, well-documented components"
      - "Maintain visual and behavioral consistency throughout the application"
      - "Provide a single source of truth for UI implementation"

    - Add relationship to design system:
      - How the component library translates design tokens into code
      - Version synchronization between design system and component library
      - Designer-developer collaboration workflow
      - How design updates propagate to the component library

  - **Line Impact:** This will add approximately 15-25 lines to the introduction
    section, establishing the component library's role within the style guide.

**(Further items for this theme will be added here following the methodology)**
