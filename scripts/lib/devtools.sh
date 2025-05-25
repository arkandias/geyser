###############################################################################
# DEVELOPMENT TOOLS
###############################################################################

# Run Docker Compose with conditional services configuration
compose() {
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
hasura() {
    command hasura --project "${GEYSER_HOME}/hasura" "$@"
}

# Run Keycloak server CLI
kc() {
    compose exec -T keycloak /opt/keycloak/bin/kc.sh "$@"
}

# Run Keycloak admin CLI with authentication
kcadm() {
    if [[ "$1" == "--login" ]]; then
        compose exec -T keycloak /opt/keycloak/bin/kcadm.sh config credentials \
            --server http://localhost:8080 --realm master \
            --user admin --password "${KC_BOOTSTRAP_ADMIN_PASSWORD}"
        shift
        if [[ "$#" -ne 0 ]]; then
            kcadm "$@"
        fi
    else
        compose exec -T keycloak /opt/keycloak/bin/kcadm.sh "$@" \
            2> >(sed '/./!{1d;}' >&2) # remove blank line on stderr
    fi
}

# Sync files using rsync with predefined include/exclude patterns from rsync-files and rsync-exclude
rsync() {
    if ! command -v rsync &>/dev/null; then
        error "rsync is not installed. You can install it with 'sudo apt install rsync' (Ubuntu) or 'brew install rsync' (macOS)"
        exit 1
    fi

    command rsync -rlv --delete \
        --files-from="${GEYSER_HOME}"/rsync-files \
        --exclude-from="${GEYSER_HOME}"/rsync-exclude \
        "${GEYSER_HOME}/" \
        "$@"
}

# Upload a file via WebDAV
webdav_upload() {
    curl -fsS -u "${WEBDAV_USER}:${WEBDAV_PASS}" -T "$1" \
        "${WEBDAV_URL}/remote.php/dav/files/${WEBDAV_USER}/${WEBDAV_DIR}/$2"
}
