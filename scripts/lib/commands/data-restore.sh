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
  --name            Set the name of the backup (prompt otherwise)
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
            debug "Backup name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser data-restore --help')"
            exit 1
            ;;
        esac
    done

    # Select backup name
    if [[ -z "${backup}" ]]; then
        # shellcheck disable=SC2046
        select_backup $(basename -a "${BACKUPS_DIR}"/*/)
        backup="${SELECTED_BACKUP}"
    fi

    info "Restoring database..."
    case "$(compose ps -a db --format '{{.Health}}' 2>/dev/null)" in
    "starting")
        wait_until_healthy db
        ;&
    "healthy")
        compose exec -T db bash -c "pg_restore -U postgres -d geyser --clean --if-exists -v /backups/${backup}/db.dump"
        ;;
    "unhealthy")
        error "Service db is unhealthy"
        exit 1
        ;;
    "")
        compose run --rm db pg_restore -U postgres -d geyser --clean --if-exists -v "/backups/${backup}/db.dump"
        ;;
    esac
    success "Backup restored successfully"
}
