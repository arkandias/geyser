###############################################################################
# CONFIGURATION MANAGEMENT
###############################################################################

# Indicates if running as systemd service (affects logging; should not be modified)
# shellcheck disable=SC2034
readonly GEYSER_RUNNING_AS_SERVICE

readonly ENV_VARS=(
    "GEYSER_DOMAIN"
    "GEYSER_MODE"
    "GEYSER_LOG_LEVEL"
    "KC_BOOTSTRAP_ADMIN_PASSWORD"
    "POSTGRES_KC_PASSWORD"
    "POSTGRES_PASSWORD"
    "HASURA_GRAPHQL_ADMIN_SECRET"
    "API_ADMIN_SECRET"
    "CLIENT_SECRET"
    "WEBHOOK_SECRET"
    "WEBDAV_URL"
    "WEBDAV_USER"
    "WEBDAV_PASS"
    "WEBDAV_DIR"
)

readonly REQUIRED_ENV_VARS=(
    "KC_BOOTSTRAP_ADMIN_PASSWORD"
    "POSTGRES_KC_PASSWORD"
    "POSTGRES_PASSWORD"
    "HASURA_GRAPHQL_ADMIN_SECRET"
    "API_ADMIN_SECRET"
    "CLIENT_SECRET"
)

readonly ENV_FILES=(
    "${GEYSER_HOME}/.env"
    "${GEYSER_HOME}/.env.local"
)

load_environment() {
    _load_env_files
    _validate_required_env_vars
    _validate_optional_env_vars
    _compute_additional_env_vars
    _env_summary
}

_load_env_files() {
    local -a lines
    local line env_file

    for env_file in "${ENV_FILES[@]}"; do
        if [[ -f "${env_file}" ]]; then
            mapfile -t lines < <(grep -E "^($(
                IFS='|'
                echo "${ENV_VARS[*]}"
            ))=" "${env_file}")

            for line in "${lines[@]}"; do
                eval "${line}"
            done

            loaded_env_files+=("${env_file}")
        fi
    done

    debug "Env files loaded:"
    for env_file in "${loaded_env_files[@]}"; do
        debug "* ${env_file}"
    done
}

_validate_required_env_vars() {
    local -a missing_vars=()
    local var

    for var in "${REQUIRED_ENV_VARS[@]}"; do
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

_validate_optional_env_vars() {
    # Domain at which Geyser will be accessible
    if [[ -z "${GEYSER_DOMAIN}" ]]; then
        warn "GEYSER_DOMAIN is not set. Defaulting to 'geyser.localhost'"
        GEYSER_DOMAIN="geyser.localhost"
    fi
    readonly GEYSER_DOMAIN
    export GEYSER_DOMAIN

    # Application deployment context [development/staging/production]
    if [[ -z "${GEYSER_MODE}" ]]; then
        warn "GEYSER_MODE is not set. Defaulting to 'staging'"
        GEYSER_MODE="staging"
    elif [[ ! "${GEYSER_MODE}" =~ ^(production|staging|development)$ ]]; then
        warn "Invalid value GEYSER_MODE='${GEYSER_MODE}'. Defaulting to 'staging'"
        GEYSER_MODE="staging"
    fi
    readonly GEYSER_MODE

    # Logging verbosity threshold [silent/debug/info/warn/error]
    if [[ -z "${GEYSER_LOG_LEVEL}" ]]; then
        warn "GEYSER_LOG_LEVEL is not set. Defaulting to 'info'"
        GEYSER_LOG_LEVEL="info"
    elif [[ ! "${GEYSER_LOG_LEVEL}" =~ ^(silent|debug|info|warn|error)$ ]]; then
        warn "Invalid value: GEYSER_LOG_LEVEL='${GEYSER_LOG_LEVEL}'. Defaulting to 'info'"
        GEYSER_LOG_LEVEL="info"
    fi
    readonly GEYSER_LOG_LEVEL
}

_compute_additional_env_vars() {
    local protocol

    if [[ "${GEYSER_MODE}" == "development" ]]; then
        protocol="http"
    else
        protocol="https"
    fi

    readonly GEYSER_ORIGIN="${protocol}://*.${GEYSER_DOMAIN}"
    readonly KC_HOSTNAME="${protocol}://auth.${GEYSER_DOMAIN}"
    readonly KC_HOSTNAME_ADMIN="${protocol}://auth-admin.${GEYSER_DOMAIN}"
    readonly API_URL="${protocol}://api.${GEYSER_DOMAIN}"

    export GEYSER_ORIGIN KC_HOSTNAME KC_HOSTNAME_ADMIN API_URL
}

_env_summary() {
    debug "============ Configuration ============"
    # shellcheck disable=SC2153
    debug "GEYSER_HOME=${GEYSER_HOME}"
    debug "GEYSER_DOMAIN=${GEYSER_DOMAIN}"
    debug "GEYSER_MODE=${GEYSER_MODE}"
    debug "GEYSER_LOG_LEVEL=${GEYSER_LOG_LEVEL}"
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
