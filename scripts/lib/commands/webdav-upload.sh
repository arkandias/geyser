###############################################################################
# WEBDAV-UPLOAD COMMAND
###############################################################################

show_webdav_upload_help() {
    cat <<EOF
Upload backup directories to a WebDAV server

Usage: geyser webdav-upload

Upload either a single backup directory (if --name option is passed) or all of
them to a WebDAV server. If a backup directory already exists on the WebDAV
server, the corresponding upload is skipped.
Requires WEBDAV_URL, WEBDAV_USER, WEBDAV_PASS, and WEBDAV_DIR environment
variables.

Options:
  -h, --help        Show this help message
  --name            Set the name of the backup directory
EOF
}

handle_webdav_upload() {
    local backup

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_webdav_upload_help
            exit 0
            ;;
        --name)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --name (see 'geyser webdav-upload --help')"
                exit 1
            fi
            backup="$2"
            debug "Backup directory name set to ${backup} with option --name"
            shift 2
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser webdav-upload --help')"
            exit 1
            ;;
        esac
    done

    info "Starting WebDAV upload..."

    _webdav_check_env
    _webdav_test_connection
    _webdav_mkdir

    if [[ -n "${backup}" ]]; then
        _webdav_handle_backup "${backup}"
    else
        shopt -s nullglob
        for backup in "${BACKUPS_DIR}"/*/; do
            _webdav_handle_backup "$(basename "${backup}")"
        done
        shopt -u nullglob
    fi

    success "WebDAV upload completed successfully"
}

_webdav_check_env() {
    local -a required_vars=(
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
}

_webdav_test_connection() {
    local response_code

    response_code="$(curl -s -o /dev/null -w "%{http_code}" \
        -u "${WEBDAV_USER}:${WEBDAV_PASS}" \
        -X PROPFIND \
        -H "Depth: 0" \
        "${WEBDAV_URL}/remote.php/dav/files/${WEBDAV_USER}/")"

    if [[ "${response_code}" != "207" ]]; then
        error "WebDAV server not responding or authentication failed (response code: ${response_code})"
        return 1
    fi
}

# shellcheck disable=SC2120
_webdav_mkdir() {
    local dir_path="$1"
    local full_url
    local response_code

    if [[ -z "${dir_path}" ]]; then
        # Create base directory
        full_url="${WEBDAV_URL}/remote.php/dav/files/${WEBDAV_USER}/${WEBDAV_DIR}"
        info "Creating base directory ${WEBDAV_DIR}..."
    else
        # Create subdirectory
        full_url="${WEBDAV_URL}/remote.php/dav/files/${WEBDAV_USER}/${WEBDAV_DIR}/${dir_path}"
        info "Creating subdirectory ${dir_path}..."
    fi

    response_code="$(curl -s -o /dev/null -w "%{http_code}" \
        -u "${WEBDAV_USER}:${WEBDAV_PASS}" \
        -X MKCOL \
        "${full_url}")"

    if [[ "${response_code}" == "201" ]]; then
        info "Created directory ${dir_path:-base}"
        return 0
    elif [[ "${response_code}" == "405" ]]; then
        info "Directory ${dir_path:-base} already exists"
        return 0
    elif [[ "${response_code}" == "409" ]]; then
        error "Parent directory doesn't exist for ${dir_path:-base}"
        return 1
    else
        error "Failed to create directory ${dir_path:-base} (response code: ${response_code})"
        return 1
    fi
}

_webdav_upload_file() {
    local local_file="$1"
    local remote_path="$2"
    local response_code

    if [[ ! -f "${local_file}" ]]; then
        error "Local file ${local_file} does not exist"
        return 1
    fi

    info "Uploading file ${local_file} to ${remote_path}..."
    response_code="$(curl -s -o /dev/null -w "%{http_code}" \
        -u "${WEBDAV_USER}:${WEBDAV_PASS}" \
        -T "${local_file}" \
        "${WEBDAV_URL}/remote.php/dav/files/${WEBDAV_USER}/${WEBDAV_DIR}/${remote_path}")"

    if [[ "${response_code}" == "201" || "${response_code}" == "204" ]]; then
        return 0
    else
        error "Upload failed with response code ${response_code}"
        return 1
    fi
}

_webdav_handle_backup() {
    local backup="$1"
    local response_code

    response_code="$(curl -s -o /dev/null -w "%{http_code}" \
        -u "${WEBDAV_USER}:${WEBDAV_PASS}" \
        -X PROPFIND \
        -H "Depth: 0" \
        "${WEBDAV_URL}/remote.php/dav/files/${WEBDAV_USER}/${WEBDAV_DIR}/${backup}.tar.gz")"

    if [[ "${response_code}" == "207" ]]; then
        info "Backup ${backup}.tar.gz already exists on server (skipped)"
        return 0
    elif [[ "${response_code}" == "404" ]]; then
        info "Creating archive /tmp/${backup}.tar.gz..."
        tar -czf "/tmp/${backup}.tar.gz" -C "${BACKUPS_DIR}" "$(basename "${backup}")"

        _webdav_upload_file "/tmp/${backup}.tar.gz" "${backup}.tar.gz"
    else
        error "Unexpected response code ${response_code} when checking backup ${backup}"
        return 1
    fi
}
