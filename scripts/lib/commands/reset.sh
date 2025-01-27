###############################################################################
# RESET COMMAND
###############################################################################

show_reset_help() {
    cat <<EOF
Reset Geyser to a clean state

Usage: geyser reset

Stop services, remove containers, delete volumes, remove images, and clean
up logs.

Options:
  -h, --help        Show this help message

Warning: This will delete data. Make backups first.
EOF
}

handle_reset() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_reset_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser reset --help')"
            ;;
        esac
    done

    warn "This will completely reset your Geyser installation"
    warn "You should backup Geyser first with 'geyser backup' and 'geyser realms-export'"
    warn "Note: backup files will be preserved"
    if ! confirm "Are you sure you want to proceed?"; then
        info "Reset cancelled: backup Geyser first with 'geyser backup' and 'geyser realms-export'"
        return
    fi

    info "Stopping services..."
    compose down --volumes --rmi all --remove-orphans

    info "Removing logs..."
    rm "${LOG_FILE}"

    info "Cleaning up..."
    docker system prune -f

    success "Reset completed successfully"
}
