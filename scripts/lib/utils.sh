#!/bin/bash

###############################################################################
# UTILITIES
#
# Generic utility functions for:
# - User interaction
# - Backup selection
# - Service management
# - Text manipulation
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
    local backups_path="$1"
    local backups=()
    local backup
    SELECTED_BACKUP= # global

    for backup in "${backups_path}"/*; do
        if [[ -d "${backup}" ]]; then
            backups+=("${backup##*/}")
        fi
    done

    if ((${#backups[@]} == 0)); then
        error "No backups found"
    fi

    info "Backups found:"
    for ((i = 1; i <= ${#backups[@]}; i++)); do
        info "$i) ${backups[i - 1]}"
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
# Service Management
#------------------------------------------------------------------------------

# Docker Compose wrapper
compose() {
    local env_files=(
        "--env-file" "${GEYSER_HOME}/.env"
        "--env-file" "${GEYSER_HOME}/.env.local"
    )
    local compose_files=(
        "-f" "${GEYSER_HOME}/compose.yaml"
    )

    if [[ "${MODE}" == "production" ]]; then
        compose_files+=("-f" "${GEYSER_HOME}/compose.prod.yaml")
    fi

    docker compose "${env_files[@]}" "${compose_files[@]}" "$@"
}

# Hasura CLI wrapper
hasura() {
    export HASURA_GRAPHQL_ADMIN_SECRET
    command hasura --project "${GEYSER_HOME}/hasura" "$@"
}

# Keycloak CLI wrapper
kc() {
    if [[ "$1" == "--restart-with" ]]; then
        shift
        KC_CMD="$*" compose -f compose.kc.yaml up keycloak
        wait_until_exit keycloak
    else
        compose exec -T keycloak /opt/keycloak/bin/kc.sh "$@"
    fi
}

# Keycloak Admin CLI wrapper
kcadm() {
    if [[ "$1" == "--login" ]]; then
        shift
        if [[ "$#" -ne 0 ]]; then
            error "No additional arguments allowed with 'kcadm --login'"
        fi
        compose exec -T keycloak /opt/keycloak/bin/kcadm.sh config credentials \
            --server http://localhost:8081 --realm master \
            --user admin --password "${KEYCLOAK_ADMIN_PASSWORD}"
    else
        compose exec -T keycloak /opt/keycloak/bin/kcadm.sh "$@"
    fi
}

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

#------------------------------------------------------------------------------
# rsync
#------------------------------------------------------------------------------

rsync() {
    command -v rsync &>/dev/null || error "rsync is not installed.
You can install it with 'sudo apt install rsync' (Ubuntu) or 'brew install rsync' (macOS)"

    command rsync -rlv --delete \
        --files-from="${GEYSER_HOME}"/rsync-files \
        --exclude-from="${GEYSER_HOME}"/rsync-exclude \
        "${GEYSER_HOME}/" \
        "$@"
}
