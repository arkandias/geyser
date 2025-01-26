#!/bin/bash

###############################################################################
# CORE FUNCTIONALITY
#
# Handles:
# - Dependencies checking
# - Configuration loading and saving
# - Environment initialization
###############################################################################

#------------------------------------------------------------------------------
# Dependencies Check
#------------------------------------------------------------------------------

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

#------------------------------------------------------------------------------
# Configuration Management
#------------------------------------------------------------------------------

show_configuration() {
    info "************ CONFIGURATION ************"
    info "GEYSER_HOME: ${GEYSER_HOME}"
    info "MODE: ${MODE}"
    info "NO_AUTH: ${NO_AUTH}"
    info "NO_WEB: ${NO_WEB}"
    info "LOG_LEVEL: ${LOG_LEVEL}"
    info "***************************************"
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
    _validate_auth
    _validate_web
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

_validate_auth() {
    if [[ "${OPT_NO_AUTH}" == "true" && "${NO_AUTH}" != "true" ]]; then
        NO_AUTH="true"
        debug "NO_AUTH overridden with --no-auth option"
    fi
    if [[ "${MODE}" == "production" && "${NO_AUTH}" == "true" ]]; then
        warn "Authentication is required in production mode (NO_AUTH ignored)"
        NO_AUTH="false"
    fi
    if [[ "${NO_AUTH}" != "true" && "${NO_AUTH}" != "false" ]]; then
        error "Invalid NO_AUTH value '${NO_AUTH}' (must be 'true' or 'false').
Use option --no-auth or set NO_AUTH environment variable."
    fi
    debug "NO_AUTH set to '${NO_AUTH}'"
}

_validate_web() {
    if [[ "${OPT_NO_WEB}" == "true" && "${NO_WEB}" != "true" ]]; then
        NO_WEB="true"
        debug "NO_WEB overridden with --no-web option"
    fi
    if [[ "${MODE}" == "production" && "${NO_WEB}" == "true" ]]; then
        warn "Web is required in production mode (NO_WEB ignored)"
        NO_WEB="false"
    fi
    if [[ "${NO_AUTH}" == "true" && "${NO_WEB}" == "false" ]]; then
        warn "Cannot run web with no authentication (NO_WEB set to 'true')"
        NO_WEB="true"
    fi
    if [[ "${NO_WEB}" != "true" && "${NO_WEB}" != "false" ]]; then
        error "Invalid NO_WEB value '${NO_WEB}' (must be 'true' or 'false').
Use option --no-web or set NO_WEB environment variable."
    fi
    debug "NO_WEB set to '${NO_WEB}'"
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

save_configuration() {
    local env_file="${GEYSER_HOME}/.env"
    local configuration
    configuration=$(
        cat <<EOF
MODE="${MODE}"
LOG_LEVEL="${LOG_LEVEL}"
NO_AUTH="${NO_AUTH}"
NO_WEB="${NO_WEB}"
EOF
    )

    if [[ -f "${env_file}" ]]; then
        if [[ -s "${env_file}" ]]; then
            cp "${env_file}" "${env_file}.bak"
            info "Created backup of existing configuration at ${env_file}.bak"
        else
            debug "Existing configuration file is empty, no backup needed"
        fi
    fi

    echo "${configuration}" >"${env_file}"
    success "Configuration saved successfully to ${env_file}"
}

configure() {
    info "Configuring Geyser environment..."

    if [[ "${OPT_DEV}" == "true" ]]; then
        warn "Option --dev ignored for configuration"
    fi
    if [[ "${OPT_PROD}" == "true" ]]; then
        warn "Option --prod ignored for configuration"
    fi
    if [[ "${OPT_NO_AUTH}" == "true" ]]; then
        warn "Option --no-auth ignored for configuration"
    fi
    if [[ -n "${OPT_LOG_LEVEL}" ]]; then
        warn "Option --log-level ignored for configuration"
    fi

    _configure_mode
    _configure_services
    _configure_log_level

    if confirm "Save configuration?" "y"; then
        save_configuration
    fi
}

_configure_mode() {
    info "Available modes:"
    info "1) development"
    info "2) production"
    while true; do
        prompt "Your choice [development]:"
        case "${INPUT}" in
        1 | "")
            MODE="development"
            break
            ;;
        2)
            MODE="production"
            break
            ;;
        *)
            warn "Invalid input: enter a number between 1 and 2"
            ;;
        esac
    done
}

_configure_services() {
    if [[ "${MODE}" == "development" ]]; then
        info "Enable Keycloak authentication service?"
        info "1) Yes"
        info "2) No"
        while true; do
            prompt "Your choice [Yes]:"
            case "${INPUT}" in
            1 | "")
                NO_AUTH="false"
                break
                ;;
            2)
                NO_AUTH="true"
                break
                ;;
            *)
                warn "Invalid input: enter a number between 1 and 2"
                ;;
            esac
        done

        info "Enable Nginx reverse proxy frontend?"
        info "1) Yes"
        info "2) No"
        while true; do
            prompt "Your choice [Yes]:"
            case "${INPUT}" in
            1 | "")
                NO_WEB="false"
                break
                ;;
            2)
                NO_WEB="true"
                break
                ;;
            *)
                warn "Invalid input: enter a number between 1 and 2"
                ;;
            esac
        done
    fi
}

_configure_log_level() {
    info "Log level:"
    info "1) DEBUG"
    info "2) INFO"
    info "3) WARN"
    info "4) ERROR"
    while true; do
        prompt "Your choice [INFO]:"
        case "${INPUT}" in
        1)
            LOG_LEVEL="DEBUG"
            break
            ;;
        2 | "")
            LOG_LEVEL="INFO"
            break
            ;;
        3)
            LOG_LEVEL="WARN"
            break
            ;;
        4)
            LOG_LEVEL="ERROR"
            break
            ;;
        *)
            warn "Invalid input: enter a number between 1 and 4"
            ;;
        esac
    done
    # shellcheck disable=SC2034
    LOG_LEVEL_NUM="$(log_level "${LOG_LEVEL}" 2>/dev/null)"
}
