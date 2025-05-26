###############################################################################
# LOGGING SYSTEM
###############################################################################

# Constants for log levels
readonly LOG_LEVEL_DEBUG=1
readonly LOG_LEVEL_INFO=2
readonly LOG_LEVEL_WARN=3
readonly LOG_LEVEL_ERROR=4
readonly LOG_LEVEL_SILENT=5

# ANSI color codes
readonly COLOR_RED='\033[31m'
readonly COLOR_GREEN='\033[32m'
readonly COLOR_YELLOW='\033[33m'
readonly COLOR_BLUE='\033[34m'
readonly COLOR_RESET='\033[0m'

# Log file
readonly LOG_FILE="${LOG_DIR}/geyser.log"

log_level() {
    case "$1" in
    silent) echo "${LOG_LEVEL_SILENT}" ;;
    error) echo "${LOG_LEVEL_ERROR}" ;;
    warn) echo "${LOG_LEVEL_WARN}" ;;
    info | success) echo "${LOG_LEVEL_INFO}" ;;
    debug) echo "${LOG_LEVEL_DEBUG}" ;;
    *) echo "${LOG_LEVEL_INFO}" ;;
    esac
}

log() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp="$(date +'%Y-%m-%d %H:%M:%S')"
    local log_entry="[${timestamp}] [Geyser] [${level^^}] ${message}"

    if [[ "$(log_level "${level}")" -ge "$(log_level "${GEYSER_LOG_LEVEL}")" ]]; then
        case "${level}" in
        error) echo -e "${COLOR_RED}${log_entry}${COLOR_RESET}" >&2 ;;
        success) echo -e "${COLOR_GREEN}${log_entry}${COLOR_RESET}" ;;
        warn) echo -e "${COLOR_YELLOW}${log_entry}${COLOR_RESET}" >&2 ;;
        debug) echo -e "${COLOR_BLUE}${log_entry}${COLOR_RESET}" ;;
        info) echo -e "${log_entry}" ;;
        esac
    fi

    # Add entry to log file
    echo "${log_entry}" >>"${LOG_FILE}"
}

error() { log "error" "$1"; }
success() { log "success" "$1"; }
warn() { log "warn" "$1"; }
info() { log "info" "$1"; }
debug() { log "debug" "$1"; }
