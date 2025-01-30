###############################################################################
# BACKUP COMMAND
###############################################################################

show_backup_help() {
    cat <<EOF
Create backup of PostgreSQL databases

Usage: geyser backup

Dump Keycloak and Geyser databases. Backups are stored in postgres/backups.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup to create
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
            debug "Backup name set to ${backup} with option --name"
            backup="$2"
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

            warn "Invalid input: enter a backup name using only letters, numbers, underscores, and hyphens, or leave empty to use timestamp"
        done
    fi

    # Create backup directory
    backup_path="${DB_BACKUP_DIR}/${backup}"
    if [[ -d "${backup_path}" ]]; then
        error "Backup ${backup_path} already exists"
    fi
    mkdir -p "${backup_path}"

    info "Backing up databases in ${backup_path}:"
    info "→ Backing up Keycloak database..."
    compose exec -T kc-db bash -c \
        "pg_dump -U postgres -d keycloak -Fc > /backups/${backup}/keycloak.dump"
    info "→ Backing up Geyser database..."
    compose exec -T db bash -c \
        "pg_dump -U postgres -d geyser -Fc > /backups/${backup}/geyser.dump"

    success "Backup completed successfully in ${backup_path}"
}
