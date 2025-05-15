###############################################################################
# LOGGING SYSTEM
###############################################################################

# Constants for log levels
declare -r LOG_LEVEL_DEBUG=1
declare -r LOG_LEVEL_INFO=2
declare -r LOG_LEVEL_WARN=3
declare -r LOG_LEVEL_ERROR=4
declare -r LOG_LEVEL_SILENT=4

# ANSI color codes
declare -r COLOR_RED='\033[31m'
declare -r COLOR_GREEN='\033[32m'
declare -r COLOR_YELLOW='\033[33m'
declare -r COLOR_BLUE='\033[34m'
declare -r COLOR_RESET='\033[0m'

# Log rotation settings (can be overridden before setup_logging)
declare -r DEFAULT_LOG_MAX_SIZE=$((10 * 1024 * 1024)) # 10MB
declare -r DEFAULT_LOG_BACKUP_COUNT=5
LOG_MAX_SIZE=${LOG_MAX_SIZE:-${DEFAULT_LOG_MAX_SIZE}}
LOG_BACKUP_COUNT=${LOG_BACKUP_COUNT:-${DEFAULT_LOG_BACKUP_COUNT}}

setup_logging() {
    LOG_LEVEL_NUM="$(log_level "${GEYSER_LOG_LEVEL}" 2>/dev/null)" || {
        echo "Invalid value: GEYSER_LOG_LEVEL=${GEYSER_LOG_LEVEL} (must be DEBUG, INFO, WARN, ERROR, or SILENT)" >&2
        exit 1
    }
    readonly LOG_LEVEL_NUM
    readonly LOG_FILE="${LOG_DIR}/geyser.log"
}

rotate_logs() {
    local log_file="$1"

    # Check if log file exists and exceeds max size
    if [[ -f "${log_file}" ]] && [[ "$(stat -f%z "${log_file}" 2>/dev/null || stat -c%s "${log_file}")" -gt "${LOG_MAX_SIZE}" ]]; then
        # Remove oldest backup if we're at max backups
        if [[ -f "${log_file}.${LOG_BACKUP_COUNT}" ]]; then
            rm "${log_file}.${LOG_BACKUP_COUNT}"
        fi

        # Rotate existing backups
        for ((i = LOG_BACKUP_COUNT - 1; i >= 1; i--)); do
            if [[ -f "${log_file}.${i}" ]]; then
                mv "${log_file}.${i}" "${log_file}.$((i + 1))"
            fi
        done

        # Rotate current log file
        mv "${log_file}" "${log_file}.1"

        # Create new empty log file
        touch "${log_file}"
    fi
}

log_level() {
    case "$1" in
    SILENT) echo "${LOG_LEVEL_SILENT}" ;;
    ERROR) echo "${LOG_LEVEL_ERROR}" ;;
    WARN) echo "${LOG_LEVEL_WARN}" ;;
    INFO | SUCCESS) echo "${LOG_LEVEL_INFO}" ;;
    DEBUG) echo "${LOG_LEVEL_DEBUG}" ;;
    *) exit 1 ;;
    esac
}

log() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date +'%Y-%m-%d %H:%M:%S')
    local log_entry="[${timestamp}] [Geyser] [${level}] ${message}"

    if [[ "$(log_level "${level}")" -ge "${LOG_LEVEL_NUM}" ]]; then
        case "${level}" in
        ERROR) echo >&2 -e "${COLOR_RED}${log_entry}${COLOR_RESET}" ;;
        SUCCESS) echo -e "${COLOR_GREEN}${log_entry}${COLOR_RESET}" ;;
        WARN) echo -e "${COLOR_YELLOW}${log_entry}${COLOR_RESET}" ;;
        DEBUG) echo -e "${COLOR_BLUE}${log_entry}${COLOR_RESET}" ;;
        INFO) echo -e "${log_entry}" ;;
        esac
    fi

    # Check and rotate logs if necessary
    rotate_logs "${LOG_FILE}"
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
