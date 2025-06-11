#!/usr/bin/env node

/**
 * Verding Environment Setup and Management
 * 
 * This script manages API keys, environment variables, and configuration
 * for the Verding microgreens management platform across different environments.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Environment configuration
const ENVIRONMENTS = {
    development: {
        name: 'Development',
        description: 'Local development environment',
        envFile: '.env.local',
        secure: false
    },
    staging: {
        name: 'Staging', 
        description: 'Staging environment for testing',
        envFile: '.env.staging',
        secure: true
    },
    production: {
        name: 'Production',
        description: 'Production environment',
        envFile: '.env.production',
        secure: true
    }
};

// Supabase project configuration
const SUPABASE_CONFIG = {
    projectId: 'peyneptmzomwjcbulyvf',
    url: 'https://peyneptmzomwjcbulyvf.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleW5lcHRtem9td2pjYnVseXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg2NzYsImV4cCI6MjA2NDIwNDY3Nn0.Y08AAEtcEbiQhFtoYmYpN1IsULL33YxJNS2EQAbpS1U'
};

// Required environment variables by category
const ENV_VARIABLES = {
    // Core Application
    core: {
        NODE_ENV: { required: true, description: 'Node.js environment', default: 'development' },
        APP_ENV: { required: true, description: 'Application environment', default: 'local' },
        PORT: { required: false, description: 'Server port', default: '3001' }
    },
    
    // Supabase Configuration
    supabase: {
        SUPABASE_URL: { required: true, description: 'Supabase project URL', default: SUPABASE_CONFIG.url },
        SUPABASE_ANON_KEY: { required: true, description: 'Supabase anonymous key', default: SUPABASE_CONFIG.anonKey },
        SUPABASE_SERVICE_ROLE_KEY: { required: true, description: 'Supabase service role key (PRIVATE)', secure: true }
    },
    
    // Security & Authentication
    security: {
        JWT_SECRET: { required: true, description: 'JWT signing secret', secure: true, generate: true },
        SESSION_SECRET: { required: true, description: 'Session secret', secure: true, generate: true },
        ENCRYPTION_KEY: { required: true, description: '32-character encryption key', secure: true, generate: true }
    },
    
    // API Configuration
    api: {
        API_BASE_URL: { required: true, description: 'Backend API base URL', default: 'http://localhost:3001' },
        WEB_BASE_URL: { required: true, description: 'Frontend web base URL', default: 'http://localhost:3000' },
        CORS_ORIGIN: { required: true, description: 'CORS allowed origins', default: 'http://localhost:3000' }
    },
    
    // n8n Agent Configuration
    agent: {
        N8N_WEBHOOK_URL: { required: false, description: 'n8n webhook URL for agent integration' },
        N8N_API_KEY: { required: false, description: 'n8n API key', secure: true },
        AGENT_API_URL: { required: false, description: 'Agent API endpoint URL' }
    },
    
    // External Services
    external: {
        SMTP_HOST: { required: false, description: 'SMTP server host' },
        SMTP_PORT: { required: false, description: 'SMTP server port', default: '587' },
        SMTP_USER: { required: false, description: 'SMTP username' },
        SMTP_PASSWORD: { required: false, description: 'SMTP password', secure: true },
        AWS_ACCESS_KEY_ID: { required: false, description: 'AWS access key', secure: true },
        AWS_SECRET_ACCESS_KEY: { required: false, description: 'AWS secret key', secure: true },
        AWS_REGION: { required: false, description: 'AWS region', default: 'us-east-1' },
        S3_BUCKET_NAME: { required: false, description: 'S3 bucket name' }
    },
    
    // Monitoring & Analytics
    monitoring: {
        SENTRY_DSN: { required: false, description: 'Sentry error tracking DSN' },
        ANALYTICS_KEY: { required: false, description: 'Analytics service key', secure: true },
        LOG_LEVEL: { required: false, description: 'Logging level', default: 'info' },
        DEBUG: { required: false, description: 'Debug namespace', default: 'verding:*' }
    },
    
    // Mobile App (Expo)
    mobile: {
        EXPO_PUBLIC_API_URL: { required: false, description: 'Public API URL for mobile app' },
        EXPO_PUBLIC_SUPABASE_URL: { required: false, description: 'Public Supabase URL for mobile', default: SUPABASE_CONFIG.url },
        EXPO_PUBLIC_SUPABASE_ANON_KEY: { required: false, description: 'Public Supabase anon key for mobile', default: SUPABASE_CONFIG.anonKey }
    }
};

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

function generateSecureKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

function generateJWTSecret() {
    return crypto.randomBytes(64).toString('base64');
}

function validateEnvironmentFile(envPath) {
    if (!fs.existsSync(envPath)) {
        return { valid: false, message: `Environment file not found: ${envPath}` };
    }
    
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const variables = {};
    
    lines.forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            variables[key.trim()] = valueParts.join('=').trim();
        }
    });
    
    const missing = [];
    const warnings = [];
    
    Object.entries(ENV_VARIABLES).forEach(([category, vars]) => {
        Object.entries(vars).forEach(([key, config]) => {
            if (config.required && !variables[key]) {
                missing.push({ key, category, description: config.description });
            }
            if (variables[key] && config.secure && variables[key].includes('your_') || variables[key].includes('_here')) {
                warnings.push({ key, category, message: 'Contains placeholder value' });
            }
        });
    });
    
    return {
        valid: missing.length === 0,
        variables,
        missing,
        warnings,
        message: missing.length === 0 ? 'Environment file is valid' : `Missing ${missing.length} required variables`
    };
}

function generateEnvironmentFile(environment = 'development', outputPath = null) {
    const env = ENVIRONMENTS[environment];
    if (!env) {
        throw new Error(`Unknown environment: ${environment}`);
    }
    
    const envPath = outputPath || env.envFile;
    const lines = [
        '# =============================================================================',
        `# Verding Platform Environment Variables - ${env.name}`,
        '# =============================================================================',
        `# ${env.description}`,
        '# Generated automatically - customize as needed',
        '# NEVER commit this file to version control!',
        '',
        '# =============================================================================',
        '# Application Environment',
        '# =============================================================================',
        `NODE_ENV=${environment}`,
        `APP_ENV=${environment === 'development' ? 'local' : environment}`,
        ''
    ];
    
    Object.entries(ENV_VARIABLES).forEach(([category, vars]) => {
        lines.push('# =============================================================================');
        lines.push(`# ${category.charAt(0).toUpperCase() + category.slice(1)} Configuration`);
        lines.push('# =============================================================================');
        
        Object.entries(vars).forEach(([key, config]) => {
            if (config.description) {
                lines.push(`# ${config.description}`);
            }
            
            let value = '';
            if (config.generate && config.secure) {
                if (key === 'JWT_SECRET') {
                    value = generateJWTSecret();
                } else if (key === 'ENCRYPTION_KEY') {
                    value = generateSecureKey(32);
                } else {
                    value = generateSecureKey();
                }
            } else if (config.default) {
                value = config.default;
            } else if (config.secure) {
                value = `your_${key.toLowerCase()}_here`;
            } else {
                value = `your_${key.toLowerCase()}_here`;
            }
            
            lines.push(`${key}=${value}`);
        });
        
        lines.push('');
    });
    
    // Add Railway deployment section
    lines.push('# =============================================================================');
    lines.push('# Railway Deployment (Production)');
    lines.push('# =============================================================================');
    lines.push('# These are set automatically in Railway:');
    lines.push('# RAILWAY_ENVIRONMENT');
    lines.push('# RAILWAY_SERVICE_NAME');
    lines.push('# RAILWAY_DEPLOYMENT_ID');
    lines.push('');
    
    fs.writeFileSync(envPath, lines.join('\n'));
    return envPath;
}

async function testSupabaseConnection(url, anonKey) {
    try {
        const supabase = createClient(url, anonKey);
        const { data, error } = await supabase.from('properties').select('count').limit(1);
        
        if (error && !error.message.includes('relation "properties" does not exist')) {
            return { success: false, error: error.message };
        }
        
        return { success: true, message: 'Supabase connection successful' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function createGitignoreEntries() {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    const envEntries = [
        '',
        '# Environment Variables',
        '.env',
        '.env.local',
        '.env.development',
        '.env.staging', 
        '.env.production',
        '.env.test',
        '',
        '# Supabase',
        'supabase/.temp/',
        'supabase/config.toml',
        '',
        '# API Keys and Secrets',
        'secrets/',
        '*.key',
        '*.pem'
    ];
    
    let gitignoreContent = '';
    if (fs.existsSync(gitignorePath)) {
        gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    }
    
    const missingEntries = envEntries.filter(entry => 
        entry.trim() && !gitignoreContent.includes(entry.trim())
    );
    
    if (missingEntries.length > 0) {
        fs.appendFileSync(gitignorePath, envEntries.join('\n'));
        return missingEntries.length;
    }
    
    return 0;
}

async function setupEnvironment(options = {}) {
    const { environment = 'development', validate = true, test = true } = options;
    
    log('\n🔧 VERDING ENVIRONMENT SETUP', 'cyan');
    log('=' * 50, 'cyan');
    
    try {
        // 1. Generate environment file
        log(`\n📝 Generating ${environment} environment file...`, 'blue');
        const envPath = generateEnvironmentFile(environment);
        log(`✅ Environment file created: ${envPath}`, 'green');
        
        // 2. Update .gitignore
        log('\n🔒 Updating .gitignore for security...', 'blue');
        const addedEntries = createGitignoreEntries();
        if (addedEntries > 0) {
            log(`✅ Added ${addedEntries} security entries to .gitignore`, 'green');
        } else {
            log('✅ .gitignore already configured', 'green');
        }
        
        // 3. Validate environment file
        if (validate) {
            log('\n🔍 Validating environment configuration...', 'blue');
            const validation = validateEnvironmentFile(envPath);
            
            if (validation.valid) {
                log('✅ Environment configuration is valid', 'green');
            } else {
                log(`⚠️  ${validation.message}`, 'yellow');
                validation.missing.forEach(item => {
                    log(`   Missing: ${item.key} (${item.description})`, 'red');
                });
            }
            
            if (validation.warnings.length > 0) {
                log('\n⚠️  Configuration warnings:', 'yellow');
                validation.warnings.forEach(warning => {
                    log(`   ${warning.key}: ${warning.message}`, 'yellow');
                });
            }
        }
        
        // 4. Test Supabase connection
        if (test) {
            log('\n🔗 Testing Supabase connection...', 'blue');
            const connectionTest = await testSupabaseConnection(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey
            );
            
            if (connectionTest.success) {
                log('✅ Supabase connection successful', 'green');
            } else {
                log(`❌ Supabase connection failed: ${connectionTest.error}`, 'red');
            }
        }
        
        // 5. Security recommendations
        log('\n🛡️  SECURITY RECOMMENDATIONS:', 'magenta');
        log('1. Never commit .env files to version control', 'yellow');
        log('2. Use different keys for each environment', 'yellow');
        log('3. Rotate API keys regularly', 'yellow');
        log('4. Use environment-specific Supabase projects for production', 'yellow');
        log('5. Enable MFA on all service accounts', 'yellow');
        
        // 6. Next steps
        log('\n🎯 NEXT STEPS:', 'cyan');
        log(`1. Review and customize ${envPath}`, 'yellow');
        log('2. Replace placeholder values with actual secrets', 'yellow');
        log('3. Set up production environment variables in Railway', 'yellow');
        log('4. Configure CI/CD environment variables in GitHub Actions', 'yellow');
        
        return {
            success: true,
            envPath,
            validation: validate ? validation : null
        };
        
    } catch (error) {
        log(`❌ Environment setup failed: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'setup';
    
    switch (command) {
        case 'setup':
            const environment = args[1] || 'development';
            await setupEnvironment({ environment });
            break;
            
        case 'validate':
            const envFile = args[1] || '.env.local';
            const validation = validateEnvironmentFile(envFile);
            console.log(JSON.stringify(validation, null, 2));
            break;
            
        case 'test':
            const testResult = await testSupabaseConnection(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey
            );
            console.log(JSON.stringify(testResult, null, 2));
            break;
            
        default:
            log('Usage: node setup-environment.js [setup|validate|test] [environment|file]', 'yellow');
            log('Examples:', 'cyan');
            log('  node setup-environment.js setup development', 'cyan');
            log('  node setup-environment.js validate .env.local', 'cyan');
            log('  node setup-environment.js test', 'cyan');
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        log(`❌ Error: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = {
    setupEnvironment,
    validateEnvironmentFile,
    testSupabaseConnection,
    generateEnvironmentFile,
    ENV_VARIABLES,
    ENVIRONMENTS
}; 
