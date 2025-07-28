###############################################################################
# UPDATE COMMAND
###############################################################################

show_update_help() {
    cat <<EOF
Update Geyser services

Usage: geyser update

Pull latest images, rebuild local images, restart services with new images,
apply Hasura migration and metadata, and clean up old images.

Options:
  -h, --help        Show this help message
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
            exit 1
            ;;
        esac
    done

    info "Updating Docker images..."
    _compose pull
    _compose build --pull --no-cache keycloak

    info "Starting services with updated images..."
    _compose up -d

    info "Applying Hasura migrations and metadata..."
    wait_until_healthy hasura
    info "Waiting a few more seconds..."
    sleep 3
    _hasura migrate apply --all-databases
    _hasura metadata apply

    info "Cleaning up..."
    docker system prune -f

    success "Update completed successfully. Geyser is up and running"
}
