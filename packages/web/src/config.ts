import { z } from 'zod';

// Import shared utilities conditionally to avoid build issues
let sharedEnv: any;
try {
  sharedEnv = require('@verding/shared');
} catch (error) {
  // Fallback if shared package not available during build
  sharedEnv = {
    baseEnvSchema: z.object({
      NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
      APP_ENV: z.string().default('local'),
      LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    }),
    supabaseEnvSchema: z.object({
      SUPABASE_URL: z.string().url(),
      SUPABASE_ANON_KEY: z.string().min(1),
      SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    }),
    validateEnv: <T extends z.ZodSchema>(
      schema: T,
      env: Record<string, string | undefined> = process.env
    ): z.infer<T> => {
      try {
        return schema.parse(env);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const missingVars = error.errors
            .filter(err => err.code === 'invalid_type' && err.received === 'undefined')
            .map(err => err.path.join('.'));

          let errorMessage = 'Environment validation failed:';
          if (missingVars.length > 0) {
            errorMessage += `\n  Missing variables: ${missingVars.join(', ')}`;
          }
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
  };
}

const { baseEnvSchema, supabaseEnvSchema, validateEnv } = sharedEnv;

// Web-specific environment schema (client-side safe variables only)
const webEnvSchema = baseEnvSchema.merge(supabaseEnvSchema).extend({
  // Client-safe API configuration
  VITE_API_BASE_URL: z.string().url().default('http://localhost:3001'),
  VITE_WEB_BASE_URL: z.string().url().default('http://localhost:3000'),

  // Supabase configuration (client-safe)
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),

  // Analytics (client-safe)
  VITE_ANALYTICS_KEY: z.string().optional(),
  VITE_SENTRY_DSN: z.string().url().optional(),

  // Feature flags
  VITE_ENABLE_PLAYGROUND: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
  VITE_ENABLE_ANALYTICS: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
});

// Create environment object for client-side
const createWebEnv = () => {
  // For build time, just use process.env
  const env = process.env || {};

  // Map standard env vars to Vite-prefixed vars if needed
  const mappedEnv = {
    ...env,
    VITE_SUPABASE_URL: env['VITE_SUPABASE_URL'] || env['SUPABASE_URL'],
    VITE_SUPABASE_ANON_KEY: env['VITE_SUPABASE_ANON_KEY'] || env['SUPABASE_ANON_KEY'],
    VITE_API_BASE_URL: env['VITE_API_BASE_URL'] || env['API_BASE_URL'],
    VITE_WEB_BASE_URL: env['VITE_WEB_BASE_URL'] || env['WEB_BASE_URL'],
  };

  return mappedEnv;
};

// Export a function that validates config when called
export const getConfig = () => validateEnv(webEnvSchema, createWebEnv());

// For immediate access, try to validate but provide fallbacks for build time
let config: z.infer<typeof webEnvSchema>;
try {
  config = getConfig();
} catch (error) {
  // During build time, provide safe defaults
  config = {
    NODE_ENV: 'development',
    APP_ENV: 'local',
    LOG_LEVEL: 'info',
    SUPABASE_URL: 'https://placeholder.supabase.co',
    SUPABASE_ANON_KEY: 'placeholder_key',
    VITE_API_BASE_URL: 'http://localhost:3001',
    VITE_WEB_BASE_URL: 'http://localhost:3000',
    VITE_SUPABASE_URL: 'https://placeholder.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'placeholder_key',
    VITE_ENABLE_PLAYGROUND: false,
    VITE_ENABLE_ANALYTICS: false,
  } as z.infer<typeof webEnvSchema>;
}

// Export specific configurations for easier access
export const api = {
  baseUrl: config.VITE_API_BASE_URL,
  webUrl: config.VITE_WEB_BASE_URL,
};

export const supabase = {
  url: config.VITE_SUPABASE_URL,
  anonKey: config.VITE_SUPABASE_ANON_KEY,
};

export const features = {
  playground: config.VITE_ENABLE_PLAYGROUND,
  analytics: config.VITE_ENABLE_ANALYTICS,
};

export const monitoring = {
  analyticsKey: config.VITE_ANALYTICS_KEY,
  sentryDsn: config.VITE_SENTRY_DSN,
};

// Environment helpers
export const isDev = config.NODE_ENV === 'development';
export const isProd = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';
export const isStaging = config.NODE_ENV === 'staging';
