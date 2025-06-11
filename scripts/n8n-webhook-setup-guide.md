# n8n Webhook Setup Guide for Verding Agent

## Overview
This guide covers setting up webhook endpoints in n8n to enable external systems to communicate with the Verding agent. Webhooks allow real-time integration between your applications and the AI agent.

## Webhook Architecture

```
External System → n8n Webhook → Agent Processing → Database → Response
```

## Setting Up Webhooks in n8n

### 1. Import the Starter Workflow
1. In your n8n Cloud account, go to **Workflows**
2. Click **Import from File**
3. Upload `scripts/n8n-verding-starter-workflow.json`
4. The workflow will be imported with a webhook node already configured

### 2. Configure the Webhook Node
1. Open the imported workflow
2. Click on the **Agent Webhook** node
3. Configure:
   - **HTTP Method**: `POST`
   - **Path**: `verding-agent` (or customize as needed)
   - **Authentication**: None (for testing) or configure as needed
   - **Response Mode**: `Respond to Webhook`

### 3. Activate the Workflow
1. Click the **Active** toggle in the top-right corner
2. The webhook will become available immediately
3. Note the webhook URL provided by n8n

## Webhook URL Format

Your webhook URL will look like:
```
https://[your-n8n-instance].app.n8n.cloud/webhook/verding-agent
```

Example:
```
https://verdingagent.app.n8n.cloud/webhook/verding-agent
```

## Webhook Payload Format

### Request Format
Send POST requests with JSON payload:

```json
{
  "message": "Hello, I need help with my microgreens farm",
  "user_id": "user123",
  "property_id": "prop456",
  "context": {
    "channel": "web",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Response Format
The webhook returns:

```json
{
  "success": true,
  "response": "I'd be happy to help with your microgreens farm! What specific assistance do you need?",
  "context": {
    "user": {
      "id": "user123",
      "message": "Hello, I need help with my microgreens farm",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "property": {
      "id": "prop456",
      "available_properties": [...]
    },
    "system": {
      "platform": "verding",
      "version": "0.1.0",
      "capabilities": [...]
    }
  },
  "timestamp": "2024-01-15T10:30:05Z"
}
```

## Testing Webhooks

### 1. Using curl
```bash
curl -X POST https://your-n8n-instance.app.n8n.cloud/webhook/verding-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test message",
    "user_id": "test_user",
    "property_id": "test_property"
  }'
```

### 2. Using the Test Script
Run the provided test script:
```bash
node scripts/test-webhook.js
```

### 3. Using Postman
1. Create a new POST request
2. Set URL to your webhook endpoint
3. Set Content-Type header to `application/json`
4. Add the JSON payload in the body
5. Send the request

## Webhook Security

### 1. Authentication Options

#### API Key Authentication
Add to webhook node configuration:
```json
{
  "authentication": "headerAuth",
  "headerAuth": {
    "name": "X-API-Key",
    "value": "your-secret-api-key"
  }
}
```

#### Bearer Token Authentication
```json
{
  "authentication": "headerAuth",
  "headerAuth": {
    "name": "Authorization",
    "value": "Bearer your-secret-token"
  }
}
```

### 2. IP Whitelisting
Configure in n8n Cloud settings:
- Go to **Settings** → **Security**
- Add allowed IP addresses
- Restrict webhook access to trusted sources

### 3. HTTPS Only
- n8n Cloud provides HTTPS by default
- Never use HTTP for production webhooks
- Validate SSL certificates in client applications

## Integration Examples

### 1. Web Application Integration
```javascript
// Frontend JavaScript
async function sendToAgent(message, userId, propertyId) {
  try {
    const response = await fetch('https://your-n8n-instance.app.n8n.cloud/webhook/verding-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key'
      },
      body: JSON.stringify({
        message: message,
        user_id: userId,
        property_id: propertyId,
        context: {
          channel: 'web',
          timestamp: new Date().toISOString()
        }
      })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Agent communication failed:', error);
    return 'Sorry, I\'m having trouble connecting right now.';
  }
}
```

### 2. Mobile App Integration
```javascript
// React Native
import { Platform } from 'react-native';

const sendToAgent = async (message, userId, propertyId) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        'User-Agent': `VerdingApp/${Platform.OS}`
      },
      body: JSON.stringify({
        message,
        user_id: userId,
        property_id: propertyId,
        context: {
          channel: 'mobile',
          platform: Platform.OS,
          timestamp: new Date().toISOString()
        }
      })
    });
    
    return await response.json();
  } catch (error) {
    throw new Error(`Agent communication failed: ${error.message}`);
  }
};
```

### 3. Backend API Integration
```javascript
// Node.js Express middleware
const axios = require('axios');

const agentMiddleware = async (req, res, next) => {
  if (req.body.needsAgent) {
    try {
      const agentResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
        message: req.body.message,
        user_id: req.user.id,
        property_id: req.user.currentProperty,
        context: {
          channel: 'api',
          endpoint: req.path,
          timestamp: new Date().toISOString()
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.N8N_API_KEY
        }
      });
      
      req.agentResponse = agentResponse.data;
    } catch (error) {
      console.error('Agent integration failed:', error);
      req.agentResponse = { error: 'Agent unavailable' };
    }
  }
  next();
};
```

## Monitoring and Debugging

### 1. n8n Execution Logs
- Go to **Executions** in your n8n workflow
- View detailed logs for each webhook call
- Check for errors in individual nodes

### 2. Webhook Testing
- Use n8n's built-in webhook testing
- Monitor response times and success rates
- Set up alerts for failed executions

### 3. Error Handling
The workflow includes error handling for:
- Invalid JSON payloads
- Missing required fields
- Database connection failures
- AI service unavailability

## Troubleshooting

### Common Issues:

#### Webhook Not Responding
- Check if the workflow is active
- Verify the webhook URL is correct
- Ensure n8n instance is running

#### 404 Not Found
- Verify the webhook path matches your configuration
- Check if the workflow was imported correctly
- Ensure the webhook node is properly configured

#### 500 Internal Server Error
- Check n8n execution logs
- Verify all credentials are configured
- Test individual nodes in the workflow

#### Timeout Errors
- Check if Supabase is responding
- Verify OpenAI API is accessible
- Consider increasing timeout settings

## Performance Optimization

### 1. Caching
- Implement response caching for common queries
- Cache user context and property data
- Use n8n's memory storage for temporary data

### 2. Rate Limiting
- Configure rate limits in n8n
- Implement client-side request throttling
- Monitor API usage and costs

### 3. Async Processing
- Use n8n's queue system for heavy operations
- Implement webhook acknowledgment patterns
- Consider background processing for complex tasks

## Next Steps

After webhook setup:
1. Test the webhook with sample data
2. Integrate with your frontend applications
3. Set up monitoring and alerting
4. Configure production security settings
5. Document your specific webhook endpoints

## Support

For webhook issues:
1. Check n8n execution logs first
2. Verify all credentials and configurations
3. Test with simple payloads before complex ones
4. Consult n8n documentation for advanced features 