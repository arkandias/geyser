#!/bin/sh

# Exit the script immediately if any command fails
set -e

download() {
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL -o geyser-tmp.zip "$1"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO geyser-tmp.zip "$1"
    else
        echo >&2 "Error: No download tool available. Please install curl or wget to continue."
        exit 1
    fi
}

if [ -n "${GEYSER_VERSION}" ]; then
    # If GEYSER_VERSION is set (not empty), download the specific tag
    url="https://github.com/arkandias/geyser-backend/archive/refs/tags/${GEYSER_VERSION}.zip"
else
    # If GEYSER_VERSION is not set, fallback to the master branch
    url="https://github.com/arkandias/geyser-backend/archive/refs/heads/master.zip"
fi

# Download the GitHub repository
download "${url}" || {
    echo "Download failed" >&2
    exit 1
}

# Extract the downloaded zip file
tar -xfv geyser-tmp.zip || {
    echo "Extraction failed" >&2
    exit 1
}

# Remove the zip file
rm geyser-tmp.zip || {
    echo "Cleaning failed" >&2
    exit 1
}

echo "Successfully installed Geyser ${GEYSER_VERSION}"
echo "Navigate to the installation directory with: cd geyser-backend-${GEYSER_VERSION##v}"
