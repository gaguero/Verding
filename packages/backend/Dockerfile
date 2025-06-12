# Multi-stage Dockerfile for Verding Platform

# Stage 1: Base image with Node.js
FROM node:18-alpine AS base

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy all monorepo package files and configs
COPY ../../package*.json ./
COPY ../../turbo.json ./
COPY ../../packages/*/package.json ./packages/*/

# Install all monorepo dependencies
RUN npm install --omit=dev --ignore-scripts && npm cache clean --force

# Stage 2: Build stage
FROM base AS builder
WORKDIR /app

# Copy the entire monorepo source code into the build stage
COPY ../../ .

# Install all dependencies including devDependencies for build tools
RUN npm install --ignore-scripts

# Generate Prisma client for the backend
# Note: We are running this from the context of the monorepo root
RUN npx prisma generate --schema=packages/backend/prisma/schema.prisma

# Build the backend using its dedicated build config
# We are now in /app, so we specify the package's build script
WORKDIR /app/packages/backend
RUN npm run build
WORKDIR /app

# Stage 3: Production backend image
FROM node:18-alpine AS backend
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# Copy ONLY the necessary built backend assets and node_modules from the builder
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