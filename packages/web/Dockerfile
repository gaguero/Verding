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

# Create startup script to substitute environment variables with defaults
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'export BACKEND_URL=${BACKEND_URL:-http://localhost:3001}' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo '# Add https:// prefix if BACKEND_URL does not start with http' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'if [ "${BACKEND_URL#http}" = "$BACKEND_URL" ]; then' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo '  export BACKEND_URL="https://$BACKEND_URL"' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'fi' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'echo "Using BACKEND_URL: $BACKEND_URL"' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'envsubst "\$BACKEND_URL" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'echo "Generated nginx.conf:"' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    echo 'cat /etc/nginx/nginx.conf | grep -A 2 -B 2 proxy_pass' >> /docker-entrypoint.d/40-envsubst-on-nginx.sh && \
    chmod +x /docker-entrypoint.d/40-envsubst-on-nginx.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 