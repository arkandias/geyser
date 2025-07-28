#!/bin/bash

# Rename the files so only the correct one has .conf extension
if [ "$TENANCY_MODE" = "single" ]; then
    mv /etc/nginx/conf.d/multi-tenant.conf /etc/nginx/conf.d/multi-tenant.conf.disabled
    echo "Disabled multi-tenant configuration"
elif [ "$TENANCY_MODE" = "multi" ]; then
    mv /etc/nginx/conf.d/single-tenant.conf /etc/nginx/conf.d/single-tenant.conf.disabled
    echo "Disabled single-tenant configuration"
else
    echo "ERROR: TENANCY_MODE must be 'single' or 'multi'"
    exit 1
fi

exec "$@"