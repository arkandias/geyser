###############################################################################
# INIT COMMAND
###############################################################################

show_init_help() {
    cat <<EOF
Initialize a fresh Geyser installation

Usage: geyser init

Pull and build Docker images, start services, initialize the main database,
apply Hasura metadata, stop services, and clean up.

Options:
  -h, --help        Show this help message

Note: Run 'geyser reset' first if you need to start fresh.
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
    
    # Ensure client secret is provided
    if [[ -z "${CLIENT_BACKEND_SECRET}" ]]; then
        error "Missing required variable CLIENT_BACKEND_SECRET"
    fi

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
    compose exec -T db bash -c "psql -U postgres -d geyser -f /initdb/schema.sql"
    compose exec -T db bash -c "psql -U postgres -d geyser -f /initdb/seed.sql"

    info "Applying Hasura metadata..."
    wait_until_healthy hasura
    hasura metadata apply

    [[ "${NO_AUTH}" == "true" ]] || wait_until_healthy keycloak
    [[ "${NO_WEB}" == "true" ]] || wait_until_healthy nginx

    info "Stopping services..."
    compose down

    info "Cleaning up..."
    docker system prune -a -f

    success "Initialization completed successfully. Start Geyser with 'geyser start'"
}
