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
    command -v hasura &>/dev/null || error "Hasura CLI is not installed. You can install it with 'curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash'"
}

validate_configuration() {
    debug "Validating configuration..."
    _validate_env
    debug "Configuration:"
    debug "* GEYSER_HOME=${GEYSER_HOME}"
    debug "* GEYSER_URL=${GEYSER_URL}"
}

_validate_env() {
    # Required environment variables
    local required_vars=(
        GEYSER_URL
        POSTGRES_PASSWORD
        POSTGRES_KC_PASSWORD
        HASURA_GRAPHQL_ADMIN_SECRET
        KC_BOOTSTRAP_ADMIN_PASSWORD
    )

    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            error "Missing required environment variable ${var}"
        fi
    done
    
    # Optional environment variables
    
    if [[ -z "${CLIENT_BACKEND_SECRET}" ]]; then
        info "Environment variable CLIENT_BACKEND_SECRET is not set. \
It is required to initialize Geyser with 'geyser init'"
    fi
    
    if [[ -z "${WEBHOOK_SECRET}" ]]; then
        info "Environment variable WEBHOOK_SECRET is not set. \
It is required to start a webhook with 'geyser webhook-start'"
    fi
}
