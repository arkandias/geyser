###############################################################################
# INSTALL-COMPLETION COMMAND
###############################################################################

show_completion_help() {
    cat <<EOF
Install shell completion

Usage: geyser completion

Install completion scripts for bash or zsh (using oh-my-zsh).
Updates PATH and GEYSER_HOME environment variables if needed.

Options:
  -h, --help        Show this help message
EOF
}

handle_install_completion() {
    [[ -n "${ZSH}" ]] || error "Oh My Zsh is not installed.
You can install it with 'sh -c \"\$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\"'"

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

    if confirm "Add GEYSER_HOME to your .zshrc (required for some wrappers completion)?" "y"; then
        # Remove any existing GEYSER_HOME line
        sed_i '/^export GEYSER_HOME=/d' "${HOME}/.zshrc"
        # Add the new GEYSER_HOME line at the end of .zshrc
        echo "export GEYSER_HOME=${GEYSER_HOME}" >>"${HOME}/.zshrc"
    fi

    if confirm "Add this script to your PATH via ~/.local/bin?" "y"; then
        if [[ ! "${PATH}" =~ (^|:)"${HOME}/.local/bin"(:|$) ]]; then
            # shellcheck disable=SC2016
            echo 'export PATH="$HOME/.local/bin:$PATH"' >>"${HOME}/.zshrc"
        fi
        mkdir -p "${HOME}/.local/bin"
        ln -sf "${GEYSER_HOME}/scripts/geyser" "${HOME}/.local/bin/geyser"
    fi

    success "Completion installed successfully"
    info "Please restart zsh or run 'omz reload' to enable completion"
}
