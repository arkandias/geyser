###############################################################################
# PURGE COMMAND
###############################################################################

show_purge_help() {
    cat <<EOF
Completely remove Geyser installation and all data

Usage: geyser purge

Stop services, remove containers, delete volumes, remove images, and clean
up logs.

Options:
  -h, --help        Show this help message

Warning: This will delete all data. You should first run:
- 'geyser data-dump' to save the application data, and
- 'geyser keycloak-export' to save Keycloak configuration.
EOF
}

handle_purge() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_purge_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser purge --help')"
            exit 1
            ;;
        esac
    done

    warn "This will completely purge your Geyser installation"
    warn "You should backup Geyser first with 'geyser data-dump' and 'geyser keycloak-export'"
    warn "Note: backup files will be preserved"
    if ! confirm "Are you sure you want to proceed?"; then
        info "Purge cancelled: backup Geyser first with 'geyser data-dump' and 'geyser keycloak-export'"
        return
    fi

    info "Stopping services..."
    _compose down --volumes --rmi all --remove-orphans

    info "Removing logs..."
    rm -rf "${LOGS_DIR:?}"/*

    success "Purge completed successfully. Initialize Geyser with 'geyser init' or restore a previous backup with 'geyser data-restore' and 'geyser keycloak-import'"
}
