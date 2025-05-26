###############################################################################
# INSTALL-COMPLETION COMMAND
###############################################################################

show_install_completion_help() {
    cat <<EOF
Install zsh completion (using oh-my-zsh)

Usage: geyser completion

- Add zsh completion scripts for geyser, docker, hasura, and keycloak into the
dedicated Oh My Zsh directory ($ZSH/completions).
- Set GEYSER_HOME environment variable in .zshrc (this is required for docker 
wrapper completion).

Options:
  -h, --help        Show this help message
EOF
}

handle_install_completion() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_install_completion_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser install-completion --help')"
            exit 1
            ;;
        esac
    done
    
    if [[ -z "${ZSH}" ]]; then
        error "Oh My Zsh is not installed. You can install it with \
'sh -c \"\$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\"'"
        exit 1
    fi

    prompt "oh-my-zsh directory [${ZSH}]:"
    local omz_completions="${INPUT:-"${ZSH}/completions"}"
    local geyser_completions="${GEYSER_HOME}/scripts/completions"

    info "Installing completion..."
    if [[ ! -d "${omz_completions}" ]]; then
        if ! confirm "Oh My Zsh completions directory not found.
Create it in ${omz_completions}?" "y"; then
            info "Installation cancelled"
        fi
        mkdir -p "${omz_completions}"
    fi

    cp "${geyser_completions}/_geyser" "${omz_completions}/" 2>/dev/null || {
        warn "Failed to install Geyser completion script"
    }
    cp "${geyser_completions}/_kc" "${omz_completions}/" 2>/dev/null || {
        warn "Failed to install Keycloak CLI completion script"
    }
    hasura completion zsh --file="${omz_completions}/_hasura" &>/dev/null || {
        warn "Failed to install Hasura CLI completion script"
    }
    docker completion zsh >"${omz_completions}/_docker" 2>/dev/null || {
        warn "Failed to install Docker completion script"
    }

    if confirm "Add GEYSER_HOME to your .zshrc (required for wrappers completion)?" "y"; then
        # Remove any existing GEYSER_HOME line
        sed_i '/^export GEYSER_HOME=/d' "${HOME}/.zshrc"
        # Add the new GEYSER_HOME line at the end of .zshrc
        echo "export GEYSER_HOME=${GEYSER_HOME}" >>"${HOME}/.zshrc"
    fi

    success "Completion installed successfully"
    info "Restart zsh or run 'omz reload' to enable completion"
}
