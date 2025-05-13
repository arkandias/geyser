#!/bin/sh
set -e

# Check if runtime GEYSER_URL matches build-time GEYSER_URL_BUILD_ARG
if [ "$GEYSER_URL" != "$GEYSER_URL_BUILD_ARG" ]; then
    echo "ERROR: Runtime GEYSER_URL ($GEYSER_URL) does not match build-time URL ($GEYSER_URL_BUILD_ARG)"
    echo "This container was built for $GEYSER_URL_BUILD_ARG and cannot be used with a different URL."
    exit 1
fi

# Execute the original command (nginx)
exec "$@"
