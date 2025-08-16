#!/bin/sh
#
# Git pre-push hook: Version Tag Validation
#
# Validates that version tags (v1.2.3 format) match the content
# of the VERSION file in the project root.
#
# This prevents accidentally pushing tags that don't match the
# declared version in the codebase.
#
# Usage: Automatically runs when pushing tags to remote
# Pattern: ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9.]+)?$
#

# Exit the script immediately if any command fails
set -e

# Get script directory (POSIX way)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
readonly SCRIPT_DIR

# Version tag pattern: v[major].[minor].[patch][-prerelease]
VERSION_TAG_PATTERN='v[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\(-[a-z0-9.][a-z0-9.]*\)*$'
readonly VERSION_TAG_PATTERN

# Read each ref being pushed from stdin
while read -r local_ref local_sha _ _; do

    # Check if this is a tag push
    case "${local_ref}" in
    refs/tags/*)
        tag_name="$(basename "${local_ref}")"

        # Check if tag matches version pattern
        if expr "${tag_name}" : "${VERSION_TAG_PATTERN}" >/dev/null; then
            echo "Tag version check..."

            # Extract version without 'v' prefix
            version_from_tag=$(echo "${tag_name}" | sed 's/^v//')

            # Read VERSION file from the commit being tagged
            if ! version_from_file=$(git show "${local_sha}:VERSION" 2>/dev/null); then
                echo "✗ VERSION file not found in commit ${local_sha}"
                exit 1
            fi

            # Clean whitespace from file content
            version_from_file=$(echo "${version_from_file}" | tr -d '[:space:]')

            # Compare versions
            if [ "${version_from_tag}" != "${version_from_file}" ]; then
                echo "✗ Version mismatch!"
                echo "  Tag version: ${version_from_tag}"
                echo "  VERSION file: ${version_from_file}"
                exit 1
            fi

            echo "✓ Version validated: ${version_from_tag}"
        fi
        ;;
    esac
done
