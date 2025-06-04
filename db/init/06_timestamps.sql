CREATE FUNCTION public.set_timestamp_trigger_fn() RETURNS trigger AS
$$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.set_timestamp_trigger_fn() IS 'Trigger function to automatically update updated_at timestamp column on row updates';

CREATE FUNCTION public.add_timestamp_columns(p_table text) RETURNS void AS
$$
BEGIN
    EXECUTE format('
        ALTER TABLE public.%I 
        ADD COLUMN created_at timestamptz NOT NULL DEFAULT current_timestamp,
        ADD COLUMN updated_at timestamptz NOT NULL DEFAULT current_timestamp;

        COMMENT ON COLUMN public.%I.created_at IS ''Timestamp when the record was created'';
        COMMENT ON COLUMN public.%I.updated_at IS ''Timestamp when the record was last updated, automatically managed by trigger'';

        CREATE TRIGGER %s_before_update_set_timestamp_trigger
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION public.set_timestamp_trigger_fn()
    ', p_table, p_table, p_table, p_table, p_table);

    RAISE NOTICE 'Added created_at and updated_at columns to table %', p_table;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.add_timestamp_columns(text) IS 'Adds created_at and updated_at timestamp columns to the specified table, along with an automatic update trigger for updated_at';

CREATE FUNCTION public.add_timestamp_columns_to_all_tables() RETURNS void AS
$$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
          AND tablename NOT IN ('phase', 'request_type', 'role_type')
        LOOP
            PERFORM public.add_timestamp_columns(table_name);
        END LOOP;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.add_timestamp_columns_to_all_tables() IS 'Adds created_at and updated_at timestamp columns to all tables in the public schema, along with an automatic update trigger for updated_at';

SELECT add_timestamp_columns_to_all_tables();
