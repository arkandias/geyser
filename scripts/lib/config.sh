#!/bin/bash

###############################################################################
# ENVIRONMENT AND DEPENDENCIES
#
# Handles:
# - Dependencies check
# - Environment loading and validation
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

show_configuration() {
    debug "************ CONFIGURATION ************"
    debug "GEYSER_HOME: ${GEYSER_HOME}"
    debug "GEYSER_HOSTNAME: ${GEYSER_HOSTNAME}"
    debug "MODE: ${MODE}"
    debug "LOG_LEVEL: ${LOG_LEVEL}"
    debug "***************************************"
}

load_configuration() {
    debug "Loading environment..."
    debug "Root directory: ${GEYSER_HOME}"

    # Create required directories
    mkdir -p "${DB_BACKUP_DIR}"
    mkdir -p "${KC_BACKUP_DIR}"

    # Load env files
    touch "${GEYSER_HOME}/.env"
    touch "${GEYSER_HOME}/.env.local"
    . "${GEYSER_HOME}/.env"
    . "${GEYSER_HOME}/.env.local"

    _validate_mode
    _validate_logging
}

_validate_mode() {
    if [[ "${OPT_DEV}" == "true" && "${OPT_PROD}" == "true" ]]; then
        error "Invalid options: --dev and --prod cannot be used together"
    fi
    if [[ "${OPT_DEV}" == "true" && "${MODE}" != "development" ]]; then
        MODE="development"
        debug "MODE overridden with --dev option"
    fi
    if [[ "${OPT_PROD}" == "true" && "${MODE}" != "production" ]]; then
        MODE="production"
        debug "MODE overridden with --prod option"
    fi
    if [[ "${MODE}" != "development" && "${MODE}" != "production" ]]; then
        error "Invalid MODE value '${MODE}' (must be 'development' or 'production').
Use options --dev/--prod or set MODE environment variable."
    fi
    debug "MODE set to '${MODE}'"
}

_validate_logging() {
    if [[ -n "${OPT_LOG_LEVEL}" && "${OPT_LOG_LEVEL}" != "${LOG_LEVEL}" ]]; then
        LOG_LEVEL="${OPT_LOG_LEVEL}"
        debug "LOG_LEVEL overridden with --log-level option"
    fi
    # shellcheck disable=SC2034
    LOG_LEVEL_NUM="$(log_level "${LOG_LEVEL}" 2>/dev/null)" ||
        error "Invalid log level '${LOG_LEVEL}' (must be 'DEBUG', 'INFO', 'WARN', or 'ERROR').
Use option --log-level or set LOG_LEVEL environment variable."
    debug "LOG_LEVEL set to '${LOG_LEVEL}'"
}
