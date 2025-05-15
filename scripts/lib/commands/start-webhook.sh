###############################################################################
# START-WEBHOOK COMMAND
###############################################################################

show_start_webhook_help() {
    cat <<EOF
Start a webhook on port 9000

Usage: geyser start-webhook

Start a secure webhook server on port 9000 using SSL/TLS certificates.
Requires WEBHOOK_SECRET environment variable to be set.

Options:
  -h, --help        Show this help message

Note: Run 'geyser stop-webhook' to stop any running webhook.
EOF
}

handle_start_webhook() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_start_webhook_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser start-webhook --help')"
            ;;
        esac
    done

    # Ensure webhook secret is provided
    if [[ -z "${WEBHOOK_SECRET}" ]]; then
        error "Missing required variable WEBHOOK_SECRET"
    fi

    # Check if a webhook is already running
    if lsof -i :9000 -t; then
        error "A process is already listening on port 9000. \
Stop it first with 'geyser stop-webhook'"
    fi

    # Get hostname from url (remove protocol and trailing slash)
    GEYSER_HOSTNAME="${GEYSER_URL#https://}"
    GEYSER_HOSTNAME="${GEYSER_HOSTNAME%%/*}"

    webhook -template hooks.json -port 9000 -verbose -secure \
        -cert "nginx/certs/${GEYSER_HOSTNAME}/fullchain.crt" \
        -key "nginx/certs/${GEYSER_HOSTNAME}/private.key" \
        &>>"${LOG_DIR}/webhook.log" &
    info "Webhook listening on port 9000. Run 'geyser stop-webhook' to stop it"
}
