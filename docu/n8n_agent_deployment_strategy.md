# n8n Agent Deployment Strategy

**⚠️ CRITICAL: READ [PROJECT BRIEF](projectbrief.md) FIRST ⚠️** - The Project
Brief contains the complete Memory Bank navigation guide and reading order for
first interaction. Always start there after any memory reset.

## Overview

This document defines the deployment strategy for the Verding system's external
n8n agent, which will handle the Agent Core, NLP, BUJO, and Knowledge Base
workflows. The n8n agent will interact with the main Verding backend system
exclusively via MCP (Model Context Protocol). This document outlines our
approach to hosting, scaling, backup, version control, and security for the n8n
agent infrastructure.

**Multi-Property Architecture Considerations:** The n8n agent workflows are
designed to be property-context aware. This means workflows will receive,
maintain, and pass the relevant `property_id` when interacting with the main
backend via MCP or accessing the memory database. This ensures data isolation
and correct operation across multiple properties.

## Hosting Approach

### n8n Cloud Hosting (n8n.io)

We have decided to use n8n.com's cloud-hosted service for our n8n agent
deployment, with a monthly subscription payment model. This approach provides
several advantages:

1. **Managed Infrastructure**

   - Professional hosting by the n8n team
   - Automatic upgrades to latest n8n versions
   - Built-in monitoring and system health checks
   - Technical support from n8n specialists
   - No self-hosting infrastructure maintenance required

2. **Plan Selection**

   - We will utilize n8n Cloud Professional plan ($49/month per user as of
     specification writing)
   - This includes:
     - Unlimited workflows and executions
     - Multiple users with role-based access control
     - Additional nodes including AI capabilities
     - Webhook rate limiting
     - Priority support
   - Team members will have individual accounts with appropriate permissions

3. **Environment Configuration**
   - Cloud environment variables will store sensitive information:
     - MCP authentication tokens
     - API keys for external services
     - Database connection strings
   - n8n configuration will be set through their cloud dashboard
   - Custom domain will be configured for webhook endpoints
   - **Consideration for Property-Specific Configuration:** If certain workflow
     logic or external service connections need to vary per property, this may
     require storing property-specific configuration either within workflows
     (less ideal), in a centralized configuration service accessible by n8n, or
     fetched dynamically from the main backend via MCP.

## Scaling Strategy

### Workflow-Level Scaling

1. **Execution Concurrency**

   - Configure maximum concurrent executions for high-volume workflows
   - Implement queue management for message processing workflows
   - Set appropriate execution timeout values based on workflow complexity
   - Monitor execution time trends to identify optimization opportunities

2. **Webhook Management**

   - Implement webhook rate limiting for public endpoints
   - Use webhook authentication for secure communication
   - Configure webhook retry policies for failed connections
   - Implement webhook queue monitoring

3. **Workflow Modularization**
   - Break complex processes into multiple connected workflows
   - Use subworkflows for reusable components
   - Implement workflow queues for high-volume processes
   - Use execution batching for bulk operations
   - **Consider workflow design for cross-property operations:** Workflows
     designed for actions across multiple properties may require different
     scaling considerations than single-property workflows.

### Resource Optimization

1. **Database Connection Pooling**

   - Configure proper connection pooling for Supabase connections
   - Implement connection reuse patterns in workflows
   - Monitor and adjust pool size based on load patterns
   - **Ensure database connections are established with appropriate credentials
     for accessing property-scoped data.**

2. **Memory Management**

   - Optimize workflow data structures to minimize memory usage
   - Implement pagination for large data sets
   - Use stream processing for file operations
   - Monitor memory usage patterns and adjust as needed

3. **Execution Resource Allocation**
   - Allocate higher resources to critical workflows
   - Schedule resource-intensive workflows during off-peak hours
   - Implement graceful degradation for non-critical features during high load
   - **Implement graceful degradation for non-critical features during high
     load**

## Backup and Recovery Procedures

### Workflow Backups

1. **Export Mechanism**

   - Scheduled automatic exports of all workflows using n8n Cloud backup
     features
   - Storage of workflow exports in version-controlled repository (GitHub)
   - Documentation of dependencies and environment variables with each export
   - Retention of historical backup archives

2. **Credentials Management**
   - Separate secure storage of credential configurations
   - Documented procedure for credential recreation
   - Regular verification of credential integrity
   - Rotation schedule for API keys and tokens

### Recovery Process

1. **Disaster Recovery Plan**

   - Documented step-by-step recovery procedure
   - Defined Recovery Time Objective (RTO) of 4 hours
   - Assignment of recovery responsibilities to team members
   - Regular disaster recovery testing and validation

2. **Recovery Scenarios**

   - **Full Environment Recovery**

     1. Create new n8n Cloud instance if needed
     2. Import workflows from latest backup
     3. Configure environment variables and credentials
     4. Verify connections to external systems
     5. Activate workflows in priority order

   - **Partial Workflow Recovery**
     1. Import affected workflows from backup
     2. Compare with production configuration
     3. Test in isolation before activating
     4. Monitor closely after reactivation

3. **Data Continuity**
   - Implementation of idempotent workflow designs
   - Transaction logging for critical operations
   - Reconciliation procedures for interrupted processes
   - Data integrity verification after recovery

### n8n-Specific Recovery

- Manual Intervention Prompts: Request human intervention for critical recovery
  decisions

## Workflow Version Control

### GitHub Integration

1. **Repository Structure**

   - Dedicated repository for n8n workflows
   - Organized directory structure by functional area
   - README documentation for each workflow
   - Dependencies and environment variable documentation

2. **Export/Import Automation**
   - Scheduled automated exports from n8n Cloud to GitHub
   - GitHub Actions workflow for validation of exported workflows
   - Version tagging aligned with system releases
   - Pull request process for workflow changes

### Change Management

1. **Development Workflow**

   - Development of new workflows in separate n8n development environment
   - Peer review process for workflow changes
   - Testing procedures including integration tests
   - Documentation updates with each significant change

2. **Version Tracking**

   - Semantic versioning for workflow releases
   - Changelog maintenance for all workflow changes
   - Version tagging in GitHub repository
   - Deployment history documentation

3. **Rollback Procedures**
   - Documented process for workflow version rollback
   - Pre-rollback testing in development environment
   - Post-rollback verification checklist
   - Impact analysis template for major changes

## Security Framework

### Authentication and Authorization

1. **User Access Control**

   - Role-based access to n8n Cloud environment
   - Principle of least privilege for workflow access
   - Regular access review and audit
   - Documented onboarding/offboarding process

2. **Credential Security**
   - Encryption of all credentials in n8n Cloud
   - Separate storage of sensitive environment variables
   - Regular rotation of API keys and tokens
   - Restricted access to credential configuration

### Data Protection

1. **Data Handling Policies**

   - Minimization of sensitive data in workflow storage
   - Encryption of data at rest and in transit
   - Data retention policies aligned with legal requirements
   - Regular data protection impact assessments

2. **PII Processing Guidelines**
   - Identification of workflows processing PII
   - Implementation of data anonymization where possible
   - Strict access controls for PII-processing workflows
   - Compliance with relevant data protection regulations

### Vulnerability Management

1. **Security Updates**

   - Automatic updates of n8n Cloud environment
   - Regular review of node dependencies
   - Security patch verification
   - Vulnerability notification process

2. **Penetration Testing**
   - Annual security assessment of n8n environment
   - Remediation process for identified vulnerabilities
   - Security configuration review after major changes
   - Third-party security validation

## Integration with Main System

### MCP Communication

1. **Connection Management**

   - Secure, authenticated connections to backend MCP endpoint
   - Connection pooling for efficiency
   - Circuit breaker patterns for resilience
   - Connection monitoring and alerting
   - **Ensure MCP calls always include the correct `property_id` parameter.**

2. **Error Handling**
   - Implementation of standardized error handling patterns
   - Automatic retry for transient failures
   - Graceful degradation during connection issues
   - Error logging and reporting via MCP
   - **Handle MCP errors related to incorrect or unauthorized property access.**

### Deployment Coordination

1. **Release Synchronization**

   - Coordination of n8n workflow updates with backend releases
   - Feature flag usage for progressive rollout
   - Backward compatibility planning
   - Deployment window scheduling

2. **Integration Testing**
   - End-to-end testing procedures for new releases
   - Canary testing approach for critical workflows
   - Performance impact assessment
   - Rollback coordination process

## Monitoring and Maintenance

### Health Monitoring

1. **Performance Metrics**

   - Workflow execution time tracking
   - Error rate monitoring
   - Queue length and processing time metrics
   - Resource utilization monitoring

2. **Alerting System**
   - Critical failure notifications
   - Performance degradation alerts
   - Quota usage warnings
   - On-call rotation for alert response

### Maintenance Procedures

1. **Routine Maintenance**

   - Regular workflow efficiency review
   - Cleanup of execution history
   - Database query optimization
   - Documentation updates

2. **Scaling Adjustments**

   - Monthly capacity planning review
   - Resource allocation adjustments
   - Usage pattern analysis
   - Growth projection and planning

3. **Regular Performance Optimization**
   - Regular performance optimization

## Dashboard Monitoring Integration

### Real-Time Dashboard Data Processing

1. **Sensor Data Workflows**

   - Automated collection of sensor readings via scheduled workflows
   - Data validation and transformation for dashboard consumption
   - Property-specific sensor data routing based on property context
   - Real-time data broadcasting to connected dashboards via MCP
   - Error handling for sensor communication failures and data anomalies

2. **Operational Metrics Aggregation**

   - Scheduled workflows for calculating KPIs and performance metrics
   - Rolling averages and trend analysis for dashboard widgets
   - Property-scoped operational data processing
   - Automated comparison against targets and threshold values
   - Performance summary generation for dashboard consumption

3. **Task and Compliance Status Updates**
   - Real-time task status change broadcasting to dashboard widgets
   - Automated compliance record summary generation
   - Overdue task identification and priority recalculation
   - Property-aware task completion rate analytics
   - Proactive alert generation for dashboard notification widgets

### Dashboard Data Orchestration

1. **Widget Data Pipeline Management**

   - Scheduled data refresh workflows for each widget type
   - Property context validation for all dashboard data operations
   - Data caching strategies for frequently accessed dashboard metrics
   - Optimized query patterns for real-time dashboard updates
   - Error recovery for failed widget data retrieval operations

2. **Property Context Integration**
   - Property-specific data filtering in all dashboard workflows
   - Cross-property data aggregation for multi-property users
   - Property selector state management and context switching
   - Property permission validation for dashboard data access
   - Property-scoped alert and notification generation

### Real-Time Communication

1. **WebSocket Management via n8n**

   - WebSocket connection handling for live dashboard updates
   - Property-specific data channel management
   - Real-time sensor data broadcasting to connected dashboard clients
   - Automated connection recovery and error handling
   - Rate limiting and data throttling for dashboard performance

2. **Push Notification Workflows**
   - Critical alert generation and distribution workflows
   - Property-aware notification targeting and routing
   - Multi-channel notification delivery (dashboard, email, messaging)
   - Alert escalation workflows based on response times
   - Dashboard notification acknowledgment processing

### Dashboard Configuration Management

1. **Widget Configuration Processing**

   - User dashboard layout storage and retrieval workflows
   - Widget configuration validation and error handling
   - Property-scoped widget data source validation
   - Dashboard sharing and permission management workflows
   - Default dashboard template generation for new properties

2. **Performance Optimization for Dashboards**
   - Dashboard data query optimization and caching
   - Efficient polling strategies for near real-time updates
   - Resource allocation for high-frequency dashboard data requests
   - Load balancing for concurrent dashboard user sessions
   - Memory management for dashboard data processing workflows

## Implementation Roadmap

1. **Phase 1: Initial Setup**

   - n8n Cloud account creation and configuration
   - GitHub repository setup for workflow version control
   - Development and production environment configuration
   - Basic workflow templates creation

2. **Phase 2: Core Workflows Implementation**

   - Agent core communication workflows
   - NLP processing pipelines
   - BUJO management workflows
   - Memory system integration

3. **Phase 3: Security and Operations**

   - Security hardening and review
   - Monitoring and alerting setup
   - Backup and recovery testing
   - Documentation finalization

4. **Phase 4: Scaling and Optimization**
   - Performance testing and optimization
   - Advanced scaling configuration
   - Workflow modularization refinement
   - Integration stress testing

## 17. Handling Property Context in n8n Workflows

- **Receiving Property Context:**
  - For webhook triggers, the workflow should attempt to identify the property
    context based on the source (e.g., if a messaging group is linked to a
    property).
  - For internal triggers or scheduled workflows, the property context may be a
    predefined parameter or determined based on the task.
  - For user-initiated actions via messaging or GUI, the property ID should be
    passed as part of the initial data to the workflow.
- **Maintaining Property Context:**
  - The active `property_id` should be stored in workflow variables and passed
    between nodes that perform operations on property-specific data.
  - Subflows should receive property context as an input parameter.
- **Using Property Context:**
  - All MCP tool calls made from n8n workflows must include the `property_id` in
    the parameters.
  - All direct database operations on property-scoped tables (e.g., memory
    tables, operational data tables via direct connection if needed) must filter
    or specify the `property_id`.
  - Workflow logic may branch or adapt based on the specific property context.
- **Cross-Property Workflows:**
  - Workflows designed to operate on data from multiple properties will require
    explicit handling of `property_ids` (e.g., iterating over a list of property
    IDs).
