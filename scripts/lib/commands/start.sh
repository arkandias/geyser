###############################################################################
# START COMMAND
###############################################################################

show_start_help() {
    cat <<EOF
Start Geyser services

Usage: geyser start

Start all Geyser services.

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
            exit 1
            ;;
        esac
    done

    # Check if data volumes already exist
    if ! docker volume ls --format '{{.Name}}' | grep -qE '^geyser_kc-data$' ||
        ! docker volume ls --format '{{.Name}}' | grep -qE '^geyser_data$'; then
        warn "Data volumes not found. You should initialize Geyser first with 'geyser init'"
        if ! confirm "Start anyway?"; then
            info "Startup cancelled: Initialize Geyser first with 'geyser init'"
            return
        fi
    fi

    info "Starting services..."
    _compose up -d
    success "All services started successfully. Stop Geyser with 'geyser stop'"
}
