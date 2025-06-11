import { z } from 'zod';

// Base environment schema that all packages can extend
const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  APP_ENV: z.string().default('local'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// Supabase configuration schema
const supabaseEnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

// API configuration schema
const apiEnvSchema = z.object({
  API_BASE_URL: z.string().url().default('http://localhost:3001'),
  WEB_BASE_URL: z.string().url().default('http://localhost:3000'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

// Security configuration schema
const securityEnvSchema = z.object({
  JWT_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().min(32),
  ENCRYPTION_KEY: z.string().length(32).optional(),
});

// Combined schema for full platform configuration
export const platformEnvSchema = baseEnvSchema
  .merge(supabaseEnvSchema)
  .merge(apiEnvSchema)
  .merge(securityEnvSchema);

// Individual schemas for specific use cases
export { baseEnvSchema, supabaseEnvSchema, apiEnvSchema, securityEnvSchema };

// Type definitions
export type BaseEnv = z.infer<typeof baseEnvSchema>;
export type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;
export type ApiEnv = z.infer<typeof apiEnvSchema>;
export type SecurityEnv = z.infer<typeof securityEnvSchema>;
export type PlatformEnv = z.infer<typeof platformEnvSchema>;

// Environment validation helper
export function validateEnv<T extends z.ZodSchema>(
  schema: T,
  env: Record<string, string | undefined> = process.env
): z.infer<T> {
  try {
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter(err => err.code === 'invalid_type' && err.received === 'undefined')
        .map(err => err.path.join('.'));

      const invalidVars = error.errors
        .filter(err => err.code !== 'invalid_type' || err.received !== 'undefined')
        .map(err => `${err.path.join('.')}: ${err.message}`);

      let errorMessage = 'Environment validation failed:';

      if (missingVars.length > 0) {
        errorMessage += `\n  Missing variables: ${missingVars.join(', ')}`;
      }

      if (invalidVars.length > 0) {
        errorMessage += `\n  Invalid variables: ${invalidVars.join(', ')}`;
      }

      throw new Error(errorMessage);
    }
    throw error;
  }
}

// Utility to check if we're in a specific environment
export const isProduction = (env = process.env.NODE_ENV) => env === 'production';
export const isDevelopment = (env = process.env.NODE_ENV) => env === 'development';
export const isTest = (env = process.env.NODE_ENV) => env === 'test';
export const isStaging = (env = process.env.NODE_ENV) => env === 'staging';

// Utility to get environment-specific configuration
export function getEnvConfig(fallbacks: Record<string, string> = {}) {
  return {
    ...fallbacks,
    ...process.env,
  };
}
