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
#   0 * * 6,7 * /path/to/scripts/backup-webdav
#
#   # Daily at 3:00 AM every month except June and July
#   0 3 * 1-5,8-12 * /path/to/scripts/backup-webdav

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" &>/dev/null && pwd)"
readonly SCRIPT_DIR

"${SCRIPT_DIR}/geyser" webdav-backup
