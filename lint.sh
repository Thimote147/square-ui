#!/usr/bin/env bash
set -euo pipefail

echo "Cleaning up AppleDouble files..."
find . -name ".AppleDouble" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "._*" -type f -delete 2>/dev/null || true