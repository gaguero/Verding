# Stage 1: Base image with Node.js and production dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./

# Explicitly copy each package.json to maintain directory structure for workspaces
COPY packages/backend/package.json ./packages/backend/
COPY packages/web/package.json ./packages/web/
COPY packages/mobile/package.json ./packages/mobile/
COPY packages/shared/package.json ./packages/shared/

RUN npm install --omit=dev --ignore-scripts && npm cache clean --force

# Stage 2: Build stage to create the web app assets
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install --ignore-scripts

# Build the shared package first (required dependency for web)
RUN npm run build --prefix packages/shared

# Now build the web package
RUN npm run build --prefix packages/web
RUN ls -l /app/packages/web

# Stage 3: Production web server
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Copy built assets from the builder stage
COPY --from=builder /app/packages/web/dist .
# Copy nginx configuration template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Create startup script to substitute environment variables
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'envsubst "\$BACKEND_URL" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    chmod +x /docker-entrypoint.d/40-envsubst-on-nginx.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 