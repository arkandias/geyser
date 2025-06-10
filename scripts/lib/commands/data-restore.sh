###############################################################################
# DATA-RESTORE COMMAND
###############################################################################

show_data_restore_help() {
    cat <<EOF
Restore Geyser main database

Usage: geyser data-restore

Restore Geyser main database from a previous dump in a backup directory.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup directory (prompt otherwise)
EOF
}

handle_data_restore() {
    local backup

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_data_restore_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser data-restore --help')"
                exit 1
            fi
            backup="$2"
            debug "Backup directory name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser data-restore --help')"
            exit 1
            ;;
        esac
    done

    # Select backup directory
    if [[ -z "${backup}" ]]; then
        local -a backup_dirs
        mapfile -t backup_dirs < <(basename -a "${BACKUPS_DIR}"/*)
        select_backup_dir "${backup_dirs[@]}"
        backup="${SELECTED_BACKUP_DIR}"
    fi

    # Check if backup directory exists
    if [[ ! -d "${BACKUPS_DIR}/${backup}" ]]; then
        error "Backup directory ${backup} does not exist"
        exit 1
    fi

    # Check if dump file exists
    if [[ ! -f "${BACKUPS_DIR}/${backup}/db.dump" ]]; then
        error "Backup directory ${backup} does not contain a db.dump file"
        exit 1
    fi

    if [[ -n "$(_compose ps db --format '{{.Status}}')" ]]; then
        warn "Database must be stopped before import"
        if ! confirm "Continue?"; then
            info "Data import cancelled"
            return
        fi
        info "Stopping database..."
        _compose rm -s -f db
    fi

    info "Restoring database..."
    _compose up -d db
    wait_until_healthy db
    _compose exec -T db bash -c "dropdb -U postgres --if-exists --force geyser"
    _compose exec -T db bash -c "createdb -U postgres geyser"
    _compose exec -T db bash -c "pg_restore -U postgres -d geyser --clean --if-exists -v /backups/${backup}/db.dump"
    _compose rm -s -f db
    success "Backup restored successfully"
}
