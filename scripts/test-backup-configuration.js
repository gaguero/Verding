#!/usr/bin/env node

/**
 * Verding Backup Configuration Test
 * 
 * This script validates the backup configuration and monitoring functions
 * for the Verding microgreens management platform.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://peyneptmzomwjcbulyvf.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleW5lcHRtem9td2pjYnVseXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg2NzYsImV4cCI6MjA2NDIwNDY3Nn0.Y08AAEtcEbiQhFtoYmYpN1IsULL33YxJNS2EQAbpS1U';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test colors for console output
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

async function testBackupConfiguration() {
    log('\n🔧 VERDING BACKUP CONFIGURATION TEST', 'cyan');
    log('=' * 50, 'cyan');
    
    try {
        // Test 1: Backup Status Check
        log('\n📊 Testing backup status monitoring...', 'blue');
        const { data: backupStatus, error: statusError } = await supabase
            .rpc('get_backup_status');
        
        if (statusError) {
            log(`❌ Backup status check failed: ${statusError.message}`, 'red');
            return false;
        }
        
        log('✅ Backup status function working', 'green');
        backupStatus.forEach(metric => {
            const statusColor = metric.status.includes('WARNING') ? 'yellow' : 
                               metric.status.includes('ERROR') ? 'red' : 'green';
            log(`   ${metric.metric_name}: ${metric.metric_value} (${metric.status})`, statusColor);
        });
        
        // Test 2: Critical Data Metrics
        log('\n📈 Testing critical data metrics...', 'blue');
        const { data: dataMetrics, error: metricsError } = await supabase
            .rpc('get_critical_data_metrics');
        
        if (metricsError) {
            log(`❌ Data metrics check failed: ${metricsError.message}`, 'red');
            return false;
        }
        
        log('✅ Critical data metrics function working', 'green');
        const categories = {};
        dataMetrics.forEach(metric => {
            if (!categories[metric.data_category]) {
                categories[metric.data_category] = [];
            }
            categories[metric.data_category].push(metric);
        });
        
        Object.entries(categories).forEach(([category, tables]) => {
            log(`   ${category}:`, 'cyan');
            tables.slice(0, 3).forEach(table => {
                const priorityColor = table.backup_priority === 'CRITICAL' ? 'red' :
                                    table.backup_priority === 'HIGH' ? 'yellow' : 'green';
                log(`     ${table.table_name}: ${table.size_pretty} (${table.backup_priority})`, priorityColor);
            });
        });
        
        // Test 3: Storage Backup Metrics
        log('\n💾 Testing storage backup metrics...', 'blue');
        const { data: storageMetrics, error: storageError } = await supabase
            .rpc('get_storage_backup_metrics');
        
        if (storageError) {
            log(`❌ Storage metrics check failed: ${storageError.message}`, 'red');
            return false;
        }
        
        log('✅ Storage backup metrics function working', 'green');
        storageMetrics.forEach(bucket => {
            const strategyColor = bucket.backup_strategy.includes('CRITICAL') ? 'red' :
                                bucket.backup_strategy.includes('IMPORTANT') ? 'yellow' : 'green';
            log(`   ${bucket.bucket_name}: ${bucket.file_count} files, ${bucket.total_size_pretty}`, strategyColor);
            log(`     Strategy: ${bucket.backup_strategy}`, strategyColor);
            log(`     Retention: ${bucket.retention_period}`, 'cyan');
        });
        
        // Test 4: Backup Readiness Validation
        log('\n🔍 Testing backup readiness validation...', 'blue');
        const { data: readinessCheck, error: readinessError } = await supabase
            .rpc('validate_backup_readiness');
        
        if (readinessError) {
            log(`❌ Backup readiness check failed: ${readinessError.message}`, 'red');
            return false;
        }
        
        log('✅ Backup readiness validation working', 'green');
        let allChecksPass = true;
        readinessCheck.forEach(check => {
            const statusColor = check.status === 'ERROR' ? 'red' :
                              check.status === 'WARNING' ? 'yellow' : 'green';
            log(`   ${check.check_name}: ${check.status}`, statusColor);
            log(`     ${check.details}`, 'cyan');
            if (check.status !== 'OK') {
                log(`     Recommendation: ${check.recommendation}`, 'yellow');
                if (check.status === 'ERROR') allChecksPass = false;
            }
        });
        
        // Test 5: Backup Procedures Documentation
        log('\n📋 Testing backup procedures documentation...', 'blue');
        const { data: procedures, error: proceduresError } = await supabase
            .rpc('get_backup_procedures');
        
        if (proceduresError) {
            log(`❌ Backup procedures check failed: ${proceduresError.message}`, 'red');
            return false;
        }
        
        log('✅ Backup procedures documentation working', 'green');
        const procedureTypes = {};
        procedures.forEach(proc => {
            if (!procedureTypes[proc.procedure_type]) {
                procedureTypes[proc.procedure_type] = [];
            }
            procedureTypes[proc.procedure_type].push(proc);
        });
        
        Object.entries(procedureTypes).forEach(([type, procs]) => {
            log(`   ${type} Procedures:`, 'cyan');
            procs.forEach(proc => {
                const automationColor = proc.automation_level === 'Fully Automated' ? 'green' :
                                      proc.automation_level === 'Automated' ? 'yellow' : 'red';
                log(`     ${proc.procedure_name} (${proc.frequency})`, automationColor);
            });
        });
        
        // Test 6: Backup Dashboard View
        log('\n📊 Testing backup dashboard view...', 'blue');
        const { data: dashboard, error: dashboardError } = await supabase
            .from('backup_dashboard')
            .select('*');
        
        if (dashboardError) {
            log(`❌ Backup dashboard check failed: ${dashboardError.message}`, 'red');
            return false;
        }
        
        log('✅ Backup dashboard view working', 'green');
        dashboard.forEach(item => {
            const priorityColor = item.priority === 'HIGH' ? 'red' :
                                item.priority === 'MEDIUM' ? 'yellow' : 'green';
            log(`   ${item.component}: ${item.size} (${item.priority})`, priorityColor);
            log(`     Current: ${item.current_strategy}`, 'cyan');
            log(`     Recommendation: ${item.recommendation}`, 'yellow');
        });
        
        // Summary
        log('\n📋 BACKUP CONFIGURATION SUMMARY', 'magenta');
        log('=' * 40, 'magenta');
        
        if (allChecksPass) {
            log('✅ All backup configuration checks passed!', 'green');
            log('✅ Monitoring functions operational', 'green');
            log('✅ Storage buckets properly configured', 'green');
            log('✅ Backup procedures documented', 'green');
        } else {
            log('⚠️  Some backup configuration issues detected', 'yellow');
            log('   Review the warnings and errors above', 'yellow');
        }
        
        // Recommendations
        log('\n🎯 NEXT STEPS:', 'cyan');
        log('1. Consider enabling PITR for 2-minute RPO', 'yellow');
        log('2. Set up external storage sync for critical files', 'yellow');
        log('3. Implement automated backup monitoring', 'yellow');
        log('4. Schedule quarterly recovery testing', 'yellow');
        
        return allChecksPass;
        
    } catch (error) {
        log(`❌ Test failed with error: ${error.message}`, 'red');
        return false;
    }
}

// Run the test
if (require.main === module) {
    testBackupConfiguration()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            log(`❌ Test execution failed: ${error.message}`, 'red');
            process.exit(1);
        });
}

module.exports = { testBackupConfiguration }; 
