###############################################################################
# DEVELOPMENT TOOLS
###############################################################################

# Run Docker Compose with conditional services configuration
_compose() {
    local -a compose_files=(
        "-f" "${GEYSER_HOME}/compose.yaml"
    )
    [[ "${GEYSER_MODE}" == "production" ]] &&
        compose_files+=("-f" "${GEYSER_HOME}/compose.prod.yaml")
    [[ "${GEYSER_MODE}" == "development" ]] &&
        compose_files+=("-f" "${GEYSER_HOME}/compose.dev.yaml")

    docker compose --env-file /dev/null "${compose_files[@]}" "$@"
}

# Run Hasura CLI with project configuration and admin secret
_hasura() {
    hasura --project "${GEYSER_HOME}/hasura" "$@"
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
            --user admin --password "${KC_BOOTSTRAP_ADMIN_PASSWORD}"
        shift
        if [[ "$#" -ne 0 ]]; then
            kcadm "$@"
        fi
    else
        _compose exec -T keycloak /opt/keycloak/bin/kcadm.sh "$@" \
            2> >(sed '/./!{1d;}' >&2) # remove blank line on stderr
    fi
}

# Sync files using rsync with predefined include/exclude patterns from rsync-files and rsync-exclude
_rsync() {
    if ! rsync &>/dev/null; then
        error "rsync is not installed. You can install it with 'sudo apt install rsync' (Ubuntu) or 'brew install rsync' (macOS)"
        exit 1
    fi

    rsync -rlv --delete \
        --files-from="${GEYSER_HOME}"/rsync-files \
        --exclude-from="${GEYSER_HOME}"/rsync-exclude \
        "${GEYSER_HOME}/" \
        "$@"
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
        -template "${GEYSER_HOME}/config/webhooks/${GEYSER_MODE}.json" \
        -cert "${GEYSER_HOME}/nginx/certs/${GEYSER_DOMAIN}/fullchain.crt" \
        -key "${GEYSER_HOME}/nginx/certs/${GEYSER_DOMAIN}/private.key" \
        "$@"
}
