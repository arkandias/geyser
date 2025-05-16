###############################################################################
# WEBHOOK-STOP COMMAND
###############################################################################

show_webhook_stop_help() {
    cat <<EOF
Terminate any process listening on port 9000

Terminate any process listening on port 9000, attempting graceful shutdown first
before forcing termination if necessary.

Options:
  -h, --help        Show this help message
EOF
}

handle_webhook_stop() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_webhook_stop_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser webhook-stop --help')"
            ;;
        esac
    done
    
    # Get webhook PID
    WEBHOOK_PID="$(lsof -i :9000 -t 2>/dev/null)"

    if [ -z "${WEBHOOK_PID}" ]; then
        info "No process found listening on port 9000"
        exit 0
    fi

    info "Found process on port 9000 (PID: ${WEBHOOK_PID}). Stopping..."
    kill "${WEBHOOK_PID}" 2>/dev/null
    sleep 1

    if lsof -i :9000 -t &>/dev/null; then
        info "Process didn't stop gracefully, forcing termination..."
        kill -9 "$(lsof -i :9000 -t)" 2>/dev/null
        info "Process forcefully terminated"
    else
        info "Process stopped gracefully"
    fi
}
