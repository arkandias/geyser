###############################################################################
# REALMS-EXPORT COMMAND
###############################################################################

show_realms_export_help() {
    cat <<EOF
Export Keycloak realms and users

Usage: geyser realms-export

Export Keycloak realms and users.

Options:
  -h, --help        Show this help message
  --name            Set the name of the export (prompt otherwise)

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
                exit 1
            fi
            backup="$2"
            debug "Export name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser realms-export --help')"
            exit 1
            ;;
        esac
    done

    if [[ -n "$(compose ps -q)" ]]; then
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
        backup="$(date +%Y-%m-%d-%H-%M-%S)"
        while true; do
            prompt "Enter an export name [${backup}]:"

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
    backup_path="${KC_BACKUPS_DIR}/${backup}"
    if [[ -e "${backup_path}" ]]; then
        error "Export ${backup_path} already exists"
        exit 1
    fi
    mkdir -p "${backup_path}"

    info "Exporting Keycloak realms..."
    compose run keycloak export --dir "/opt/keycloak/data/backups/${backup}"
    wait_until_exit keycloak

    info "Stopping services..."
    compose down

    success "Realms exported successfully in ${backup_path}. Restart Geyser with 'geyser start'"
}
