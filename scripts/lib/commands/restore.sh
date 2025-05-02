###############################################################################
# RESTORE COMMAND
###############################################################################

show_restore_help() {
    cat <<EOF
Restore Geyser main database from a previous backup

Usage: geyser restore

Restore a backup from the list of previous backups.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup (prompt for name if not set)

Note: Services will be stopped during restore.
EOF
}

handle_restore() {
    local backup backups

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
            backup="$2"
            debug "Backup name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser restore --help')"
            ;;
        esac
    done

    # Select backup
    if [[ -z "${backup}" ]]; then
        backups=()
        for backup in "${DB_BACKUP_DIR}"/*.dump; do
            if [[ -f "${backup}" ]]; then
                backups+=("${backup##*/}")
            fi
        done
        select_backup "${backups[@]}"
    fi

    if [[ -n $(compose ps -q) ]]; then
        warn "Running services need to be stopped for restore"
        if ! confirm "Continue?"; then
            info "Restore cancelled: stop services first with 'geyser stop'"
            return
        fi
        info "Stopping services..."
        compose down
    fi

    info "Starting database..."
    compose up -d db

    info "Restoring database..."
    wait_until_healthy db
    compose exec -T db bash -c \
        "pg_restore -U postgres -d geyser --clean --if-exists -v /backups/${SELECTED_BACKUP}"

    info "Stopping services..."
    compose down

    success "Backup restored successfully. Restart Geyser with 'geyser start'"
}
