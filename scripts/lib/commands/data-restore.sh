###############################################################################
# DATA-RESTORE COMMAND
###############################################################################

show_data_restore_help() {
    cat <<EOF
Restore Geyser main database

Usage: geyser data-restore

Restore Geyser main database from a previous backup file.

Options:
  -h, --help        Show this help message
  --name NAME       Set the name of the backup file (prompt otherwise)
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
            debug "Backup file name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser data-restore --help')"
            exit 1
            ;;
        esac
    done

    if [[ -n "$(_compose ps -q)" ]]; then
        warn "Services must be stopped before import"
        if ! confirm "Continue?"; then
            info "Data import cancelled"
            return
        fi
        info "Stopping services..."
        _compose down
    fi

    # Select a backup file
    if [[ -z "${backup}" ]]; then
        local -a backups
        mapfile -t backups < <(basename -a "${DB_BACKUPS_DIR}"/*)
        select_backup "${backups[@]}"
        backup="${SELECTED_BACKUP}"
    fi

    # Check if backup file exists
    if [[ ! -f "${DB_BACKUPS_DIR}/${backup}" ]]; then
        error "Backup ${backup} does not exist"
        exit 1
    fi

    info "Restoring database from ${DB_BACKUPS_DIR}/${backup}..."
    _compose up -d db
    wait_until_healthy db
    _compose exec -T db bash -c "dropdb -U postgres --if-exists --force geyser"
    _compose exec -T db bash -c "createdb -U postgres geyser"
    _compose exec -T db bash -c "pg_restore -U postgres -d geyser --clean --if-exists -v /backups/${backup}"
    _compose rm -s -f db
    success "Database restored successfully"
}
