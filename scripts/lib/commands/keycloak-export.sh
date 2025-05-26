###############################################################################
# KEYCLOAK-EXPORT COMMAND
###############################################################################

show_keycloak_export_help() {
    cat <<EOF
Export Keycloak realms and users

Usage: geyser keycloak-export

Export Keycloak realms and users in a backup directory.

Options:
  -h, --help        Show this help message
  --name            Set the name of the export (prompt otherwise)

Note: Keycloak must be stopped before export.
EOF
}

handle_keycloak_export() {
    local backup backup_path

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_keycloak_export_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser keycloak-export --help')"
                exit 1
            fi
            backup="$2"
            debug "Backup name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser keycloak-export --help')"
            exit 1
            ;;
        esac
    done

    if [[ -n "$(compose ps keycloak --format '{{.Status}}')" ]]; then
        warn "Keycloak must be stopped before export"
        if ! confirm "Continue?"; then
            info "Keycloak export cancelled"
            return
        fi
        info "Stopping Keycloak..."
        compose rm -s keycloak
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
    backup_path="${BACKUPS_DIR}/${backup}"
    mkdir -p "${backup_path}"

    info "Exporting Keycloak realms and users..."
    compose run --rm keycloak export --dir "/opt/keycloak/data/backups/${backup}"
    success "Keycloak realms and users exported successfully in ${backup_path}"
}
