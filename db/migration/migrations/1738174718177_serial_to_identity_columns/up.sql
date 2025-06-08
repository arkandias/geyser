-- Create a simple function for migrating from SERIAL to IDENTITY using standard naming
CREATE OR REPLACE FUNCTION migrate_serial_to_identity(p_table_name text)
    RETURNS void AS $$
DECLARE
    sequence_name text;
    max_id integer;
BEGIN
    -- Use standard naming convention
    sequence_name := p_table_name || '_id_seq';

    -- Output the sequence name for reference
    RAISE NOTICE 'Using standard sequence name: %', sequence_name;

    -- Get the max ID for later
    EXECUTE format('SELECT COALESCE(MAX(id), 0) FROM %I', p_table_name) INTO max_id;
    RAISE NOTICE 'Current maximum ID is: %', max_id;

    -- Drop the default
    EXECUTE format('ALTER TABLE %I ALTER COLUMN id DROP DEFAULT', p_table_name);

    -- Drop the old sequence with IF EXISTS to prevent errors
    EXECUTE format('DROP SEQUENCE IF EXISTS %I CASCADE', sequence_name);

    -- Add the GENERATED ALWAYS AS IDENTITY
    EXECUTE format('ALTER TABLE %I ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY', p_table_name);

    -- Set the sequence to the max ID
    EXECUTE format('SELECT setval(%L, %s, true)', sequence_name, max_id);

    RAISE NOTICE 'Migration completed successfully for table %. Sequence reset to %', p_table_name, max_id;
END;
$$ LANGUAGE plpgsql;

SELECT migrate_serial_to_identity('position');
SELECT migrate_serial_to_identity('service');
SELECT migrate_serial_to_identity('service_modification_type');
SELECT migrate_serial_to_identity('service_modification');
SELECT migrate_serial_to_identity('degree');
SELECT migrate_serial_to_identity('program');
SELECT migrate_serial_to_identity('track');
SELECT migrate_serial_to_identity('course_type');
SELECT migrate_serial_to_identity('course');
SELECT migrate_serial_to_identity('coordination');
SELECT migrate_serial_to_identity('priority');
SELECT migrate_serial_to_identity('request');
