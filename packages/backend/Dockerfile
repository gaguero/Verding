# Multi-stage Dockerfile for Verding Platform

# Stage 1: Base image with Node.js
FROM node:20-alpine AS base

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy all monorepo package files and configs from the build context (monorepo root)
COPY package*.json ./
COPY turbo.json ./

# Explicitly copy each package.json to maintain directory structure for workspaces
COPY packages/backend/package.json ./packages/backend/
COPY packages/web/package.json ./packages/web/
COPY packages/mobile/package.json ./packages/mobile/
COPY packages/shared/package.json ./packages/shared/

# Install only production monorepo dependencies
RUN npm install --omit=dev --ignore-scripts && npm cache clean --force

# Stage 2: Build stage
FROM base AS builder
WORKDIR /app

# Copy the entire monorepo source code into the build stage
COPY . .

# Install all dependencies including devDependencies for build tools
RUN npm install --ignore-scripts

# Build the shared package first (required dependency)
RUN npm run build --prefix packages/shared

# Generate Prisma client for the backend
RUN npx prisma generate --schema=packages/backend/prisma/schema.prisma

# Build the backend using its dedicated build config
WORKDIR /app/packages/backend
RUN npm run build
WORKDIR /app

# Stage 3: Production backend image
FROM node:20-alpine AS backend
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# Copy ONLY the necessary built backend assets and production node_modules
COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/src/docs ./src/docs
COPY --from=builder /app/packages/backend/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

USER backend

ENV NODE_ENV=production

CMD ["node", "dist/index.js"] 