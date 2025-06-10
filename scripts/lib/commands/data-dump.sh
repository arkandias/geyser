###############################################################################
# DATA-DUMP COMMAND
###############################################################################

show_data_dump_help() {
    cat <<EOF
Dump Geyser main database

Usage: geyser data-dump

Dump Geyser main database in a backup directory.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup directory (prompt otherwise)
EOF
}

handle_data_dump() {
    local backup

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_data_dump_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser data-dump --help')"
                exit 1
            fi
            backup="$2"
            debug "Backup directory name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser data-dump --help')"
            exit 1
            ;;
        esac
    done

    # Prompt backup directory name
    if [[ -z "${backup}" ]]; then
        backup="$(date +%Y-%m-%d-%H-%M-%S)"
        while true; do
            prompt "Enter a backup directory name [${backup}]:"
            if [[ -z "${INPUT}" ]]; then
                break
            fi
            if [[ "${INPUT}" =~ ^[A-Za-z0-9_-]+$ ]]; then
                backup="${INPUT}"
                break
            fi
            warn "Invalid input: enter a backup directory name using only letters, numbers, underscores, and hyphens, or leave empty to use timestamp"
        done
    fi

    # Create backup directory
    local backup_path="${BACKUPS_DIR}/${backup}/"
    mkdir -p "${backup_path}"

    info "Dumping database..."
    case "$(_compose ps db --format '{{.Health}}' 2>/dev/null)" in
    "starting")
        wait_until_healthy db
        ;&
    "healthy")
        _compose exec -T db bash -c "pg_dump -U postgres -d geyser -Fc >/backups/${backup}/db.dump"
        ;;
    "unhealthy")
        error "Service db is unhealthy"
        exit 1
        ;;
    "")
        _compose run --rm db pg_dump -U postgres -d geyser -Fc >"/backups/${backup}/db.dump"
        ;;
    esac
    success "Dump created successfully in ${backup_path}"
}
