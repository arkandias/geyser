#!/bin/sh

set -e

entrypoint_log() {
    if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
        echo "$@"
    fi
}

ME=$(basename "$0")

# Configure nginx based on tenancy mode by enabling/disabling configuration files
# Nginx includes all .conf files from conf.d/ directory, so we rename files to control inclusion
if [ "${VITE_TENANCY_MODE}" = "single" ]; then
    mv /etc/nginx/conf.d/multi-tenant.conf /etc/nginx/conf.d/multi-tenant.conf.disabled
    entrypoint_log "$ME: Multi-tenant configuration disabled"
elif [ "${VITE_TENANCY_MODE}" = "multi" ]; then
    mv /etc/nginx/conf.d/single-tenant.conf /etc/nginx/conf.d/single-tenant.conf.disabled
    entrypoint_log "$ME: Single-tenant configuration disabled"
else
    echo "$ME: ERROR: VITE_TENANCY_MODE must be 'single' or 'multi', got '${VITE_TENANCY_MODE}'"
    exit 1
fi

exec "$@"
