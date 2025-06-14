import { z } from 'zod';

// Import shared utilities conditionally
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// Import Constants conditionally to avoid build issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Constants: any;
try {
  Constants = require('expo-constants');
} catch (error) {
  // Fallback for build time
  Constants = {
    expoConfig: { extra: {} },
    appOwnership: 'expo',
  };
}

const { baseEnvSchema, supabaseEnvSchema, validateEnv } = sharedEnv;

// Mobile-specific environment schema (Expo environment)
const mobileEnvSchema = baseEnvSchema.merge(supabaseEnvSchema).extend({
  // Expo public environment variables
  EXPO_PUBLIC_API_URL: z.string().url().default('http://localhost:3001'),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Analytics and monitoring (public)
  EXPO_PUBLIC_ANALYTICS_KEY: z.string().optional(),
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional(),

  // Feature flags
  EXPO_PUBLIC_ENABLE_PLAYGROUND: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
  EXPO_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
});

// Create environment object for Expo
const createMobileEnv = () => {
  // In Expo, use Constants.expoConfig?.extra or process.env
  const expoExtra = Constants.expoConfig?.extra || {};
  const env = process.env;

  // Map standard env vars to Expo public vars
  const mappedEnv = {
    ...env,
    ...expoExtra,
    EXPO_PUBLIC_SUPABASE_URL:
      expoExtra.EXPO_PUBLIC_SUPABASE_URL || env.EXPO_PUBLIC_SUPABASE_URL || env.SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY:
      expoExtra.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
      env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
      env.SUPABASE_ANON_KEY,
    EXPO_PUBLIC_API_URL:
      expoExtra.EXPO_PUBLIC_API_URL || env.EXPO_PUBLIC_API_URL || env.API_BASE_URL,
  };

  return mappedEnv;
};

// Export a function that validates config when called
export const getConfig = () => validateEnv(mobileEnvSchema, createMobileEnv());

// For immediate access, try to validate but provide fallbacks for build time
let config: z.infer<typeof mobileEnvSchema>;
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
    EXPO_PUBLIC_API_URL: 'http://localhost:3001',
    EXPO_PUBLIC_SUPABASE_URL: 'https://placeholder.supabase.co',
    EXPO_PUBLIC_SUPABASE_ANON_KEY: 'placeholder_key',
    EXPO_PUBLIC_ENABLE_PLAYGROUND: false,
    EXPO_PUBLIC_ENABLE_ANALYTICS: false,
  } as z.infer<typeof mobileEnvSchema>;
}

// Export specific configurations for easier access
export const api = {
  baseUrl: config.EXPO_PUBLIC_API_URL,
};

export const supabase = {
  url: config.EXPO_PUBLIC_SUPABASE_URL,
  anonKey: config.EXPO_PUBLIC_SUPABASE_ANON_KEY,
};

export const features = {
  playground: config.EXPO_PUBLIC_ENABLE_PLAYGROUND,
  analytics: config.EXPO_PUBLIC_ENABLE_ANALYTICS,
};

export const monitoring = {
  analyticsKey: config.EXPO_PUBLIC_ANALYTICS_KEY,
  sentryDsn: config.EXPO_PUBLIC_SENTRY_DSN,
};

// Environment helpers
export const isDev = config.NODE_ENV === 'development';
export const isProd = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';
export const isStaging = config.NODE_ENV === 'staging';

// Expo-specific helpers
export const isExpoGo = Constants.appOwnership === 'expo';
export const isStandalone = Constants.appOwnership === 'standalone';
export const isDetached = Constants.appOwnership === 'standalone';
