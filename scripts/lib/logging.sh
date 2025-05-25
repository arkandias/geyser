###############################################################################
# LOGGING SYSTEM
###############################################################################

# Constants for log levels
readonly LOG_LEVEL_DEBUG=1
readonly LOG_LEVEL_INFO=2
readonly LOG_LEVEL_WARN=3
readonly LOG_LEVEL_ERROR=4
readonly LOG_LEVEL_SILENT=4

# ANSI color codes
readonly COLOR_RED='\033[31m'
readonly COLOR_GREEN='\033[32m'
readonly COLOR_YELLOW='\033[33m'
readonly COLOR_BLUE='\033[34m'
readonly COLOR_RESET='\033[0m'

# Log rotation settings
readonly LOG_FILE="${LOG_DIR}/geyser.log"
readonly LOG_MAX_SIZE="$((10 * 1024 * 1024))" # 10MB
readonly LOG_BACKUP_COUNT=5

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

    # Check and rotate logs if necessary
    rotate_logs "${LOG_FILE}"
    echo "${log_entry}" >>"${LOG_FILE}"
}

error() { log "error" "$1"; }
success() { log "success" "$1"; }
warn() { log "warn" "$1"; }
info() { log "info" "$1"; }
debug() { log "debug" "$1"; }
