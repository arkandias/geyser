###############################################################################
# DEVELOPMENT TOOLS
###############################################################################

# Runs Docker Compose with environment files and conditional service configurations
compose() {
    local env_files=() compose_files=(
        "-f" "${GEYSER_HOME}/compose.yaml"
    )

    [[ -f "${GEYSER_HOME}/.env" ]] &&
        env_files+=("--env-file" "${GEYSER_HOME}/.env")
    [[ -f "${GEYSER_HOME}/.env.local" ]] &&
        env_files+=("--env-file" "${GEYSER_HOME}/.env.local")

    [[ "${NO_AUTH}" == "false" ]] &&
        compose_files+=("-f" "${GEYSER_HOME}/compose.auth.yaml")
    [[ "${NO_WEB}" == "false" ]] &&
        compose_files+=("-f" "${GEYSER_HOME}/compose.web.yaml")
    [[ "${MODE}" == "production" ]] &&
        compose_files+=("-f" "${GEYSER_HOME}/compose.prod.yaml")

    docker compose "${env_files[@]}" "${compose_files[@]}" "$@"
}

# Runs Hasura CLI with project configuration and admin secret
hasura() {
    export HASURA_GRAPHQL_ADMIN_SECRET
    command hasura --project "${GEYSER_HOME}/hasura" "$@"
}

# Runs Keycloak server CLI with support for restart commands and container execution
kc() {
    if [[ "$1" == "--restart-with" ]]; then
        shift
        KC_CMD="$*" compose -f compose.kc.yaml up keycloak
        wait_until_exit keycloak
    else
        compose exec -T keycloak /opt/keycloak/bin/kc.sh "$@"
    fi
}

# Runs Keycloak admin CLI with authentication and container execution
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

# Syncs files using rsync with predefined include/exclude patterns from rsync-files and rsync-exclude
rsync() {
    command -v rsync &>/dev/null || error "rsync is not installed.
You can install it with 'sudo apt install rsync' (Ubuntu) or 'brew install rsync' (macOS)"

    command rsync -rlv --delete \
        --files-from="${GEYSER_HOME}"/rsync-files \
        --exclude-from="${GEYSER_HOME}"/rsync-exclude \
        "${GEYSER_HOME}/" \
        "$@"
}
