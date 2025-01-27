#!/bin/bash

###############################################################################
# INIT COMMAND
###############################################################################

show_init_help() {
    cat <<EOF
Initialize a fresh Geyser installation

Usage: geyser init

Creates required data volumes, initializes databases, starts services and
applies initial configuration.

Options:
  -h, --help        Show this help message

Note: Use 'geyser reset' first if you need to start fresh.
EOF
}

handle_init() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_init_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser init --help')"
            ;;
        esac
    done

    # Check if data volume already exists
    if docker volume ls --format '{{.Name}}' | grep -q '^geyser_data$'; then
        warn "Existing Geyser data volume found (this may cause conflicts). You should reset Geyser first with 'geyser reset'"
        if ! confirm "Initialize anyway?"; then
            info "Initialization cancelled: reset Geyser first with 'geyser reset'"
            return
        fi
    fi

    info "Pulling and building Docker images..."
    compose pull
    compose build --pull --no-cache

    info "Starting services..."
    compose up -d

    info "Initializing Geyser database..."
    wait_until_healthy db
    compose exec -T db bash -c "psql -U postgres -d geyser -f /initdb/schema.sql && psql -U postgres -d geyser -f /initdb/core_data.sql"

    info "Applying Hasura metadata..."
    wait_until_healthy hasura
    hasura metadata apply

    info "Stopping services..."
    compose down

    info "Cleaning up..."
    docker system prune -f

    success "Initialization completed successfully"
}
