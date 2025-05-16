#!/usr/bin/env bash

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" &>/dev/null && pwd)"
"${SCRIPT_DIR}/geyser" deploy
