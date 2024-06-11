/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

\set keycloak_password `echo "$KC_DB_PASSWORD"`
DO
$$
    BEGIN
        IF exists(SELECT FROM pg_catalog.pg_roles WHERE rolname = 'keycloak')
        THEN
            RAISE NOTICE 'role "keycloak" already exists, skipping';
        ELSE
            CREATE ROLE keycloak;
        END IF;
    END;
$$;
ALTER ROLE keycloak WITH LOGIN PASSWORD :'keycloak_password';
COMMENT ON ROLE keycloak IS 'Role for managing Keycloak related database operations.';

CREATE SCHEMA IF NOT EXISTS keycloak;
ALTER SCHEMA keycloak OWNER TO keycloak;
COMMENT ON SCHEMA keycloak IS 'Schema containing all Keycloak related tables and data.';
