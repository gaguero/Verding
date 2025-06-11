// Environment-specific configurations for env-cmd
module.exports = {
  development: {
    NODE_ENV: 'development',
    APP_ENV: 'local',
    LOG_LEVEL: 'debug',
    API_BASE_URL: 'http://localhost:3001',
    VITE_API_BASE_URL: 'http://localhost:3001',
    WEB_BASE_URL: 'http://localhost:3000',
    CORS_ORIGIN: 'http://localhost:3000',
    DEBUG: 'verding:*',
    ENABLE_PLAYGROUND: 'true',
  },

  test: {
    NODE_ENV: 'test',
    APP_ENV: 'test',
    LOG_LEVEL: 'warn',
    API_BASE_URL: 'http://localhost:3001',
    VITE_API_BASE_URL: 'http://localhost:3001',
    WEB_BASE_URL: 'http://localhost:3000',
    CORS_ORIGIN: 'http://localhost:3000',
    // Test environment should use mock/test values
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_ANON_KEY: 'test_key',
    JWT_SECRET: 'test_secret_32_characters_long_key',
    SESSION_SECRET: 'test_session_32_characters_long_key',
  },

  staging: {
    NODE_ENV: 'staging',
    APP_ENV: 'staging',
    LOG_LEVEL: 'info',
    DEBUG: 'verding:error',
    ENABLE_PLAYGROUND: 'false',
    // Railway staging environment variables
    API_BASE_URL: process.env.RAILWAY_STATIC_URL || 'https://verding-backend-staging.up.railway.app',
    VITE_API_BASE_URL: process.env.RAILWAY_STATIC_URL || 'https://verding-backend-staging.up.railway.app',
    WEB_BASE_URL: process.env.RAILWAY_STATIC_URL || 'https://verding-web-staging.up.railway.app',
    CORS_ORIGIN: process.env.RAILWAY_STATIC_URL || 'https://verding-web-staging.up.railway.app',
  },

  production: {
    NODE_ENV: 'production',
    APP_ENV: 'production',
    LOG_LEVEL: 'warn',
    DEBUG: 'verding:error',
    ENABLE_PLAYGROUND: 'false',
    // Railway production environment variables
    API_BASE_URL: process.env.RAILWAY_STATIC_URL || 'https://verding-backend.up.railway.app',
    VITE_API_BASE_URL: process.env.RAILWAY_STATIC_URL || 'https://verding-backend.up.railway.app',
    WEB_BASE_URL: process.env.RAILWAY_STATIC_URL || 'https://verding-web.up.railway.app',
    CORS_ORIGIN: process.env.RAILWAY_STATIC_URL || 'https://verding-web.up.railway.app',
  },
};
