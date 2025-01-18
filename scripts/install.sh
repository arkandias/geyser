#!/bin/sh

download() {
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL -o "$1" "$2"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$1" "$2"
    else
        echo >&2 "Error: No download tool available. Please install curl or wget to continue."
        exit 1
    fi
}

if [ -n "${GEYSER_VERSION}" ]; then
    # If GEYSER_VERSION is set (not empty), download the specific tag
    zipname="geyser-${GEYSER_VERSION}.zip"
    url="https://github.com/arkandias/geyser-backend/archive/refs/tags/${GEYSER_VERSION}.zip"
else
    # If GEYSER_VERSION is not set, fallback to the master branch
    zipname="geyser.zip"
    url="https://github.com/arkandias/docker-nordlynx/archive/refs/heads/master.zip"
fi

# Download the GitHub repository
download "${zipname}" "${url}" || {
    echo "Download failed" >&2
    exit 1
}

# Extract the downloaded zip file
install_dir="$(tar -tf geyser.zip | head -n1)"
tar -xf geyser.zip || {
    echo "Extraction failed" >&2
    exit 1
}

# Remove the zip file
rm geyser.zip || {
    echo "Cleaning failed" >&2
    exit 1
}

echo "Successfully installed Geyser ${GEYSER_VERSION}"
echo "Navigate to the installation directory with: cd ${install_dir}"
