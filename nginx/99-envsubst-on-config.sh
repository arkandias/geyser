#!/bin/sh

# Replace environment variables in JSON template
envsubst </usr/share/nginx/html/config.template.json >/usr/share/nginx/html/config.json
