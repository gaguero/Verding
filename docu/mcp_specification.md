# Verding MCP (Model Context Protocol) Specification

## Overview

This document defines the comprehensive Model Context Protocol (MCP) toolkit
required for the external n8n Agent to access all Verding system functionality.
The MCP serves as the exclusive communication channel between the n8n Agent and
the main Verding backend.

The central principle guiding this specification is that **ALL functionality
available through the web/mobile UI must be accessible through the agent
interface via MCP tools**. This ensures the agent can fully participate in and
orchestrate all aspects of the Verding system.

**Multi-Property Architecture:** The Verding system is designed to manage 1 to
an infinite number of farms and/or locations (properties). All MCP tools are
designed with property context awareness, ensuring proper data isolation and
access control across multiple properties.

## Protocol Fundamentals

### Communication Format

- **JSON-RPC Style:** All MCP communications follow a JSON-RPC inspired format
- **Transport Layer:** HTTP/HTTPS with JSON request/response bodies
- **Authentication:** JWT-based authentication with role-based access control
- **Error Handling:** Standardized error responses with error codes and messages

### Base Structure

**Request:**

```json
{
  "id": "unique-request-id",
  "method": "tool_name",
  "params": {
    "property_id": "property-uuid",
    "param1": "value1",
    "param2": "value2"
  },
  "auth": {
    "token": "jwt-token",
    "userId": "user-id"
  }
}
```

**Property Context Behavior:**

- If `property_id` is omitted from params, the system uses the user's current
  active property context (stored in session)
- If no active property is set: tools requiring property context return an
  error, global tools proceed without property filtering
- Property context is set using `switch_property_context` tool and persisted
  between requests within the same session

**Response:**

```json
{
  "id": "unique-request-id",
  "result": {
    "key1": "value1",
    "key2": "value2"
  },
  "error": null
}
```

**Error Response:**

```json
{
  "id": "unique-request-id",
  "result": null,
  "error": {
    "code": 1001,
    "message": "Error description",
    "details": {}
  }
}
```

## MCP Tool Categories

The MCP tools are organized into functional categories that map to the major
areas of the Verding system:

1. **User & Authentication Management**
2. **Farm Management**
3. **Production Management**
4. **Inventory Management**
5. **Sales & Order Management**
6. **Customer Management**
7. **Sensor & Device Management**
8. **Reporting & Analytics**
9. **System Administration**
10. **Notification & Alerts**
11. **Knowledge Management**
12. **BUJO (Bullet Journal) Management**
13. **Property Management**
14. **Monitoring & Dashboard Management**

## Detailed Tool Specifications

### 1. User & Authentication Management

#### 1.1 `authenticate_user`

- **Description:** Authenticate a user and generate a session token
- **Parameters:**
  - `username` (string, required): Username or email
  - `password` (string, required): User password
  - `platform` (string, optional): Source platform (web, mobile, telegram,
    whatsapp)
- **Returns:**
  - `token` (string): JWT authentication token
  - `user` (object): User information including id, name, role, etc.
  - `expires` (integer): Token expiration timestamp

#### 1.2 `register_user`

- **Description:** Register a new user account
- **Parameters:**
  - `username` (string, required): Username
  - `email` (string, required): Email address
  - `password` (string, required): Password
  - `name` (string, required): Full name
  - `role` (string, optional): User role (defaults to "client")
  - `phone` (string, optional): Phone number
  - `address` (object, optional): Address information
- **Returns:**
  - `user` (object): Created user information
  - `token` (string): Authentication token

#### 1.3 `get_user_profile`

- **Description:** Get detailed user profile information
- **Parameters:**
  - `userId` (string, optional): User ID (defaults to authenticated user)
- **Returns:**
  - `profile` (object): Detailed user profile information
  - `propertyAccess` (array): List of properties the user has access to with
    role information

#### 1.4 `update_user_profile`

- **Description:** Update a user's profile information
- **Parameters:**
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - `updates` (object, required): Fields to update
- **Returns:**
  - `profile` (object): Updated user profile information

#### 1.5 `list_users`

- **Description:** List users with optional filtering (admin only)
- **Parameters:**
  - `property_id` (string, optional): Filter by users with access to a specific
    property
  - `role` (string, optional): Filter by role
  - `status` (string, optional): Filter by status
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `users` (array): List of user objects
  - `total` (integer): Total count of matching users

#### 1.6 `change_user_role`

- **Description:** Change a user's role (admin only)
- **Parameters:**
  - `userId` (string, required): User ID
  - `newRole` (string, required): New role to assign
- **Returns:**
  - `success` (boolean): Operation success status
  - `user` (object): Updated user information

#### 1.7 `get_subscription_plans`

- **Description:** List available subscription plans
- **Parameters:**
  - `includeInactive` (boolean, optional): Include inactive plans
  - `detailed` (boolean, optional): Include detailed feature descriptions
- **Returns:**
  - `plans` (array): List of subscription plan objects

#### 1.8 `create_subscription`

- **Description:** Create a new subscription for billing purposes
- **Parameters:**
  - `userId` (string, required): User ID
  - `planId` (string, required): Subscription plan ID
  - `paymentMethodId` (string, required): Payment method ID
  - `startDate` (string, optional): Start date (defaults to immediate)
  - `billingAddress` (object, optional): Billing address information
  - `couponCode` (string, optional): Coupon code for discount
- **Returns:**
  - `subscription` (object): Created subscription object

#### 1.9 `update_subscription`

- **Description:** Modify an existing billing subscription
- **Parameters:**
  - `subscriptionId` (string, required): Subscription ID
  - `planId` (string, optional): New subscription plan ID
  - `paymentMethodId` (string, optional): New payment method ID
  - `billingAddress` (object, optional): Updated billing address
- **Returns:**
  - `subscription` (object): Updated subscription object

#### 1.10 `get_subscription_status`

- **Description:** Check current billing subscription status
- **Parameters:**
  - `userId` (string, optional): User ID (defaults to authenticated user)
- **Returns:**
  - `status` (string): Subscription status
  - `plan` (object): Current plan details
  - `nextBilling` (string): Next billing date
  - `subscription` (object): Full subscription details

#### 1.11 `cancel_subscription`

- **Description:** Cancel an active billing subscription
- **Parameters:**
  - `subscriptionId` (string, required): Subscription ID
  - `reason` (string, optional): Cancellation reason
  - `endImmediately` (boolean, optional): End immediately or at billing period
    end
- **Returns:**
  - `success` (boolean): Operation success status
  - `subscription` (object): Updated subscription object with end date

### 2. Farm Management

#### 2.1 `get_crop_types`

- **Description:** Get list of crop types with their growing parameters
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `includeInactive` (boolean, optional): Include inactive crop types
  - `includeGlobal` (boolean, optional): Include global crop types available to
    all properties
- **Returns:**
  - `crops` (array): List of crop type objects with details

#### 2.2 `add_crop_type`

- **Description:** Add a new crop type with growing parameters
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `name` (string, required): Crop name
  - `description` (string, optional): Crop description
  - `growthStages` (array, required): Array of growth stage objects
    - `name` (string): Stage name (germination, blackout, light)
    - `durationDays` (number): Duration in days
    - `conditions` (object): Required conditions (temperature, humidity, etc.)
  - `seedDensity` (number, optional): Recommended seed density
  - `harvestYield` (number, optional): Expected yield per tray
  - `nutritionInfo` (object, optional): Nutritional information
  - `imageUrl` (string, optional): Image URL
- **Returns:**
  - `crop` (object): Created crop type

#### 2.3 `update_crop_type`

- **Description:** Update a crop type's information
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `cropId` (string, required): Crop type ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `crop` (object): Updated crop type

#### 2.4 `delete_crop_type`

- **Description:** Delete or deactivate a crop type
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `cropId` (string, required): Crop type ID
  - `deactivateOnly` (boolean, optional): Only deactivate instead of delete
- **Returns:**
  - `success` (boolean): Operation success status

#### 2.5 `get_farm_zones`

- **Description:** Get list of farm zones/areas
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `includeInactive` (boolean, optional): Include inactive zones
- **Returns:**
  - `zones` (array): List of zone objects with details

#### 2.6 `add_farm_zone`

- **Description:** Add a new farm zone
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `name` (string, required): Zone name
  - `type` (string, required): Zone type (germination, blackout, light, storage)
  - `capacity` (number, required): Number of trays capacity
  - `conditions` (object, optional): Zone conditions (temperature, humidity)
  - `location` (string, optional): Physical location reference
- **Returns:**
  - `zone` (object): Created zone

#### 2.7 `update_farm_zone`

- **Description:** Update a farm zone's information
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `zoneId` (string, required): Zone ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `zone` (object): Updated zone

#### 2.8 `delete_farm_zone`

- **Description:** Delete or deactivate a farm zone
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `zoneId` (string, required): Zone ID
  - `deactivateOnly` (boolean, optional): Only deactivate instead of delete
- **Returns:**
  - `success` (boolean): Operation success status

### 3. Production Management

#### 3.1 `create_production_batch`

- **Description:** Create a new production batch
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `cropId` (string, required): Crop type ID
  - `seedLot` (string, optional): Seed lot identifier
  - `quantity` (number, required): Number of trays
  - `startDate` (string, required): Start date (ISO format)
  - `notes` (string, optional): Production notes
  - `initialZoneId` (string, optional): Initial zone placement
  - `linkedOrderIds` (array, optional): Linked sales order IDs
- **Returns:**
  - `batch` (object): Created production batch

#### 3.2 `get_production_batch`

- **Description:** Get production batch details
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `batchId` (string, required): Batch ID
- **Returns:**
  - `batch` (object): Batch details including status, location, timeline

#### 3.3 `list_production_batches`

- **Description:** List production batches with filtering
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `status` (string, optional): Filter by status
  - `cropId` (string, optional): Filter by crop type
  - `zoneId` (string, optional): Filter by current zone
  - `startDateFrom` (string, optional): Filter by start date range
  - `startDateTo` (string, optional): Filter by start date range
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `batches` (array): List of batch objects
  - `total` (integer): Total count of matching batches

#### 3.4 `update_production_batch`

- **Description:** Update a production batch
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `batchId` (string, required): Batch ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `batch` (object): Updated batch

#### 3.5 `move_batch_to_zone`

- **Description:** Move a batch to a different zone
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `batchId` (string, required): Batch ID
  - `destinationZoneId` (string, required): Destination zone ID
  - `trayIds` (array, optional): Specific tray IDs to move (default: all)
  - `notes` (string, optional): Notes about the move
- **Returns:**
  - `success` (boolean): Operation success status
  - `batch` (object): Updated batch information

#### 3.6 `harvest_batch`

- **Description:** Mark a batch as harvested
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `batchId` (string, required): Batch ID
  - `harvestDate` (string, optional): Harvest date (ISO format, default: now)
  - `actualYield` (number, optional): Actual yield amount
  - `qualityRating` (number, optional): Quality rating (1-5)
  - `notes` (string, optional): Harvest notes
- **Returns:**
  - `batch` (object): Updated batch information
  - `inventory` (object): Created inventory entry

#### 3.7 `get_batch_tasks`

- **Description:** Get tasks associated with a production batch
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `batchId` (string, required): Batch ID
  - `status` (string, optional): Filter by task status
- **Returns:**
  - `tasks` (array): List of task objects

#### 3.8 `complete_batch_task`

- **Description:** Mark a batch task as completed
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `taskId` (string, required): Task ID
  - `completionNotes` (string, optional): Notes on completion
  - `actualDate` (string, optional): Actual completion date (ISO format)
- **Returns:**
  - `task` (object): Updated task information

#### 3.9 `create_batch_task`

- **Description:** Creates a new task associated with a production batch
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `batchId` (string, required): Production batch ID
  - `title` (string, required): Task title
  - `description` (string, optional): Task description
  - `dueDate` (string, optional): Due date for the task
  - `assignedTo` (string, optional): User ID the task is assigned to
  - `priority` (string, optional): Task priority (low, medium, high)
- **Returns:**
  - `task` (object): Created batch task

#### 3.10 `update_batch_task`

- **Description:** Updates a batch task's details
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `taskId` (string, required): Task ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `task` (object): Updated batch task

### 4. Inventory Management

#### 4.1 `get_inventory`

- **Description:** Get current inventory levels
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `type` (string, optional): Filter by type (seed, product, supply)
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `inventory` (array): List of inventory items
  - `total` (integer): Total count of matching items

#### 4.2 `add_inventory_item`

- **Description:** Add a new inventory item
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `type` (string, required): Item type (seed, product, supply)
  - `name` (string, required): Item name
  - `description` (string, optional): Item description
  - `quantity` (number, required): Initial quantity
  - `unit` (string, required): Unit of measure
  - `location` (string, optional): Storage location
  - `properties` (object, optional): Additional properties
  - `batchId` (string, optional): Associated production batch ID
- **Returns:**
  - `item` (object): Created inventory item

#### 4.3 `update_inventory_quantity`

- **Description:** Update an inventory item's quantity
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `itemId` (string, required): Inventory item ID
  - `adjustment` (number, required): Quantity adjustment (positive or negative)
  - `reason` (string, required): Reason for adjustment
  - `notes` (string, optional): Additional notes
- **Returns:**
  - `item` (object): Updated inventory item
  - `transaction` (object): Inventory transaction record

#### 4.4 `get_inventory_history`

- **Description:** Get history of inventory transactions
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `itemId` (string, optional): Filter by inventory item ID
  - `startDate` (string, optional): Start date for history
  - `endDate` (string, optional): End date for history
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `transactions` (array): List of inventory transactions
  - `total` (integer): Total count of matching transactions

#### 4.5 `update_inventory_item`

- **Description:** Updates inventory item details beyond just quantity
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `itemId` (string, required): Inventory item ID
  - `updates` (object, required): Fields to update (name, category, supplier,
    unit, etc.)
- **Returns:**
  - `item` (object): Updated inventory item

#### 4.6 `delete_inventory_item`

- **Description:** Deletes or deactivates an inventory item
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `itemId` (string, required): Inventory item ID
  - `deactivateOnly` (boolean, optional): Only deactivate instead of delete
- **Returns:**
  - `success` (boolean): Operation success status

### 5. Sales & Order Management

#### 5.1 `create_order`

- **Description:** Create a new sales order
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
  - `items` (array, required): Order items
    - `productId` (string): Product ID
    - `quantity` (number): Quantity
    - `unitPrice` (number): Unit price
  - `deliveryDate` (string, required): Requested delivery date
  - `notes` (string, optional): Order notes
  - `shippingAddress` (object, optional): Shipping address
  - `billingAddress` (object, optional): Billing address
- **Returns:**
  - `order` (object): Created order

#### 5.2 `get_order`

- **Description:** Get order details
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `orderId` (string, required): Order ID
- **Returns:**
  - `order` (object): Order details

#### 5.3 `list_orders`

- **Description:** List orders with filtering
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `status` (string, optional): Filter by status
  - `customerId` (string, optional): Filter by customer
  - `startDate` (string, optional): Filter by date range
  - `endDate` (string, optional): Filter by date range
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `orders` (array): List of order objects
  - `total` (integer): Total count of matching orders

#### 5.4 `update_order_status`

- **Description:** Update an order's status
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `orderId` (string, required): Order ID
  - `status` (string, required): New status
  - `notes` (string, optional): Status update notes
- **Returns:**
  - `order` (object): Updated order

#### 5.5 `create_subscription`

- **Description:** Create a recurring subscription
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
  - `items` (array, required): Subscription items
    - `productId` (string): Product ID
    - `quantity` (number): Quantity
    - `unitPrice` (number): Unit price
  - `frequency` (string, required): Frequency (weekly, biweekly, monthly)
  - `startDate` (string, required): First delivery date
  - `endDate` (string, optional): End date (null for ongoing)
  - `deliveryDay` (string, optional): Preferred delivery day
  - `shippingAddress` (object, optional): Shipping address
  - `billingAddress` (object, optional): Billing address
  - `paymentMethodId` (string, optional): Payment method ID
- **Returns:**
  - `subscription` (object): Created subscription

#### 5.6 `get_subscription`

- **Description:** Get subscription details
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `subscriptionId` (string, required): Subscription ID
- **Returns:**
  - `subscription` (object): Subscription details

#### 5.7 `list_subscriptions`

- **Description:** List subscriptions with filtering
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `status` (string, optional): Filter by status
  - `customerId` (string, optional): Filter by customer
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `subscriptions` (array): List of subscription objects
  - `total` (integer): Total count of matching subscriptions

#### 5.8 `update_subscription`

- **Description:** Update a subscription
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `subscriptionId` (string, required): Subscription ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `subscription` (object): Updated subscription

#### 5.9 `update_order`

- **Description:** Updates order details beyond status
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `orderId` (string, required): Order ID
  - `updates` (object, required): Fields to update (items, shipping details,
    etc.)
- **Returns:**
  - `order` (object): Updated order

#### 5.10 `delete_order`

- **Description:** Deletes or cancels an order
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `orderId` (string, required): Order ID
  - `reason` (string, optional): Cancellation reason
  - `cancelOnly` (boolean, optional): Only cancel instead of delete
- **Returns:**
  - `success` (boolean): Operation success status

### 6. Customer Management

#### 6.1 `create_customer`

- **Description:** Create a new customer record
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `name` (string, required): Customer name
  - `email` (string, required): Email address
  - `phone` (string, optional): Phone number
  - `address` (object, optional): Address information
  - `type` (string, optional): Customer type (individual, business)
  - `notes` (string, optional): Customer notes
  - `userId` (string, optional): Associated user account ID
- **Returns:**
  - `customer` (object): Created customer

#### 6.2 `get_customer`

- **Description:** Get customer details
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
- **Returns:**
  - `customer` (object): Customer details

#### 6.3 `list_customers`

- **Description:** List customers with filtering
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `query` (string, optional): Search query
  - `type` (string, optional): Filter by customer type
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `customers` (array): List of customer objects
  - `total` (integer): Total count of matching customers

#### 6.4 `update_customer`

- **Description:** Update a customer
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `customer` (object): Updated customer

#### 6.5 `get_customer_orders`

- **Description:** Get a customer's order history
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `orders` (array): List of order objects
  - `total` (integer): Total count of orders

#### 6.6 `delete_customer`

- **Description:** Deletes or deactivates a customer
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
  - `deactivateOnly` (boolean, optional): Only deactivate instead of delete
  - `reason` (string, optional): Reason for deletion/deactivation
- **Returns:**
  - `success` (boolean): Operation success status

#### 6.7 `get_customer_subscriptions`

- **Description:** Retrieves a customer's product subscription history
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `customerId` (string, required): Customer ID
  - `status` (string, optional): Filter by subscription status
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `subscriptions` (array): List of subscription objects
  - `total` (integer): Total count of matching subscriptions

### 7. Sensor & Device Management

#### 7.1 `get_sensors`

- **Description:** Get list of registered sensors
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `type` (string, optional): Filter by sensor type
  - `zoneId` (string, optional): Filter by zone
  - `status` (string, optional): Filter by status
- **Returns:**
  - `sensors` (array): List of sensor objects

#### 7.2 `register_sensor`

- **Description:** Register a new sensor
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `name` (string, required): Sensor name
  - `type` (string, required): Sensor type
  - `zoneId` (string, required): Zone ID
  - `model` (string, optional): Sensor model
  - `serialNumber` (string, optional): Serial number
  - `calibrationDate` (string, optional): Last calibration date
  - `configuration` (object, optional): Sensor-specific configuration
- **Returns:**
  - `sensor` (object): Created sensor

#### 7.3 `update_sensor`

- **Description:** Update a sensor
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `sensorId` (string, required): Sensor ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `sensor` (object): Updated sensor

#### 7.4 `get_sensor_readings`

- **Description:** Get sensor readings
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `sensorId` (string, required): Sensor ID
  - `startTime` (string, optional): Start timestamp
  - `endTime` (string, optional): End timestamp
  - `resolution` (string, optional): Data resolution (raw, minute, hour, day)
  - `limit` (integer, optional): Maximum number of readings
- **Returns:**
  - `readings` (array): List of reading objects
  - `stats` (object): Statistical summary of readings

#### 7.5 `configure_sensor_alerts`

- **Description:** Configure alerts for a sensor
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `sensorId` (string, required): Sensor ID
  - `alerts` (array, required): Alert configurations
    - `type` (string): Alert type (threshold, rate-of-change)
    - `condition` (string): Condition (above, below, change-up, change-down)
    - `value` (number): Threshold value
    - `duration` (number, optional): Duration in seconds before alerting
    - `notificationChannels` (array): Channels for notification
- **Returns:**
  - `success` (boolean): Operation success status

#### 7.6 `delete_sensor`

- **Description:** Deletes or deactivates a sensor
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `sensorId` (string, required): Sensor ID
  - `deactivateOnly` (boolean, optional): Only deactivate instead of delete
- **Returns:**
  - `success` (boolean): Operation success status

### 8. Reporting & Analytics

#### 8.1 `get_production_report`

- **Description:** Get production statistics report
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `startDate` (string, required): Start date
  - `endDate` (string, required): End date
  - `cropId` (string, optional): Filter by crop type
  - `groupBy` (string, optional): Group by field (day, week, month, crop)
- **Returns:**
  - `data` (array): Production data points
  - `summary` (object): Summary statistics

#### 8.2 `get_sales_report`

- **Description:** Get sales statistics report
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `startDate` (string, required): Start date
  - `endDate` (string, required): End date
  - `productId` (string, optional): Filter by product
  - `customerId` (string, optional): Filter by customer
  - `groupBy` (string, optional): Group by field (day, week, month, product)
- **Returns:**
  - `data` (array): Sales data points
  - `summary` (object): Summary statistics

#### 8.3 `get_inventory_report`

- **Description:** Get inventory statistics report
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `date` (string, optional): Report date (default: current)
  - `type` (string, optional): Filter by inventory type
- **Returns:**
  - `current` (array): Current inventory levels
  - `movements` (array): Recent inventory movements
  - `alerts` (array): Low stock alerts

#### 8.4 `get_custom_dashboard`

- **Description:** Get data for a custom dashboard
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `dashboardId` (string, required): Dashboard ID
  - `parameters` (object, optional): Custom parameters for dashboard
- **Returns:**
  - `widgets` (array): Dashboard widget data
  - `metadata` (object): Dashboard metadata

#### 8.5 `create_custom_dashboard`

- **Description:** Create a custom dashboard
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `name` (string, required): Dashboard name
  - `description` (string, optional): Dashboard description
  - `widgets` (array, required): Widget configurations
  - `layout` (object, optional): Dashboard layout information
  - `permissions` (object, optional): Access permissions
- **Returns:**
  - `dashboard` (object): Created dashboard

#### 8.6 `update_custom_dashboard`

- **Description:** Update a custom dashboard
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `dashboardId` (string, required): Dashboard ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `dashboard` (object): Updated dashboard

#### 8.7 `delete_custom_dashboard`

- **Description:** Deletes a custom dashboard
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `dashboardId` (string, required): Dashboard ID
- **Returns:**
  - `success` (boolean): Operation success status

#### 8.8 `list_custom_dashboards`

- **Description:** Lists available custom dashboards
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `dashboards` (array): List of dashboard objects
  - `total` (integer): Total count of dashboards

### 9. System Administration

#### 9.1 `get_system_health`

- **Description:** Get system health and status information
- **Parameters:**
  - `property_id` (string, optional): Property ID for property-specific health
    info (defaults to global system health)
  - `components` (array, optional): Specific components to check
- **Returns:**
  - `health` (object): System health information
  - `metrics` (object): System performance metrics
  - `alerts` (array): Active system alerts

#### 9.2 `get_system_logs`

- **Description:** Get system logs
- **Parameters:**
  - `property_id` (string, optional): Property ID to filter logs for a specific
    property (defaults to all logs)
  - `level` (string, optional): Minimum log level
  - `service` (string, optional): Filter by service
  - `startTime` (string, optional): Start timestamp
  - `endTime` (string, optional): End timestamp
  - `limit` (integer, optional): Maximum number of logs
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `logs` (array): Log entries
  - `total` (integer): Total count of matching logs

#### 9.3 `update_system_settings`

- **Description:** Update system settings
- **Parameters:**
  - `property_id` (string, optional): Property ID for property-specific settings
    (defaults to global settings)
  - `settings` (object, required): Settings to update
- **Returns:**
  - `settings` (object): Updated system settings

#### 9.4 `backup_system`

- **Description:** Initiate a system backup
- **Parameters:**
  - `property_id` (string, optional): Property ID for property-specific backup
    (defaults to full system backup)
  - `components` (array, optional): Specific components to backup
  - `description` (string, optional): Backup description
- **Returns:**
  - `backup` (object): Backup information
  - `jobId` (string): Backup job ID

#### 9.5 `restore_system`

- **Description:** Restore from a backup
- **Parameters:**
  - `property_id` (string, optional): Property ID for property-specific restore
    (defaults to full system restore)
  - `backupId` (string, required): Backup ID
  - `components` (array, optional): Specific components to restore
- **Returns:**
  - `jobId` (string): Restore job ID
  - `status` (string): Initial job status

#### 9.6 `list_system_backups`

- **Description:** Lists available system backups
- **Parameters:**
  - `property_id` (string, optional): Property ID to filter backups for a
    specific property (defaults to all backups)
  - `startDate` (string, optional): Filter by date range
  - `endDate` (string, optional): Filter by date range
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `backups` (array): List of backup objects with metadata
  - `total` (integer): Total count of backups

### 10. Notification & Alerts

#### 10.1 `get_notifications`

- **Description:** Get user notifications
- **Parameters:**
  - `property_id` (string, optional): Property ID to filter notifications for a
    specific property (defaults to all accessible)
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - `status` (string, optional): Filter by status (read, unread, all)
  - `type` (string, optional): Filter by notification type
  - `limit` (integer, optional): Maximum number of notifications
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `notifications` (array): Notification objects
  - `total` (integer): Total count of matching notifications

#### 10.2 `mark_notification_read`

- **Description:** Mark notification(s) as read
- **Parameters:**
  - `notificationIds` (array, required): Notification IDs to mark
  - `status` (string, optional): Status to set (read, unread)
- **Returns:**
  - `success` (boolean): Operation success status

#### 10.3 `configure_notification_preferences`

- **Description:** Configure user notification preferences
- **Parameters:**
  - `property_id` (string, optional): Property ID for property-specific
    notification preferences (defaults to global)
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - `preferences` (object, required): Notification preferences
- **Returns:**
  - `preferences` (object): Updated notification preferences

#### 10.4 `send_notification`

- **Description:** Send a notification to user(s)
- **Parameters:**
  - `property_id` (string, optional): Property ID to associate notification with
    a specific property
  - `userIds` (array, required): Target user IDs
  - `title` (string, required): Notification title
  - `message` (string, required): Notification message
  - `type` (string, optional): Notification type
  - `priority` (string, optional): Priority level
  - `data` (object, optional): Additional notification data
- **Returns:**
  - `success` (boolean): Operation success status
  - `notifications` (array): Created notification objects

#### 10.5 `delete_notification`

- **Description:** Deletes a notification
- **Parameters:**
  - `notificationId` (string, required): Notification ID
- **Returns:**
  - `success` (boolean): Operation success status

### 11. Knowledge Management

#### 11.1 `search_knowledge_base`

- **Description:** Search the knowledge base
- **Parameters:**
  - `property_id` (string, optional): Property ID to include property-specific
    articles (defaults to all accessible)
  - `query` (string, required): Search query
  - `filters` (object, optional): Search filters
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `results` (array): Search results
  - `total` (integer): Total count of matching results

#### 11.2 `get_knowledge_article`

- **Description:** Get a knowledge base article
- **Parameters:**
  - `property_id` (string, optional): Property ID for access control validation
  - `articleId` (string, required): Article ID
- **Returns:**
  - `article` (object): Article content and metadata

#### 11.3 `create_knowledge_article`

- **Description:** Create a new knowledge base article
- **Parameters:**
  - `property_id` (string, optional): Property ID to associate article with a
    specific property (defaults to global)
  - `title` (string, required): Article title
  - `content` (string, required): Article content
  - `tags` (array, optional): Article tags
  - `category` (string, optional): Article category
  - `visibility` (string, optional): Visibility level (public, internal,
    private)
- **Returns:**
  - `article` (object): Created article

#### 11.4 `update_knowledge_article`

- **Description:** Update a knowledge base article
- **Parameters:**
  - `property_id` (string, optional): Property ID for access control validation
  - `articleId` (string, required): Article ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `article` (object): Updated article

#### 11.5 `delete_knowledge_article`

- **Description:** Delete a knowledge base article
- **Parameters:**
  - `property_id` (string, optional): Property ID for access control validation
  - `articleId` (string, required): Article ID
- **Returns:**
  - `success` (boolean): Operation success status

#### 11.6 `get_conversation_history`

- **Description:** Retrieves conversation history
- **Parameters:**
  - `property_id` (string, optional): Property ID to filter conversations for a
    specific property context
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - `limit` (integer, optional): Maximum number of messages
  - `offset` (integer, optional): Pagination offset
  - `startDate` (string, optional): Filter by date range
  - `endDate` (string, optional): Filter by date range
- **Returns:**
  - `messages` (array): List of message objects
  - `total` (integer): Total count of messages

#### 11.7 `get_agent_context`

- **Description:** Retrieves current agent context
- **Parameters:**
  - `property_id` (string, optional): Property ID to get property-specific agent
    context
  - `userId` (string, optional): User ID (defaults to authenticated user)
- **Returns:**
  - `context` (object): Current agent context including active topics, recent
    references, and state

#### 11.8 `reset_agent_context`

- **Description:** Resets agent context for a fresh start
- **Parameters:**
  - `property_id` (string, optional): Property ID to reset property-specific
    agent context
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - `preserveUserInfo` (boolean, optional): Whether to preserve basic user
    information
- **Returns:**
  - `success` (boolean): Operation success status
  - `context` (object): New empty context

### 12. BUJO (Bullet Journal) Management

#### 12.1 `get_bujo_entries`

- **Description:** Get BUJO entries
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `entryType` (string, optional): Filter by entry type (task, note, event)
  - `status` (string, optional): Filter by status
  - `startDate` (string, optional): Filter by date range
  - `endDate` (string, optional): Filter by date range
  - `tags` (array, optional): Filter by tags
  - `limit` (integer, optional): Maximum number of entries
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `entries` (array): BUJO entry objects
  - `total` (integer): Total count of matching entries

#### 12.2 `create_bujo_entry`

- **Description:** Create a new BUJO entry
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `type` (string, required): Entry type (task, note, event)
  - `content` (string, required): Entry content
  - `date` (string, optional): Entry date
  - `status` (string, optional): Entry status
  - `priority` (string, optional): Priority level
  - `tags` (array, optional): Entry tags
  - `relatedIds` (array, optional): Related entry IDs
  - `metadata` (object, optional): Additional metadata
- **Returns:**
  - `entry` (object): Created BUJO entry

#### 12.3 `update_bujo_entry`

- **Description:** Update a BUJO entry
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `entryId` (string, required): Entry ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `entry` (object): Updated BUJO entry

#### 12.4 `delete_bujo_entry`

- **Description:** Delete a BUJO entry
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `entryId` (string, required): Entry ID
- **Returns:**
  - `success` (boolean): Operation success status

#### 12.5 `get_bujo_collections`

- **Description:** Get BUJO collections (groups of related entries)
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `type` (string, optional): Filter by collection type
  - `limit` (integer, optional): Maximum number of collections
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `collections` (array): Collection objects
  - `total` (integer): Total count of matching collections

#### 12.6 `create_bujo_collection`

- **Description:** Create a new BUJO collection
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `name` (string, required): Collection name
  - `description` (string, optional): Collection description
  - `type` (string, optional): Collection type
  - `entryIds` (array, optional): Initial entry IDs to include
  - `color` (string, optional): Collection color
  - `icon` (string, optional): Collection icon
- **Returns:**
  - `collection` (object): Created collection

#### 12.7 `update_bujo_collection`

- **Description:** Updates a BUJO collection
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `collectionId` (string, required): Collection ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `collection` (object): Updated collection

#### 12.8 `delete_bujo_collection`

- **Description:** Deletes a BUJO collection
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `collectionId` (string, required): Collection ID
  - `deleteEntries` (boolean, optional): Whether to also delete contained
    entries
- **Returns:**
  - `success` (boolean): Operation success status

### 13. Property Management

#### 13.1 `create_property`

- **Description:** Create a new property (farm/location)
- **Parameters:**
  - `name` (string, required): Name of the property
  - `description` (string, optional): Description of the property
  - `address` (object, optional): Physical address of the property
  - `timezone` (string, optional): Timezone of the property
  - `owner_user_id` (string, optional): User ID of the property owner (defaults
    to authenticated user)
- **Returns:**
  - `property` (object): Created property object

#### 13.2 `get_property_details`

- **Description:** Get details of a specific property
- **Parameters:**
  - `property_id` (string, required): ID of the property to retrieve
- **Returns:**
  - `property` (object): Property details

#### 13.3 `list_user_properties`

- **Description:** List all properties a user has access to
- **Parameters:**
  - `user_id` (string, optional): User ID (defaults to authenticated user)
- **Returns:**
  - `properties` (array): List of property objects the user can access,
    including their role on each property

#### 13.4 `update_property_details`

- **Description:** Update details of an existing property
- **Parameters:**
  - `property_id` (string, required): ID of the property to update
  - `updates` (object, required): Fields to update (name, description, address,
    timezone)
- **Returns:**
  - `property` (object): Updated property object

#### 13.5 `delete_property`

- **Description:** Delete a property (requires specific admin privileges)
- **Parameters:**
  - `property_id` (string, required): ID of the property to delete
  - `confirm_deletion_code` (string, optional): Confirmation code if required
    for safety
- **Returns:**
  - `success` (boolean): Operation success status

#### 13.6 `assign_user_to_property`

- **Description:** Assign a user to a property with a specific role
- **Parameters:**
  - `property_id` (string, required): ID of the property
  - `user_id` (string, required): ID of the user to assign
  - `role` (string, required): Role to assign to the user for this property
    (e.g., 'manager', 'viewer', 'worker')
- **Returns:**
  - `assignment` (object): Details of the user-property assignment

#### 13.7 `remove_user_from_property`

- **Description:** Remove a user's access from a property
- **Parameters:**
  - `property_id` (string, required): ID of the property
  - `user_id` (string, required): ID of the user to remove
- **Returns:**
  - `success` (boolean): Operation success status

#### 13.8 `get_property_users`

- **Description:** List users assigned to a specific property and their roles
- **Parameters:**
  - `property_id` (string, required): ID of the property
- **Returns:**
  - `users` (array): List of user objects with their roles on the property

#### 13.9 `switch_active_property_context`

- **Description:** Set the user's active property context for the current
  session.
- **Parameters:**
  - `property_id` (string, required): The ID of the property to set as active.
    User must have access to this property.
- **Returns:**
  - `success` (boolean): True if context switched successfully.
  - `active_property_id` (string): The ID of the newly active property.
  - `active_property_name` (string): The name of the newly active property.

### 14. Monitoring & Dashboard Management

#### 14.1 `create_dashboard`

- **Description:** Create a new monitoring dashboard for a specific property.
- **Parameters:**
  - `property_id` (string, required): ID of the property this dashboard belongs
    to.
  - `name` (string, required): Name of the dashboard.
  - `description` (string, optional): Description of the dashboard.
  - `layout` (object, optional): Initial layout configuration for the dashboard.
  - `is_default` (boolean, optional, default: false): Whether this dashboard is
    the default for the user for this property.
- **Returns:**
  - `dashboard` (object): The created dashboard object.

#### 14.2 `get_dashboard`

- **Description:** Retrieve details of a specific monitoring dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property the dashboard belongs
    to.
  - `dashboard_id` (string, required): ID of the dashboard to retrieve.
- **Returns:**
  - `dashboard` (object): The dashboard object, including its layout and
    widgets.

#### 14.3 `list_dashboards`

- **Description:** List all monitoring dashboards accessible to the user for a
  specific property.
- **Parameters:**
  - `property_id` (string, required): ID of the property for which to list
    dashboards.
  - `user_id` (string, optional): User ID (defaults to authenticated user, for
    whom access is checked).
- **Returns:**
  - `dashboards` (array): List of dashboard objects.

#### 14.4 `update_dashboard`

- **Description:** Update details of an existing monitoring dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property the dashboard belongs
    to.
  - `dashboard_id` (string, required): ID of the dashboard to update.
  - `updates` (object, required): Fields to update (e.g., `name`, `description`,
    `layout`, `is_default`).
- **Returns:**
  - `dashboard` (object): The updated dashboard object.

#### 14.5 `delete_dashboard`

- **Description:** Delete a monitoring dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property the dashboard belongs
    to.
  - `dashboard_id` (string, required): ID of the dashboard to delete.
- **Returns:**
  - `success` (boolean): Operation success status.

#### 14.6 `duplicate_dashboard`

- **Description:** Create a new dashboard by duplicating an existing one for the
  same property.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the source dashboard to duplicate.
  - `new_name` (string, required): Name for the new duplicated dashboard.
- **Returns:**
  - `dashboard` (object): The newly created (duplicated) dashboard object.

#### 14.7 `add_widget_to_dashboard`

- **Description:** Add a new widget to a specific dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard to add the widget to.
  - `widget_type` (string, required): Type of widget to add (e.g.,
    "sensor_realtime", "kpi_summary").
  - `configuration` (object, required): Widget-specific configuration data.
  - `position` (object, required): Position and size of the widget on the
    dashboard grid.
- **Returns:**
  - `widget` (object): The created widget object, including its ID.

#### 14.8 `get_widget`

- **Description:** Retrieve details and configuration of a specific widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `widget_id` (string, required): ID of the widget to retrieve.
- **Returns:**
  - `widget` (object): The widget object.

#### 14.9 `update_widget`

- **Description:** Update the configuration or position of an existing widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `widget_id` (string, required): ID of the widget to update.
  - `updates` (object, required): Fields to update (e.g., `configuration`,
    `position`).
- **Returns:**
  - `widget` (object): The updated widget object.

#### 14.10 `remove_widget_from_dashboard`

- **Description:** Remove a widget from a dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard from which to remove
    the widget.
  - `widget_id` (string, required): ID of the widget to remove.
- **Returns:**
  - `success` (boolean): Operation success status.

#### 14.11 `list_widgets_on_dashboard`

- **Description:** List all widgets configured on a specific dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard.
- **Returns:**
  - `widgets` (array): List of widget objects.

#### 14.12 `get_available_widget_types`

- **Description:** Get a list of available widget types that can be added to
  dashboards for a given property.
- **Parameters:**
  - `property_id` (string, required): ID of the property (to potentially filter
    types based on property-specific features).
- **Returns:**
  - `widget_types` (array): List of objects, each describing a widget type
    (e.g., `type_id`, `name`, `description`, `required_config_params`).

#### 14.13 `get_widget_data_sensor_realtime`

- **Description:** Retrieve real-time data for a sensor widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `sensor_id` (string, required): ID of the sensor.
- **Returns:**
  - `data` (object): Sensor reading data (e.g., `value`, `unit`, `timestamp`,
    `status`).

#### 14.14 `get_widget_data_sensor_historical`

- **Description:** Retrieve historical data for a sensor trend widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `sensor_ids` (array, required): List of sensor IDs.
  - `time_range` (string, required): Predefined (e.g., "last_24h") or custom
    time range.
  - `aggregation` (string, optional): Aggregation interval (e.g., "hour",
    "day").
- **Returns:**
  - `data_series` (array): Array of data series, one for each sensor_id.

#### 14.15 `get_widget_data_kpi`

- **Description:** Retrieve data for a Key Performance Indicator (KPI) widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `kpi_metric_id` (string, required): ID of the KPI metric.
  - `time_range` (string, optional): Time range for the KPI calculation.
- **Returns:**
  - `kpi_data` (object): KPI value, target, trend, etc.

#### 14.16 `get_widget_data_tasks_summary`

- **Description:** Retrieve summary data for a task management widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `task_filters` (object, optional): Filters for tasks (e.g., `status`,
    `priority`, `assignee_id`, `due_date_range`).
- **Returns:**
  - `tasks_summary` (object): Count of tasks, list of key tasks, etc.

#### 14.17 `get_widget_data_inventory_levels`

- **Description:** Retrieve data for an inventory levels widget.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `item_ids` (array, optional): Specific inventory item IDs (if not provided,
    might return summary or all low-stock items).
  - `low_stock_threshold_only` (boolean, optional, default: false): Only return
    items below threshold.
- **Returns:**
  - `inventory_data` (array): List of inventory items with levels and statuses.

#### 14.18 `set_dashboard_sharing_settings`

- **Description:** Configure sharing settings for a dashboard within its
  property.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard.
  - `share_with_users` (array, optional): List of user IDs and their permission
    level (e.g., 'view', 'edit').
  - `share_with_roles` (array, optional): List of role names and their
    permission level for this dashboard.
- **Returns:**
  - `sharing_settings` (object): Updated sharing settings.

#### 14.19 `generate_public_dashboard_url`

- **Description:** Generate a publicly accessible URL for a dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard.
  - `expires_in_days` (integer, optional, default: 7): Duration for which the
    URL is valid.
  - `enable_otp` (boolean, optional, default: false): Whether OTP is required to
    view the public dashboard.
- **Returns:**
  - `public_url` (string): The generated public URL.
  - `url_id` (string): Identifier for the generated URL (for revocation).
  - `otp_secret` (string, optional): OTP secret if OTP is enabled.

#### 14.20 `revoke_public_dashboard_url`

- **Description:** Revoke a previously generated public URL for a dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard.
  - `url_id` (string, required): The ID of the public URL to revoke.
- **Returns:**
  - `success` (boolean): Operation success status.

#### 14.21 `list_dashboard_sharing_details`

- **Description:** List current sharing settings and active public URLs for a
  dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard.
- **Returns:**
  - `sharing_details` (object): Contains user/role shares and active public
    URLs.

#### 14.22 `get_dashboard_alerts`

- **Description:** Retrieve alerts relevant to a specific dashboard or its
  widgets.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `dashboard_id` (string, required): ID of the dashboard.
  - `filters` (object, optional): Filters for alerts (e.g., `severity`,
    `acknowledged_status`, `widget_id`).
- **Returns:**
  - `alerts` (array): List of alert objects.

#### 14.23 `acknowledge_dashboard_alert`

- **Description:** Acknowledge an alert associated with a dashboard.
- **Parameters:**
  - `property_id` (string, required): ID of the property.
  - `alert_id` (string, required): ID of the alert to acknowledge.
- **Returns:**
  - `alert` (object): The updated alert object with acknowledged status.

## MCP Implementation Requirements

### Backend Components

// ... existing code ...
