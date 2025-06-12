// Verding Backend API
console.log('Verding Backend starting...');

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { requestLogger } from './middleware/requestLogger.js';
import { server, isDev } from './config/index.js';
import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken, requirePropertyAccess } from './auth/middleware.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Import route modules
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import cropRoutes from './routes/crops.js';
import batchRoutes from './routes/batches.js';
import inventoryRoutes from './routes/inventory.js';
import salesRoutes from './routes/sales.js';
import mcpRoutes from './routes/mcp.js';

// Create Express app
const app = express();

// Trust proxy for Railway deployment
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: isDev ? false : undefined,
}));

// CORS configuration
app.use(cors({
  origin: isDev ? true : process.env.FRONTEND_URL?.split(',') || false,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Compression
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Verding API v1',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/v1/auth',
      properties: '/api/v1/properties',
      crops: '/api/v1/crops',
      batches: '/api/v1/batches',
      inventory: '/api/v1/inventory',
      sales: '/api/v1/sales',
      mcp: '/api/v1/mcp',
    },
  });
});

// Serve API documentation
const swaggerDocument = YAML.load('./src/docs/openapi.yaml');
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount route handlers
app.use('/api/v1/auth', authRoutes);

// Mount authentication-protected route handlers
app.use('/api/v1/properties', authenticateToken, requirePropertyAccess(), propertyRoutes);
app.use('/api/v1/crops', authenticateToken, requirePropertyAccess(), cropRoutes);
app.use('/api/v1/batches', authenticateToken, requirePropertyAccess(), batchRoutes);
app.use('/api/v1/inventory', authenticateToken, requirePropertyAccess(), inventoryRoutes);
app.use('/api/v1/sales', authenticateToken, requirePropertyAccess(), salesRoutes);
app.use('/api/v1/mcp', authenticateToken, requirePropertyAccess(), mcpRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = server.port || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
  logger.info(`📚 API docs: http://localhost:${PORT}/api/v1`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;
