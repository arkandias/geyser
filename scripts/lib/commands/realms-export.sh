###############################################################################
# REALMS-EXPORT COMMAND
###############################################################################

show_realms_export_help() {
    cat <<EOF
Export Keycloak realms configuration

Usage: geyser realms-export

Options:
  -h, --help        Show this help message
  --name            Set the name of the export

Note: Services must be stopped before export.
EOF
}

handle_realms_export() {
    local backup backup_path

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_realms_export_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser realms-export --help')"
            fi
            debug "Export name set to ${backup} with option --name"
            backup="$2"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser realms-export --help')"
            ;;
        esac
    done

    if [[ -n $(compose ps -q) ]]; then
        warn "Running services need to be stopped for realms export"
        if ! confirm "Continue?"; then
            info "Realms export cancelled: stop services first with 'geyser stop'"
            return
        fi
        info "Stopping services..."
        compose down
    fi

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

            warn "Invalid input: enter an export name using only letters, numbers, underscores, and hyphens, or leave empty to use timestamp"
        done
    fi

    # Create backup directory
    backup_path="${KC_BACKUP_DIR}/${backup}"
    if [[ -d "${backup_path}" ]]; then
        error "Backup ${backup_path} already exists"
    fi
    mkdir -p "${backup_path}"

    info "Exporting Keycloak realms..."
    kc --restart-with export --dir "/opt/keycloak/data/backups/${backup}"

    info "Stopping services..."
    compose down

    success "Realms export completed successfully in ${backup_path}.
Restart Geyser with 'geyser start'"
}
