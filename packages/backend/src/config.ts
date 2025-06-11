import 'dotenv/config';
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
    apiEnvSchema: z.object({
      API_BASE_URL: z.string().url().default('http://localhost:3001'),
      WEB_BASE_URL: z.string().url().default('http://localhost:3000'),
      CORS_ORIGIN: z.string().default('http://localhost:3000'),
    }),
    securityEnvSchema: z.object({
      JWT_SECRET: z.string().min(32),
      SESSION_SECRET: z.string().min(32),
      ENCRYPTION_KEY: z.string().length(32).optional(),
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

const { baseEnvSchema, supabaseEnvSchema, apiEnvSchema, securityEnvSchema, validateEnv } =
  sharedEnv;

// Backend-specific environment schema
const backendEnvSchema = baseEnvSchema
  .merge(supabaseEnvSchema)
  .merge(apiEnvSchema)
  .merge(securityEnvSchema)
  .extend({
    PORT: z.string().transform(Number).pipe(z.number().min(1000).max(65535)).default('3001'),
    DATABASE_URL: z.string().url().optional(),

    // n8n Agent configuration
    N8N_WEBHOOK_URL: z.string().url().optional(),
    N8N_API_KEY: z.string().optional(),
    AGENT_API_URL: z.string().url().optional(),

    // External services
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().transform(Number).pipe(z.number()).optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),

    // File storage
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_REGION: z.string().default('us-east-1'),
    S3_BUCKET_NAME: z.string().optional(),

    // Monitoring
    SENTRY_DSN: z.string().url().optional(),
  });

// Export a function that validates config when called
export const getConfig = () => validateEnv(backendEnvSchema);

// For immediate access, try to validate but provide fallbacks for build time
let config: z.infer<typeof backendEnvSchema>;
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
    API_BASE_URL: 'http://localhost:3001',
    WEB_BASE_URL: 'http://localhost:3000',
    CORS_ORIGIN: 'http://localhost:3000',
    JWT_SECRET: 'placeholder_jwt_secret_32_characters',
    SESSION_SECRET: 'placeholder_session_secret_32_chars',
    PORT: 3001,
    AWS_REGION: 'us-east-1',
  } as z.infer<typeof backendEnvSchema>;
}

// Export specific configurations for easier access
export const database = {
  url: config.DATABASE_URL,
  supabase: {
    url: config.SUPABASE_URL,
    anonKey: config.SUPABASE_ANON_KEY,
    serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY,
  },
};

export const server = {
  port: config.PORT,
  corsOrigin: config.CORS_ORIGIN,
  apiBaseUrl: config.API_BASE_URL,
};

export const security = {
  jwtSecret: config.JWT_SECRET,
  sessionSecret: config.SESSION_SECRET,
  encryptionKey: config.ENCRYPTION_KEY,
};

export const agent = {
  n8nWebhookUrl: config.N8N_WEBHOOK_URL,
  n8nApiKey: config.N8N_API_KEY,
  agentApiUrl: config.AGENT_API_URL,
};

export const email = {
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  user: config.SMTP_USER,
  password: config.SMTP_PASSWORD,
};

export const storage = {
  aws: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION,
    bucketName: config.S3_BUCKET_NAME,
  },
};

export const monitoring = {
  sentryDsn: config.SENTRY_DSN,
};

// Environment helpers
export const isDev = config.NODE_ENV === 'development';
export const isProd = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';
export const isStaging = config.NODE_ENV === 'staging';
