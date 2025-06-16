###############################################################################
# RESTART COMMAND
###############################################################################

show_restart_help() {
    cat <<EOF
Restart Geyser services

Usage: geyser restart

Restart all Geyser services.

Options:
  -h, --help        Show this help message
EOF
}

handle_restart() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_restart_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser restart --help')"
            exit 1
            ;;
        esac
    done

    info "Restarting services..."
    _compose down
    _compose up -d
    success "All services restarted successfully"
}
