#!/usr/bin/env bash
# This script is a wrapper to be used by the webhook.

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" &>/dev/null && pwd)"

"${SCRIPT_DIR}/geyser" deploy
