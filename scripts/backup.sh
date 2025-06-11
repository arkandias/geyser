#!/usr/bin/env bash
# This script is a wrapper to be scheduled via crontab for regular execution.
#
# Required environment variables can be set in:
#   .env       - Base environment file (should be versioned)
#   .env.local - Local overrides (should not be versioned)
# Or directly in the environment.
#
# Required environment variables:
#   WEBDAV_URL  - Base URL of the WebDAV server
#   WEBDAV_USER - WebDAV username
#   WEBDAV_PASS - WebDAV password
#
# Example crontab usage:
#   # Hourly backups in June and July
#   0 * * 6,7 * /path/to/scripts/backup.sh
#
#   # Daily at 3:00 AM every month except June and July
#   0 3 * 1-5,8-12 * /path/to/scripts/backup.sh

# Exit the script immediately if any command fails
set -e

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" &>/dev/null && pwd)"
declare -r SCRIPT_DIR

timestamp="$(date +%Y-%m-%d-%H-%M-%S)"

"${SCRIPT_DIR}/geyser" stop
"${SCRIPT_DIR}/geyser" data-backup --name "${timestamp}"
"${SCRIPT_DIR}/geyser" keycloak-export --name "${timestamp}"
"${SCRIPT_DIR}/geyser" webdav-upload --name "${timestamp}"
"${SCRIPT_DIR}/geyser" start
