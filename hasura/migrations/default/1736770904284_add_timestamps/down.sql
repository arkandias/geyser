DROP TRIGGER IF EXISTS set_timestamp ON demande;
DROP TRIGGER IF EXISTS set_timestamp ON service;
DROP TRIGGER IF EXISTS set_timestamp ON modification_service;

ALTER TABLE demande
    DROP COLUMN IF EXISTS created_at,
    DROP COLUMN IF EXISTS updated_at;

ALTER TABLE service
    DROP COLUMN IF EXISTS created_at,
    DROP COLUMN IF EXISTS updated_at;

ALTER TABLE modification_service
    DROP COLUMN IF EXISTS created_at,
    DROP COLUMN IF EXISTS updated_at;

DROP FUNCTION IF EXISTS add_timestamps_to_table(text);
DROP FUNCTION IF EXISTS set_timestamp();
