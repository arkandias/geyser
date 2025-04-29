###############################################################################
# BACKUP COMMAND
###############################################################################

show_backup_help() {
    cat <<EOF
Create a backup of Geyser main database

Usage: geyser backup

Dump Geyser main database into a subdirectory of postgres/backups.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup (prompt for name if not set)
EOF
}

handle_backup() {
    local backup backup_path

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_backup_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser backup --help')"
            fi
            backup="$2"
            debug "Backup name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser backup --help')"
            ;;
        esac
    done

    # Prompt backup name
    if [[ -z "${backup}" ]]; then
        backup=$(date +%Y-%m-%d-%H-%M-%S)
        while true; do
            prompt "Enter a backup name [${backup}]:"
            if [[ -z "${INPUT}" ]]; then
                break
            fi
            if [[ "${INPUT}" =~ ^[A-Za-z0-9_-]+$ ]]; then
                backup="${INPUT}"
                break
            fi
            warn "Invalid input: enter a backup name using only letters, \
numbers, underscores, and hyphens, or leave empty to use timestamp"
        done
    fi

    # Check backup does not already exist
    backup_path="${DB_BACKUP_DIR}/${backup}.dump"
    if [[ -e "${backup_path}" ]]; then
        error "Backup ${backup_path} already exists"
    fi

    # Check if db is healthy and start it otherwise
    if [[ "$(compose ps -a "${service}" --format '{{.Health}}' 2>/dev/null)" != "healthy" ]]; then
        compose up -d db
        wait_until_healthy db
    fi

    info "Backing up database..."
    compose exec -T db bash -c \
        "pg_dump -U postgres -d geyser -Fc >/backups/${backup}.dump"

    success "Backup created successfully in ${backup_path}"
}
