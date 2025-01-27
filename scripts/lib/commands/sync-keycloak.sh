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
    info "Starting Keycloak synchronization..."

    command -v jq &>/dev/null || error "jq is not installed.
You can install it with 'sudo apt install jq' (Ubuntu) or 'brew install jq' (macOS)"

    #    info "Fetching teachers with roles from Geyser database..."
    #    local teachers
    #    teachers=$(compose exec -T db bash -c \
    #        "psql -U postgres -d geyser -A -t -c '
    #        SELECT json_agg(t)
    #        FROM (
    #            SELECT
    #                t.uid,
    #                t.firstname,
    #                t.lastname,
    #                t.active as is_active,
    #                EXISTS (
    #                    SELECT 1 FROM role r
    #                    WHERE r.uid = t.uid AND r.type = '\''commissioner'\'') AS is_commissioner,
    #                EXISTS (
    #                    SELECT 1 FROM role r
    #                    WHERE r.uid = t.uid AND r.type = '\''admin'\'') AS is_admin
    #            FROM teacher t
    #            ORDER BY t.uid
    #        ) t;'")
    #    if [[ -z "${teachers}" ]]; then
    #        error "Failed to fetch teachers from Geyser database"
    #    fi

    info "Fetching active teachers and roles from Geyser database..."
    local teachers active_teachers roles
    teachers=$(compose exec -T db bash -c \
        "psql -U postgres -d geyser -A -t -c 'SELECT json_agg(t) FROM teacher t;'")
    if [[ -z "${teachers}" ]]; then
        warn "No teachers found in Geyser database"
        teachers="[]"
    fi
    active_teachers=$(echo "${teachers}" | jq -c '[.[] | select(.active==true)]')
    roles=$(compose exec -T db bash -c \
        "psql -U postgres -d geyser -A -t -c 'SELECT json_agg(r) FROM role r;'")
    if [[ -z "${roles}" ]]; then
        warn "No roles found in Geyser database"
        roles="[]"
    fi

    info "Authenticating with Keycloak..."
    kcadm --login || error "Failed to authenticate with Keycloak"

    info "Fetching Keycloak users and groups..."
    local kc_users kc_groups kc_teacher_gid kc_commission_gid kc_admin_gid
    kc_users=$(kcadm get users -r geyser --limit -1)
    debug "Keycloak users:\n${kc_users}"
    kc_groups=$(kcadm get groups -r geyser)
    debug "Keycloak groups:\n${kc_groups}"

    kc_teacher_gid=$(echo "${kc_groups}" | jq -r '.[] | select(.name=="Teacher") | .id')
    kc_commission_gid=$(echo "${kc_groups}" | jq -r '.[] | select(.name=="Commission") | .id')
    kc_admin_gid=$(echo "${kc_groups}" | jq -r '.[] | select(.name=="Admin") | .id')
    debug "Keycloak group IDs - Teacher: ${kc_teacher_gid}, Commission: ${kc_commission_gid}, Admin: ${kc_admin_gid}"

    if [[ -z "${kc_teacher_gid}" ]]; then
        error "Keycloak 'Teacher' group does not exist"
    fi
    if [[ -z "${kc_commission_gid}" ]]; then
        error "Keycloak 'Commission' group does not exist"
    fi
    if [[ -z "${kc_admin_gid}" ]]; then
        error "Keycloak 'Admin' group does not exist"
    fi

    # Get current members of each group
    local kc_teachers kc_commissioners kc_admins
    kc_teachers=$(kcadm get groups/"${kc_teacher_gid}"/members -r geyser --limit -1 | jq -r '[.[] | .id]')
    kc_commissioners=$(kcadm get groups/"${kc_commission_gid}"/members -r geyser --limit -1 | jq -r '[.[] | .id]')
    kc_admins=$(kcadm get groups/"${kc_admin_gid}"/members -r geyser --limit -1 | jq -r '[.[] | .id]')
    debug "Current group members\n- Teacher:\n${kc_teachers}\nCommission:\n${kc_commissioners},\nAdmin:\n${kc_admins}"

    info "Creating or updating Keycloak users corresponding to active teachers in Geyser database..."
    while IFS= read -r teacher; do
        local uid firstname lastname kc_user kc_user_id
        uid=$(echo "${teacher}" | jq -r '.uid')
        firstname=$(echo "${teacher}" | jq -r '.firstname')
        lastname=$(echo "${teacher}" | jq -r '.lastname')
        kc_user=$(echo "${kc_users}" | jq --arg uid "${uid}" -c '.[] | select(.email==$uid)')
        kc_user_id=$(echo "${kc_user}" | jq -r '.id')

        if [[ -z "${kc_user_id}" ]]; then
            info "User '${uid}' not found"
            info "Creating user '${uid}'..."
            debug "User creation data: email=${uid}, firstName=${firstname}, lastName=${lastname}, and enabled=true..."
            kcadm create users -r geyser \
                -s email="${uid}" \
                -s firstName="${firstname}" \
                -s lastName="${lastname}" \
                -s enabled=true ||
                error "Failed to create user '${uid}'"
            kc_user_id=$(kcadm get users -r geyser -q email="${uid}" | jq -r '.[] | .id')
        else
            info "User '${uid}' found"
            local kc_firstname kc_lastname kc_enabled update_fields=()
            kc_firstname=$(echo "${kc_user}" | jq -r '.firstName')
            kc_lastname=$(echo "${kc_user}" | jq -r '.lastName')
            kc_enabled=$(echo "${kc_user}" | jq -r '.enabled')
            if [[ "${kc_firstname}" != "${firstname}" ]]; then
                debug "First name mismatch: remote '${kc_firstname}' != local '${firstname}'"
                update_fields+=(-s firstName="${firstname}")
            fi
            if [[ "${kc_lastname}" != "${lastname}" ]]; then
                debug "Last name mismatch: remote '${kc_lastname}' != local '${lastname}'"
                update_fields+=(-s lastName="${lastname}")
            fi
            if [[ "${kc_enabled}" != "true" ]]; then
                debug "Enabled status mismatch: remote '${kc_enabled}' != local 'true'"
                update_fields+=(-s enabled=true)
            fi
            if [[ "${#update_fields[@]}" -gt 0 ]]; then
                info "Updating user '${uid}'..."
                kcadm update users/"${kc_user_id}" -r geyser "${update_fields[@]}"
            fi
        fi

        # Manage group memberships
        # Teachers group
        if ! echo "${kc_teachers}" | jq -e --arg id "${kc_user_id}" 'contains([$id])' >/dev/null; then
            info "Adding user '${uid}' to group 'Teacher'..."
            kcadm update users/"${kc_user_id}"/groups/"${kc_teacher_gid}" -r geyser -s realm=geyser -s userId="${kc_user_id}"
        fi

        # Commissioner group
        local is_commissioner
        is_commissioner=$(echo "${roles}" | jq --arg uid "${uid}" -e '[.[] | select(.uid==$uid and .type=="commissioner")] | length > 0')
        if [[ "${is_commissioner}" == "true" ]]; then
            if ! echo "${kc_commissioners}" | jq -e --arg id "${kc_user_id}" 'contains([$id])' >/dev/null; then
                info "Adding user '${uid}' to group 'Commission'..."
                kcadm update users/"${kc_user_id}"/groups/"${kc_commission_gid}" -r geyser -s realm=geyser -s userId="${kc_user_id}"
            fi
        else
            if echo "${kc_commissioners}" | jq -e --arg id "${kc_user_id}" 'contains([$id])' >/dev/null; then
                info "Removing user '${uid}' from group 'Commission'..."
                kcadm delete users/"${kc_user_id}"/groups/"${kc_commission_gid}" -r geyser
            fi
        fi

        # Admin group
        local is_admin
        is_admin=$(echo "${roles}" | jq --arg uid "${uid}" -e '[.[] | select(.uid==$uid and .type=="admin")] | length > 0')
        if [[ "${is_admin}" == "true" ]]; then
            if ! echo "${kc_admins}" | jq -e --arg id "${kc_user_id}" 'contains([$id])' >/dev/null; then
                info "Adding user '${uid}' to group 'Admin'..."
                kcadm update users/"${kc_user_id}"/groups/"${kc_admin_gid}" -r geyser -s realm=geyser -s userId="${kc_user_id}"
            fi
        else
            if echo "${kc_admins}" | jq -e --arg id "${kc_user_id}" 'contains([$id])' >/dev/null; then
                info "Removing user '${uid}' from group 'Admin'..."
                kcadm delete users/"${kc_user_id}"/groups/"${kc_admin_gid}" -r geyser
            fi
        fi
    done < <(echo "${active_teachers}" | jq -c '.[]')

    info "Disabling Keycloak users not corresponding to active teachers in Geyser database..."
    while IFS= read -r kc_user; do
        local email kc_user_id
        email=$(echo "${kc_user}" | jq -r '.email')
        if echo "${active_teachers}" | jq -e --arg email "${email}" '.[] | select(.uid==$email)' >/dev/null; then
            info "User ${email} is an active teacher (ignored)"
        else
            info "Disabling user ${email}..."
            kc_user_id=$(echo "${kc_user}" | jq -r '.id')
            kcadm update kc_users/"${kc_user_id}" -r geyser -s enabled=false
        fi
    done < <(echo "${kc_users}" | jq -c '.[] | select(.enabled==true)')

    success "Keycloak synchronization completed successfully"
}
