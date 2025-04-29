###############################################################################
# SYNC-KEYCLOAK COMMAND
###############################################################################

show_sync_keycloak_help() {
    cat <<EOF
Synchronize Keycloak users and groups with application data

Usage: geyser sync-keycloak
  
Update Keycloak users and groups based on Geyser main database:
- Create or update users corresponding to active teachers
- Disable other users
- Update group memberships (Teacher, Commission, Admin) based on roles

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

    info "Fetching Keycloak users..."
    kc_users="$(kcadm get users -r geyser --limit -1)" || {
        error "Failed to fetch Keycloak users"
    }

    info "Creating or updating Keycloak users corresponding to active teachers in Geyser database..."
    local teachers_array
    mapfile -t teachers_array < <(echo "${active_teachers}" | jq -c '.[]')
    for teacher in "${teachers_array[@]}"; do
        _upsert_user "${teacher}"
    done

    info "Fetching again Keycloak users..."
    kc_users="$(kcadm get users -r geyser --limit -1)" || {
        error "Failed to fetch Keycloak users"
    }

    info "Fetching Keycloak groups..."
    kc_groups="$(kcadm get groups -r geyser --limit -1)" || {
        error "Failed to fetch Keycloak groups"
    }

    _sync_group "$(echo "${active_teachers}" | jq -r '[.[].uid]')" "Teacher"
    _sync_group "$(echo "${active_teachers}" | jq -r '[.[] | select(.is_commissioner==true) | .uid]')" "Commission"
    _sync_group "$(echo "${active_teachers}" | jq -r '[.[] | select(.is_admin==true) | .uid]')" "Admin"

    _disable_inactive_teachers

    success "Keycloak synchronization completed successfully"
}

_upsert_user() {
    local teacher="$1"

    local uid firstname lastname
    uid="$(echo "${teacher}" | jq -r '.uid')"
    firstname="$(echo "${teacher}" | jq -r '.firstname')"
    lastname="$(echo "${teacher}" | jq -r '.lastname')"
    debug "User data: email=${uid}, firstName=${firstname}, lastName=${lastname}"

    local kc_user kc_user_id
    kc_user="$(echo "${kc_users}" | jq --arg uid "${uid}" -c '.[] | select(.email==$uid)')"
    kc_user_id="$(echo "${kc_user}" | jq -r '.id')"

    if [[ -z "${kc_user_id}" ]]; then
        info "Creating user '${uid}'..."
        kcadm create users -r geyser -s email="${uid}" \
            -s firstName="${firstname}" -s lastName="${lastname}" -s enabled=true || {
            warn "Failed to create user '${uid}'"
            return
        }
    else
        local kc_firstname kc_lastname kc_enabled update_fields=()
        kc_firstname="$(echo "${kc_user}" | jq -r '.firstName')"
        kc_lastname="$(echo "${kc_user}" | jq -r '.lastName')"
        kc_enabled="$(echo "${kc_user}" | jq -r '.enabled')"

        if [[ "${kc_firstname}" != "${firstname}" ]]; then
            debug "User ${uid}: first name mismatch ('${kc_firstname}' != '${firstname}')"
            update_fields+=(-s firstName="${firstname}")
        fi
        if [[ "${kc_lastname}" != "${lastname}" ]]; then
            debug "User ${uid}: last name mismatch ('${kc_lastname}' != '${lastname}')"
            update_fields+=(-s lastName="${lastname}")
        fi
        if [[ "${kc_enabled}" != "true" ]]; then
            debug "User ${uid} is disabled"
            update_fields+=(-s enabled=true)
        fi

        if [[ "${#update_fields[@]}" -gt 0 ]]; then
            info "Updating user '${uid}'..."
            kcadm update "users/${kc_user_id}" -r geyser "${update_fields[@]}" || {
                warn "Failed to update user '${uid}'"
                return
            }
        fi
    fi
}

_sync_group() {
    local updated_members_list="$1"
    local kc_group_name="$2"

    info "Syncing Keycloak group '${kc_group_name}'..."
    local kc_group_id
    kc_group_id="$(jq -r --arg name "${kc_group_name}" '.[] | select(.name==$name) | .id' <<<"${kc_groups}")"
    if [[ -z "${kc_group_id}" ]]; then
        warn "Keycloak group '${kc_group_name}' does not exist"
        return
    fi

    info "Fetching group members..."
    local kc_members
    kc_members="$(kcadm get "groups/${kc_group_id}/members" -r geyser --limit -1)" || {
        warn "Failed to fetch group members"
        return
    }

    # Get users who are not members of the group
    local kc_non_members
    kc_non_members="$(
        jq --argjson members "${kc_members}" 'map(select(.id | IN($members[].id) | not))' <<<"${kc_users}"

    )"

    # Get group members whose username is not in the updated members list and
    # remove them from the group
    local kc_members_to_remove kc_members_to_remove_array kc_member
    kc_members_to_remove="$(
        jq --argjson members "${updated_members_list}" 'map(select(.username | IN($members[]) | not))' <<<"${kc_members}"
    )"
    mapfile -t kc_members_to_remove_array < <(echo "${kc_members_to_remove}" | jq -c '.[]')
    for kc_member in "${kc_members_to_remove_array[@]}"; do
        local kc_member_id kc_member_name
        kc_member_id="$(echo "${kc_member}" | jq -r '.id')"
        kc_member_name="$(echo "${kc_member}" | jq -r '.username')"
        info "Removing user ${kc_member_name} from group ${kc_group_name}..."
        kcadm delete "users/${kc_member_id}/groups/${kc_group_id}" -r geyser || {
            warn "Failed to remove user ${kc_member_name} from group ${kc_group_name}"
            continue
        }
    done

    # Get users who are not group members but whose username is in the updated
    # members list and add them to the group
    local kc_users_to_add kc_users_to_add_array kc_user
    kc_users_to_add="$(
        jq --argjson members "${updated_members_list}" 'map(select(.username | IN($members[])))' <<<"${kc_non_members}"
    )"
    mapfile -t kc_users_to_add_array < <(echo "${kc_users_to_add}" | jq -c '.[]')
    for kc_user in "${kc_users_to_add_array[@]}"; do
        local kc_user_id kc_user_name
        kc_user_id="$(echo "${kc_user}" | jq -r '.id')"
        kc_user_name="$(echo "${kc_user}" | jq -r '.username')"
        info "Adding user ${kc_user_name} to group ${kc_group_name}..."
        kcadm update "users/${kc_user_id}/groups/${kc_group_id}" -r geyser || {
            warn "Failed to add user ${kc_user_name} to group ${kc_group_name}"
            continue
        }
    done
}

_disable_inactive_teachers() {
    # Get list of all currently enabled users
    local kc_enabled_users
    kc_enabled_users="$(echo "${kc_users}" | jq -r '[.[] | select(.enabled==true)]')"

    # Filter enabled users to those not in active teachers list
    local kc_users_to_disable kc_users_to_disable_array kc_user
    kc_users_to_disable="$(
        jq --argjson active "${active_teachers}" 'map(select(.username | IN($active[].uid) | not))' <<<"${kc_enabled_users}"
    )"
    mapfile -t kc_users_to_disable_array < <(echo "${kc_users_to_disable}" | jq -c '.[]')
    for kc_user in "${kc_users_to_disable_array[@]}"; do
        local kc_user_id kc_user_name
        kc_user_id="$(echo "${kc_user}" | jq -r '.id')"
        kc_user_name="$(echo "${kc_user}" | jq -r '.username')"
        info "Disabling user ${kc_user_name}..."
        kcadm update "users/${kc_user_id}" -r geyser -s enabled=false || {
            warn "Failed to disable user '${kc_user_name}'"
            continue
        }
    done
}
