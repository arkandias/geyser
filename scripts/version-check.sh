#!/usr/bin/env bash

# Exit the script immediately if any command fails
set -e

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"

V_PACKAGE=$(awk -F'"' '/"version"/ {print $4}' "${SCRIPT_DIR}/../package.json")
V_INSTALL=$(grep 'GEYSER_VERSION=' "${SCRIPT_DIR}/install.sh" | cut -d'"' -f2)
V_GEYSER=$(grep 'GEYSER_VERSION=' "${SCRIPT_DIR}/geyser" | cut -d'"' -f2)

if [ "${V_PACKAGE}" = "${V_INSTALL}" ] && [ "${V_PACKAGE}" = "${V_GEYSER}" ]; then
    echo "All versions match (${V_PACKAGE})"
else
    echo "Version mismatch: package.json=${V_PACKAGE}, install.sh=${V_INSTALL}, geyser=${V_GEYSER}"
    exit 1
fi
