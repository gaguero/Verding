#!/bin/bash

# Verding Deployment Script
# Usage: ./scripts/deploy.sh [environment] [service]
# Example: ./scripts/deploy.sh staging web

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT=${1:-staging}
SERVICE=${2:-both}

# Validate inputs
if [[ ! "$ENVIRONMENT" =~ ^(staging|production)$ ]]; then
    echo -e "${RED}Error: Environment must be 'staging' or 'production'${NC}"
    exit 1
fi

if [[ ! "$SERVICE" =~ ^(backend|web|both)$ ]]; then
    echo -e "${RED}Error: Service must be 'backend', 'web', or 'both'${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Starting deployment to ${ENVIRONMENT} environment${NC}"
echo -e "${BLUE}📦 Service: ${SERVICE}${NC}"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI is not installed. Please install it first.${NC}"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Check if logged in to Railway
if ! railway whoami &> /dev/null; then
    echo -e "${RED}❌ Not logged in to Railway. Please login first.${NC}"
    echo "railway login"
    exit 1
fi

# Function to deploy a service
deploy_service() {
    local service_name=$1
    echo -e "${YELLOW}📦 Deploying ${service_name} to ${ENVIRONMENT}...${NC}"
    
    # Set environment variables for build
    export NODE_ENV=$ENVIRONMENT
    export VITE_NODE_ENV=$ENVIRONMENT
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        export VITE_API_BASE_URL="https://verding-backend.up.railway.app"
    else
        export VITE_API_BASE_URL="https://verding-backend-staging.up.railway.app"
    fi
    
    # Build the application
    echo -e "${YELLOW}🔨 Building application...${NC}"
    npm run build
    
    # Deploy to Railway
    echo -e "${YELLOW}🚂 Deploying to Railway...${NC}"
    railway up --service "${service_name}-${ENVIRONMENT}"
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ ${service_name} deployed successfully${NC}"
    else
        echo -e "${RED}❌ ${service_name} deployment failed${NC}"
        exit 1
    fi
}

# Function to run health check
health_check() {
    local service_name=$1
    local url=""
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        if [[ "$service_name" == "backend" ]]; then
            url="https://verding-backend.up.railway.app"
        else
            url="https://verding-web.up.railway.app"
        fi
    else
        if [[ "$service_name" == "backend" ]]; then
            url="https://verding-backend-staging.up.railway.app"
        else
            url="https://verding-web-staging.up.railway.app"
        fi
    fi
    
    echo -e "${YELLOW}🏥 Running health check for ${service_name}...${NC}"
    echo "URL: ${url}/health"
    
    # Wait for deployment to stabilize
    sleep 30
    
    # Try health check up to 10 times
    for i in {1..10}; do
        if curl -f "${url}/health" &> /dev/null; then
            echo -e "${GREEN}✅ ${service_name} health check passed${NC}"
            return 0
        else
            echo -e "${YELLOW}⏳ Health check attempt ${i}/10 failed, retrying...${NC}"
            sleep 10
        fi
    done
    
    echo -e "${RED}❌ ${service_name} health check failed after 10 attempts${NC}"
    return 1
}

# Pre-deployment checks
echo -e "${YELLOW}🔍 Running pre-deployment checks...${NC}"

# Check if we're in the right directory
if [[ ! -f "package.json" ]] || [[ ! -d "packages" ]]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run test

# Run security audit
echo -e "${YELLOW}🔒 Running security audit...${NC}"
npm audit --audit-level=high

echo -e "${GREEN}✅ Pre-deployment checks passed${NC}"
echo ""

# Deploy services
if [[ "$SERVICE" == "both" ]]; then
    deploy_service "backend"
    deploy_service "web"
    
    # Health checks
    health_check "backend"
    health_check "web"
elif [[ "$SERVICE" == "backend" ]]; then
    deploy_service "backend"
    health_check "backend"
elif [[ "$SERVICE" == "web" ]]; then
    deploy_service "web"
    health_check "web"
fi

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Service: ${SERVICE}${NC}"

if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${BLUE}🌐 Production URLs:${NC}"
    echo -e "   Backend: https://verding-backend.up.railway.app"
    echo -e "   Web: https://verding-web.up.railway.app"
else
    echo -e "${BLUE}🌐 Staging URLs:${NC}"
    echo -e "   Backend: https://verding-backend-staging.up.railway.app"
    echo -e "   Web: https://verding-web-staging.up.railway.app"
fi 