CREATE OR REPLACE FUNCTION set_timestamp()
    RETURNS trigger AS
$$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_timestamps_to_table(table_name text)
    RETURNS void AS
$$
BEGIN
    EXECUTE format('
        ALTER TABLE %I
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    ', table_name);

    -- Add trigger for updated_at
    EXECUTE format('
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION set_timestamp()
    ', table_name);
END;
$$ LANGUAGE plpgsql;

SELECT add_timestamps_to_table('demande');
SELECT add_timestamps_to_table('service');
SELECT add_timestamps_to_table('modification_service');
