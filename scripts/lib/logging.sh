###############################################################################
# LOGGING SYSTEM
###############################################################################

# Constants for log levels
declare -r LOG_LEVEL_DEBUG=1
declare -r LOG_LEVEL_INFO=2
declare -r LOG_LEVEL_WARN=3
declare -r LOG_LEVEL_ERROR=4

# ANSI color codes
declare -r COLOR_RED='\033[31m'
declare -r COLOR_GREEN='\033[32m'
declare -r COLOR_YELLOW='\033[33m'
declare -r COLOR_BLUE='\033[34m'
declare -r COLOR_RESET='\033[0m'

setup_logging() {
    # Ensure log directory exists
    mkdir -p "${LOG_DIR}"

    LOG_LEVEL_NUM="$(log_level "${LOG_LEVEL}" 2>/dev/null)" || {
        echo "Invalid value: LOG_LEVEL=${LOG_LEVEL} (must be DEBUG, INFO, WARN, or ERROR)" >&2
        exit 1
    }
}

log_level() {
    case "$1" in
    ERROR) echo "${LOG_LEVEL_ERROR}" ;;
    WARN) echo "${LOG_LEVEL_WARN}" ;;
    INFO | SUCCESS) echo "${LOG_LEVEL_INFO}" ;;
    DEBUG) echo "${LOG_LEVEL_DEBUG}" ;;
    *)
        echo "Invalid log level value '$1' (must be DEBUG, INFO, WARN, or ERROR)" >&2
        exit 1
        ;;
    esac
}

log() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date +'%Y-%m-%d %H:%M:%S')
    local log_entry="[${timestamp}] [${level}] ${message}"

    if [[ "$(log_level "${level}")" -ge "${LOG_LEVEL_NUM}" ]]; then
        case "${level}" in
        ERROR) echo >&2 -e "${COLOR_RED}${log_entry}${COLOR_RESET}" ;;
        SUCCESS) echo -e "${COLOR_GREEN}${log_entry}${COLOR_RESET}" ;;
        WARN) echo -e "${COLOR_YELLOW}${log_entry}${COLOR_RESET}" ;;
        DEBUG) echo -e "${COLOR_BLUE}${log_entry}${COLOR_RESET}" ;;
        INFO) echo -e "${log_entry}" ;;
        esac
    fi

    echo "${log_entry}" >>"${LOG_FILE}"
}

error() {
    log "ERROR" "$1"
    exit 1
}
success() { log "SUCCESS" "$1"; }
warn() { log "WARN" "$1"; }
info() { log "INFO" "$1"; }
debug() { log "DEBUG" "$1"; }
