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

    # Pull latest version
    git pull

    # Deploy application
    _compose pull
    COMPOSE_BAKE=true _compose build --pull --no-cache
    _compose up -d

    # Cleanup
    docker system prune -f
}
