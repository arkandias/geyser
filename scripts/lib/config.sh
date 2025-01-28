###############################################################################
# CONFIGURATION MANAGEMENT
###############################################################################

check_dependencies() {
    debug "Checking dependencies..."
    command -v docker &>/dev/null || error "Docker is not installed"

    local docker_version
    docker_version=$(docker version --format '{{.Server.Version}}' 2>/dev/null | cut -d'.' -f1)
    if [[ -z "${docker_version}" ]]; then
        error "Failed to get Docker version. Is Docker daemon running?"
    elif [[ "${docker_version}" -lt 25 ]]; then
        error "Docker Engine version 25.0 or higher is required (current: ${docker_version})"
    fi

    docker compose version &>/dev/null || error "Docker Compose V2 is required"
    command -v hasura &>/dev/null || error "Hasura CLI is not installed.
You can install it with 'curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash'"
}

validate_configuration() {
    debug "Validating configuration..."
    debug "Configuration: GEYSER_HOME=${GEYSER_HOME}"
    debug "Configuration: GEYSER_HOSTNAME=${GEYSER_HOSTNAME}"
    _validate_mode
    _validate_auth
    _validate_web
    _validate_env
}

_validate_mode() {
    if [[ "${MODE}" != "development" && "${MODE}" != "production" ]]; then
        error "Invalid value: MODE=${MODE} (must be development or production)"
    fi
    debug "Configuration: MODE=${MODE}"
}

_validate_auth() {
    case "${NO_AUTH}" in
    "true")
        if [[ "${MODE}" == "production" ]]; then
            warn "Authentication is required in production mode (switching to NO_AUTH=false)"
            NO_AUTH="false"
        fi
        ;;
    "false") ;;
    *)
        error "Invalid value: NO_AUTH=${NO_AUTH} (must be true or false)"
        ;;
    esac
    debug "Configuration: NO_AUTH=${NO_AUTH}"
}

_validate_web() {
    case "${NO_WEB}" in
    "true")
        if [[ "${MODE}" == "production" ]]; then
            warn "Web is required in production mode (switching to NO_WEB=false)"
            NO_WEB="false"
        fi
        ;;
    "false")
        if [[ "${NO_AUTH}" == "true" ]]; then
            warn "Cannot run web without authentication (switching to NO_WEB=true)"
            NO_WEB="true"
        fi
        ;;
    *)
        error "Invalid value: NO_WEB=${NO_WEB} (must be true or false)"
        ;;
    esac
    debug "Configuration: NO_WEB=${NO_WEB}"
}

_validate_env() {
    local required_vars=(
        GEYSER_HOSTNAME
        MODE
        NO_AUTH
        NO_WEB
        LOG_LEVEL
        POSTGRES_PASSWORD
        HASURA_GRAPHQL_ADMIN_SECRET
    )

    if [[ "${NO_AUTH}" == "false" ]]; then
        required_vars+=(
            POSTGRES_KC_PASSWORD
            KC_BOOTSTRAP_ADMIN_PASSWORD
        )
    fi

    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            error "Missing required environment variable ${var}"
        fi
    done
}
