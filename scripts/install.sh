#!/bin/sh

GITHUB_REPO="https://github.com/arkandias/geyser"
DEFAULT_BRANCH="master"
INSTALL_BASE="${HOME}/.geyser"

cleanup() {
    if [ -n "${tarname}" ] && [ -f "${tarname}" ]; then
        rm -f "${tarname}"
    fi
    if [ -n "${extract_dir}" ] && [ -d "${extract_dir}" ]; then
        rm -rf "${extract_dir}"
    fi
}
trap cleanup EXIT

if [ -n "${GEYSER_VERSION}" ]; then
    # If GEYSER_VERSION is set (not empty), download the specific tag
    url="${GITHUB_REPO}/archive/refs/tags/${GEYSER_VERSION}.tar.gz"
    tarname="geyser-${GEYSER_VERSION}.tar.gz"
    install_dir="${INSTALL_BASE}/${GEYSER_VERSION}"
else
    # If GEYSER_VERSION is not set, fallback to the default branch
    url="${GITHUB_REPO}/archive/refs/heads/${DEFAULT_BRANCH}.tar.gz"
    tarname="geyser.tar.gz"
    install_dir="${INSTALL_BASE}/master"
fi

# Create base directory if it doesn't exist
mkdir -p "${INSTALL_BASE}" || {
    echo "Error: Failed to create directory ${INSTALL_BASE}" >&2
    exit 1
}

# Change to base directory
cd "${INSTALL_BASE}" || {
    echo "Error: Failed to change to directory ${INSTALL_BASE}" >&2
    exit 1
}

download() {
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL -o "$1" "$2"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$1" "$2"
    else
        echo "Error: Could not find curl or wget to download the repository" >&2
        exit 1
    fi
}

# Download Geyser from GitHub repository
download "${tarname}" "${url}" || {
    echo "Error: Failed to download ${url} to ${tarname}" >&2
    exit 1
}

# Check if download succeeded and file is not empty
if [ ! -s "${tarname}" ]; then
    echo "Error: Download failed - file ${tarname} not found or empty" >&2
    exit 1
fi

# Verify archive
if ! tar tf "${tarname}" >/dev/null 2>&1; then
    echo "Error: Invalid or corrupted archive ${tarname}" >&2
    exit 1
fi

# Extract archive
extract_dir="$(tar -tf "${tarname}" | head -n1)"
tar -xf "${tarname}" || {
    echo "Error: Failed to extract ${tarname}" >&2
    exit 1
}

# Rename installation directory
if [ -d "${install_dir}" ]; then
    printf "Directory %s already exists.\nDo you want to replace it? [y/N] " "${install_dir}"
    read -r response
    case "${response}" in
    [yY])
        rm -rf "${install_dir}" || {
            echo "Error: Failed to remove existing installation directory" >&2
            exit 1
        }
        ;;
    *)
        echo "Installation cancelled"
        exit 1
        ;;
    esac
fi
mv "${extract_dir}" "${install_dir}" || {
    echo "Error: Failed to move extracted files to installation directory"
    exit 1
}

# Remove archive
rm "${tarname}" || {
    echo "Error: Failed to remove archive ${tarname}" >&2
    exit 1
}

# Add geyser to ~/.local/bin
mkdir -p "${HOME}/.local/bin" || {
    echo "Error: Failed to create directory ~/.local/bin" >&2
    exit 1
}
ln -sf "${install_dir}/scripts/geyser" "${HOME}/.local/bin/geyser" || {
    echo "Error: Failed to create symlink to geyser in ~/.local/bin" >&2
    exit 1
}
echo "Added symlink to geyser in ~/.local/bin"
echo "Make sure to add this directory to your PATH by adding the following line to your shell config file (e.g., ~/.bashrc or ~/.zshrc):"
echo "    export PATH=\"\$HOME/.local/bin:\$PATH\""

# Installation success messages
echo "Geyser installed successfully"
echo "Navigate to the installation directory with 'cd ${install_dir}'"
