###############################################################################
# UTILITY FUNCTIONS
###############################################################################

#------------------------------------------------------------------------------
# User Interaction
#------------------------------------------------------------------------------

# Display a prompt and store user input in global INPUT variable
prompt() {
    local message="$1"
    declare -g INPUT=

    debug "Prompt: ${message}"
    echo -n "${message} "

    read -r INPUT
    debug "Input: ${INPUT}"
}

# Prompt for yes/no confirmation with optional default (returns true/false)
confirm() {
    local message="$1"
    local default="$2"

    if [[ "${default}" == "y" ]]; then
        prompt "${message} [Y/n]"
        [[ ! "${INPUT}" =~ ^[Nn]$ ]]
    else
        prompt "${message} [y/N]"
        [[ "${INPUT}" =~ ^[Yy]$ ]]
    fi
}

#------------------------------------------------------------------------------
# Backup Management
#------------------------------------------------------------------------------

# Select a backup and store the result in SELECTED_BACKUP
select_backup() {
    local -a backups=("$@")
    declare -g SELECTED_BACKUP=

    if ((${#backups[@]} == 0)); then
        error "No backup found"
        exit 1
    fi

    info "Select a backup:"
    PS3="Enter your choice: "
    select backup in "${backups[@]}"; do
        if [[ -n "${backup}" ]]; then
            # shellcheck disable=SC2034
            SELECTED_BACKUP="${backup}"
            break
        else
            warn "Invalid selection. Please try again"
        fi
    done
}

#------------------------------------------------------------------------------
# Services Management
#------------------------------------------------------------------------------

# Wait for a service to become healthy
wait_until_healthy() {
    local service="$1"
    local timeout="${2:-300}"
    local start_time
    local elapsed_time
    local health

    info "Waiting for service ${service} to become healthy..."
    start_time="$(date +%s)"

    while true; do
        elapsed_time="$(("$(date +%s)" - start_time))"
        if [[ "${elapsed_time}" -ge "${timeout}" ]]; then
            error "Timeout reached (${timeout}s) while waiting for service ${service} to become healthy"
            exit 1
        fi

        health="$(_compose ps -a "${service}" --format '{{.Health}}')"
        case "${health}" in
        "healthy")
            info "Service ${service} is healthy"
            break
            ;;
        "unhealthy")
            error "Service ${service} is unhealthy"
            exit 1
            ;;
        "exited")
            error "Service ${service} stopped unexpectedly"
            exit 1
            ;;
        "")
            error "Service ${service} not found"
            exit 1
            ;;
        esac

        sleep 1
    done
}

#------------------------------------------------------------------------------
# Miscellaneous
#------------------------------------------------------------------------------

# Cross-platform sed -i replacement
sed_i() {
    # macOS requires '' after -i, Linux doesn't
    if [[ "$(uname)" == "Darwin" ]]; then
        sed -i '' "$@"
    else
        sed -i "$@"
    fi
}

# Run command with specified environment variables, skipping empty ones
with_env_vars() {
    local -a env_vars_with_values
    local var
    for var in "${ENV_VARS[@]}"; do
        if [[ -n "${!var:-}" ]]; then
            env_vars_with_values+=("${var}=${!var}")
        fi
    done

    env "${env_vars_with_values[@]}" "$@"
}
