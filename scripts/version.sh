#!/bin/sh

# Exit the script immediately if any command fails
set -e

# Get script directory (POSIX way)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
readonly SCRIPT_DIR

# Read each ref being pushed from stdin
while read -r local_ref _ _ _; do

    # Check if this is a tag push
    case "${local_ref}" in
    refs/tags/*)
        tag_name="$(basename "${local_ref}")"

        # Check if tag matches version pattern
        if expr "${tag_name}" : 'v[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\(-[a-z0-9.][a-z0-9.]*\)*$' >/dev/null; then
            # Extract version without 'v' prefix
            version_from_tag=$(echo "${tag_name}" | sed 's/^v//')

            # Check if VERSION file exists
            if [ ! -f "${SCRIPT_DIR}/../VERSION" ]; then
                echo "Error: VERSION file not found"
                exit 1
            fi

            # Read version from file
            version_from_file=$(tr -d '[:space:]' <"${SCRIPT_DIR}/../VERSION")

            # Compare versions
            if [ "${version_from_tag}" != "${version_from_file}" ]; then
                echo "Error: Version mismatch!"
                echo "  Tag version: ${version_from_tag}"
                echo "  VERSION file: ${version_from_file}"
                exit 1
            fi

            echo "✓ Version validated: ${version_from_tag}"
        fi
        ;;
    esac
done
