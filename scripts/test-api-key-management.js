#!/usr/bin/env node

/**
 * Verding API Key Management Test Suite
 * 
 * This script tests the API key management system including:
 * - Key generation and validation
 * - Security monitoring
 * - Environment configuration
 * - Access logging
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://peyneptmzomwjcbulyvf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleW5lcHRtem9td2pjYnVseXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg2NzYsImV4cCI6MjA2NDIwNDY3Nn0.Y08AAEtcEbiQhFtoYmYpN1IsULL33YxJNS2EQAbpS1U';

// Console colors
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

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function testApiKeyManagement() {
    log('\n🔑 VERDING API KEY MANAGEMENT TEST SUITE', 'cyan');
    log('=' * 60, 'cyan');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const testResults = {
        passed: 0,
        failed: 0,
        warnings: 0
    };
    
    try {
        // Test 1: Environment Configuration Status
        log('\n📋 Test 1: Environment Configuration Status', 'blue');
        try {
            const { data: configStatus, error } = await supabase.rpc('get_environment_config_status');
            
            if (error) {
                log(`❌ Failed to get environment config status: ${error.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ Environment configuration status retrieved successfully', 'green');
                
                configStatus.forEach(item => {
                    const statusColor = item.status === 'CONFIGURED' ? 'green' : 
                                      item.status === 'REQUIRED' ? 'yellow' : 'red';
                    log(`   ${item.config_item}: ${item.status} - ${item.description}`, statusColor);
                    
                    if (item.status === 'REQUIRED') {
                        testResults.warnings++;
                    }
                });
                
                testResults.passed++;
            }
        } catch (err) {
            log(`❌ Environment config test failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test 2: API Key Generation Functions
        log('\n🔧 Test 2: API Key Generation Functions', 'blue');
        try {
            const { data: generatedKey, error } = await supabase.rpc('generate_api_key', { prefix: 'test' });
            
            if (error) {
                log(`❌ Failed to generate API key: ${error.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ API key generation function working', 'green');
                log(`   Generated key format: ${generatedKey.substring(0, 12)}...`, 'cyan');
                
                // Test key hashing
                const { data: hashedKey, error: hashError } = await supabase.rpc('hash_api_key', { api_key: generatedKey });
                
                if (hashError) {
                    log(`❌ Failed to hash API key: ${hashError.message}`, 'red');
                    testResults.failed++;
                } else {
                    log('✅ API key hashing function working', 'green');
                    log(`   Hash length: ${hashedKey.length} characters`, 'cyan');
                    testResults.passed++;
                }
                
                testResults.passed++;
            }
        } catch (err) {
            log(`❌ API key generation test failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test 3: API Key Validation
        log('\n🔍 Test 3: API Key Validation', 'blue');
        try {
            // Test with invalid key
            const { data: invalidResult, error } = await supabase.rpc('validate_api_key', { api_key: 'invalid_key_test' });
            
            if (error) {
                log(`❌ Failed to validate API key: ${error.message}`, 'red');
                testResults.failed++;
            } else {
                const validation = invalidResult[0];
                if (!validation.is_valid) {
                    log('✅ Invalid key correctly rejected', 'green');
                    testResults.passed++;
                } else {
                    log('❌ Invalid key incorrectly accepted', 'red');
                    testResults.failed++;
                }
            }
        } catch (err) {
            log(`❌ API key validation test failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test 4: Database Tables Structure
        log('\n🗄️  Test 4: Database Tables Structure', 'blue');
        try {
            // Check API key audit table
            const { data: auditTable, error: auditError } = await supabase
                .from('api_key_audit')
                .select('*')
                .limit(1);
            
            if (auditError && !auditError.message.includes('0 rows')) {
                log(`❌ API key audit table issue: ${auditError.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ API key audit table accessible', 'green');
                testResults.passed++;
            }
            
            // Check custom API keys table
            const { data: keysTable, error: keysError } = await supabase
                .from('custom_api_keys')
                .select('*')
                .limit(1);
            
            if (keysError && !keysError.message.includes('0 rows')) {
                log(`❌ Custom API keys table issue: ${keysError.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ Custom API keys table accessible', 'green');
                testResults.passed++;
            }
            
            // Check API access logs table
            const { data: logsTable, error: logsError } = await supabase
                .from('api_access_logs')
                .select('*')
                .limit(1);
            
            if (logsError && !logsError.message.includes('0 rows')) {
                log(`❌ API access logs table issue: ${logsError.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ API access logs table accessible', 'green');
                testResults.passed++;
            }
            
        } catch (err) {
            log(`❌ Database tables test failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test 5: Security Monitoring Functions
        log('\n🛡️  Test 5: Security Monitoring Functions', 'blue');
        try {
            // Test API key usage statistics
            const { data: usageStats, error: usageError } = await supabase.rpc('get_api_key_usage', { 
                p_property_id: null, 
                p_days: 7 
            });
            
            if (usageError) {
                log(`❌ Failed to get API key usage stats: ${usageError.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ API key usage statistics function working', 'green');
                log(`   Found ${usageStats.length} API keys in usage report`, 'cyan');
                testResults.passed++;
            }
            
            // Test security alerts
            const { data: securityAlerts, error: alertsError } = await supabase.rpc('get_api_security_alerts', { 
                p_property_id: null, 
                p_hours: 24 
            });
            
            if (alertsError) {
                log(`❌ Failed to get security alerts: ${alertsError.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ Security alerts function working', 'green');
                log(`   Found ${securityAlerts.length} security alerts`, 'cyan');
                testResults.passed++;
            }
            
        } catch (err) {
            log(`❌ Security monitoring test failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test 6: Environment File Validation
        log('\n📁 Test 6: Environment File Validation', 'blue');
        try {
            const fs = require('fs');
            const path = require('path');
            
            // Check if .env.local exists
            const envPath = '.env.local';
            if (fs.existsSync(envPath)) {
                log('✅ Development environment file exists', 'green');
                
                const envContent = fs.readFileSync(envPath, 'utf8');
                const requiredVars = [
                    'SUPABASE_URL',
                    'SUPABASE_ANON_KEY',
                    'JWT_SECRET',
                    'SESSION_SECRET',
                    'ENCRYPTION_KEY'
                ];
                
                const missingVars = [];
                requiredVars.forEach(varName => {
                    if (!envContent.includes(varName + '=')) {
                        missingVars.push(varName);
                    }
                });
                
                if (missingVars.length === 0) {
                    log('✅ All required environment variables present', 'green');
                    testResults.passed++;
                } else {
                    log(`⚠️  Missing environment variables: ${missingVars.join(', ')}`, 'yellow');
                    testResults.warnings++;
                }
                
                // Check for placeholder values
                const placeholderPattern = /your_\w+_here/g;
                const placeholders = envContent.match(placeholderPattern);
                if (placeholders && placeholders.length > 0) {
                    log(`⚠️  Found ${placeholders.length} placeholder values that need to be replaced`, 'yellow');
                    testResults.warnings++;
                } else {
                    log('✅ No placeholder values found', 'green');
                }
                
                testResults.passed++;
            } else {
                log('❌ Development environment file not found', 'red');
                testResults.failed++;
            }
            
            // Check .gitignore
            const gitignorePath = '.gitignore';
            if (fs.existsSync(gitignorePath)) {
                const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
                if (gitignoreContent.includes('.env')) {
                    log('✅ .gitignore properly configured for environment files', 'green');
                    testResults.passed++;
                } else {
                    log('⚠️  .gitignore may not protect environment files', 'yellow');
                    testResults.warnings++;
                }
            } else {
                log('⚠️  .gitignore file not found', 'yellow');
                testResults.warnings++;
            }
            
        } catch (err) {
            log(`❌ Environment file validation failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test 7: Supabase Connection and Authentication
        log('\n🔗 Test 7: Supabase Connection and Authentication', 'blue');
        try {
            // Test basic connection
            const { data: connectionTest, error: connectionError } = await supabase
                .from('properties')
                .select('count')
                .limit(1);
            
            if (connectionError && !connectionError.message.includes('relation "properties" does not exist')) {
                log(`❌ Supabase connection failed: ${connectionError.message}`, 'red');
                testResults.failed++;
            } else {
                log('✅ Supabase connection successful', 'green');
                testResults.passed++;
            }
            
            // Test RLS policies
            const { data: rlsTest, error: rlsError } = await supabase
                .from('custom_api_keys')
                .select('*')
                .limit(1);
            
            if (rlsError) {
                if (rlsError.message.includes('RLS') || rlsError.message.includes('policy')) {
                    log('✅ RLS policies are active (access properly restricted)', 'green');
                    testResults.passed++;
                } else {
                    log(`❌ Unexpected RLS error: ${rlsError.message}`, 'red');
                    testResults.failed++;
                }
            } else {
                log('⚠️  RLS policies may not be properly configured', 'yellow');
                testResults.warnings++;
            }
            
        } catch (err) {
            log(`❌ Supabase connection test failed: ${err.message}`, 'red');
            testResults.failed++;
        }
        
        // Test Summary
        log('\n📊 TEST SUMMARY', 'magenta');
        log('=' * 40, 'magenta');
        log(`✅ Tests Passed: ${testResults.passed}`, 'green');
        log(`❌ Tests Failed: ${testResults.failed}`, 'red');
        log(`⚠️  Warnings: ${testResults.warnings}`, 'yellow');
        
        const totalTests = testResults.passed + testResults.failed;
        const successRate = totalTests > 0 ? ((testResults.passed / totalTests) * 100).toFixed(1) : 0;
        log(`📈 Success Rate: ${successRate}%`, successRate >= 80 ? 'green' : 'yellow');
        
        // Recommendations
        log('\n💡 RECOMMENDATIONS:', 'cyan');
        if (testResults.warnings > 0) {
            log('1. Replace placeholder values in .env.local with actual secrets', 'yellow');
            log('2. Obtain and configure SUPABASE_SERVICE_ROLE_KEY', 'yellow');
        }
        if (testResults.failed > 0) {
            log('3. Review and fix failed tests before proceeding', 'yellow');
        }
        log('4. Set up production environment variables in Railway', 'yellow');
        log('5. Configure CI/CD environment variables in GitHub Actions', 'yellow');
        log('6. Implement API key rotation schedule', 'yellow');
        log('7. Set up monitoring alerts for API usage', 'yellow');
        
        return {
            success: testResults.failed === 0,
            results: testResults,
            successRate: parseFloat(successRate)
        };
        
    } catch (error) {
        log(`❌ Test suite failed: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

// Run tests if called directly
if (require.main === module) {
    testApiKeyManagement()
        .then(result => {
            if (result.success) {
                log('\n🎉 API Key Management system is ready!', 'green');
                process.exit(0);
            } else {
                log('\n💥 API Key Management system needs attention', 'red');
                process.exit(1);
            }
        })
        .catch(error => {
            log(`❌ Test execution failed: ${error.message}`, 'red');
            process.exit(1);
        });
}

module.exports = { testApiKeyManagement }; 
