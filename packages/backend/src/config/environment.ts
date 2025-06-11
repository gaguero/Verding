// Environment configuration for Verding Backend API
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'test' | 'staging' | 'production';
  PORT: number;
  API_BASE_URL: string;
  WEB_BASE_URL: string;
  CORS_ORIGIN: string;
  
  // Database
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  DATABASE_URL?: string;
  
  // Authentication
  JWT_SECRET: string;
  SESSION_SECRET: string;
  ENCRYPTION_KEY: string;
  
  // OAuth Providers
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  MICROSOFT_CLIENT_ID?: string;
  MICROSOFT_CLIENT_SECRET?: string;
  
  // External Services
  N8N_WEBHOOK_URL?: string;
  N8N_API_KEY?: string;
  AGENT_API_URL?: string;
  
  // Monitoring
  SENTRY_DSN?: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  DEBUG?: string;
}

// Get environment variable with fallback
const getEnvVar = (key: string, fallback: string = ''): string => {
  return process.env[key] || fallback;
};

// Get required environment variable (throws if missing in production)
const getRequiredEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] || fallback;
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
};

// Environment configuration
export const environment: EnvironmentConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvironmentConfig['NODE_ENV']) || 'development',
  PORT: parseInt(getEnvVar('PORT', '3001'), 10),
  
  // API Configuration
  API_BASE_URL: getEnvVar('API_BASE_URL', 'http://localhost:3001'),
  WEB_BASE_URL: getEnvVar('WEB_BASE_URL', 'http://localhost:3000'),
  CORS_ORIGIN: getEnvVar('CORS_ORIGIN', 'http://localhost:3000'),
  
  // Database Configuration
  SUPABASE_URL: getRequiredEnvVar('SUPABASE_URL', 'https://peyneptmzomwjcbulyvf.supabase.co'),
  SUPABASE_ANON_KEY: getRequiredEnvVar('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleW5lcHRtem9td2pjYnVseXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg2NzYsImV4cCI6MjA2NDIwNDY3Nn0.Y08AAEtcEbiQhFtoYmYpN1IsULL33YxJNS2EQAbpS1U'),
  SUPABASE_SERVICE_ROLE_KEY: getRequiredEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  
  // Authentication Configuration
  JWT_SECRET: getRequiredEnvVar('JWT_SECRET', 'your_super_secret_jwt_key_here'),
  SESSION_SECRET: getRequiredEnvVar('SESSION_SECRET', 'your_session_secret_here'),
  ENCRYPTION_KEY: getRequiredEnvVar('ENCRYPTION_KEY', 'your_32_character_encryption_key'),
  
  // OAuth Providers (optional)
  GOOGLE_CLIENT_ID: getEnvVar('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnvVar('GOOGLE_CLIENT_SECRET'),
  GITHUB_CLIENT_ID: getEnvVar('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET: getEnvVar('GITHUB_CLIENT_SECRET'),
  MICROSOFT_CLIENT_ID: getEnvVar('MICROSOFT_CLIENT_ID'),
  MICROSOFT_CLIENT_SECRET: getEnvVar('MICROSOFT_CLIENT_SECRET'),
  
  // External Services
  N8N_WEBHOOK_URL: getEnvVar('N8N_WEBHOOK_URL'),
  N8N_API_KEY: getEnvVar('N8N_API_KEY'),
  AGENT_API_URL: getEnvVar('AGENT_API_URL'),
  
  // Monitoring
  SENTRY_DSN: getEnvVar('SENTRY_DSN'),
  LOG_LEVEL: (getEnvVar('LOG_LEVEL', 'info') as EnvironmentConfig['LOG_LEVEL']),
  DEBUG: getEnvVar('DEBUG'),
};

// Environment-specific configurations
export const isDevelopment = environment.NODE_ENV === 'development';
export const isProduction = environment.NODE_ENV === 'production';
export const isStaging = environment.NODE_ENV === 'staging';
export const isTest = environment.NODE_ENV === 'test';

// Feature flags
export const features = {
  enableSwagger: isDevelopment || isStaging,
  enableCors: true,
  enableRateLimit: isProduction || isStaging,
  enableCompression: isProduction || isStaging,
  enableHelmet: isProduction || isStaging,
  enableRequestLogging: true,
  enableErrorReporting: isProduction || isStaging,
};

// Database configuration
export const dbConfig = {
  url: environment.SUPABASE_URL,
  anonKey: environment.SUPABASE_ANON_KEY,
  serviceRoleKey: environment.SUPABASE_SERVICE_ROLE_KEY,
  schema: 'public',
  autoRefreshToken: true,
  persistSession: false, // Server-side doesn't need session persistence
  detectSessionInUrl: false,
};

// CORS configuration
export const corsConfig = {
  origin: environment.CORS_ORIGIN.split(',').map(origin => origin.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// JWT configuration
export const jwtConfig = {
  secret: environment.JWT_SECRET,
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  issuer: 'verding-api',
  audience: 'verding-web',
};

// Validation
const validateEnvironment = () => {
  const requiredInProduction = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY', 
    'SUPABASE_SERVICE_ROLE_KEY',
    'JWT_SECRET',
    'SESSION_SECRET',
    'ENCRYPTION_KEY'
  ];
  
  if (isProduction) {
    const missing = requiredInProduction.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables in production: ${missing.join(', ')}`);
    }
  }
  
  // Validate JWT secret length
  if (environment.JWT_SECRET.length < 32) {
    console.warn('JWT_SECRET should be at least 32 characters long for security');
  }
  
  // Validate encryption key length
  if (environment.ENCRYPTION_KEY.length !== 32) {
    console.warn('ENCRYPTION_KEY should be exactly 32 characters long');
  }
};

// Validate on import
validateEnvironment();

export default environment; 
