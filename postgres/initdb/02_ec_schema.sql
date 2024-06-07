/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

CREATE SCHEMA IF NOT EXISTS ec;
COMMENT ON SCHEMA ec IS 'Schéma contenant toutes les données relatives à Geyser.';

-- grant all privileges on all tables in the main schema
GRANT USAGE ON SCHEMA ec TO hasura;
GRANT ALL ON ALL TABLES IN SCHEMA ec TO hasura;
GRANT ALL ON ALL SEQUENCES IN SCHEMA ec TO hasura;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA ec TO hasura;

-- By defaults users won't have access to tables they have not created (and thus do not own).
-- You can change these default privileges to grant access to any object created in the future.
ALTER DEFAULT PRIVILEGES IN SCHEMA ec GRANT ALL ON TABLES TO hasura;
ALTER DEFAULT PRIVILEGES IN SCHEMA ec GRANT ALL ON SEQUENCES TO hasura;
ALTER DEFAULT PRIVILEGES IN SCHEMA ec GRANT ALL ON FUNCTIONS TO hasura;
