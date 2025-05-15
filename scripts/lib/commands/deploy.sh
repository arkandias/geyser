###############################################################################
# DEPLOY COMMAND
###############################################################################

show_stop_webhook_help() {
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
            ;;
        esac
    done

    # Pull latest version
    git pull
    
    # Deploy application
    docker compose pull
    docker compose build --pull --no-cache
    docker compose up -d
    
    # Cleanup
    docker system prune -a -f
}
