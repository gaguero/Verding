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
COPY packages/docs/package.json ./packages/docs/

RUN npm install --omit=dev --ignore-scripts && npm cache clean --force

# Stage 2: Build stage to create the web app assets
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install --ignore-scripts
RUN npm run build --prefix packages/web

# Stage 3: Production web server
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Copy built assets from the builder stage
COPY --from=builder /app/packages/web/dist .
# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 