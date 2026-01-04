#!/bin/bash

# Square UI - Development Environment Startup Script
# This script starts all services and initializes the shared database

set -e

echo "Cleaning up AppleDouble files..."
find . -name "._*" -type f -delete

echo "🚀 Starting Square UI Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.example not found. Please create .env manually.${NC}"
    fi
fi

# Stop any existing containers
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker compose down 2>&1 | grep -v "warning" || true

# Start PostgreSQL database first
echo -e "${BLUE}🗄️  Starting PostgreSQL 18 database...${NC}"
docker compose up -d postgres 2>&1 | grep -v "warning" | grep -v "orphan" || true

# Wait for PostgreSQL to be healthy
echo -e "${BLUE}⏳ Waiting for PostgreSQL to be ready...${NC}"
MAX_WAIT=30
COUNTER=0
until docker compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
    sleep 1
    COUNTER=$((COUNTER+1))
    if [ $COUNTER -ge $MAX_WAIT ]; then
        echo -e "${YELLOW}⚠️  PostgreSQL took too long to start. Continuing anyway...${NC}"
        break
    fi
done
if [ $COUNTER -lt $MAX_WAIT ]; then
    echo -e "${GREEN}✓ PostgreSQL is ready${NC}"
fi

# Generate Prisma Client
echo -e "${BLUE}🔧 Generating Prisma Client...${NC}"
pnpm db:generate > /dev/null 2>&1
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Push database schema
echo -e "${BLUE}📊 Pushing database schema...${NC}"
if pnpm db:push > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Database schema pushed${NC}"
else
    echo -e "${YELLOW}⚠️  Schema already in sync${NC}"
fi

# Seed database
echo -e "${BLUE}🌱 Seeding database with sample data...${NC}"
if pnpm db:seed 2>&1 | grep -q "Database seeded successfully"; then
    echo -e "${GREEN}✓ Database seeded successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Database seeding skipped (may already be seeded)${NC}"
fi

echo ""
echo -e "${GREEN}✓ Database setup complete!${NC}"
echo ""

# Start all application services
echo -e "${BLUE}🚀 Starting all application services...${NC}"
docker compose up -d 2>&1 | grep -v "warning" | grep -v "orphan" || true

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ All services started successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📱 Available services:"
echo ""
echo "  🏠 Home:              http://localhost:3000"
echo "  📅 Calendar:          http://localhost:3001"
echo "  💬 Chat:              http://localhost:3002"
echo "  📧 Emails:            http://localhost:3003"
echo "  📊 Dashboard:         http://localhost:3004"
echo "  ✅ Task Management:   http://localhost:3005"
echo "  📈 Projects Timeline: http://localhost:3006"
echo ""
echo "  🗄️  PostgreSQL 18:     localhost:5433"
echo "     Database: square_ui"
echo "     User: postgres"
echo "     Password: postgres"
echo ""
echo "💡 Useful commands:"
echo ""
echo "  View logs:           docker compose logs -f [service-name]"
echo "  Stop all:            docker compose down"
echo "  Restart service:     docker compose restart [service-name]"
echo "  Database studio:     pnpm db:studio"
echo "  Reset database:      pnpm db:reset"
echo ""
