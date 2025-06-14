// Environment configuration for Verding Web App
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'test' | 'staging' | 'production';
  API_BASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  APP_VERSION: string;
  BUILD_TIME: string;
  ENABLE_DEVTOOLS: boolean;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}

// Get environment variables with fallbacks
const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

// Environment configuration
export const environment: EnvironmentConfig = {
  NODE_ENV: (import.meta.env['NODE_ENV'] as EnvironmentConfig['NODE_ENV']) || 'development',

  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001'),

  // Supabase Configuration
  SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL', 'https://peyneptmzomwjcbulyvf.supabase.co'),
  SUPABASE_ANON_KEY: getEnvVar(
    'VITE_SUPABASE_ANON_KEY',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleW5lcHRtem9td2pjYnVseXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg2NzYsImV4cCI6MjA2NDIwNDY3Nn0.Y08AAEtcEbiQhFtoYmYpN1IsULL33YxJNS2EQAbpS1U'
  ),

  // Build Information
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '0.1.1'),
  BUILD_TIME: getEnvVar('VITE_BUILD_TIME', new Date().toISOString()),

  // Development Configuration
  ENABLE_DEVTOOLS: import.meta.env.DEV || getEnvVar('VITE_ENABLE_DEVTOOLS') === 'true',
  LOG_LEVEL: getEnvVar('VITE_LOG_LEVEL', 'info') as EnvironmentConfig['LOG_LEVEL'],
};

// Environment-specific configurations
export const isDevelopment = environment.NODE_ENV === 'development';
export const isProduction = environment.NODE_ENV === 'production';
export const isStaging = environment.NODE_ENV === 'staging';
export const isTest = environment.NODE_ENV === 'test';

// API endpoints
export const apiEndpoints = {
  auth: `${environment.API_BASE_URL}/auth`,
  properties: `${environment.API_BASE_URL}/properties`,
  crops: `${environment.API_BASE_URL}/crops`,
  analytics: `${environment.API_BASE_URL}/analytics`,
  agent: `${environment.API_BASE_URL}/agent`,
};

// Feature flags
export const features = {
  enableAnalytics: isProduction || isStaging,
  enableErrorReporting: isProduction || isStaging,
  enablePerformanceMonitoring: isProduction,
  enableDebugMode: isDevelopment,
  enableMockData: isTest,
};

// Validation
const validateEnvironment = () => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !getEnvVar(`VITE_${key}`));

  if (missing.length > 0 && isProduction) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Validate on import
validateEnvironment();

export default environment;
