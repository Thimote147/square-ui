#!/bin/bash

# Exit on error
set -e

echo "Cleaning up AppleDouble files..."
find . -name ".AppleDouble" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "._*" -type f -delete 2>/dev/null || true

echo "Starting services..."
docker compose -f docker-compose.yml up --build -d

echo "Waiting for backend to be ready..."
sleep 3

# echo "Running Prisma migrations..."
# docker compose -f docker-compose.yml exec backend npx prisma migrate deploy

# echo "Running Prisma generate..."
# docker compose -f docker-compose.yml exec backend npx prisma generate

# echo "Running database seed..."
# docker compose -f docker-compose.yml exec backend npm run seed

echo ""
echo "Development environment is ready!"
echo "Frontend: http://localhost:3000"
# echo "Backend: http://localhost:4000"
# echo "PgAdmin: http://localhost:8088"
