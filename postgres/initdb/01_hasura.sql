/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

\set hasura_password `echo "$HASURA_DB_PASSWORD"`
DO
$$
    BEGIN
        IF exists(SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hasura')
        THEN
            RAISE NOTICE 'role "hasura" already exists, skipping';
        ELSE
            CREATE ROLE hasura;
        END IF;
    END
$$;
ALTER USER hasura WITH LOGIN PASSWORD :'hasura_password';
COMMENT ON ROLE hasura IS 'Role for managing Hasura metadata and for Hasura''s operations within the database.';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
COMMENT ON EXTENSION pgcrypto IS 'This extension is used by Hasura for generating UUIDs.';

CREATE SCHEMA IF NOT EXISTS hdb_catalog;
ALTER SCHEMA hdb_catalog OWNER TO hasura;
COMMENT ON SCHEMA hdb_catalog IS 'The Hasura metadata catalogue is a set of internal tables used to manage the state of the database and the GraphQL schema.';

GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO hasura;
COMMENT ON SCHEMA information_schema IS 'The information schema consists of a set of views that contain information about the objects defined in the current database.';

GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO hasura;
COMMENT ON SCHEMA pg_catalog IS 'The system catalog schema contains the system tables and all the built-in data types, functions, and operators.';
