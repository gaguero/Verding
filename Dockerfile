# Multi-stage Dockerfile for Verding Platform
# Stage 1: Base image with Node.js
FROM node:18-alpine AS base

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN npm install --omit=dev && npm cache clean --force

# Stage 2: Build stage
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production backend image
FROM node:18-alpine AS backend
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# Copy built backend
COPY --from=builder --chown=backend:nodejs /app/packages/backend/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/packages/backend/package.json ./package.json
COPY --from=builder --chown=backend:nodejs /app/node_modules ./node_modules

USER backend

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "dist/index.js"]

# Stage 4: Production web image  
FROM nginx:alpine AS web
WORKDIR /app

# Copy built web app
COPY --from=builder /app/packages/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 