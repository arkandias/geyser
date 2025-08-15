###############################################################################
# INIT COMMAND
###############################################################################

show_init_help() {
    cat <<EOF
Initialize a fresh Geyser installation

Usage: geyser init

Pull and build Docker images, start services, initialize the main database,
apply Hasura metadata, stop services, and clean up.

Options:
  -h, --help        Show this help message

Note: Run 'geyser purge' first if you need to start fresh.
EOF
}

handle_init() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_init_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser init --help')"
            exit 1
            ;;
        esac
    done

    if docker volume ls --format '{{.Name}}' | grep -qE '^geyser_(data|kc-data)$'; then
        warn "Existing data volumes found (this may cause conflicts). You should purge Geyser first with 'geyser purge'"
        if ! confirm "Initialize anyway?"; then
            info "Initialization cancelled: Purge Geyser first with 'geyser purge'"
            return
        fi
    fi

    if [[ -n "$(_compose ps -q)" ]]; then
        info "Stopping services..."
        _compose down
    fi

    info "Pulling and building Docker images..."
    _compose pull
    _compose build --pull --no-cache keycloak

    info "Initializing Keycloak..."

    info "Creating Master realm with bootstrap admin user..."
    local username=""
    echo -n "Enter a username for Keycloak temporary admin account [temp-admin]: "
    read -r username
    if [[ -z "${username}" ]]; then
        username="temp-admin"
    fi
    local password=""
    local password_confirm=""
    while [[ -z "${password}" ]]; do
        echo -n "Enter a password for Keycloak temporary admin account: "
        read -rs password
        echo

        if [[ -n "${password}" ]]; then
            echo -n "Confirm password: "
            read -rs password_confirm
            echo

            if [[ "${password}" != "${password_confirm}" ]]; then
                echo "Passwords do not match. Please try again."
                password=""
                password_confirm=""
            fi
        fi
    done
    _compose run --rm \
        -e KC_BOOTSTRAP_ADMIN_USERNAME="${username}" \
        -e KC_BOOTSTRAP_ADMIN_PASSWORD="${password}" \
        keycloak bootstrap-admin user \
        --username:env KC_BOOTSTRAP_ADMIN_USERNAME \
        --password:env KC_BOOTSTRAP_ADMIN_PASSWORD \
        --optimized

    info "Creating Geyser realm..."
    _compose run --rm \
        -e CLIENT_ROOT_URL="${API_URL}" \
        -e CLIENT_WEB_ORIGINS="${API_ORIGINS}" \
        -e CLIENT_SECRET="${OIDC_CLIENT_SECRET}" \
        keycloak import --file /opt/keycloak/data/import/geyser-realm.json

    info "Initializing Hasura..."
    _compose up -d hasura
    wait_until_healthy hasura

    info "Starting all services..."
    _compose up -d --no-build

    info "Cleaning up Docker..."
    docker system prune -f

    success "Initialization completed successfully. Geyser is up and running"
}
