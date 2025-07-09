###############################################################################
# DEVELOPMENT TOOLS
###############################################################################

# Run Docker Compose with conditional services configuration
_compose() {
    local -a compose_files=(
        "-f" "${GEYSER_HOME}/compose.yaml"
    )
    [[ "${GEYSER_MODE}" == "development" ]] &&
        compose_files+=("-f" "${GEYSER_HOME}/compose.dev.yaml")

    local -a ENV_VARS=(
        "API_URL"
        "API_ORIGINS"
        "KC_HOSTNAME"
        "KC_HOSTNAME_ADMIN"
        "KC_DB_PASSWORD"
        "DB_PASSWORD"
        "HASURA_GRAPHQL_ADMIN_SECRET"
        "API_ADMIN_SECRET"
        "OIDC_CLIENT_SECRET"
        "NGINX_AUTH_ADMIN_ALLOW"
    )

    export COMPOSE_BAKE=true
    with_env_vars docker compose --env-file /dev/null "${compose_files[@]}" "$@"
}

# Run Hasura CLI with project configuration and admin secret
_hasura() {
    # shellcheck disable=SC2034
    local -a ENV_VARS=(
        "HASURA_GRAPHQL_ADMIN_SECRET"
    )

    with_env_vars hasura --project "${GEYSER_HOME}/hasura" "$@"
}

# Run Keycloak server CLI
_kc() {
    _compose exec -T keycloak /opt/keycloak/bin/kc.sh "$@"
}

# Run Keycloak admin CLI with authentication
_kcadm() {
    if [[ "$1" == "--login" ]]; then
        _compose exec -T keycloak /opt/keycloak/bin/kcadm.sh config credentials \
            --server http://localhost:8080 --realm master \
            --user "$2" --password "$3"
    else
        _compose exec -T keycloak /opt/keycloak/bin/kcadm.sh "$@" \
            2> >(sed '/./!{1d;}' >&2) # remove blank line on stderr
    fi
}

# Run a secure webhook with predefined configuration
_webhook() {
    if ! webhook &>/dev/null; then
        error "webhook is not installed. You can install it with 'sudo apt install webhook' (Ubuntu) or 'brew install webhook' (macOS)"
        exit 1
    fi

    if [[ "${GEYSER_MODE}" == "development" ]]; then
        error "Geyser webhook is not available in development mode"
        exit 1
    fi

    webhook -port 9000 -secure \
        -template "${GEYSER_HOME}/config/hooks.json" \
        -cert "${GEYSER_HOME}/nginx/certs/${GEYSER_DOMAIN}/fullchain.crt" \
        -key "${GEYSER_HOME}/nginx/certs/${GEYSER_DOMAIN}/private.key" \
        "$@"
}
