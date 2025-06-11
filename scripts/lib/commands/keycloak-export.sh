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
  --name NAME       Set the name of the backup directory (prompt otherwise)

Note: Keycloak must be stopped before export.
EOF
}

handle_keycloak_export() {
    local backup

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
            debug "Backup directory name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser keycloak-export --help')"
            exit 1
            ;;
        esac
    done

    if [[ -n "$(_compose ps keycloak --format '{{.Status}}')" ]]; then
        warn "Keycloak must be stopped before export"
        if ! confirm "Continue?"; then
            info "Keycloak export cancelled"
            return
        fi
        info "Stopping Keycloak..."
        _compose rm -s -f keycloak
    fi

    # Prompt backup name
    if [[ -z "${backup}" ]]; then
        backup="$(date +%Y-%m-%d-%H-%M-%S)"
        prompt "Enter a backup directory name [${backup}]:"
        if [[ -n "${INPUT}" ]]; then
            backup="${INPUT}"
        fi
    fi

    # Create backup directory
    mkdir -p "${KC_BACKUPS_DIR}/${backup}"

    info "Exporting Keycloak realms and users to ${KC_BACKUPS_DIR}/${backup}..."
    _compose run --rm keycloak export --dir "/opt/keycloak/data/backups/${backup}"
    success "Keycloak realms and users exported successfully"
}
