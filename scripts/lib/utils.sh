###############################################################################
# UTILITY FUNCTIONS
###############################################################################

#------------------------------------------------------------------------------
# User Interaction
#------------------------------------------------------------------------------

# Displays a prompt and stores user input in global INPUT variable
prompt() {
    local message="$1"
    INPUT= # global

    debug "Prompt: ${message}"
    echo -n "${message} "

    read -r INPUT
    debug "Input: ${INPUT}"
}

# Prompts for yes/no confirmation with optional default (returns true/false)
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

# Prompts user to select a backup directory and stores result in SELECTED_BACKUP
select_backup() {
    local backups=("$@")
    SELECTED_BACKUP= # global

    if ((${#backups[@]} == 0)); then
        error "No backups found"
    fi

    info "Backups found:"
    for ((i = 1; i <= ${#backups[@]}; i++)); do
        info "${i}) ${backups[i - 1]}"
    done

    while true; do
        prompt "Select a backup (1-${#backups[@]}):"

        if [[ ! "${INPUT}" =~ ^[0-9]+$ ]] || ! ((INPUT >= 1 && INPUT <= ${#backups[@]})); then
            warn "Invalid input: enter a number between 1 and ${#backups[@]}"
            continue
        fi

        # shellcheck disable=SC2034
        SELECTED_BACKUP="${backups[INPUT - 1]}"
        break
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
    start_time=$(date +%s)

    while true; do
        elapsed_time=$(($(date +%s) - start_time))
        if [[ "${elapsed_time}" -ge "${timeout}" ]]; then
            error "Timeout reached (${timeout}s) while waiting for service ${service} to become healthy"
        fi

        health="$(compose ps -a "${service}" --format '{{.Health}}')"
        case "${health}" in
        "healthy")
            info "Service ${service} is healthy"
            break
            ;;
        "unhealthy")
            error "Service ${service} is unhealthy"
            ;;
        "exited")
            error "Service ${service} stopped unexpectedly"
            ;;
        "")
            error "Service ${service} not found"
            ;;
        esac

        sleep 1
    done
}

# Wait for a service to exit
wait_until_exit() {
    local service="$1"
    local timeout="${2:-300}"
    local start_time
    local elapsed_time
    local state
    local exit_code

    echo "Waiting for service ${service} to exit (timeout: ${timeout}s)..."
    start_time=$(date +%s)

    while true; do
        elapsed_time=$(($(date +%s) - start_time))
        if [[ "${elapsed_time}" -ge "${timeout}" ]]; then
            error "Timeout reached (${timeout}s) while waiting for service ${service} to exit"
        fi

        state="$(compose ps -a "${service}" --format '{{.State}}')"
        case "${state}" in
        "exited")
            exit_code="$(compose ps -a "${service}" --format '{{.ExitCode}}')"
            info "Service ${service} exited with code ${exit_code}"
            return "${exit_code}"
            ;;
        "")
            error "Service ${service} not found"
            ;;
        esac

        sleep 1
    done
}

#------------------------------------------------------------------------------
# Text Manipulation
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
