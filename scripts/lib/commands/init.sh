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

Note: Run 'geyser purge' first if you need to start fresh.
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

    if docker volume ls --format '{{.Name}}' | grep -q '^geyser_data$'; then
        warn "Existing Geyser data volume found (this may cause conflicts). You should purge Geyser first with 'geyser purge'"
        if ! confirm "Initialize anyway?"; then
            info "Initialization cancelled: purge Geyser first with 'geyser purge'"
            return
        fi
    fi

    if [[ -n "$(_compose ps -q)" ]]; then
        info "Stopping services..."
        _compose down
    fi

    info "Pulling and building Docker images..."
    _compose pull
    _compose build --pull --no-cache

    info "Initializing Keycloak..."
    _compose run --rm keycloak import --dir /opt/keycloak/data/import/geyser-realm.json

    info "Initializing Geyser database and Hasura configuration..."
    _compose up -d hasura
    wait_until_healthy hasura
    _hasura migrate apply
    _hasura seed apply
    _hasura metadata apply

    info "Stopping services..."
    _compose down

    info "Cleaning up..."
    docker system prune -a -f

    success "Initialization completed successfully. Start Geyser with 'geyser start'"
}
