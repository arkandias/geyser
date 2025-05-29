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
        # shellcheck disable=SC2046
        select_backup_dir $(basename -a "${BACKUPS_DIR}"/*/)
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

    info "Restoring database..."
    case "$(_compose ps -a db --format '{{.Health}}' 2>/dev/null)" in
    "starting")
        wait_until_healthy db
        ;&
    "healthy")
        _compose exec -T db bash -c "dropdb -U postgres --if-exists --force geyser"
        _compose exec -T db bash -c "createdb -U postgres geyser"
        _compose exec -T db bash -c "pg_restore -U postgres -d geyser --clean --if-exists -v /backups/${backup}/db.dump"
        ;;
    "unhealthy")
        error "Service db is unhealthy"
        exit 1
        ;;
    "")
        _compose run --rm db \
            dropdb -U postgres --if-exists --force geyser &&
            createdb -U postgres geyser &&
            pg_restore -U postgres -d geyser --clean --if-exists -v "/backups/${backup}/db.dump"
        ;;
    esac
    success "Backup restored successfully"
}
