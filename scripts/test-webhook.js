#!/usr/bin/env node

/**
 * Webhook Testing Script for Verding Agent
 * 
 * This script tests the n8n webhook endpoint to ensure proper communication
 * between external systems and the Verding agent.
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
require('dotenv').config({ path: '.env.local' });

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n🔧 ${message}`, 'cyan');
  log('='.repeat(50), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

/**
 * Test webhook with a sample payload
 */
async function testWebhook(webhookUrl, payload, apiKey = null) {
  return new Promise((resolve) => {
    try {
      const url = new URL(webhookUrl);
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const postData = JSON.stringify(payload);
      
      const options = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'Verding-Webhook-Tester/1.0'
        }
      };
      
      // Add API key if provided
      if (apiKey) {
        options.headers['X-API-Key'] = apiKey;
      }
      
      logInfo(`Testing webhook: ${webhookUrl}`);
      logInfo(`Payload: ${JSON.stringify(payload, null, 2)}`);
      
      const req = client.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = {
              statusCode: res.statusCode,
              headers: res.headers,
              body: data
            };
            
            // Try to parse JSON response
            if (res.headers['content-type']?.includes('application/json')) {
              try {
                response.json = JSON.parse(data);
              } catch (e) {
                response.parseError = e.message;
              }
            }
            
            resolve(response);
          } catch (error) {
            resolve({
              error: `Response processing failed: ${error.message}`,
              statusCode: res.statusCode,
              body: data
            });
          }
        });
      });
      
      req.on('error', (error) => {
        resolve({
          error: `Request failed: ${error.message}`,
          code: error.code
        });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({
          error: 'Request timeout',
          timeout: true
        });
      });
      
      // Set timeout
      req.setTimeout(30000);
      
      req.write(postData);
      req.end();
      
    } catch (error) {
      resolve({
        error: `URL parsing failed: ${error.message}`
      });
    }
  });
}

/**
 * Validate webhook response
 */
function validateResponse(response) {
  logHeader('Response Validation');
  
  if (response.error) {
    logError(`Request Error: ${response.error}`);
    return false;
  }
  
  logInfo(`Status Code: ${response.statusCode}`);
  
  if (response.statusCode === 200) {
    logSuccess('Webhook responded successfully');
  } else if (response.statusCode === 404) {
    logError('Webhook not found (404) - Check URL and workflow activation');
    return false;
  } else if (response.statusCode === 500) {
    logError('Internal server error (500) - Check n8n execution logs');
    return false;
  } else {
    logWarning(`Unexpected status code: ${response.statusCode}`);
  }
  
  // Validate JSON response
  if (response.json) {
    logSuccess('Response is valid JSON');
    
    // Check for expected fields
    const expectedFields = ['success', 'response', 'timestamp'];
    const missingFields = expectedFields.filter(field => !(field in response.json));
    
    if (missingFields.length === 0) {
      logSuccess('Response contains all expected fields');
    } else {
      logWarning(`Missing expected fields: ${missingFields.join(', ')}`);
    }
    
    // Display response content
    logInfo('Response Content:');
    console.log(JSON.stringify(response.json, null, 2));
    
  } else if (response.parseError) {
    logError(`JSON parsing failed: ${response.parseError}`);
    logInfo(`Raw response: ${response.body}`);
    return false;
  } else {
    logWarning('Response is not JSON');
    logInfo(`Raw response: ${response.body}`);
  }
  
  return response.statusCode >= 200 && response.statusCode < 300;
}

/**
 * Run comprehensive webhook tests
 */
async function runTests() {
  log('🚀 VERDING WEBHOOK TESTING', 'bright');
  log('Testing n8n webhook integration for Verding Agent\n', 'cyan');
  
  // Get webhook URL from environment
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const apiKey = process.env.N8N_API_KEY;
  
  if (!webhookUrl) {
    logError('N8N_WEBHOOK_URL not found in environment variables');
    logInfo('Please set your webhook URL in .env.local');
    logInfo('Example: N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/verding-agent');
    return false;
  }
  
  if (webhookUrl.includes('your_') || webhookUrl.includes('_here')) {
    logWarning('Webhook URL appears to be a placeholder');
    logInfo('Please update N8N_WEBHOOK_URL with your actual webhook URL');
    return false;
  }
  
  // Test scenarios
  const testCases = [
    {
      name: 'Basic Agent Query',
      payload: {
        message: 'Hello, I need help with my microgreens farm',
        user_id: 'test_user_123',
        property_id: 'test_property_456'
      }
    },
    {
      name: 'Property Management Query',
      payload: {
        message: 'Show me my current sowing schedule',
        user_id: 'test_user_123',
        property_id: 'test_property_456',
        context: {
          channel: 'web',
          timestamp: new Date().toISOString()
        }
      }
    },
    {
      name: 'Minimal Payload',
      payload: {
        message: 'Test message'
      }
    }
  ];
  
  let successCount = 0;
  
  for (const testCase of testCases) {
    logHeader(`Test: ${testCase.name}`);
    
    const response = await testWebhook(webhookUrl, testCase.payload, apiKey);
    const success = validateResponse(response);
    
    if (success) {
      successCount++;
      logSuccess(`✅ ${testCase.name}: PASSED`);
    } else {
      logError(`❌ ${testCase.name}: FAILED`);
    }
  }
  
  // Summary
  logHeader('Test Results Summary');
  
  log(`📊 Results: ${successCount}/${testCases.length} tests passed`, 'bright');
  
  if (successCount === testCases.length) {
    logSuccess('\n🎉 All webhook tests passed! Your n8n integration is working correctly.');
  } else {
    logWarning('\n⚠️  Some tests failed. Check the following:');
    log('1. Ensure your n8n workflow is active');
    log('2. Verify all credentials are configured in n8n');
    log('3. Check n8n execution logs for detailed errors');
    log('4. Confirm the webhook URL is correct');
  }
  
  return successCount === testCases.length;
}

/**
 * Interactive webhook testing
 */
async function interactiveTest() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (prompt) => new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
  
  try {
    logHeader('Interactive Webhook Testing');
    
    const webhookUrl = await question('Enter webhook URL: ');
    const message = await question('Enter test message: ');
    const userId = await question('Enter user ID (optional): ') || 'test_user';
    const propertyId = await question('Enter property ID (optional): ') || 'test_property';
    
    const payload = {
      message,
      user_id: userId,
      property_id: propertyId,
      context: {
        channel: 'interactive_test',
        timestamp: new Date().toISOString()
      }
    };
    
    const response = await testWebhook(webhookUrl, payload);
    validateResponse(response);
    
  } finally {
    rl.close();
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--interactive') || args.includes('-i')) {
    await interactiveTest();
  } else if (args.includes('--help') || args.includes('-h')) {
    log('Verding Webhook Testing Script', 'bright');
    log('\nUsage:');
    log('  node scripts/test-webhook.js           # Run automated tests');
    log('  node scripts/test-webhook.js -i       # Interactive testing');
    log('  node scripts/test-webhook.js --help   # Show this help');
    log('\nEnvironment Variables:');
    log('  N8N_WEBHOOK_URL  # Your n8n webhook URL');
    log('  N8N_API_KEY      # Optional API key for authentication');
  } else {
    await runTests();
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    logError(`\nUnexpected error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  testWebhook,
  validateResponse,
  runTests
}; 
