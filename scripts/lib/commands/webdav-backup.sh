###############################################################################
# WEBDAV-BACKUP COMMAND
###############################################################################

show_webdav_backup_help() {
    cat <<EOF
Backup to a WebDAV server

Usage: geyser webdav-backup

Backup database and realm exports to a WebDAV server. Requires WEBDAV_URL, 
WEBDAV_USER, WEBDAV_PASS, and WEBDAV_DIR environment variables.

Options:
  -h, --help        Show this help message
EOF
}

handle_webdav_backup() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_webdav_backup_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser webdav-backup --help')"
            exit 1
            ;;
        esac
    done

    info "Starting WebDAV backup..."

    local required_vars=(
        "WEBDAV_URL"
        "WEBDAV_USER"
        "WEBDAV_PASS"
        "WEBDAV_DIR"
    )
    local -a missing_vars=()
    local var

    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            missing_vars+=("${var}")
        else
            # shellcheck disable=SC2163
            export "${var}"
        fi
    done

    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        error "Missing required environment variables: ${missing_vars[*]}"
        exit 1
    fi

    local timestamp="$(date +%Y-%m-%d-%H-%M-%S)"
    "${SCRIPT_DIR}/geyser" data-dump --name="${timestamp}"
    "${SCRIPT_DIR}/geyser" realms-export --name="${timestamp}"

    if ! webdav_upload "${DB_BACKUPS_DIR}/${timestamp}.dump" "data/${timestamp}.dump"; then
        warn "Failed to upload ${DB_BACKUPS_DIR}/${timestamp}.dump"
    fi

    shopt -s nullglob
    local file filename
    for file in "${KC_BACKUPS_DIR}/${timestamp}"/*.dump; do
        filename="$(basename "${file}")"
        if ! webdav_upload "${file}" "realms/${timestamp}/${filename}"; then
            warn "Failed to upload ${file}"
        fi
    done
    shopt -u nullglob

    info "WebDAV backup finished"
}
