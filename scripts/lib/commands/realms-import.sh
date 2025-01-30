###############################################################################
# REALMS-IMPORT COMMAND
###############################################################################

show_realms_import_help() {
    cat <<EOF
Import Keycloak realms configuration

Usage: geyser realms-import

Options:
  -h, --help        Show this help message
  --name            Set the name of the import

Note: Services must be stopped before import.
EOF
}

handle_realms_import() {
    local backup backup_path

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_realms_import_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser import-realms --help')"
            fi
            debug "Backup name set to ${backup} with option --name"
            backup="$2"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser import-realms --help')"
            ;;
        esac
    done

    if [[ -n $(compose ps -q) ]]; then
        warn "Running services need to be stopped for realms import"
        if ! confirm "Continue?"; then
            info "Realms import cancelled: stop services first with 'geyser stop'"
            return
        fi
        info "Stopping services..."
        compose down
    fi

    # Select backup name
    if [[ -z "${backup}" ]]; then
        select_backup "${KC_BACKUP_DIR}"
        backup="${SELECTED_BACKUP}"
    fi

    # Check backup directory
    backup_path="${KC_BACKUP_DIR}/${SELECTED_BACKUP}"
    if [[ ! -d "${backup_path}" ]]; then
        error "Export ${backup_path} does not exist"
    fi

    info "Importing Keycloak realms..."
    kc --restart-with import --dir "/opt/keycloak/data/backups/${backup}"

    info "Stopping services..."
    compose down

    success "Realms import completed successfully.
Restart Geyser with 'geyser start'"
}
