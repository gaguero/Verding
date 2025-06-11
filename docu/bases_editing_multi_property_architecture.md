# BASES Editing Strategy for Multi-Property Architecture

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## Overview

This document outlines the systematic approach we will take to update all our
architectural specifications to incorporate the multi-property architecture. It
provides concrete guidelines for how to modify each specification type, ensuring
consistent implementation of property context across the entire system.

## General Update Principles

1. **Consistency Across Specifications**

   - All specifications must be updated to maintain a consistent approach to
     property handling
   - Property context should be addressed in similar patterns across all
     documents
   - Terminology must be consistent (e.g., "property_id", "property context",
     "property-scoped")

2. **Comprehensive Coverage**

   - Every specification must be reviewed and updated
   - No component should be left without proper property context handling
   - All interface points between components must maintain property context

3. **Backward Compatibility**
   - Updates should maintain compatibility with existing BASES documentation
     where possible
   - Clearly mark additions vs. modifications to original concepts
   - Preserve the intent of original specifications while extending them

## MCP Specification Updates

### Standard Property Parameter Addition

The MCP specification requires the most extensive updates. Each tool should be
modified to include property context:

1. **Base Protocol Updates**

   - Add `property_id` to standard request structure
   - Define property context inheritance between related requests
   - Specify default behavior when property_id is omitted

2. **Tool Parameter Updates**

   - Add `property_id` parameter to relevant tools:
     - Type: string (UUID)
     - Required: conditional (see below)
     - Description: "Unique identifier for the property context. If omitted,
       uses the user's current active property context."

3. **Parameter Requirements Logic**

   - Tools operating on global data: property_id should be optional
   - Tools operating on property-specific data: property_id required
   - Tools with cross-property capabilities: property_id should accept array of
     IDs

4. **Cross-Property Tool Variants**

   - For tools with cross-property capabilities, add dedicated cross-property
     variants
   - Example: `list_production_batches` and
     `list_production_batches_cross_property`
   - Cross-property variants should include aggregation options

5. **New Property Management Tools**
   - Add the new Property Management tools defined in the
     [Multi-Property Architecture](multi_property_architecture.md) document
   - Maintain consistent formatting with existing tools
   - Place these in a new category: "Property Management"

### Tool Category Updates

Different categories require different approaches:

1. **User & Authentication Management**

   - Add property context to user session information
   - Add property permissions to user profile
   - Update role management to include property-specific roles

2. **Farm Management**

   - Add property_id to all zone and crop management tools
   - Update batch operations to respect property boundaries
   - Add cross-property comparison capabilities

3. **Production Management**

   - Add property_id to all production batch operations
   - Add cross-property production scheduling tools
   - Ensure batch transfers maintain property context

4. **Inventory Management**

   - Add property_id to all inventory operations
   - Add cross-property inventory visibility tools
   - Update inventory transfer to handle cross-property movements

5. **Sales & Order Management**

   - Add property_id to all order operations
   - Add cross-property order fulfillment capabilities
   - Update customer order visibility across properties

6. **Customer Management**

   - Add property access information to customer profiles
   - Update visibility settings for cross-property customers
   - Add property context to communication tools

7. **Sensor & Device Management**

   - Add property_id to all device operations
   - Update device data aggregation for cross-property views
   - Add property-based device grouping

8. **Reporting & Analytics**

   - Add property filtering to all reports
   - Add cross-property comparison reports
   - Update dashboard tools to include property context

9. **System Administration**

   - Add property management admin tools
   - Update user permission tools for property-based permissions
   - Add property-level configuration options

10. **Notification & Alerts**

    - Add property context to all notifications
    - Add property-based notification routing
    - Update subscription tools for property-specific alerts

11. **Knowledge Management**

    - Add property context to knowledge base entries
    - Update search tools to respect property context
    - Add property-specific knowledge categories

12. **BUJO (Bullet Journal) Management**
    - Add property context to all BUJO entries
    - Update views to filter by property
    - Add cross-property task management

## Memory System Updates

1. **Schema Updates**

   - Add property_id field to memory records
   - Add property tag to vector embeddings
   - Update indexes to include property filtering

2. **Access Control Updates**

   - Update RLS policies to include property boundaries
   - Add property-based permission helper functions
   - Modify memory retrieval to respect property context

3. **Query Modifications**
   - Add property context to all memory queries
   - Optimize property-specific memory retrievals
   - Add cross-property memory search capabilities

## Messaging Platform Integration Updates

1. **Context Management**

   - Add property context to chat metadata
   - Update context switching commands
   - Add property indicators in chat interface

2. **Message Routing**
   - Update webhook processing to include property context
   - Add property-based message routing logic
   - Update group chat association with properties

## Monitoring Screens Updates

1. **Dashboard Framework**

   - Add property selector component
   - Update dashboard state to include property context
   - Add URL parameter for property context

2. **Widget Updates**
   - Add property context to widget configuration
   - Update data sources to include property filtering
   - Add multi-property comparison widgets

## n8n Agent Deployment Updates

1. **Workflow Modifications**

   - Add property context maintenance between nodes
   - Update entry point validation for property context
   - Add property-specific workflow branches

2. **Cross-Property Processing**
   - Add iterator patterns for multi-property operations
   - Update error handling for property boundaries
   - Add property validation in cross-property workflows

## Implementation Approach

For each specification document, we will:

1. First create a temporary working copy
2. Make all necessary property-related updates
3. Review for consistency and completeness
4. Create a clear pull request detailing all changes
5. Incorporate approved changes into the main document

## Testing and Validation

After updating all specifications, we will:

1. Cross-reference all documents for consistency
2. Validate property context flows between components
3. Verify that no functionality gaps exist
4. Ensure property boundaries are properly enforced
5. Test cross-property scenarios for completeness
