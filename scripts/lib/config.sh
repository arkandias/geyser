###############################################################################
# CONFIGURATION MANAGEMENT
###############################################################################

ENV_VARS=(
    "GEYSER_DOMAIN"
    "GEYSER_MODE"
    "GEYSER_LOG_LEVEL"
    "KC_BOOTSTRAP_ADMIN_PASSWORD"
    "POSTGRES_KC_PASSWORD"
    "POSTGRES_PASSWORD"
    "HASURA_GRAPHQL_ADMIN_SECRET"
    "CLIENT_SECRET"
    "WEBHOOK_SECRET"
    "WEBDAV_URL"
    "WEBDAV_USER"
    "WEBDAV_PASS"
)

REQUIRED_ENV_VARS=(
    "KC_BOOTSTRAP_ADMIN_PASSWORD"
    "POSTGRES_KC_PASSWORD"
    "POSTGRES_PASSWORD"
    "HASURA_GRAPHQL_ADMIN_SECRET"
    "CLIENT_SECRET"
    "WEBHOOK_SECRET"
)

ENV_FILES=(
    ".env"
    ".env.local"
)

load_environment() {
    _load_env_files
    _validate_required_env_vars
    _validate_optional_env_vars
    _compute_additional_env_vars
    _env_summary
}

_load_env_files() {
    local file

    for file in "${ENV_FILES[@]}"; do
        if [[ -f "${file}" ]]; then
            debug "Loading environment variables from ${file}..."

            mapfile -t matches < <(grep -E "^($(
                IFS='|'
                echo "${ENV_VARS[*]}"
            ))=" "${file}")

            for match in "${matches[@]}"; do
                debug "* ${match}"
                eval "${match}"
            done
        else
            debug "File ${file} not found"
        fi
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
    readonly API_URL="${protocol}://api.${GEYSER_DOMAIN}"
    readonly AUTH_URL="${protocol}://auth.${GEYSER_DOMAIN}"
    readonly ADMIN_URL="${protocol}://admin.${GEYSER_DOMAIN}"
    
    export GEYSER_ORIGIN API_URL AUTH_URL ADMIN_URL
}

_env_summary() {
    debug "========== Configuration =========="
    # shellcheck disable=SC2153
    debug "GEYSER_HOME=${GEYSER_HOME}"
    debug "GEYSER_DOMAIN=${GEYSER_DOMAIN}"
    debug "GEYSER_MODE=${GEYSER_MODE}"
    debug "GEYSER_LOG_LEVEL=${GEYSER_LOG_LEVEL}"
    debug "GEYSER_ORIGIN=${GEYSER_ORIGIN}"
    debug "API_URL=${API_URL}"
    debug "AUTH_URL=${AUTH_URL}"
    debug "ADMIN_URL=${ADMIN_URL}"
    debug "==================================="
}

check_dependencies() {
    debug "Checking dependencies..."
    if ! command -v docker &>/dev/null; then
        error "Docker is not installed"
        exit 1
    fi

    local docker_version
    docker_version="$(docker version --format '{{.Server.Version}}' 2>/dev/null | cut -d'.' -f1)"
    if [[ -z "${docker_version}" ]]; then
        error "Failed to get Docker version. Is Docker daemon running?"
        exit 1
    elif [[ "${docker_version}" -lt 25 ]]; then
        error "Docker Engine version 25.0 or higher is required (current: ${docker_version})"
        exit 1
    fi

    if ! docker compose version &>/dev/null; then
        error "Docker Compose V2 is required"
        exit 1
    fi

    if ! command -v hasura &>/dev/null; then
        error "Hasura CLI is not installed. You can install it with 'curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash'"
        exit 1
    fi
}
