###############################################################################
# LOGGING SYSTEM
###############################################################################

# Constants for log levels (compatible with systemd)
readonly LOG_LEVEL_ERROR=3
readonly LOG_LEVEL_WARN=4
readonly LOG_LEVEL_INFO=6
readonly LOG_LEVEL_DEBUG=7

# ANSI color codes
readonly COLOR_RED='\033[31m'
readonly COLOR_GREEN='\033[32m'
readonly COLOR_YELLOW='\033[33m'
readonly COLOR_BLUE='\033[34m'
readonly COLOR_RESET='\033[0m'

log_level() {
    case "$1" in
    silent) echo "-1" ;;
    error) echo "${LOG_LEVEL_ERROR}" ;;
    warn) echo "${LOG_LEVEL_WARN}" ;;
    info | success) echo "${LOG_LEVEL_INFO}" ;;
    debug) echo "${LOG_LEVEL_DEBUG}" ;;
    esac
}

log() {
    local level="$1"
    local message="$2"
    local level_num
    level_num="$(log_level "${level}")"

    if [[ "${GEYSER_RUNNING_AS_SERVICE}" == "true" ]]; then
        # Running as service: simple output, no colors, no timestamp systemd
        # will add timestamps and parse <N> for journal priority levels
        if [[ "${level_num}" -le "$(log_level "${GEYSER_LOG_LEVEL}")" ]]; then
            echo "<${level_num}>[${level^^}] ${message}"
        fi
    else
        # Console output (colored, respects log level)
        if [[ "${level_num}" -le "$(log_level "${GEYSER_LOG_LEVEL}")" ]]; then
            local log_entry
            log_entry="[$(date +'%Y-%m-%d %H:%M:%S')] [Geyser] [${level^^}] ${message}"
            case "${level}" in
            error) echo -e "${COLOR_RED}${log_entry}${COLOR_RESET}" >&2 ;;
            success) echo -e "${COLOR_GREEN}${log_entry}${COLOR_RESET}" ;;
            warn) echo -e "${COLOR_YELLOW}${log_entry}${COLOR_RESET}" >&2 ;;
            debug) echo -e "${COLOR_BLUE}${log_entry}${COLOR_RESET}" ;;
            info) echo -e "${log_entry}" ;;
            esac
        fi
        # Journal output (always logged, structured)
        if command -v systemd-cat &>/dev/null; then
            echo "[${level^^}] ${message}" | systemd-cat \
                --identifier="geyser" \
                --priority="$(log_level "${level}")"
        fi
    fi
}

error() { log "error" "$1"; }
success() { log "success" "$1"; }
warn() { log "warn" "$1"; }
info() { log "info" "$1"; }
debug() { log "debug" "$1"; }
