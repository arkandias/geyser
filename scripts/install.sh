#!/bin/sh

DEFAULT_GEYSER_VERSION="1.0.0"
version="${GEYSER_VERSION:-${DEFAULT_GEYSER_VERSION}}"

DEFAULT_INSTALL_PATH="${HOME}/.geyser/${version}"
install_path="${INSTALL_PATH:-${DEFAULT_INSTALL_PATH}}"

archive_url="https://github.com/arkandias/geyser/releases/download/v${version}/geyser-${version}.tar.gz"
archive_path="/tmp/geyser-${version}.tar.gz"
extract_path="/tmp/geyser-${version}"

cleanup() {
    if [ -f "${archive_path}" ]; then
        echo "Removing $(basename "${archive_path}")..."
        rm -f "${archive_path}"
    fi
    if [ -d "${extract_path}" ]; then
        echo "Removing $(basename "${extract_path}")..."
        rm -rf "${extract_path}"
    fi
}
trap cleanup EXIT

download() {
    echo "Downloading $(basename "$2")..."
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL -o "$1" "$2"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$1" "$2"
    else
        echo "Error: Could not find curl or wget to download Geyser" >&2
        exit 1
    fi
}

echo "Geyser ${version}..."
echo "Installation path: ${install_path}"

# Check if the installation directory already exists
if [ -e "${install_path}" ]; then
    echo "Error: Installation directory ${install_path} already exists" >&2
    exit 1
fi

# Create parent directory if it doesn't exist
parent_path="$(dirname "${install_path}")"
mkdir -p "${parent_path}" || {
    echo "Error: Failed to create parent directory ${parent_path}" >&2
    exit 1
}

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
echo "Verifying archive..."
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
echo "Extracting archive..."
tar -xf "${archive_path}" -C "${extract_path}" || {
    echo "Error: Failed to extract ${archive_path}" >&2
    exit 1
}

# Move extraction directory to installation directory
echo "Installing to ${install_path}..."
mv "${extract_path}" "${install_path}" || {
    echo "Error: Failed to move ${extract_path} to ${install_path}" >&2
    exit 1
}

# Verify installation succeeded
if [ ! -x "${install_path}/scripts/geyser" ]; then
    echo "Error: ${install_path}/scripts/geyser not found" >&2
    exit 1
fi

# Create ~/.local/bin if it doesn't exist
mkdir -p "${HOME}/.local/bin" || {
    echo "Warning: Failed to create directory ${HOME}/.local/bin" >&2
}

# Create a symlink to geyser script in ~/.local/bin
echo "Creating symlink in ${HOME}/.local/bin..."
ln -sf "${install_path}/scripts/geyser" "${HOME}/.local/bin/geyser" || {
    echo "Warning: Failed to create a symlink to geyser script in ${HOME}/.local/bin" >&2
}

# Verify if ~/.local/bin is in PATH
echo ":${PATH}:" | grep -q ":${HOME}/.local/bin:" || {
    echo "Warning: ~/.local/bin is not in your PATH"
    echo "Add this to your shell config file (~/.bashrc, ~/.zshrc, etc.):"
    echo "    export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo "Or run directly: ${install_path}/scripts/geyser"
}

echo "Installation complete! Run 'geyser' to get started"
