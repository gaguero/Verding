// Import all required items for convenience exports
import { 
  environment, 
  isDevelopment, 
  dbConfig, 
  jwtConfig 
} from './environment.js';

// Main configuration exports
export {
  environment,
  isDevelopment,
  isProduction,
  isStaging,
  isTest,
  features,
  dbConfig,
  corsConfig,
  jwtConfig,
} from './environment.js';

// Convenience exports for common imports
export const isDev = isDevelopment;
export const database = dbConfig;
export const security = jwtConfig;
export const server = {
  port: environment.PORT,
  apiBaseUrl: environment.API_BASE_URL,
  webBaseUrl: environment.WEB_BASE_URL,
  corsOrigin: environment.CORS_ORIGIN,
};

export default environment;
