###############################################################################
# STATUS COMMAND
###############################################################################

show_show_help() {
    cat <<EOF
Show Geyser services

Usage: geyser show

Show the status of each Geyser service.

Options:
  -h, --help        Show this help message
EOF
}

handle_show() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_show_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser show --help')"
            exit 1
            ;;
        esac
    done

    compose ps -a --format '{{.Service}}: {{.Status}}'
}
