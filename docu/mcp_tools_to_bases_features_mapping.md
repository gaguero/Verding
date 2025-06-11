# MCP Tools to BASES Features Mapping

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

This document provides a comprehensive mapping between the MCP tools defined in
our specification and the features described in the BASES files. It ensures that
ALL functionality available through the web/mobile UI is accessible through the
agent interface via MCP tools.

## Structure

Each section follows a consistent format:

```
### BASES Feature: [Feature Name]
**File:** [BASES File Path]
**Section:** [Section in File]

**Description:** Brief description of the feature from BASES

**Mapped MCP Tools:**
1. `tool_name` - Short description of how this tool supports the feature
2. `another_tool` - Short description of how this tool supports the feature

**Gaps/Issues:**
- Any identified gaps or inconsistencies between the feature and MCP tools
- Any missing MCP tools required for this feature

**Dependencies:**
- Related features or dependencies this feature relies on
```

## Mapping by Functional Area

### 1. User Management & Authentication

#### BASES Feature: User Profile Creation

**File:** BASES/Verding Feature Specifications.md **Section:** Progressive Setup
& Onboarding - User Profile Creation

**Description:** Collection and management of user profile information including
basic user details, authentication credentials, business information, and
preferences.

**Mapped MCP Tools:**

1. `authenticate_user` - Handles user authentication and session token
   generation
2. `register_user` - Manages user registration process and account creation
3. `get_user_profile` - Retrieves detailed user profile information
4. `update_user_profile` - Updates user profile information including
   preferences

**Gaps/Issues:**

- No specific MCP tool for handling company-specific details separately from
  user profile
- May need additional tools for handling specialized preferences like unit
  settings

**Dependencies:**

- Authentication features must be implemented before most other system
  interactions

#### BASES Feature: Billing Plan Management

**File:** BASES/Verding Feature Specifications.md **Section:** Progressive Setup
& Onboarding - Billing Plan Management

**Description:** Management of subscription tiers, processing plan selection,
handling payment information, and tracking subscription status.

**Mapped MCP Tools:**

- No direct MCP tools identified for billing management

**Gaps/Issues:**

- Need to add MCP tools for subscription management:
  - `get_subscription_plans` - List available subscription plans
  - `create_subscription` - Create a new subscription
  - `update_subscription` - Modify an existing subscription
  - `get_subscription_status` - Check current subscription status
  - `cancel_subscription` - Cancel an active subscription

**Dependencies:**

- User authentication and profile creation

### 2. Farm Management

#### BASES Feature: Crop Type Management

**File:** BASES/Verding Feature Specifications.md **Section:** Crop Types and
Growing Parameters

**Description:** Management of crop types with their growing parameters,
including growth stages, seed density, harvest yield, and nutritional
information.

**Mapped MCP Tools:**

1. `get_crop_types` - Retrieves list of crop types with their growing parameters
2. `add_crop_type` - Adds a new crop type with growing parameters
3. `update_crop_type` - Updates a crop type's information
4. `delete_crop_type` - Deletes or deactivates a crop type

**Gaps/Issues:**

- No issues identified - MCP tools provide complete coverage for crop type
  management

**Dependencies:**

- User authentication and authorization

#### BASES Feature: Farm Zone Management

**File:** BASES/Verding Feature Specifications.md **Section:** Farm Management

**Description:** Management of farm zones/areas including their type, capacity,
conditions, and location.

**Mapped MCP Tools:**

1. `get_farm_zones` - Retrieves list of farm zones/areas
2. `add_farm_zone` - Adds a new farm zone
3. `update_farm_zone` - Updates a farm zone's information
4. `delete_farm_zone` - Deletes or deactivates a farm zone

**Gaps/Issues:**

- No issues identified - MCP tools provide complete coverage for farm zone
  management

**Dependencies:**

- User authentication and authorization

### 3. Production Management

#### BASES Feature: Production Batch Management

**File:** BASES/Verding Feature Specifications.md **Section:** Production
Management

**Description:** Creation and management of production batches, including
tracking status, location, and timeline.

**Mapped MCP Tools:**

1. `create_production_batch` - Creates a new production batch
2. `get_production_batch` - Retrieves production batch details
3. `list_production_batches` - Lists production batches with filtering
4. `update_production_batch` - Updates a production batch
5. `move_batch_to_zone` - Moves a batch to a different zone
6. `harvest_batch` - Marks a batch as harvested

**Gaps/Issues:**

- No issues identified - MCP tools provide complete coverage for production
  batch management

**Dependencies:**

- Crop type management
- Farm zone management
- Inventory management (for harvesting)

#### BASES Feature: Production Task Management

**File:** BASES/Verding Feature Specifications.md **Section:** Production
Management

**Description:** Management of tasks associated with production batches.

**Mapped MCP Tools:**

1. `get_batch_tasks` - Retrieves tasks associated with a production batch
2. `complete_batch_task` - Marks a batch task as completed

**Gaps/Issues:**

- Missing MCP tools for creating and updating batch tasks
- Need to add:
  - `create_batch_task` - Creates a new task associated with a batch
  - `update_batch_task` - Updates a batch task's details

**Dependencies:**

- Production batch management

### 4. Inventory Management

#### BASES Feature: Inventory Item Management

**File:** BASES/Verding Feature Specifications.md **Section:** Inventory
Management

**Description:** Management of inventory items including seeds, products, and
supplies.

**Mapped MCP Tools:**

1. `get_inventory` - Retrieves current inventory levels
2. `add_inventory_item` - Adds a new inventory item
3. `update_inventory_quantity` - Updates an inventory item's quantity
4. `get_inventory_history` - Retrieves history of inventory transactions

**Gaps/Issues:**

- Missing MCP tool for updating inventory item details (beyond quantity)
- Missing MCP tool for deleting/deactivating inventory items
- Need to add:
  - `update_inventory_item` - Updates inventory item details
  - `delete_inventory_item` - Deletes or deactivates an inventory item

**Dependencies:**

- User authentication and authorization
- Production management (for harvest to inventory conversion)

### 5. Sales & Order Management

#### BASES Feature: Order Management

**File:** BASES/Verding Feature Specifications.md **Section:** Sales & Order
Management

**Description:** Creation and management of sales orders including line items,
delivery details, and status tracking.

**Mapped MCP Tools:**

1. `create_order` - Creates a new sales order
2. `get_order` - Retrieves order details
3. `list_orders` - Lists orders with filtering
4. `update_order_status` - Updates an order's status

**Gaps/Issues:**

- Missing MCP tool for updating order details beyond status
- Missing MCP tool for deleting/canceling orders
- Need to add:
  - `update_order` - Updates order details
  - `delete_order` - Deletes or cancels an order

**Dependencies:**

- Customer management
- Inventory management
- User authentication and authorization

#### BASES Feature: Subscription Management

**File:** BASES/Verding Feature Specifications.md **Section:** Sales & Order
Management

**Description:** Management of recurring subscriptions including subscription
items, frequency, and delivery details.

**Mapped MCP Tools:**

1. `create_subscription` - Creates a recurring subscription
2. `get_subscription` - Retrieves subscription details
3. `list_subscriptions` - Lists subscriptions with filtering
4. `update_subscription` - Updates a subscription

**Gaps/Issues:**

- No issues identified - MCP tools provide complete coverage for subscription
  management
- Note: These are customer product subscriptions, not to be confused with
  billing subscriptions

**Dependencies:**

- Customer management
- Inventory management
- User authentication and authorization

### 6. Customer Management

#### BASES Feature: Customer Record Management

**File:** BASES/Verding Feature Specifications.md **Section:** Customer
Management

**Description:** Creation and management of customer records including contact
information, addresses, and related notes.

**Mapped MCP Tools:**

1. `create_customer` - Creates a new customer record
2. `get_customer` - Retrieves customer details
3. `list_customers` - Lists customers with filtering
4. `update_customer` - Updates a customer
5. `get_customer_orders` - Retrieves a customer's order history

**Gaps/Issues:**

- Missing MCP tool for deleting/deactivating customers
- Missing MCP tool for customer subscription history
- Need to add:
  - `delete_customer` - Deletes or deactivates a customer
  - `get_customer_subscriptions` - Retrieves a customer's subscription history

**Dependencies:**

- User authentication and authorization

### 7. Sensor & Device Management

#### BASES Feature: Sensor Management

**File:** BASES/Verding Feature Specifications.md **Section:** Sensor
Integration

**Description:** Management of environmental sensors including connection,
configuration, and monitoring.

**Mapped MCP Tools:**

1. `get_sensors` - Retrieves list of registered sensors
2. `register_sensor` - Registers a new sensor
3. `update_sensor` - Updates a sensor
4. `get_sensor_readings` - Retrieves sensor readings
5. `configure_sensor_alerts` - Configures alerts for a sensor

**Gaps/Issues:**

- Missing MCP tool for deleting/deactivating sensors
- Need to add:
  - `delete_sensor` - Deletes or deactivates a sensor

**Dependencies:**

- Farm zone management (sensors are associated with zones)
- User authentication and authorization

### 8. Reporting & Analytics

#### BASES Feature: Report Generation

**File:** BASES/Verding Feature Specifications.md **Section:** Reporting &
Analytics

**Description:** Generation and viewing of various reports including production,
sales, and inventory.

**Mapped MCP Tools:**

1. `get_production_report` - Retrieves production statistics report
2. `get_sales_report` - Retrieves sales statistics report
3. `get_inventory_report` - Retrieves inventory statistics report

**Gaps/Issues:**

- No issues identified - MCP tools provide good coverage for basic reporting

**Dependencies:**

- Production management
- Sales management
- Inventory management
- User authentication and authorization

#### BASES Feature: Custom Dashboard Management

**File:** BASES/Verding Feature Specifications.md **Section:** Reporting &
Analytics

**Description:** Creation and management of custom dashboards with various
widgets.

**Mapped MCP Tools:**

1. `get_custom_dashboard` - Retrieves data for a custom dashboard
2. `create_custom_dashboard` - Creates a custom dashboard
3. `update_custom_dashboard` - Updates a custom dashboard

**Gaps/Issues:**

- Missing MCP tool for deleting custom dashboards
- Missing MCP tool for listing available dashboards
- Need to add:
  - `delete_custom_dashboard` - Deletes a custom dashboard
  - `list_custom_dashboards` - Lists available custom dashboards

**Dependencies:**

- User authentication and authorization
- Various data sources depending on dashboard widgets

### 9. System Administration

#### BASES Feature: System Health Monitoring

**File:** BASES/Verding Feature Specifications.md **Section:** System
Administration

**Description:** Monitoring system health and status, including viewing system
logs and configuration.

**Mapped MCP Tools:**

1. `get_system_health` - Retrieves system health and status information
2. `get_system_logs` - Retrieves system logs
3. `update_system_settings` - Updates system settings

**Gaps/Issues:**

- No issues identified - MCP tools provide good coverage for system
  administration

**Dependencies:**

- User authentication and authorization (admin privileges)

#### BASES Feature: Backup & Restore

**File:** BASES/Verding Feature Specifications.md **Section:** System
Administration

**Description:** Management of system backups and restoration.

**Mapped MCP Tools:**

1. `backup_system` - Initiates a system backup
2. `restore_system` - Restores from a backup

**Gaps/Issues:**

- Missing MCP tool for listing available backups
- Need to add:
  - `list_system_backups` - Lists available system backups

**Dependencies:**

- User authentication and authorization (admin privileges)

### 10. Notification & Alerts

#### BASES Feature: Notification Management

**File:** BASES/Verding Feature Specifications.md **Section:** Notification &
Alerts

**Description:** Management of user notifications and notification preferences.

**Mapped MCP Tools:**

1. `get_notifications` - Retrieves user notifications
2. `mark_notification_read` - Marks notification(s) as read
3. `configure_notification_preferences` - Configures user notification
   preferences
4. `send_notification` - Sends a notification to user(s)

**Gaps/Issues:**

- Missing MCP tool for deleting notifications
- Need to add:
  - `delete_notification` - Deletes a notification

**Dependencies:**

- User authentication and authorization

### 11. Knowledge Management

#### BASES Feature: Agent Core & Natural Language Processing

**File:** BASES/Verding Feature Specifications.md **Section:** Agent Core &
Natural Language Processing

**Description:** A sophisticated agent system that understands and processes
natural language commands across all modules, serving as the primary interface
for users to interact with the Verding system.

**Mapped MCP Tools:**

1. `search_knowledge_base` - Searches the knowledge base for relevant
   information
2. `get_knowledge_article` - Retrieves knowledge base articles
3. `create_knowledge_article` - Creates new knowledge base articles
4. `update_knowledge_article` - Updates knowledge base articles
5. `delete_knowledge_article` - Deletes knowledge base articles

**Gaps/Issues:**

- Missing MCP tools for directly managing agent context and conversation history
- Need to add:
  - `get_conversation_history` - Retrieves conversation history
  - `get_agent_context` - Retrieves current agent context
  - `reset_agent_context` - Resets agent context for a fresh start

**Dependencies:**

- Authentication and authorization
- Integration with all other system modules

### 12. BUJO (Bullet Journal) Management

#### BASES Feature: BUJO Management

**File:** BASES/Verding Feature Specifications.md **Section:** BUJO (Bullet
Journal) Management

**Description:** Management of the agent's bullet journal for task tracking,
notes, and events.

**Mapped MCP Tools:**

1. `get_bujo_entries` - Retrieves BUJO entries
2. `create_bujo_entry` - Creates a new BUJO entry
3. `update_bujo_entry` - Updates a BUJO entry
4. `delete_bujo_entry` - Deletes a BUJO entry
5. `get_bujo_collections` - Retrieves BUJO collections
6. `create_bujo_collection` - Creates a new BUJO collection

**Gaps/Issues:**

- Missing MCP tools for updating and deleting BUJO collections
- Need to add:
  - `update_bujo_collection` - Updates a BUJO collection
  - `delete_bujo_collection` - Deletes a BUJO collection

**Dependencies:**

- Authentication and authorization

## Analysis Summary

### Complete Coverage

- Farm Management (crop types, farm zones)
- Production Batch Management
- Subscription Management (customer product subscriptions)
- System Health Monitoring
- Backup & Restore (with minor gap)

### Identified Gaps

- Billing and subscription management tools missing
- Agent context and conversation history management tools missing
- BUJO collection management (update/delete) tools missing
- Batch task creation and updating tools missing
- Inventory item management (update details, delete) tools missing
- Order management (update details, delete) tools missing
- Customer management (delete, subscription history) tools missing
- Sensor management (delete) tool missing
- Custom dashboard management (delete, list) tools missing
- System backup listing tool missing
- Notification deletion tool missing

### Required New MCP Tools

1. `get_subscription_plans` - List available subscription plans
2. `create_subscription` - Create a new subscription
3. `update_subscription` - Modify an existing subscription
4. `get_subscription_status` - Check current subscription status
5. `cancel_subscription` - Cancel an active subscription
6. `get_conversation_history` - Retrieves conversation history
7. `get_agent_context` - Retrieves current agent context
8. `reset_agent_context` - Resets agent context for a fresh start
9. `update_bujo_collection` - Updates a BUJO collection
10. `delete_bujo_collection` - Deletes a BUJO collection
11. `create_batch_task` - Creates a new task associated with a batch
12. `update_batch_task` - Updates a batch task's details
13. `update_inventory_item` - Updates inventory item details
14. `delete_inventory_item` - Deletes or deactivates an inventory item
15. `update_order` - Updates order details
16. `delete_order` - Deletes or cancels an order
17. `delete_customer` - Deletes or deactivates a customer
18. `get_customer_subscriptions` - Retrieves a customer's subscription history
19. `delete_sensor` - Deletes or deactivates a sensor
20. `delete_custom_dashboard` - Deletes a custom dashboard
21. `list_custom_dashboards` - Lists available custom dashboards
22. `list_system_backups` - Lists available system backups
23. `delete_notification` - Deletes a notification

### Key Dependencies

The mapping reveals several key dependencies in the system:

1. **Authentication Dependencies**: All features depend on the authentication
   system
2. **Data Hierarchy Dependencies**:
   - Production features depend on crop and zone management
   - Sales features depend on inventory and customer management
   - Sensor features depend on farm zone management
3. **Reporting Dependencies**: Reports depend on the underlying data from
   various modules
4. **Authorization Dependencies**: Administrative features require specialized
   permissions
