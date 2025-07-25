#!/usr/bin/env bash
# This script deploys Geyser from a git repository.
# It can be used manually or triggered by a webhook.

# Exit the script immediately if any command fails
set -e

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
GEYSER_HOME="$(cd "${SCRIPT_DIR}/.." && pwd)"

if ! command -v git &>/dev/null; then
    echo "Error: git is not installed or not in PATH" >&2
    echo "Please install git to use deployment from repository" >&2
    exit 1
fi

if ! git -C "${GEYSER_HOME}" rev-parse --git-dir &>/dev/null; then
    echo "Error: ${GEYSER_HOME} is not a git repository" >&2
    echo "This script requires a git-based installation" >&2
    echo "Use 'git clone https://github.com/arkandias/geyser-monorepo.git' to install from repository" >&2
    exit 1
fi

echo "Pulling from repository..."
git -C "${GEYSER_HOME}" pull

"${SCRIPT_DIR}/geyser" update
