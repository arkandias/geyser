###############################################################################
# CLEANUP COMMAND
###############################################################################

show_cleanup_help() {
    cat <<EOF
Cleanup Geyser services

Usage: geyser cleanup

Remove all unused Docker objects including stopped containers, dangling images,
unused volumes, and networks to free up disk space.

Options:
  -h, --help        Show this help message
EOF
}

handle_cleanup() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_cleanup_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser cleanup --help')"
            exit 1
            ;;
        esac
    done

    info "Cleaning up..."
    docker system prune -f
    success "Cleanup completed successfully"
}
