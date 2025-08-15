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

# Absolute path to the directory containing the current script
SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
declare -r SCRIPT_DIR

# Absolute path to the application base directory
GEYSER_HOME="$(cd "${SCRIPT_DIR}/.." && pwd)"
declare -r GEYSER_HOME

timestamp="$(date +%Y-%m-%d-%H-%M-%S)"
db_backup="db_${timestamp}"
kc_backup="kc_${timestamp}"

"${GEYSER_HOME}/cli/geyser" stop
"${GEYSER_HOME}/cli/geyser" data-backup --name "${db_backup}"
"${GEYSER_HOME}/cli/geyser" webdav-upload --path "${SCRIPT_DIR}/../backups/${db_backup}"
"${GEYSER_HOME}/cli/geyser" stop
"${GEYSER_HOME}/cli/geyser" keycloak-export --name "${kc_backup}"
"${GEYSER_HOME}/cli/geyser" webdav-upload --path "${SCRIPT_DIR}/../keycloak/backups/${kc_backup}"
"${GEYSER_HOME}/cli/geyser" start
