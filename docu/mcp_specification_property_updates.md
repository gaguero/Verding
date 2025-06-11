# MCP Specification Property Architecture Updates

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## Overview

This document contains the specific changes needed to update the MCP
Specification document to support the multi-property architecture. These updates
will ensure that all MCP tools properly handle property context, enabling the
Verding system to manage multiple farms/locations while maintaining proper
access control and data isolation.

## Base Protocol Updates

### Updated Request Structure

```json
{
  "id": "unique-request-id",
  "method": "tool_name",
  "params": {
    "property_id": "property-uuid", // Added property context
    "param1": "value1",
    "param2": "value2"
  },
  "auth": {
    "token": "jwt-token",
    "userId": "user-id"
  }
}
```

### Default Property Context Behavior

1. If `property_id` is omitted from params:

   - The system will use the user's current active property context (stored in
     session)
   - If no active property is set, the system will:
     - For tools requiring property context: return an error
     - For global tools: proceed without property filtering

2. Session Property Context:
   - Set using `switch_property_context` tool
   - Persisted between requests within the same session
   - Included in authentication token claims

## New Property Management Category

### 13. Property Management

#### 13.1 `list_properties`

- **Description:** List properties the user has access to
- **Parameters:**
  - `includeInactive` (boolean, optional): Include inactive properties
  - `includeChildProperties` (boolean, optional): Include child properties in
    hierarchy
  - `parentId` (string, optional): Filter to children of specific parent
    property
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `properties` (array): List of property objects with details
  - `total` (integer): Total count of matching properties

#### 13.2 `get_property`

- **Description:** Get detailed information about a specific property
- **Parameters:**
  - `property_id` (string, required): Property ID
  - `includeStats` (boolean, optional): Include usage statistics
  - `includePermissions` (boolean, optional): Include user's permissions for
    this property
- **Returns:**
  - `property` (object): Detailed property information
  - `stats` (object, conditional): Usage statistics if requested
  - `permissions` (object, conditional): User's permissions if requested

#### 13.3 `create_property`

- **Description:** Create a new property (admin or property manager role
  required)
- **Parameters:**
  - `name` (string, required): Property name
  - `description` (string, optional): Property description
  - `location` (object, optional): Geographical location information
  - `parentId` (string, optional): Parent property ID for hierarchical
    organization
  - `metadata` (object, optional): Additional property metadata
- **Returns:**
  - `property` (object): Created property information

#### 13.4 `update_property`

- **Description:** Update a property's information
- **Parameters:**
  - `property_id` (string, required): Property ID
  - `updates` (object, required): Fields to update
- **Returns:**
  - `property` (object): Updated property information

#### 13.5 `delete_property`

- **Description:** Delete or deactivate a property
- **Parameters:**
  - `property_id` (string, required): Property ID
  - `deactivateOnly` (boolean, optional): Only deactivate instead of delete
  - `force` (boolean, optional): Force deletion even if property has associated
    data
- **Returns:**
  - `success` (boolean): Operation success status

#### 13.6 `switch_property_context`

- **Description:** Change the user's current active property context
- **Parameters:**
  - `property_id` (string, required): Property ID to switch to
- **Returns:**
  - `success` (boolean): Operation success status
  - `property` (object): Basic information about the selected property

#### 13.7 `get_property_hierarchy`

- **Description:** Get the hierarchical structure of accessible properties
- **Parameters:**
  - `rootPropertyId` (string, optional): Root property to start hierarchy from
  - `depth` (integer, optional): Maximum depth to retrieve
  - `includeInactive` (boolean, optional): Include inactive properties
- **Returns:**
  - `hierarchy` (array): Hierarchical structure of property objects

#### 13.8 `get_user_property_permissions`

- **Description:** Get a user's permissions for a specific property
- **Parameters:**
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - `property_id` (string, required): Property ID
- **Returns:**
  - `permissions` (object): Detailed permissions for the specified property

#### 13.9 `update_user_property_permissions`

- **Description:** Update a user's permissions for a specific property
- **Parameters:**
  - `userId` (string, required): User ID
  - `property_id` (string, required): Property ID
  - `permissions` (object, required): New permission settings
- **Returns:**
  - `success` (boolean): Operation success status
  - `permissions` (object): Updated permissions

#### 13.10 `compare_properties`

- **Description:** Generate comparative metrics between properties
- **Parameters:**
  - `propertyIds` (array, required): Array of property IDs to compare
  - `metrics` (array, required): Array of metric identifiers to compare
  - `timeframe` (string, optional): Timeframe for metrics calculation
- **Returns:**
  - `comparison` (object): Comparative data for specified metrics across
    properties

## Updated Tool Examples by Category

Here are examples of how existing tools in each category would be updated to
support property context:

### 1. User & Authentication Management

#### 1.3 `get_user_profile` (Updated)

- **Description:** Get detailed user profile information
- **Parameters:**
  - `userId` (string, optional): User ID (defaults to authenticated user)
  - **No property_id needed** (user profile is global, but will include property
    permissions)
- **Returns:**
  - `profile` (object): Detailed user profile information
  - `propertyAccess` (array): List of properties the user has access to with
    role information

#### 1.5 `list_users` (Updated)

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

### 2. Farm Management

#### 2.1 `get_crop_types` (Updated)

- **Description:** Get list of crop types with their growing parameters
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `includeInactive` (boolean, optional): Include inactive crop types
  - `includeGlobal` (boolean, optional): Include global crop types available to
    all properties
- **Returns:**
  - `crops` (array): List of crop type objects with details

#### 2.5 `get_farm_zones` (Updated)

- **Description:** Get list of farm zones/areas
- **Parameters:**
  - `property_id` (string, optional): Property ID (defaults to user's current
    active property)
  - `includeInactive` (boolean, optional): Include inactive zones
- **Returns:**
  - `zones` (array): List of zone objects with details

### 3. Production Management

#### 3.1 `create_production_batch` (Updated)

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

#### 3.3 `list_production_batches` (Updated)

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
  - `batches` (array): List of production batch objects
  - `total` (integer): Total count of matching batches

### New Cross-Property Variants

#### 3.12 `list_production_batches_cross_property` (New)

- **Description:** List production batches across multiple properties with
  aggregation options
- **Parameters:**
  - `property_ids` (array, required): Array of property IDs to include
  - `status` (string, optional): Filter by status
  - `cropId` (string, optional): Filter by crop type
  - `startDateFrom` (string, optional): Filter by start date range
  - `startDateTo` (string, optional): Filter by start date range
  - `aggregateBy` (string, optional): Aggregate results by property, crop,
    status, etc.
  - `limit` (integer, optional): Maximum number of results
  - `offset` (integer, optional): Pagination offset
- **Returns:**
  - `batches` (array): List of production batch objects with property
    information
  - `total` (integer): Total count of matching batches
  - `aggregations` (object, conditional): Aggregated statistics if requested

## Implementation Notes

1. **Conditionality of property_id Parameter**:

   - For most operational tools (creating/updating entities): Required, with
     default to current context
   - For listing/viewing tools: Optional, with default to current context
   - For global tools (user management, global settings): Not applicable
   - For cross-property tools: Required array of property_ids

2. **Error Handling**:

   - If an operation is attempted on a property the user doesn't have access to,
     return an error with code 4003 (Property Access Denied)
   - If property_id is required but not provided and no default context exists,
     return error with code 4002 (Property Context Required)
   - For cross-property operations, if user doesn't have access to one or more
     specified properties, return error with code 4004 (Partial Property Access
     Denied) with details about which properties were inaccessible

3. **Permissions**:
   - Each property-specific operation requires appropriate permissions for that
     property
   - Cross-property operations require appropriate permissions for all
     referenced properties
   - Global operations require appropriate global role
