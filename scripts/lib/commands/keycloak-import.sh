###############################################################################
# KEYCLOAK-IMPORT COMMAND
###############################################################################

show_keycloak_import_help() {
    cat <<EOF
Import Keycloak realms and users

Usage: geyser keycloak-import

Import Keycloak realms and users from a previous backup directory.

Options:
  -h, --help        Show this help message
  --name NAME       Set the name of the backup directory (prompt otherwise)

Note: Keycloak must be stopped before import.
EOF
}

handle_keycloak_import() {
    local backup

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_keycloak_import_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser keycloak-import --help')"
                exit 1
            fi
            backup="$2"
            debug "Backup directory name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser keycloak-import --help')"
            exit 1
            ;;
        esac
    done

    if [[ -n "$(_compose ps -q)" ]]; then
        warn "Services must be stopped before import"
        if ! confirm "Continue?"; then
            info "Keycloak import cancelled"
            return
        fi
        info "Stopping services..."
        _compose down
    fi

    # Select a backup directory
    if [[ -z "${backup}" ]]; then
        local -a backups
        mapfile -t backups < <(basename -a "${KC_BACKUPS_DIR}"/*/)
        select_backup "${backups[@]}"
        backup="${SELECTED_BACKUP}"
    fi

    # Check if backup directory exists
    if [ ! -d "${KC_BACKUPS_DIR}/${backup}" ]; then
        error "Backup directory ${backup} does not exist"
        exit 1
    fi

    info "Importing Keycloak realms and users from ${KC_BACKUPS_DIR}/${backup}/..."
    _compose run --rm keycloak import --dir "/opt/keycloak/data/backups/${backup}"
    success "Keycloak realms and users imported successfully"
}
