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
            exit 1
            ;;
        esac
    done

    # TODO
    # Ensure client secret is provided
    if [[ -z "${CLIENT_SECRET}" ]]; then
        error "Missing required variable CLIENT_SECRET"
        exit 1
    fi

    if docker volume ls --format '{{.Name}}' | grep -q '^geyser_data$'; then
        warn "Existing Geyser data volume found (this may cause conflicts). You should reset Geyser first with 'geyser reset'"
        if ! confirm "Initialize anyway?"; then
            info "Initialization cancelled: reset Geyser first with 'geyser reset'"
            return
        fi
    fi

    if [[ -n "$(compose ps -q)" ]]; then
        info "Stopping services..."
        compose down
    fi

    info "Pulling and building Docker images..."
    compose pull
    compose build --pull --no-cache

    info "Initializing Keycloak..."
    compose run --rm -e GEYSER_ORIGIN -e API_URL -e CLIENT_SECRET keycloak \
        import --dir /opt/keycloak/data/import/geyser-realm.json
    wait_until_exit keycloak

    info "Initializing Geyser database and Hasura configuration..."
    compose up -d hasura
    wait_until_healthy hasura
    hasura migrate apply
    hasura seed apply
    hasura metadata apply

    info "Stopping services..."
    compose down

    info "Cleaning up..."
    docker system prune -a -f

    success "Initialization completed successfully. Start Geyser with 'geyser start'"
}
