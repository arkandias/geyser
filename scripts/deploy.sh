#!/usr/bin/env bash

# Exit the script immediately if any command fails
set -e

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" &>/dev/null && pwd)"

# Pull latest version
git pull

# Deploy application
"${SCRIPT_DIR}/geyser" compose pull
"${SCRIPT_DIR}/geyser" compose build --pull --no-cache
"${SCRIPT_DIR}/geyser" compose up -d

# Cleanup
docker system prune -a -f
