#!/bin/sh

GEYSER_VERSION="1.0.0"

archive_url="${GITHUB_REPO}/archive/releases/download/v${GEYSER_VERSION}/geyser-${GEYSER_VERSION}.tar.gz"
archive_path="/tmp/geyser-${GEYSER_VERSION}.tar.gz"
extract_path="/tmp/geyser/${GEYSER_VERSION}"
default_install_path="${HOME}/.geyser/${GEYSER_VERSION}"

cleanup() {
    if [ -n "${archive_path}" ] && [ -f "${archive_path}" ]; then
        rm -f "${archive_path}"
    fi
    if [ -n "${extract_path}" ] && [ -d "${extract_path}" ]; then
        rm -rf "${extract_path}"
    fi
}
trap cleanup EXIT

download() {
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL -o "$1" "$2"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$1" "$2"
    else
        echo "Error: Could not find curl or wget to download Geyser" >&2
        exit 1
    fi
}

echo "Geyser ${GEYSER_VERSION} installation"
while true; do
    printf "Enter installation path [%s]: " "${default_install_path}"
    read -r install_path

    if [ -z "${install_path}" ]; then
        install_path="${default_install_path}"
    fi

    # Check if the installation directory already exists
    if [ -d "${install_path}" ]; then
        printf "Installation directory %s already exists.\nDo you want to replace it? [y/N] " "${install_path}"
        read -r response
        case "${response}" in
        [yY])
            # Remove existing installation directory
            rm -rf "${install_path}" || {
                echo "Error: Failed to remove existing installation" >&2
                exit 1
            }
            break
            ;;
        *)
            echo "Please choose a different installation directory"
            continue
            ;;
        esac
    else
        # Create installation parent directory if it doesn't exist
        parent_path="$(dirname "${install_path}")"
        mkdir -p "${parent_path}" || {
            echo "Error: Failed to create parent directory ${parent_path}" >&2
            continue
        }
        break
    fi
done

# Download Geyser from GitHub repository
download "${archive_path}" "${archive_url}" || {
    echo "Error: Failed to download ${archive_url} to ${archive_path}" >&2
    exit 1
}

# Check if file exists and is not empty
if [ ! -s "${archive_path}" ]; then
    echo "Error: File ${archive_path} not found or empty" >&2
    exit 1
fi

# Verify archive
if ! tar -tf "${archive_path}" >/dev/null 2>&1; then
    echo "Error: Invalid or corrupted archive ${archive_path}" >&2
    exit 1
fi

# Create extraction directory if it doesn't exist
mkdir -p "${extract_path}" || {
    echo "Error: Failed to create directory ${extract_path}" >&2
    exit 1
}

# Extract archive
tar -xf "${archive_path}" -C "${extract_path}" --strip-components=1 || {
    echo "Error: Failed to extract ${archive_path}" >&2
    exit 1
}

# Remove archive
rm "${archive_path}" || {
    echo "Error: Failed to remove archive ${archive_path}" >&2
    exit 1
}

# Move extraction directory to installation directory
mv "${extract_path}" "${install_path}" || {
    echo "Error: Failed to move ${extract_path} to ${install_path}" >&2
    exit 1
}

# Verify installation succeeded
if [ -x "${install_path}/scripts/geyser" ]; then
    echo "Geyser ${GEYSER_VERSION} installed successfully"
else
    echo "Error: ${install_path}/scripts/geyser not found" >&2
    exit 1
fi

# Create ~/.local/bin if it doesn't exist
mkdir -p "${HOME}/.local/bin" || {
    echo "Warning: Failed to create directory ${HOME}/.local/bin" >&2
}

# Add symlink to geyser script in ~/.local/bin
ln -sf "${install_path}/scripts/geyser" "${HOME}/.local/bin/geyser" || {
    echo "Warning: Failed to create symlink to geyser script in ${HOME}/.local/bin" >&2
}
echo "Added symlink to geyser script in ${HOME}/.local/bin"

# Verify if ~/.local/bin is in PATH
case ":${PATH}:" in
*":${HOME}/.local/bin:"*) ;;
*)
    echo "Warning: Add ~/.local/bin to PATH"
    echo "You may add the following line to your shell config file (e.g., .bashrc or .zshrc):"
    echo "    export PATH=\"\$HOME/.local/bin:\$PATH\""
    ;;
esac
