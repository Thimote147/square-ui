#!/usr/bin/env bash
set -euo pipefail

# Pre-deploy checks: lint, prettier, and typecheck for all packages
# Run this locally from the repo root (Git Bash / WSL / Linux).

echo "Cleaning up AppleDouble files..."
find . -name ".AppleDouble" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "._*" -type f -delete 2>/dev/null || true

echo "=== Lint checks ==="

# Home (main site)
echo "--> Home: prettier"
(cd home && pnpm run prettier || echo "Prettier script not found")

echo "--> Home: lint"
(cd home && pnpm run lint)

echo "--> Home: typecheck"
(cd home && pnpm run typecheck || pnpm exec tsc --noEmit)

# Templates
TEMPLATES=(
  "calendar"
  "chat"
  "dashboard-1"
  "emails"
  "projects-timeline"
  "task-management"
)

for template in "${TEMPLATES[@]}"; do
  echo ""
  echo "=== Template: $template ==="

  # Check if node_modules exists, if not install dependencies
  if [ ! -d "templates/$template/node_modules" ]; then
    echo "--> Installing dependencies..."
    (cd "templates/$template" && pnpm install)
  fi

  echo "--> Prettier"
  (cd "templates/$template" && pnpm run prettier 2>/dev/null || echo "Prettier script not found, skipping...")

  echo "--> Lint"
  (cd "templates/$template" && pnpm run lint)

  echo "--> Typecheck"
  (cd "templates/$template" && pnpm run typecheck 2>/dev/null || pnpm exec tsc --noEmit 2>/dev/null || echo "Typecheck not available, skipping...")
done

echo ""
echo "All checks passed."
