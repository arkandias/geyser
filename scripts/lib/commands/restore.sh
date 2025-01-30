###############################################################################
# RESTORE COMMAND
###############################################################################

show_restore_help() {
    cat <<EOF
Restore databases from a previous backup

Usage: geyser restore

List available backups and restore selected backup to databases.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup to restore

Note: Services will be stopped during restore.
EOF
}

handle_restore() {
    local backup backup_path

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_restore_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser restore --help')"
            fi
            debug "Backup name set to ${backup} with option --name"
            backup="$2"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser restore --help')"
            ;;
        esac
    done

    if [[ -n $(compose ps -q) ]]; then
        warn "Running services need to be stopped for restore"
        if ! confirm "Continue?"; then
            info "Restore cancelled: stop services first with 'geyser stop'"
            return
        fi
        info "Stopping services..."
        compose down
    fi

    # Select backup name
    if [[ -z "${backup}" ]]; then
        select_backup "${DB_BACKUP_DIR}"
        backup="${SELECTED_BACKUP}"
    fi

    # Check backup directory
    backup_path="${DB_BACKUP_DIR}/${backup}"
    if [[ ! -d "${backup_path}" ]]; then
        error "Backup ${backup_path} does not exist"
    fi

    info "Starting databases..."
    compose up -d kc-db db

    info "Restoring databases:"
    info "→ Restoring Keycloak database..."
    if [[ -f "${backup_path}/keycloak.dump" ]]; then
        wait_until_healthy kc-db
        compose exec -T kc-db bash -c \
            "pg_restore -U postgres -d keycloak --clean --if-exists -v /backups/${SELECTED_BACKUP}/keycloak.dump"
    else
        warn "No backups found for Keycloak database in ${backup}"
    fi

    info "→ Restoring Geyser database..."
    if [[ -f "${backup_path}/geyser.dump" ]]; then
        wait_until_healthy db
        compose exec -T db bash -c \
            "pg_restore -U postgres -d geyser --clean --if-exists -v /backups/${SELECTED_BACKUP}/geyser.dump"
    else
        warn "No backups found for Geyser database in ${backup}"
    fi

    info "Stopping services..."
    compose down

    success "Restore completed successfully.
Restart Geyser with 'geyser start'"
}
