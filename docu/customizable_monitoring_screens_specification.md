# Customizable Monitoring Screens Specification

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## 1. Overview

This document details the specification for the customizable monitoring screens
within the Verding system. These screens will provide users with a comprehensive
and adaptable view of their microgreens operations and sensor data, fully
supporting the multi-property architecture. The goal is to empower users with
the ability to tailor their monitoring dashboards to their specific needs,
enhancing operational awareness and decision-making.

This specification builds upon insights gathered from:

- `BASES/Verding Feature Specifications.md` (specifically Sensor Integration and
  Operations Management sections)
- `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
- `BASES/Verding_ Agent-First Microgreens Management System.md`
- `memory-bank/multi_property_architecture.md`
- `memory-bank/memory_system_access_control_implementation.md`

## 2. Core Concepts & Requirements

### 2.1. Property Context Selector

- **Requirement:** A prominent and easily accessible UI element (e.g., dropdown,
  segmented control) must be present on all monitoring screens.
- **Functionality:** Allows users to select the specific property they wish to
  view data for.
- **Behavior:** Upon selection, all data displayed on the current monitoring
  screen (dashboards, widgets, reports) must dynamically filter to show only
  information relevant to the selected `property_id`.
- **Permissions:** The selector should only list properties for which the
  currently authenticated user has at least view permissions, as defined in
  `memory-bank/memory_system_access_control_implementation.md`.

### 2.2. Customizable Dashboards

- **Requirement:** Users must be able to create, save, and manage multiple
  dashboard views.
- **Functionality:**
  - Create new dashboards from scratch or by duplicating existing ones.
  - Add, remove, resize, and rearrange widgets on a dashboard.
  - Name and rename dashboards.
  - Set a default dashboard to load upon accessing the monitoring section.
- **Storage:** Dashboard configurations (layout, widgets, widget settings) will
  be stored in the database, associated with the user's profile. Consideration
  should be given to allowing property-specific default dashboards or shared
  dashboard templates.

### 2.3. Widget Library

- **Requirement:** A library of pre-built, configurable widgets must be
  available for users to add to their dashboards.
- **Initial Widget Categories & Types:**

  #### 2.3.1. Sensor Data Widgets

  - **Real-time Reading Widget:**
    - Displays the latest reading for a selected sensor (e.g., temperature,
      humidity, pH).
    - Customizable thresholds with visual indicators (e.g., color changes,
      icons) for normal, warning, and critical ranges.
    - Shows sensor name, location, and last update time.
  - **Historical Trend Chart Widget:**
    - Displays a line chart of a selected sensor's readings over a configurable
      time period (e.g., last hour, 24 hours, 7 days, custom range).
    - Ability to plot multiple sensors on the same chart for comparison.
    - Interactive elements: hover to see specific values, zoom/pan.
  - **Sensor Status Overview Widget:**
    - Lists multiple selected sensors and their current status (online, offline,
      last reading, any active alerts).

  #### 2.3.2. Operational Performance Widgets

  - **Key Performance Indicator (KPI) Widget:**
    - Displays a single, prominent KPI value (e.g., average yield per tray,
      germination rate for current batches, water usage).
    - Customizable target value and visual indication of performance against
      target.
  - **Sowing Performance Widget:**
    - Summary of active/upcoming sowing plans for the selected property.
    - Number of trays sown vs. planned.
    - Germination success rates for recent batches.
  - **Harvest Performance Widget:**
    - Summary of upcoming/completed harvests for the selected property.
    - Actual yield vs. expected yield for recent harvests.
    - Average days to harvest for specific products.
  - **Growth Cycle Overview Widget:**
    - Visual representation of active batches for a specific product, showing
      their current growth stage and estimated days to harvest.

  #### 2.3.3. Task Management Widgets

  - **Upcoming Tasks Widget:**
    - Lists tasks due today or in a configurable upcoming period (e.g., next 3
      days) for the selected property.
    - Filterable by task type (sowing, harvesting, maintenance, etc.) or
      priority.
  - **Overdue Tasks Widget:**
    - Highlights tasks that are past their due date for the selected property.
  - **Task Completion Rate Widget:**
    - Shows the percentage of tasks completed on time over a selected period for
      the selected property.

  #### 2.3.4. Inventory Widgets

  - **Low Stock Alert Widget:**
    - Lists inventory items (seeds, mediums, packaging) that are below
      predefined low-stock thresholds for the selected property.
  - **Current Inventory Levels Widget:**
    - Displays current quantities for selected inventory items.

  #### 2.3.5. Compliance Widgets

  - **Compliance Record Summary Widget:**
    - Shows a count of generated compliance records (e.g., temperature logs) for
      the selected property over a specific period.
    - Quick link to the compliance reporting section.
  - **Upcoming Compliance Tasks Widget:**
    - Lists any scheduled tasks related to compliance (e.g., sensor calibration,
      audit preparation).

### 2.4. Configurable Widgets

- **Requirement:** Each widget instance added to a dashboard must be
  individually configurable.
- **Functionality:**
  - **Data Source Selection:** Users can select specific sensors, task
    categories, inventory items, KPI metrics, etc., that the widget should
    display data for. Data sources will be filtered by the selected property
    context.
  - **Time Range:** For widgets displaying historical data, users can select
    predefined (e.g., "Last 24 hours", "Last 7 days") or custom time ranges.
  - **Thresholds & Alerts:** Users can define custom warning and critical
    thresholds for sensor readings or KPI values within a widget.
  - **Visual Customization:** Options to select chart types (line, bar, gauge,
    pie), color schemes (adhering to the UI/UX Style Guide), and display units.
  - **Naming & Titling:** Users can provide custom names or titles for each
    widget instance on their dashboard.
  - **Filtering:** Apply specific filters within the widget (e.g., filter tasks
    by assignee within a task widget).

### 2.5. Drill-Down Capability

- **Requirement:** Widgets should provide a way for users to access more
  detailed information.
- **Functionality:** Clicking on a data point, a summary statistic, or a list
  item within a widget should navigate the user to a relevant detailed view.
  - Example: Clicking a sensor on a "Sensor Status Overview" widget navigates to
    the detailed historical chart page for that sensor.
  - Example: Clicking an overdue task in the "Overdue Tasks Widget" opens the
    full task details view.

### 2.6. Real-Time Updates

- **Requirement:** Data displayed on dashboards and widgets should reflect the
  latest system state with minimal delay.
- **Functionality:** Implement mechanisms (e.g., WebSockets, server-sent events,
  periodic polling with appropriate intervals) to ensure data is refreshed
  automatically.
- **Visual Feedback:** Provide subtle visual cues when data is updating or has
  just been updated.

### 2.7. Alerts and Notifications Integration

- **Requirement:** The monitoring dashboards should integrate with the system's
  overall alert and notification capabilities.
- **Functionality:**
  - A dedicated area on the dashboard (e.g., a header bar, a specific "Alerts
    Widget") to display active, critical alerts relevant to the selected
    property.
  - Alerts should be visually distinct and actionable (e.g., allowing users to
    acknowledge or navigate to the source of the alert).
  - This complements, rather than replaces, notifications sent via other
    channels (Telegram, email).

### 2.8. Historical Data Access and Reporting

- **Requirement:** Beyond dashboard widgets, users need access to detailed
  historical data and the ability to generate reports.
- **Functionality:**
  - A dedicated section or views for in-depth analysis of historical sensor
    data, operational metrics, etc., for the selected property.
  - Ability to select custom date ranges, data sources, and generate reports in
    printable or exportable formats (e.g., PDF, CSV).
  - This should align with and expand upon the "Compliance Record Generation"
    feature.

## 3. UI/UX Considerations

- Adherence to
  `BASES/Verding_ Agent-First Microgreens Management System - UX_UI Style Guide.md`
  for all visual elements, typography, colors, and component styling.
- **Clarity and Readability:** Dashboards should present information in a clear,
  uncluttered, and easily understandable manner.
- **Responsiveness:** Dashboards and widgets must be responsive and adapt to
  different screen sizes (web and mobile).
- **Performance:** Dashboards should load quickly, and interactions (filtering,
  drill-down) should be smooth.
- **Intuitive Configuration:** The process for creating dashboards and
  configuring widgets should be user-friendly and intuitive. Drag-and-drop
  interfaces for widget arrangement are recommended.

## 4. Integration with Multi-Property Architecture

- **Data Isolation:** All data presented is strictly filtered by the selected
  `property_id` from the Property Context Selector.
- **Permission Enforcement:** Access to view specific data or configure certain
  widgets will be governed by the user's role and permissions within the
  selected property, as per
  `memory-bank/memory_system_access_control_implementation.md`.
- **Resource Selection:** When configuring widgets (e.g., selecting sensors,
  tasks, inventory items), the list of available resources must be filtered
  based on the currently active `property_id` and the user's access rights to
  those resources within that property.
- **Cross-Property Views (Future Consideration):** While the primary mode is
  property-specific, future iterations might consider "aggregate" views for
  users with access to multiple properties, but this is out of scope for the
  initial implementation.

## 5. Technical Considerations

### 5.1. Frontend

- **Technology:** React for web, React Native (Expo) for mobile, as per existing
  specifications.
- **State Management:** Appropriate state management solution (e.g., React
  Context, Redux, Zustand) to handle dashboard layouts, widget configurations,
  and real-time data updates.
- **Charting Libraries:** Select a suitable charting library that supports
  various chart types, interactivity, and customization (e.g., Recharts,
  Chart.js, Nivo).
- **Drag-and-Drop:** Implement or use a library for drag-and-drop functionality
  for widget arrangement (e.g., React DnD, react-grid-layout).

### 5.2. Backend

- **API Endpoints:**
  - Endpoints to fetch data required for each widget type, filterable by
    `property_id`, time ranges, and other widget-specific parameters.
  - Endpoints to save and retrieve user-defined dashboard layouts and widget
    configurations.
  - Endpoints to manage alerts related to monitored data.
- **Database:**
  - Schema extensions if needed to store dashboard configurations.
  - Optimized queries for fetching monitoring data, considering performance with
    time-series data and joins across multiple tables.
- **Real-time Communication:**
  - Investigate WebSockets or Server-Sent Events for pushing real-time updates
    to the frontend.

### 5.3. Data Flow Example (Sensor Widget)

1. User selects a property from the Property Context Selector.
2. User adds a "Real-time Sensor Reading" widget to their dashboard.
3. User configures the widget:
   - Selects a specific sensor (e.g., "Greenhouse 1 Temperature Sensor") from a
     list of sensors available for the selected property.
   - Sets warning/critical thresholds.
4. Frontend saves widget configuration (associated with user and dashboard).
5. On dashboard load (or widget addition):
   - Frontend requests data for the widget from the backend, passing
     `property_id`, `sensor_id`, and any other relevant parameters.
   - Backend queries the `sensor_readings` table (and `sensors` table for
     metadata), filtered by `property_id` and `sensor_id`, returning the latest
     reading.
   - Frontend displays the reading, applying visual styling based on thresholds.
6. Real-time updates are pushed from the backend or polled by the frontend for
   this sensor and property, updating the widget display.

## 6. Future Enhancements

- Sharing dashboards between users within the same property (with appropriate
  permissions).
- Predefined dashboard templates based on user roles or common use cases.
- AI-powered insights and anomaly detection directly integrated into widgets.
- Export/import dashboard configurations.
- Widget support for data from external integrations.
- "Global" dashboard view for users managing multiple properties, showing
  aggregated KPIs or comparisons (requires careful permission handling).
- Natural language queries for dashboard data via the Agent Core (e.g., "Show me
  the temperature trends for Farm A on my main dashboard").

This specification aims to provide a solid foundation for developing a powerful
and user-centric monitoring system within Verding.
