#!/bin/sh

set -e

entrypoint_log() {
    if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
        echo "$@"
    fi
}

ME=$(basename "$0")

# Generate runtime configuration file by substituting environment variables
# Reads template file with placeholder variables and replaces them with actual
# environment variable values to create the final config
envsubst </usr/share/nginx/html/config.template.json >/usr/share/nginx/html/config.json
entrypoint_log "$ME: Generated config.json from template with environment variables"
