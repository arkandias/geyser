###############################################################################
# SYNC-KEYCLOAK COMMAND
###############################################################################

show_sync_keycloak_help() {
    cat <<EOF
Synchronize Keycloak users with active teachers

Usage: geyser sync-keycloak

Create or update Keycloak users based on active teachers in Geyser database.
Disable Keycloak users not corresponding to active teachers.

Options:
  -h, --help        Show this help message

Note: Requires jq to be installed.
EOF
}

handle_sync_keycloak() {
    # Parse options
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
        -h | --help)
            show_sync_keycloak_help
            exit 0
            ;;
        *)
            error "Unknown parameter '$1' (see 'geyser sync-keycloak --help')"
            ;;
        esac
    done

    command -v jq &>/dev/null || error "jq is not installed.
You can install it with 'sudo apt install jq' (Ubuntu) or 'brew install jq' (macOS)"

    if [[ "$(compose ps --format '{{.Health}}' keycloak)" != "healthy" ]]; then
        error "Keycloak must be up and healthy. Start services first with 'geyser start'"
    fi
    if [[ "$(compose ps --format '{{.Health}}' hasura)" != "healthy" ]]; then
        error "Hasura must be up and healthy. Start services first with 'geyser start'"
    fi

    info "Fetching active teachers with roles from Geyser database..."
    local active_teachers
    active_teachers="$(compose exec -T db bash -c \
        "psql -U postgres -d geyser -A -t -c '
            SELECT json_agg(t)
            FROM (
                SELECT
                    t.uid,
                    t.firstname,
                    t.lastname,
                    EXISTS (
                        SELECT 1 FROM role r
                        WHERE r.uid = t.uid AND r.type = '\''commissioner'\'') AS is_commissioner,
                    EXISTS (
                        SELECT 1 FROM role r
                        WHERE r.uid = t.uid AND r.type = '\''admin'\'') AS is_admin
                FROM teacher t
                WHERE t.active IS TRUE
                ORDER BY t.uid
            ) t;'")" || {
        error "Failed to fetch teachers from Geyser database"
    }
    if [[ -z "${active_teachers}" ]]; then
        active_teachers="[]"
    fi

    info "Authenticating with Keycloak..."
    kcadm --login || error "Failed to authenticate with Keycloak"

    info "Fetching Keycloak users and groups..."
    local kc_users kc_groups
    kc_users="$(kcadm get users -r geyser --limit -1)" || {
        error "Failed to fetch Keycloak users"
    }
    kc_groups="$(kcadm get groups -r geyser)" || {
        error "Failed to fetch Keycloak groups"
    }

    info "Fetching Keycloak groups ids..."
    local kc_teacher_gid kc_commission_gid kc_admin_gid
    kc_teacher_gid="$(echo "${kc_groups}" | jq -r '.[] | select(.name=="Teacher") | .id')"
    debug "Teacher gid: ${kc_teacher_gid}"
    kc_commission_gid="$(echo "${kc_groups}" | jq -r '.[] | select(.name=="Commission") | .id')"
    debug "Commission gid: ${kc_commission_gid}"
    kc_admin_gid="$(echo "${kc_groups}" | jq -r '.[] | select(.name=="Admin") | .id')"
    debug "Admin gid: ${kc_admin_gid}"

    if [[ -z "${kc_teacher_gid}" ]]; then
        error "Keycloak group 'Teacher' does not exist"
    fi
    if [[ -z "${kc_commission_gid}" ]]; then
        error "Keycloak group 'Commission' does not exist"
    fi
    if [[ -z "${kc_admin_gid}" ]]; then
        error "Keycloak group 'Admin' does not exist"
    fi

    info "Clearing all Keycloak groups..."
    _clear_group "${kc_teacher_gid}" "Teacher"
    _clear_group "${kc_commission_gid}" "Commissioner"
    _clear_group "${kc_admin_gid}" "Admin"

    info "Creating or updating Keycloak users corresponding to active teachers in Geyser database..."
    local teachers_array
    mapfile -t teachers_array < <(echo "${active_teachers}" | jq -c '.[]')
    for teacher in "${teachers_array[@]}"; do
        local uid firstname lastname is_commissioner is_admin
        uid="$(echo "${teacher}" | jq -r '.uid')"
        firstname="$(echo "${teacher}" | jq -r '.firstname')"
        lastname="$(echo "${teacher}" | jq -r '.lastname')"
        is_commissioner="$(echo "${teacher}" | jq -r '.is_commissioner')"
        is_admin="$(echo "${teacher}" | jq -r '.is_admin')"
        debug "User data: email=${uid}, firstName=${firstname}, lastName=${lastname},  is_commissioner=${is_commissioner}, is_admin=${is_admin}"

        # Create or update user
        local kc_user kc_user_id
        kc_user="$(echo "${kc_users}" | jq --arg uid "${uid}" -c '.[] | select(.email==$uid)')"
        kc_user_id="$(echo "${kc_user}" | jq -r '.id')"

        if [[ -z "${kc_user_id}" ]]; then
            info "Creating user '${uid}'..."
            kcadm create users -r geyser \
                -s email="${uid}" \
                -s firstName="${firstname}" \
                -s lastName="${lastname}" \
                -s enabled=true ||
                {
                    warn "Failed to create user '${uid}'"
                    continue
                }
            kc_user_id="$(kcadm get users -r geyser -q email="${uid}" | jq -r '.[] | .id')" || {
                warn "Failed to retrieve user id for newly created user '${uid}'"
                continue
            }
            if [[ -z "${kc_user_id}" ]]; then
                warn "Failed to retrieve user id for newly created user '${uid}'"
                continue
            fi
        else
            info "Updating user '${uid}'..."
            local kc_firstname kc_lastname kc_enabled update_fields=()
            kc_firstname="$(echo "${kc_user}" | jq -r '.firstName')"
            kc_lastname="$(echo "${kc_user}" | jq -r '.lastName')"
            kc_enabled="$(echo "${kc_user}" | jq -r '.enabled')"
            if [[ "${kc_firstname}" != "${firstname}" ]]; then
                debug "First name mismatch: '${kc_firstname}' != '${firstname}'"
                update_fields+=(-s firstName="${firstname}")
            fi
            if [[ "${kc_lastname}" != "${lastname}" ]]; then
                debug "Last name mismatch: '${kc_lastname}' != '${lastname}'"
                update_fields+=(-s lastName="${lastname}")
            fi
            if [[ "${kc_enabled}" != "true" ]]; then
                debug "Enabled status mismatch: '${kc_enabled}' != 'true'"
                update_fields+=(-s enabled=true)
            fi
            if [[ "${#update_fields[@]}" -gt 0 ]]; then
                kcadm update users/"${kc_user_id}" -r geyser "${update_fields[@]}" || {
                    warn "Failed to update user '${uid}'"
                    continue
                }
            fi
        fi

        # Add to groups based on roles
        info "Adding user '${uid}' to group 'Teacher'..."
        kcadm update "users/${kc_user_id}/groups/${kc_teacher_gid}" -r geyser || {
            warn "Failed to add user '${uid}' to group 'Teacher'"
        }
        if [[ "${is_commissioner}" == "true" ]]; then
            info "Adding user '${uid}' to group 'Commission'..."
            kcadm update "users/${kc_user_id}/groups/${kc_commission_gid}" -r geyser || {
                warn "Failed to add user '${uid}' to group 'Commission'"
            }
        fi
        if [[ "${is_admin}" == "true" ]]; then
            info "Adding user '${uid}' to group 'Admin'..."
            kcadm update "users/${kc_user_id}/groups/${kc_admin_gid}" -r geyser || {
                warn "Failed to add user '${uid}' to group 'Admin'"
            }
        fi
    done

    info "Disabling Keycloak users not corresponding to active teachers in Geyser database..."
    local kc_users_array
    mapfile -t kc_users_array < <(echo "${kc_users}" | jq -c '.[] | select(.enabled==true)')
    for kc_user in "${kc_users_array[@]}"; do
        local email kc_user_id
        email="$(echo "${kc_user}" | jq -r '.email')"
        if echo "${active_teachers}" | jq -e --arg email "${email}" '.[] | select(.uid==$email)' >/dev/null; then
            info "User ${email} is an active teacher (ignored)"
        else
            info "Disabling user ${email}..."
            kc_user_id="$(echo "${kc_user}" | jq -r '.id')"
            kcadm update "users/${kc_user_id}" -r geyser -s enabled=false || {
                warn "Failed to disable user '${uid}'"
            }
        fi
    done < <(echo "${kc_users}" | jq -c '.[] | select(.enabled==true)')

    success "Keycloak synchronization completed successfully"
}

_clear_group() {
    local group_id="$1"
    local group_name="$2"

    info "Clearing group '${group_name}'..."
    local members
    members="$(kcadm get "groups/${group_id}/members" -r geyser --limit -1)" || {
        error "Failed to fetch group members"
    }
    while IFS= read -r member; do
        local member_id
        member_id="$(echo "${member}" | jq -r '.id')"
        kcadm delete "users/${member_id}/groups/${group_id}" -r geyser || {
            warn "Failed to remove user '${member_id}'"
        }
    done < <(echo "${members}" | jq -c '.[]')
}
