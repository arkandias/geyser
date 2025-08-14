###############################################################################
# WEBDAV-UPLOAD COMMAND
###############################################################################

show_webdav_upload_help() {
    cat <<EOF
Upload a file or a directory to a WebDAV server

Usage: geyser webdav-upload --path PATH

Upload a file or directory to a WebDAV server. Directories are compressed into
tar.gz archives before upload.
Requires WEBDAV_URL, WEBDAV_USER, WEBDAV_PASS, and WEBDAV_DIR environment
variables.

Options:
  -h, --help        Show this help message
  --path PATH       Set the path to the file or directory (required)
EOF
}

handle_webdav_upload() {
    local path=

    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_webdav_upload_help
            exit 0
            ;;
        --path)
            if [[ -z "$2" ]]; then
                error "Missing parameter for option --path (see 'geyser webdav-upload --help')"
                exit 1
            fi
            path="$2"
            debug "Path set to ${path} with option --path"
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

    if [[ -z "${path}" ]]; then
        error "Missing file or directory path (use option --path)"
        exit 1
    fi

    _webdav_handle "${path}"

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
            declare -gr "${var}"
        fi
    done

    if [[ "${#missing_vars[@]}" -gt 0 ]]; then
        error "Missing required environment variables: ${missing_vars[*]}"
        exit 1
    fi
}

_webdav_upload_file() {
    local local_file="$1"
    local remote_filename="$2"

    if [[ ! -f "${local_file}" ]]; then
        error "Local file ${local_file} does not exist"
        return 1
    fi

    local remote_url="${WEBDAV_URL%/}/remote.php/dav/files/${WEBDAV_USER}/${WEBDAV_DIR%/}/${remote_filename}"

    info "Uploading file ${local_file} to ${remote_url}..."
    local response_code
    response_code="$(curl -s -o /dev/null -w "%{http_code}" \
        -u "${WEBDAV_USER}:${WEBDAV_PASS}" \
        -T "${local_file}" \
        "${remote_url}")"

    if [[ "${response_code}" != "201" && "${response_code}" != "204" ]]; then
        error "Upload failed with response code ${response_code}"
        return 1
    fi
}

_webdav_handle() {
    local path="$1"

    [[ -e "${path}" ]] || {
        error "${path} does not exist"
        return 1
    }

    local dir name
    dir="$(dirname "${path}")"
    name="$(basename "${path}")"

    local local_file="${path}"
    local remote_filename="${name}"

    if [[ -d "${path}" ]]; then
        local archive_path="/tmp/${name}.tar.gz"

        info "Creating archive ${archive_path}..."
        tar -czf "${archive_path}" -C "${dir}" "${name}"

        local_file="${archive_path}"
        remote_filename="${name}.tar.gz"
        success "Archive created successfully"

        # shellcheck disable=SC2064
        trap "rm -f '${archive_path}'" EXIT
    fi

    _webdav_upload_file "${local_file}" "${remote_filename}"
}
