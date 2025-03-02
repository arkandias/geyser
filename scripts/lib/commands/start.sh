###############################################################################
# START COMMAND
###############################################################################

show_start_help() {
    cat <<EOF
Start Geyser services

Usage: geyser start

Start PostgreSQL databases, Hasura GraphQL engine, Keycloak authentication
(unless NO_AUTH=true), and Nginx web server (unless NO_WEB=true).

Options:
  -h, --help        Show this help message

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

    # Check if data volume exist
    if ! docker volume ls --format '{{.Name}}' | grep -q '^geyser_data$'; then
        warn "Geyser data volume not found. You should initialize Geyser first with 'geyser init'"
        if ! confirm "Start anyway?"; then
            info "Startup cancelled: init Geyser first with 'geyser init'"
            return
        fi
    fi

    info "Starting services..."
    compose up -d

    success "All services started successfully. Stop Geyser with 'geyser stop'"
}
