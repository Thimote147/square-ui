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

# Stop any existing containers (without removing them)
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker compose stop 2>&1 | grep -v "warning" || true

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
if command -v pnpm &> /dev/null; then
    pnpm db:generate
elif command -v npm &> /dev/null; then
    npm run db:generate 2>/dev/null || echo -e "${YELLOW}⚠️  No db:generate script in package.json${NC}"
else
    echo -e "${YELLOW}⚠️  Neither pnpm nor npm found${NC}"
fi
echo -e "${GREEN}✓ Prisma setup completed${NC}"

# Skip database push/seed - these run in the home container via docker compose
echo -e "${BLUE}📊 Database setup will run in container on first startup${NC}"

echo ""
echo -e "${GREEN}✓ Database setup complete!${NC}"
echo ""

# Define all available services
declare -A SERVICES
SERVICES=(
    ["1"]="square-ui-home|🏠 Home|http://localhost:3000"
    ["2"]="square-ui-calendar|📅 Calendar|http://localhost:3001"
    ["3"]="square-ui-chat|💬 Chat|http://localhost:3002"
    ["4"]="square-ui-emails|📧 Emails|http://localhost:3003"
    ["5"]="square-ui-dashboard|📊 Dashboard 1|http://localhost:3004"
    ["6"]="square-ui-task-management|✅ Task Management|http://localhost:3005"
    ["7"]="square-ui-projects-timeline|📈 Projects Timeline|http://localhost:3006"
    ["8"]="square-ui-dashboard-2|📊 Dashboard 2|http://localhost:3007"
    ["9"]="square-ui-dashboard-3|📊 Dashboard 3|http://localhost:3008"
    ["10"]="square-ui-dashboard-4|📊 Dashboard 4|http://localhost:3009"
    ["11"]="square-ui-employees|👥 Employees|http://localhost:3010"
    ["12"]="square-ui-files|📁 Files|http://localhost:3011"
    ["13"]="square-ui-leads|🎯 Leads|http://localhost:3012"
    ["14"]="square-ui-payrolls|💰 Payrolls|http://localhost:3013"
    ["15"]="square-ui-tasks|✔️  Tasks|http://localhost:3014"
    ["16"]="square-ui-dashboard-3-baseui|📊 Dashboard 3 (Base UI)|http://localhost:3015"
    ["17"]="square-ui-dashboard-4-baseui|📊 Dashboard 4 (Base UI)|http://localhost:3016"
    ["18"]="square-ui-emails-baseui|📧 Emails (Base UI)|http://localhost:3017"
    ["19"]="square-ui-files-baseui|📁 Files (Base UI)|http://localhost:3018"
    ["20"]="square-ui-leads-baseui|🎯 Leads (Base UI)|http://localhost:3019"
)

# Function to display service menu
show_service_menu() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}           Choose Services to Start${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}Main Services:${NC}"
    echo "  1)  🏠 Home                    11) 👥 Employees"
    echo ""
    echo -e "${YELLOW}Radix UI Templates:${NC}"
    echo "  2)  📅 Calendar                12) 📁 Files"
    echo "  3)  💬 Chat                    13) 🎯 Leads"
    echo "  4)  📧 Emails                  14) 💰 Payrolls"
    echo "  5)  📊 Dashboard 1             15) ✔️  Tasks"
    echo "  6)  ✅ Task Management"
    echo "  7)  📈 Projects Timeline"
    echo "  8)  📊 Dashboard 2"
    echo "  9)  📊 Dashboard 3"
    echo "  10) 📊 Dashboard 4"
    echo ""
    echo -e "${YELLOW}Base UI Templates:${NC}"
    echo "  16) 📊 Dashboard 3 (Base UI)"
    echo "  17) 📊 Dashboard 4 (Base UI)"
    echo "  18) 📧 Emails (Base UI)"
    echo "  19) 📁 Files (Base UI)"
    echo "  20) 🎯 Leads (Base UI)"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}Options:${NC}"
    echo "  - Enter numbers separated by spaces (e.g., 1 5 9)"
    echo "  - Type 'all' to start all services"
    echo "  - Type 'q' to quit"
    echo ""
}

# Function to wait for a container to be fully started
wait_for_container() {
    local container_name=$1
    local display_name=$2
    local max_wait=180  # 3 minutes max wait for full startup
    local counter=0

    echo -e "${YELLOW}⏳ Waiting for $display_name to be ready...${NC}"

    # Wait for container to be running
    until docker inspect "$container_name" --format='{{.State.Running}}' 2>/dev/null | grep -q "true"; do
        sleep 1
        counter=$((counter + 1))
        if [ $counter -ge 30 ]; then
            echo -e "${YELLOW}⚠️  $display_name container failed to start. Continuing anyway...${NC}"
            return
        fi
    done

    # Wait for pnpm/npm to finish installing and dev server to start
    # Look for "Local:" or "ready" in the logs which indicates the dev server is running
    counter=0
    echo -e "${YELLOW}   Waiting for dev server to start (this may take a while for first run)...${NC}"
    until docker logs "$container_name" 2>&1 | grep -qE "(Local:.*http|ready|started server on|compiled successfully)" || \
          [ $counter -ge $max_wait ]; do
        sleep 2
        counter=$((counter + 2))

        # Show progress every 10 seconds
        if [ $((counter % 10)) -eq 0 ] && [ $counter -lt $max_wait ]; then
            echo -e "${YELLOW}   Still waiting... (${counter}s elapsed)${NC}"
        fi
    done

    if [ $counter -ge $max_wait ]; then
        echo -e "${YELLOW}⚠️  $display_name took too long to start. Continuing anyway...${NC}"
        echo -e "${YELLOW}   Check logs with: docker logs $container_name${NC}"
    else
        echo -e "${GREEN}✓ $display_name is ready${NC}"
    fi
}

# Function to start services sequentially
start_services_sequentially() {
    local services_to_start=("$@")
    local total=${#services_to_start[@]}
    local count=0

    echo ""
    echo -e "${BLUE}🚀 Starting $total service(s) sequentially...${NC}"
    echo ""

    for service in "${services_to_start[@]}"; do
        count=$((count + 1))
        IFS='|' read -r service_name display_name url <<< "${SERVICES[$service]}"

        echo -e "${BLUE}[$count/$total] Starting $display_name...${NC}"
        docker compose up -d "$service_name" 2>&1 | grep -v "warning" | grep -v "orphan" || true

        # Wait for this container to be fully ready before starting the next one
        wait_for_container "$service_name" "$display_name"
        echo ""
    done
}

# Function to display running services
show_running_services() {
    local selected_services=("$@")

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✓ All services started successfully!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "📱 Running services:"
    echo ""

    for service in "${selected_services[@]}"; do
        IFS='|' read -r service_name display_name url <<< "${SERVICES[$service]}"
        printf "  %-35s %s\n" "$display_name" "$url"
    done

    echo ""
    echo "  === Database ==="
    echo "  🗄️  PostgreSQL 18:            localhost:5433"
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
}

# Show the service selection menu
show_service_menu

# Read user input
read -p "$(echo -e ${YELLOW}Enter your choice: ${NC})" choice

# Handle user choice
if [ "$choice" = "q" ]; then
    echo -e "${YELLOW}Exiting without starting additional services.${NC}"
    exit 0
elif [ "$choice" = "all" ]; then
    # Get all service keys sorted numerically
    all_services=($(echo "${!SERVICES[@]}" | tr ' ' '\n' | sort -n))

    # Start all services sequentially (one by one)
    start_services_sequentially "${all_services[@]}"
    show_running_services "${all_services[@]}"
else
    # Parse the input numbers
    selected_services=()
    for num in $choice; do
        if [[ -n "${SERVICES[$num]}" ]]; then
            selected_services+=("$num")
        else
            echo -e "${YELLOW}⚠️  Invalid service number: $num (skipped)${NC}"
        fi
    done

    if [ ${#selected_services[@]} -eq 0 ]; then
        echo -e "${YELLOW}No valid services selected. Exiting.${NC}"
        exit 1
    fi

    # Start selected services sequentially
    start_services_sequentially "${selected_services[@]}"
    show_running_services "${selected_services[@]}"
fi
