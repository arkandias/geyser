#!/bin/bash

###############################################################################
# START COMMAND
#
# Launches Geyser services with appropriate configuration based on mode.
# Handles both production deployment (all services required) and development
# mode (configurable services). Validates environment readiness before startup.
###############################################################################

show_start_help() {
    cat <<EOF
Start Geyser services

Usage: geyser start

Start PostgreSQL databases, Keycloak authentication, Hasura GraphQL engine, and
Nginx web server (in production mode).

Options:
  -h, --help        Show this help message
  --no-auth         Disable Keycloak authentication service (development mode only)
  --no-web          Disable Nginx reverse proxy frontend (development mode only)

Note: Run 'geyser init' first if this is a fresh installation.
EOF
}

handle_start() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_start_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser start --help')"
            ;;
        esac
    done

    # Check if data volumes exist
    local volume_exists="true"
    if ! docker volume ls --format '{{.Name}}' | grep -q '^geyser_data$'; then
        warn "Geyser data volume not found. You should initialize Geyser first with 'geyser init'"
        volume_exists="false"
    fi
    if ! docker volume ls --format '{{.Name}}' | grep -q '^geyser_kc-data$'; then
        warn "Keycloak data volume not found. You should initialize Geyser first with 'geyser init'"
        volume_exists="false"
    fi
    if [[ "${volume_exists}" == "false" ]]; then
        if ! confirm "Start anyway?"; then
            info "Startup cancelled: init Geyser first with 'geyser init'"
            return
        fi
    fi

    info "Starting services..."
    compose up -d

    success "All services started successfully"
}
