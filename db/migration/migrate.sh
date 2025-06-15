#!/bin/bash

set -e

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f "${BASH_SOURCE[0]}")")" &>/dev/null && pwd)"
CONTAINER_NAME="pg_tmp"

DUMPS_DIR="${SCRIPT_DIR}/dumps"
MIGRATIONS_DIR="${SCRIPT_DIR}/migrations"
SUMMARIES_DIR="${SCRIPT_DIR}/summaries"
LEGACY_DUMP="${DUMPS_DIR}/legacy.sql"
MIGRATED_DUMP="${DUMPS_DIR}/migrated.sql"
INIT_DUMP="${DUMPS_DIR}/init.dump"
INIT_FILES=(
    "${SCRIPT_DIR}"/../init/*.sql
    "${SCRIPT_DIR}"/lpp.sql
)

mkdir -p "${DUMPS_DIR}"
mkdir -p "${MIGRATIONS_DIR}"
mkdir -p "${SUMMARIES_DIR}"

pg_start() {
    # Cleaning up any existing container
    docker stop "${CONTAINER_NAME}" &>/dev/null || true
    docker rm "${CONTAINER_NAME}" &>/dev/null || true

    echo "Starting ${CONTAINER_NAME}..."
    docker run --name "${CONTAINER_NAME}" \
        -e POSTGRES_DB=geyser \
        -e POSTGRES_USER=postgres \
        -e DB_PASSWORD=postgres_pwd \
        -d postgres:17 \
        >/dev/null

    echo "Waiting for ${CONTAINER_NAME} to be ready..."
    until docker exec "${CONTAINER_NAME}" pg_isready -U postgres &>/dev/null; do
        sleep 1
    done

    echo "Waiting for ${CONTAINER_NAME} to be initialized..."
    until psql_cmd "SELECT 1" &>/dev/null; do
        sleep 1
    done

    echo "${CONTAINER_NAME} is ready and initialized!"
}

pg_stop() {
    echo "Stopping container ${CONTAINER_NAME}..."
    docker stop "${CONTAINER_NAME}" >/dev/null
    docker rm "${CONTAINER_NAME}" >/dev/null
}

psql_file() {
    docker exec -i "${CONTAINER_NAME}" psql -h localhost -U postgres -d geyser -v ON_ERROR_STOP=on <"$1"
}

psql_cmd() {
    docker exec -i "${CONTAINER_NAME}" psql -h localhost -U postgres -d geyser -v ON_ERROR_STOP=on -c "$1"
}

summary() {
    psql_cmd "\
SELECT schemaname, relname, n_live_tup \
FROM pg_stat_user_tables \
WHERE n_live_tup > 0 \
ORDER BY schemaname, relname"
}

apply_migration() {
    local migration_file="$1"
    echo "Applying migration: ${migration_file}"
    psql_file "${migration_file}"
}

#if ! pg_isready -h localhost -p 5420 -d geyser &>/dev/null; then
#    echo "Cannot connect to legacy database on port 5420. Run 'ssh -L 5420:localhost:5432 geyser'" >&2
#    exit 1
#fi
#
#echo "Dumping legacy database..."
#PGPASSWORD=postgres_pwd pg_dump -h localhost -p 5420 -U postgres -d geyser -n ec \
#    --no-owner --no-privileges --no-comments -f "${LEGACY_DUMP}"
#
#echo "Renaming schema 'ec' to 'public'..."
#sed -i '' 's/schema ec/schema public/g; s/ec\./public./g' "${LEGACY_DUMP}"

pg_start

echo "Importing legacy data..."
psql_file "${LEGACY_DUMP}" #>/dev/null

summary >"${SUMMARIES_DIR}/before_migration.txt"

echo "Applying migrations..."
for migration in "${MIGRATIONS_DIR}"/*/up.sql; do
    apply_migration "${migration}" #>/dev/null
done

summary >"${SUMMARIES_DIR}/after_migration.txt"

echo "Dumping migrated data..."
docker exec -i "${CONTAINER_NAME}" pg_dump -U postgres -d geyser \
    --no-tablespaces \
    --column-inserts \
    --data-only \
    --no-comments \
    --exclude-table=public.phase \
    --exclude-table=public.request_type \
    --exclude-table=public.role_type \
    >"${MIGRATED_DUMP}"

pg_stop

pg_start

echo "Running initialization files..."
for init_file in "${INIT_FILES[@]}"; do
    echo "Processing ${init_file}..."
    psql_file "${init_file}" #>/dev/null
done

echo "Importing migrated data..."
psql_file "${MIGRATED_DUMP}" #>/dev/null

summary >"${SUMMARIES_DIR}/final.txt"

echo "Dumping new database..."
docker exec -i "${CONTAINER_NAME}" pg_dump -U postgres -d geyser -Fc >"${INIT_DUMP}"

pg_stop

echo "New database successfully dumped to ${INIT_DUMP}"
