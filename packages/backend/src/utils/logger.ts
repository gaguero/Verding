import { isDev } from '../config/index.js';
import winston from 'winston';

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'HH:mm:ss',
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: isDev ? 'debug' : 'info',
  format: logFormat,
  defaultMeta: { service: 'verding-api' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: isDev ? consoleFormat : logFormat,
    }),
  ],
});

// Note: File logging disabled for containerized environments (Railway)
// All logs are captured via console output and available in Railway dashboard

// Stream for Morgan HTTP request logging
export const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger };
export default logger;
