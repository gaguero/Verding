import morgan from 'morgan';
import { loggerStream } from '../utils/logger';
import { isDev } from '../config';

// Custom token for response time in milliseconds
morgan.token('response-time-ms', (req, res) => {
  const responseTime = res.getHeader('X-Response-Time');
  return responseTime ? `${responseTime}ms` : '-';
});

// Custom token for user ID (if available)
morgan.token('user-id', (req: any) => {
  return req.user?.id || 'anonymous';
});

// Custom token for property ID (if available)
morgan.token('property-id', (req: any) => {
  return req.headers['x-property-id'] || req.user?.currentPropertyId || '-';
});

// Development format - more detailed
const devFormat = ':method :url :status :response-time ms - :res[content-length] bytes - User: :user-id - Property: :property-id';

// Production format - structured for log aggregation
const prodFormat = JSON.stringify({
  method: ':method',
  url: ':url',
  status: ':status',
  responseTime: ':response-time',
  contentLength: ':res[content-length]',
  userAgent: ':user-agent',
  ip: ':remote-addr',
  userId: ':user-id',
  propertyId: ':property-id',
  timestamp: ':date[iso]'
});

// Skip logging for health checks and static assets
const skip = (req: any, res: any) => {
  // Skip health checks
  if (req.url === '/health') return true;
  
  // Skip static assets
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) return true;
  
  // Skip successful requests in production (optional)
  if (!isDev && res.statusCode < 400) return true;
  
  return false;
};

// Create the request logger middleware
export const requestLogger = morgan(
  isDev ? devFormat : prodFormat,
  {
    stream: loggerStream,
    skip
  }
);

export default requestLogger; 
