###############################################################################
# DATA-DUMP COMMAND
###############################################################################

show_data_dump_help() {
    cat <<EOF
Dump Geyser main database

Usage: geyser data-dump

Dump Geyser main database.

Options:
  -h, --help        Show this help message
  --name            Set the name of the dump (prompt otherwise)
EOF
}

handle_data_backup() {
    local backup backup_path

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
            debug "Dump name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser data-dump --help')"
            exit 1
            ;;
        esac
    done

    # Prompt backup name
    if [[ -z "${backup}" ]]; then
        backup="$(date +%Y-%m-%d-%H-%M-%S)"
        while true; do
            prompt "Enter a dump name [${backup}]:"
            if [[ -z "${INPUT}" ]]; then
                break
            fi
            if [[ "${INPUT}" =~ ^[A-Za-z0-9_-]+$ ]]; then
                backup="${INPUT}"
                break
            fi
            warn "Invalid input: enter a dump name using only letters, numbers, underscores, and hyphens, or leave empty to use timestamp"
        done
    fi

    # Check backup does not already exist
    backup_path="${DB_BACKUPS_DIR}/${backup}.dump"
    if [[ -e "${backup_path}" ]]; then
        error "Dump ${backup_path} already exists"
        exit 1
    fi

    # Check if db is healthy and start it otherwise
    if [[ "$(compose ps -a db --format '{{.Health}}' 2>/dev/null)" != "healthy" ]]; then
        compose up -d db
        wait_until_healthy db
    fi

    info "Dumping database..."
    compose exec -T db bash -c "pg_dump -U postgres -d geyser -Fc >/backups/${backup}.dump"

    success "Dump created successfully in ${backup_path}"
}
