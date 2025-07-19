###############################################################################
# CONFIGURATION MANAGEMENT
###############################################################################

declare -r GEYSER_ENV_VARS=(
    "GEYSER_LOG_LEVEL"
    "GEYSER_ENV"
    "GEYSER_DOMAIN"
    "GEYSER_TENANCY"
    "GEYSER_AS_SERVICE"
)

declare -r REQUIRED_ENV_VARS=(
    "KC_DB_PASSWORD"
    "DB_PASSWORD"
    "HASURA_GRAPHQL_ADMIN_SECRET"
    "API_ADMIN_SECRET"
    "OIDC_CLIENT_SECRET"
)

declare -r OPTIONAL_ENV_VARS=(
    "NGINX_AUTH_ADMIN_ALLOW"
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
    _initialize_computed_env_vars
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
    # Logging verbosity threshold [silent/debug/info/warn/error]
    if [[ -z "${GEYSER_LOG_LEVEL}" ]]; then
        warn "GEYSER_LOG_LEVEL is not set. Defaulting to 'info'"
        GEYSER_LOG_LEVEL="info"
    elif [[ ! "${GEYSER_LOG_LEVEL}" =~ ^(silent|debug|info|warn|error)$ ]]; then
        warn "GEYSER_LOG_LEVEL must be one of 'silent', 'debug', 'info', 'warn', or 'error'; got '${GEYSER_LOG_LEVEL}'. Defaulting to 'info'"
        GEYSER_LOG_LEVEL="info"
    fi
    declare -grx GEYSER_LOG_LEVEL

    # Application deployment environment [development/production]
    if [[ -z "${GEYSER_ENV}" ]]; then
        warn "GEYSER_ENV is not set. Defaulting to 'production'"
        GEYSER_ENV="production"
    elif [[ ! "${GEYSER_ENV}" =~ ^(development|production)$ ]]; then
        warn "GEYSER_ENV must be 'development' or 'production'; got '${GEYSER_ENV}'. Defaulting to 'production'"
        GEYSER_ENV="production"
    fi
    declare -grx GEYSER_ENV

    # Domain at which Geyser will be accessible
    if [[ -z "${GEYSER_DOMAIN}" ]]; then
        warn "GEYSER_DOMAIN is not set. Defaulting to 'geyser.localhost'"
        GEYSER_DOMAIN="geyser.localhost"
    fi
    declare -grx GEYSER_DOMAIN

    # Application tenancy mode [single/multi]
    if [[ -z "${GEYSER_TENANCY}" ]]; then
        warn "GEYSER_TENANCY is not set. Defaulting to 'multi'"
        GEYSER_TENANCY="multi"
    elif [[ ! "${GEYSER_TENANCY}" =~ ^(single|multi)$ ]]; then
        warn "GEYSER_TENANCY must be 'single' or 'multi'; got '${GEYSER_TENANCY}'. Defaulting to 'multi'"
        GEYSER_TENANCY="multi"
    fi
    declare -grx GEYSER_TENANCY

    # Indicates if running as a systemd service (affects logging)
    if [[ -z "${GEYSER_AS_SERVICE}" ]]; then
        debug "GEYSER_AS_SERVICE is not set. Defaulting to 'false'"
        GEYSER_AS_SERVICE="false"
    elif [[ ! "${GEYSER_AS_SERVICE}" =~ ^(true|false)$ ]]; then
        warn "GEYSER_AS_SERVICE must be 'true' or 'false'; got '${GEYSER_AS_SERVICE}'. Defaulting to 'false'"
        GEYSER_AS_SERVICE="false"
    fi
    declare -grx GEYSER_AS_SERVICE
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

_initialize_computed_env_vars() {
    if [[ "${GEYSER_ENV}" == "development" ]]; then
        API_URL="http://api.${GEYSER_DOMAIN}"
        API_ORIGINS="http://*.${GEYSER_DOMAIN}"
        KC_HOSTNAME="http://localhost:8081"
        KC_HOSTNAME_ADMIN="http://localhost:8081"
    elif [[ "${GEYSER_TENANCY}" == "multi" ]]; then
        API_URL="https://api.${GEYSER_DOMAIN}"
        API_ORIGINS="https://*.${GEYSER_DOMAIN}"
        KC_HOSTNAME="https://auth.${GEYSER_DOMAIN}"
        KC_HOSTNAME_ADMIN="https://auth-admin.${GEYSER_DOMAIN}"
    else
        API_URL="https://${GEYSER_DOMAIN}/api"
        API_ORIGINS="https://${GEYSER_DOMAIN}"
        KC_HOSTNAME="https://${GEYSER_DOMAIN}/auth"
        KC_HOSTNAME_ADMIN="https://${GEYSER_DOMAIN}/auth"
    fi

    # shellcheck disable=SC2034
    declare -gr API_URL
    # shellcheck disable=SC2034
    declare -gr API_ORIGINS
    # shellcheck disable=SC2034
    declare -gr KC_HOSTNAME
    # shellcheck disable=SC2034
    declare -gr KC_HOSTNAME_ADMIN
}

_env_summary() {
    debug "============ Configuration ============"
    debug "GEYSER_VERSION=${GEYSER_VERSION}"
    debug "GEYSER_HOME=${GEYSER_HOME}"
    debug "GEYSER_ENV=${GEYSER_ENV}"
    debug "GEYSER_DOMAIN=${GEYSER_DOMAIN}"
    debug "GEYSER_TENANCY=${GEYSER_TENANCY}"
    debug "GEYSER_LOG_LEVEL=${GEYSER_LOG_LEVEL}"
    debug "GEYSER_AS_SERVICE=${GEYSER_AS_SERVICE}"
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
