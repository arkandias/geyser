###############################################################################
# STOP COMMAND
###############################################################################

show_stop_help() {
    cat <<EOF
Stop Geyser services

Usage: geyser stop

Stop services and remove containers.

Options:
  -h, --help        Show this help message
EOF
}

handle_stop() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_stop_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser stop --help')"
            ;;
        esac
    done

    info "Stopping services..."
    compose down

    success "All services stopped successfully. Restart Geyser with 'geyser start'"
}
