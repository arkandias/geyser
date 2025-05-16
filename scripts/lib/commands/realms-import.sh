###############################################################################
# REALMS-IMPORT COMMAND
###############################################################################

show_realms_import_help() {
    cat <<EOF
Import Keycloak realms and users

Usage: geyser realms-import

Import Keycloak realms and users.

Options:
  -h, --help        Show this help message
  --name            Set the name of the export (prompt otherwise)

Note: Services must be stopped before import.
EOF
}

handle_realms_import() {
    local backup backups

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_realms_import_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser realms-import --help')"
            fi
            backup="$2"
            debug "Export name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser realms-import --help')"
            ;;
        esac
    done

    # Select backup
    if [[ -z "${backup}" ]]; then
        backups=()
        for backup in "${KC_BACKUP_DIR}"/*; do
            if [[ -d "${backup}" ]]; then
                backups+=("${backup##*/}")
            fi
        done
        select_backup "${backups[@]}"
    fi

    if [[ -n $(compose ps -q) ]]; then
        warn "Running services need to be stopped for realms import"
        if ! confirm "Continue?"; then
            info "Realms import cancelled: stop services first with 'geyser stop'"
            return
        fi
        info "Stopping services..."
        compose down
    fi

    info "Importing Keycloak realms..."
    kc --restart-with import --dir "/opt/keycloak/data/backups/${SELECTED_BACKUP}"

    info "Stopping services..."
    compose down

    success "Realms imported successfully. Restart Geyser with 'geyser start'"
}
