###############################################################################
# UPDATE COMMAND
###############################################################################

show_update_help() {
    cat <<EOF
Update Geyser services

Usage: geyser update

Pull latest images, rebuild local images, restart services with new images, and
clean up old images.

Options:
  -h, --help        Show this help message

Note: Services will be stopped during update.
EOF
}

handle_update() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_update_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser update --help')"
            ;;
        esac
    done

    if [[ -n $(compose ps -q) ]]; then
        warn "Running services need to be stopped for update"
        if ! confirm "Continue?"; then
            info "Update cancelled: stop services first with 'geyser stop'"
            return
        fi
        info "Stopping services..."
        compose down
    fi

    info "Updating Docker images..."
    compose pull
    compose build --pull --no-cache

    info "Starting services with updated images..."
    compose up -d

    info "Cleaning up..."
    docker system prune -f

    success "Update completed successfully. Restart Geyser with 'geyser start'"
}
