# n8n Monitoring and Alerting Setup Guide

## Overview

This guide provides comprehensive monitoring and alerting solutions for n8n workflows in the Verding project, ensuring operational visibility and proactive issue detection.

## 1. Monitoring Architecture

### Core Components
- **Execution Monitoring**: Track workflow success/failure rates
- **Performance Monitoring**: Monitor execution times and resource usage
- **Error Tracking**: Centralized error collection and analysis
- **Health Checks**: System availability and connectivity monitoring
- **Resource Monitoring**: Memory, CPU, and storage utilization

### Data Flow
```
n8n Workflows → Monitoring Nodes → Supabase Logs → Dashboard/Alerts
```

## 2. Database Schema for Monitoring

### Execution Logs Table
```sql
CREATE TABLE execution_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id TEXT NOT NULL,
  workflow_name TEXT NOT NULL,
  execution_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'timeout', 'cancelled')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_ms INTEGER,
  input_data JSONB,
  output_data JSONB,
  error_details JSONB,
  node_count INTEGER,
  property_id UUID REFERENCES properties(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_execution_logs_workflow_id ON execution_logs(workflow_id);
CREATE INDEX idx_execution_logs_status ON execution_logs(status);
CREATE INDEX idx_execution_logs_created_at ON execution_logs(created_at);
CREATE INDEX idx_execution_logs_property_id ON execution_logs(property_id);
```

### Performance Metrics Table
```sql
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT NOT NULL,
  workflow_id TEXT,
  execution_id TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- Indexes
CREATE INDEX idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics(timestamp);
```

### System Health Table
```sql
CREATE TABLE system_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('healthy', 'degraded', 'down')),
  response_time_ms INTEGER,
  error_message TEXT,
  last_check TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- Unique constraint for latest status
CREATE UNIQUE INDEX idx_system_health_service ON system_health(service_name);
```

## 3. Monitoring Workflow Templates

### 3.1 Execution Monitor Workflow

```json
{
  "name": "Verding Execution Monitor",
  "nodes": [
    {
      "parameters": {},
      "id": "execution-trigger",
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [240, 300],
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "minutesInterval": 5
            }
          ]
        }
      }
    },
    {
      "parameters": {
        "operation": "select",
        "tableId": "execution_logs",
        "filterType": "manual",
        "matchAny": false,
        "conditions": {
          "conditions": [
            {
              "keyName": "created_at",
              "condition": "gte",
              "keyValue": "={{ new Date(Date.now() - 5 * 60 * 1000).toISOString() }}"
            }
          ]
        }
      },
      "id": "get-recent-executions",
      "name": "Get Recent Executions",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "jsCode": "// Calculate metrics from recent executions\nconst executions = $input.all();\n\nconst metrics = {\n  total_executions: executions.length,\n  successful_executions: executions.filter(e => e.json.status === 'success').length,\n  failed_executions: executions.filter(e => e.json.status === 'error').length,\n  avg_duration: 0,\n  error_rate: 0\n};\n\nif (executions.length > 0) {\n  const durations = executions\n    .filter(e => e.json.duration_ms)\n    .map(e => e.json.duration_ms);\n  \n  metrics.avg_duration = durations.length > 0 \n    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)\n    : 0;\n  \n  metrics.error_rate = Math.round((metrics.failed_executions / metrics.total_executions) * 100);\n}\n\n// Check for alerts\nconst alerts = [];\n\nif (metrics.error_rate > 20) {\n  alerts.push({\n    type: 'high_error_rate',\n    severity: 'critical',\n    message: `Error rate is ${metrics.error_rate}% (threshold: 20%)`,\n    value: metrics.error_rate\n  });\n}\n\nif (metrics.avg_duration > 30000) {\n  alerts.push({\n    type: 'slow_execution',\n    severity: 'warning',\n    message: `Average execution time is ${metrics.avg_duration}ms (threshold: 30s)`,\n    value: metrics.avg_duration\n  });\n}\n\nreturn [{\n  json: {\n    timestamp: new Date().toISOString(),\n    metrics,\n    alerts,\n    period: '5_minutes'\n  }\n}];"
      },
      "id": "calculate-metrics",
      "name": "Calculate Metrics",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [680, 300]
    },
    {
      "parameters": {
        "operation": "insert",
        "tableId": "performance_metrics",
        "data": "={{ {\n  metric_name: 'execution_summary',\n  metric_value: $json.metrics.total_executions,\n  metric_unit: 'count',\n  timestamp: $json.timestamp,\n  metadata: $json.metrics\n} }}"
      },
      "id": "log-metrics",
      "name": "Log Metrics",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [900, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.alerts.length }}",
              "rightValue": 0,
              "operator": {
                "type": "number",
                "operation": "gt"
              }
            }
          ],
          "combinator": "and"
        }
      },
      "id": "check-alerts",
      "name": "Check Alerts",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [900, 500]
    },
    {
      "parameters": {
        "channel": "#verding-alerts",
        "text": "🚨 *Verding System Alert*\n\n{{ $json.alerts.map(alert => `• ${alert.severity.toUpperCase()}: ${alert.message}`).join('\\n') }}\n\n*Metrics Summary:*\n• Total Executions: {{ $json.metrics.total_executions }}\n• Success Rate: {{ 100 - $json.metrics.error_rate }}%\n• Avg Duration: {{ $json.metrics.avg_duration }}ms\n\nTime: {{ $json.timestamp }}"
      },
      "id": "send-alert",
      "name": "Send Alert",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [1120, 500]
    }
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Get Recent Executions",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Recent Executions": {
      "main": [
        [
          {
            "node": "Calculate Metrics",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Calculate Metrics": {
      "main": [
        [
          {
            "node": "Log Metrics",
            "type": "main",
            "index": 0
          },
          {
            "node": "Check Alerts",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check Alerts": {
      "main": [
        [
          {
            "node": "Send Alert",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

### 3.2 Health Check Workflow

```json
{
  "name": "Verding Health Check",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "minutesInterval": 2
            }
          ]
        }
      },
      "id": "health-trigger",
      "name": "Health Check Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "jsCode": "// Define services to check\nconst services = [\n  {\n    name: 'supabase_api',\n    url: 'https://peyneptmzomwjcbulyvf.supabase.co/rest/v1/',\n    headers: {\n      'apikey': process.env.SUPABASE_ANON_KEY,\n      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`\n    }\n  },\n  {\n    name: 'openai_api',\n    url: 'https://api.openai.com/v1/models',\n    headers: {\n      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`\n    }\n  }\n];\n\nreturn services.map(service => ({ json: service }));"
      },
      "id": "prepare-services",
      "name": "Prepare Services",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "url": "={{ $json.url }}",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": "={{ Object.entries($json.headers).map(([key, value]) => ({ name: key, value })) }}"\n        },
        "options": {\n          "timeout": 10000,\n          "retry": {\n            "enabled": true,\n            "maxTries": 2\n          }\n        }\n      },\n      "id": "health-check-request",\n      "name": "Health Check Request",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4.2,\n      "position": [680, 300],\n      "onError": "continueRegularOutput"\n    },\n    {\n      "parameters": {\n        "jsCode": "// Process health check results\nconst results = $input.all();\nconst healthData = [];\n\nfor (let i = 0; i < results.length; i++) {\n  const result = results[i];\n  const service = result.json;\n  \n  let status = 'healthy';\n  let responseTime = null;\n  let errorMessage = null;\n  \n  if (result.error) {\n    status = 'down';\n    errorMessage = result.error.message || 'Unknown error';\n  } else {\n    responseTime = result.json.response_time || null;\n    if (responseTime > 5000) {\n      status = 'degraded';\n    }\n  }\n  \n  healthData.push({\n    service_name: service.name,\n    status,\n    response_time_ms: responseTime,\n    error_message: errorMessage,\n    last_check: new Date().toISOString(),\n    metadata: {\n      url: service.url,\n      timestamp: new Date().toISOString()\n    }\n  });\n}\n\nreturn healthData.map(data => ({ json: data }));"
      },
      "id": "process-results",
      "name": "Process Results",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 300]
    },
    {
      "parameters": {
        "operation": "upsert",
        "tableId": "system_health",
        "data": "={{ $json }}",
        "onConflict": "service_name"
      },
      "id": "update-health-status",
      "name": "Update Health Status",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [1120, 300]
    }
  ],
  "connections": {
    "Health Check Trigger": {
      "main": [
        [
          {
            "node": "Prepare Services",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare Services": {
      "main": [
        [
          {
            "node": "Health Check Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Health Check Request": {
      "main": [
        [
          {
            "node": "Process Results",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Process Results": {
      "main": [
        [
          {
            "node": "Update Health Status",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## 4. Alert Configuration

### Alert Thresholds
```javascript
const ALERT_THRESHOLDS = {
  error_rate: {
    warning: 10,    // 10% error rate
    critical: 20    // 20% error rate
  },
  response_time: {
    warning: 15000,  // 15 seconds
    critical: 30000  // 30 seconds
  },
  execution_count: {
    warning: 100,    // Low activity warning
    critical: 0      // No executions
  },
  system_health: {
    degraded: 'warning',
    down: 'critical'
  }
};
```

### Notification Channels
1. **Slack Integration**
   - Channel: `#verding-alerts`
   - Real-time notifications for critical issues
   - Daily summary reports

2. **Email Alerts**
   - Critical issues only
   - Escalation after 15 minutes

3. **Database Logging**
   - All alerts logged to `alert_history` table
   - Retention: 90 days

## 5. Dashboard Queries

### Real-time System Status
```sql
-- Current system health
SELECT 
  service_name,
  status,
  response_time_ms,
  last_check,
  CASE 
    WHEN last_check < NOW() - INTERVAL '5 minutes' THEN 'stale'
    ELSE 'current'
  END as data_freshness
FROM system_health
ORDER BY service_name;

-- Execution metrics (last 24 hours)
SELECT 
  DATE_TRUNC('hour', created_at) as hour,
  COUNT(*) as total_executions,
  COUNT(*) FILTER (WHERE status = 'success') as successful,
  COUNT(*) FILTER (WHERE status = 'error') as failed,
  ROUND(AVG(duration_ms)) as avg_duration_ms,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'error')::float / COUNT(*)) * 100, 
    2
  ) as error_rate_percent
FROM execution_logs 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at)
ORDER BY hour DESC;
```

### Performance Trends
```sql
-- Weekly performance trends
SELECT 
  DATE_TRUNC('day', timestamp) as day,
  metric_name,
  AVG(metric_value) as avg_value,
  MIN(metric_value) as min_value,
  MAX(metric_value) as max_value
FROM performance_metrics 
WHERE timestamp >= NOW() - INTERVAL '7 days'
GROUP BY DATE_TRUNC('day', timestamp), metric_name
ORDER BY day DESC, metric_name;
```

## 6. Monitoring Best Practices

### Data Retention
- **Execution Logs**: 30 days detailed, 1 year aggregated
- **Performance Metrics**: 90 days detailed, 2 years aggregated  
- **System Health**: 7 days detailed, 30 days aggregated
- **Alert History**: 90 days

### Performance Optimization
- Use database indexes for time-based queries
- Implement data partitioning for large tables
- Regular cleanup of old monitoring data
- Batch insert operations for high-volume metrics

### Security Considerations
- Sanitize sensitive data in logs
- Encrypt monitoring data at rest
- Implement access controls for monitoring dashboards
- Regular rotation of monitoring credentials

## 7. Implementation Steps

### Step 1: Database Setup
```bash
# Run the monitoring schema SQL scripts
psql -h peyneptmzomwjcbulyvf.supabase.co -U postgres -d postgres -f monitoring-schema.sql
```

### Step 2: Import Monitoring Workflows
1. Import `Verding Execution Monitor` workflow
2. Import `Verding Health Check` workflow
3. Configure credentials (Slack, Supabase)
4. Activate workflows

### Step 3: Configure Alerts
1. Set up Slack webhook for alerts
2. Configure email notifications
3. Test alert thresholds
4. Document escalation procedures

### Step 4: Dashboard Setup
1. Create monitoring dashboard in Supabase
2. Set up automated reports
3. Configure user access
4. Test all monitoring features

## 8. Troubleshooting

### Common Issues
1. **Missing Metrics**: Check workflow execution logs
2. **False Alerts**: Adjust threshold values
3. **Stale Data**: Verify scheduler triggers
4. **Performance Issues**: Optimize database queries

### Monitoring the Monitors
- Set up meta-monitoring for monitoring workflows
- Alert if monitoring data becomes stale
- Regular health checks of monitoring infrastructure
- Backup monitoring configurations

## 9. Maintenance

### Weekly Tasks
- Review alert thresholds
- Check monitoring data quality
- Update dashboard queries
- Clean up old monitoring data

### Monthly Tasks
- Performance review of monitoring system
- Update monitoring documentation
- Review and optimize database indexes
- Test disaster recovery procedures

This comprehensive monitoring setup ensures full visibility into the Verding n8n infrastructure with proactive alerting and detailed performance tracking. 