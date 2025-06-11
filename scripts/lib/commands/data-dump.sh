###############################################################################
# DATA-BACKUP COMMAND
###############################################################################

show_data_backup_help() {
    cat <<EOF
Backup Geyser main database

Usage: geyser data-backup

Dump Geyser main database to a backup file.

Options:
  -h, --help        Show this help message
  --name NAME       Set the name of the backup file (prompt otherwise)
EOF
}

handle_data_backup() {
    local backup

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_data_backup_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser data-backup --help')"
                exit 1
            fi
            backup="$2"
            debug "Backup file name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser data-backup --help')"
            exit 1
            ;;
        esac
    done

    # Prompt backup file name
    if [[ -z "${backup}" ]]; then
        backup="$(date +%Y-%m-%d-%H-%M-%S).dump"
        while true; do
            prompt "Enter a backup file name [${backup}]:"
            if [[ -z "${INPUT}" ]]; then
                break
            fi
            if [[ "${INPUT}" =~ ^[A-Za-z0-9_-]+$ ]]; then
                backup="${INPUT}"
                break
            fi
            warn "Invalid input: enter a backup file name using only letters, numbers, underscores, and hyphens, or leave empty to use timestamp"
        done
    fi

    info "Backing up database to ${DB_BACKUPS_DIR}/${backup}..."
    case "$(_compose ps db --format '{{.Health}}' 2>/dev/null)" in
    "")
        _compose up -d db
        ;&
    "starting")
        wait_until_healthy db
        ;&
    "healthy")
        _compose exec -T db bash -c "pg_dump -U postgres -d geyser -Fc >/backups/${backup}"
        ;;
    "unhealthy")
        error "Service db is unhealthy"
        exit 1
        ;;
    esac
    success "Database backup completed successfully"
}
