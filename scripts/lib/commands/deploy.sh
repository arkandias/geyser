###############################################################################
# DEPLOY COMMAND
###############################################################################

show_deploy_help() {
    cat <<EOF
Deploy Geyser from remote repository

Deploy Geyser by pulling latest code from git repository, updating Docker
images, building containers, and launching services in detached mode.

Options:
  -h, --help        Show this help message
EOF
}

handle_deploy() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_deploy_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser deploy --help')"
            exit 1
            ;;
        esac
    done

    info "Pulling latest version from repository..."
    git -C "${GEYSER_HOME}" pull

    info "Updating Docker images..."
    _compose pull
    _compose build --pull --no-cache

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

    success "Deployment completed successfully. Geyser is up and running"
}
