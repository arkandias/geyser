###############################################################################
# CONFIGURATION MANAGEMENT
###############################################################################

declare -r GEYSER_ENV_VARS=(
    "GEYSER_DOMAIN"
    "GEYSER_MODE"
    "GEYSER_TAG"
    "GEYSER_LOG_LEVEL"
    "GEYSER_AS_SERVICE"
)

declare -r REQUIRED_ENV_VARS=(
    "KC_BOOTSTRAP_ADMIN_PASSWORD"
    "POSTGRES_KC_PASSWORD"
    "POSTGRES_PASSWORD"
    "HASURA_GRAPHQL_ADMIN_SECRET"
    "API_ADMIN_SECRET"
    "CLIENT_SECRET"
)

declare -r OPTIONAL_ENV_VARS=(
    "WEBHOOK_SECRET"
    "WEBDAV_URL"
    "WEBDAV_USER"
    "WEBDAV_PASS"
    "WEBDAV_DIR"
)

# shellcheck disable=SC2034
declare -r ENV_FILES=(
    "${GEYSER_HOME}/.env"
    "${GEYSER_HOME}/.env.local"
)

load_environment() {
    _load_env_files
    _validate_geyser_env_vars
    _validate_required_env_vars
    _validate_optional_env_vars
    _compute_additional_env_vars
    _env_summary
}

_load_env_files() {
    local -a env_vars=(
        "${GEYSER_ENV_VARS[@]}"
        "${REQUIRED_ENV_VARS[@]}"
        "${OPTIONAL_ENV_VARS[@]}"
    )
    local -a loaded_env_files=()

    # Save current values of environment variables before loading from files
    local var
    for var in "${env_vars[@]}"; do
        local saved_var="SAVED_${var}"
        if [[ -n "${!var:-}" ]]; then
            declare -g "${saved_var}=${!var}"
        fi
    done

    # Pattern to search env files for environment variables names
    local pattern
    pattern="^($(
        IFS='|'
        echo "${env_vars[*]}"
    ))="

    # Load environment variables from env files
    local env_file
    for env_file in "${ENV_FILES[@]}"; do
        if [[ -f "${env_file}" ]]; then
            local -a lines
            mapfile -t lines < <(grep -E "${pattern}" "${env_file}")

            local line
            for line in "${lines[@]}"; do
                eval "${line}"
            done

            loaded_env_files+=("${env_file}")
        fi
    done

    # Restore original values if they were saved (prioritize shell environment over files)
    local var
    for var in "${env_vars[@]}"; do
        local saved_var="SAVED_${var}"
        if [[ -n "${!saved_var:-}" ]]; then
            declare -g "${var}=${!saved_var}"
        fi
    done

    debug "Env files loaded:"
    for env_file in "${loaded_env_files[@]}"; do
        debug "* ${env_file}"
    done
}

_validate_geyser_env_vars() {
    # Domain at which Geyser will be accessible
    if [[ -z "${GEYSER_DOMAIN}" ]]; then
        warn "GEYSER_DOMAIN is not set. Defaulting to 'geyser.localhost'"
        GEYSER_DOMAIN="geyser.localhost"
    fi
    declare -gr GEYSER_DOMAIN

    # Application deployment context [development/production]
    if [[ -z "${GEYSER_MODE}" ]]; then
        warn "GEYSER_MODE is not set. Defaulting to 'production'"
        GEYSER_MODE="production"
    elif [[ ! "${GEYSER_MODE}" =~ ^(development|production)$ ]]; then
        warn "Invalid value GEYSER_MODE='${GEYSER_MODE}'. Defaulting to 'production'"
        GEYSER_MODE="production"
    fi
    declare -gr GEYSER_MODE

    # Tag for backend and frontend images
    if [[ -z "${GEYSER_TAG}" ]]; then
        warn "GEYSER_TAG is not set. Defaulting to 'latest'"
        GEYSER_TAG="latest"
    fi
    declare -gr GEYSER_TAG

    # Logging verbosity threshold [silent/debug/info/warn/error]
    if [[ -z "${GEYSER_LOG_LEVEL}" ]]; then
        warn "GEYSER_LOG_LEVEL is not set. Defaulting to 'info'"
        GEYSER_LOG_LEVEL="info"
    elif [[ ! "${GEYSER_LOG_LEVEL}" =~ ^(silent|debug|info|warn|error)$ ]]; then
        warn "Invalid value: GEYSER_LOG_LEVEL='${GEYSER_LOG_LEVEL}'. Defaulting to 'info'"
        GEYSER_LOG_LEVEL="info"
    fi
    declare -gr GEYSER_LOG_LEVEL

    # Indicates if running as a systemd service (affects logging)
    if [[ -z "${GEYSER_AS_SERVICE}" ]]; then
        debug "GEYSER_AS_SERVICE is not set. Defaulting to 'false'"
        GEYSER_AS_SERVICE="false"
    elif [[ ! "${GEYSER_AS_SERVICE}" =~ ^(true|false)$ ]]; then
        warn "Invalid value: GEYSER_AS_SERVICE='${GEYSER_AS_SERVICE}'. Defaulting to 'false'"
        GEYSER_AS_SERVICE="false"
    fi
    declare -gr GEYSER_AS_SERVICE
}

_validate_required_env_vars() {
    local -a missing_vars=()

    local var
    for var in "${REQUIRED_ENV_VARS[@]}"; do
        if [[ -z "${!var}" ]]; then
            missing_vars+=("${var}")
        else
            declare -gr "${var}"
        fi
    done

    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        error "Missing required environment variables: ${missing_vars[*]}"
        exit 1
    fi
}

_validate_optional_env_vars() {
    local var
    for var in "${OPTIONAL_ENV_VARS[@]}"; do
        if [[ -z "${!var}" ]]; then
            declare -gr "${var}"
        fi
    done
}

_compute_additional_env_vars() {
    local protocol
    if [[ "${GEYSER_MODE}" == "development" ]]; then
        protocol="http"
    else
        protocol="https"
    fi

    declare -gr GEYSER_ORIGIN="${protocol}://*.${GEYSER_DOMAIN}"
    declare -gr KC_HOSTNAME="${protocol}://auth.${GEYSER_DOMAIN}"
    declare -gr KC_HOSTNAME_ADMIN="${protocol}://auth-admin.${GEYSER_DOMAIN}"
    declare -gr API_URL="${protocol}://api.${GEYSER_DOMAIN}"
}

_env_summary() {
    debug "============ Configuration ============"
    # shellcheck disable=SC2153
    debug "GEYSER_HOME=${GEYSER_HOME}"
    debug "GEYSER_DOMAIN=${GEYSER_DOMAIN}"
    debug "GEYSER_MODE=${GEYSER_MODE}"
    debug "GEYSER_TAG=${GEYSER_TAG}"
    debug "GEYSER_LOG_LEVEL=${GEYSER_LOG_LEVEL}"
    debug "GEYSER_AS_SERVICE=${GEYSER_AS_SERVICE}"
    debug "GEYSER_ORIGIN=${GEYSER_ORIGIN}"
    debug "API_URL=${API_URL}"
    debug "KC_HOSTNAME=${KC_HOSTNAME}"
    debug "KC_HOSTNAME_ADMIN=${KC_HOSTNAME_ADMIN}"
    debug "======================================="
}

check_dependencies() {
    if ! command -v docker &>/dev/null; then
        error "Docker is not installed"
        exit 1
    fi

    local docker_version
    docker_version="$(docker version --format '{{.Server.Version}}' 2>/dev/null)"
    if [[ -z "${docker_version}" ]]; then
        error "Failed to get Docker version. Is Docker daemon running?"
        exit 1
    fi

    if [[ "${docker_version%%.*}" -lt 23 ]]; then
        error "Docker Engine version 23+ required (current: ${docker_version})"
        exit 1
    fi

    if ! docker compose version &>/dev/null; then
        error "Docker Compose V2 is required"
        exit 1
    fi

    if ! docker buildx version &>/dev/null; then
        error "Docker buildx is required"
        exit 1
    fi

    if ! hasura &>/dev/null; then
        error "Hasura CLI is not installed. You can install it with \
'curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash'"
        exit 1
    fi
}
