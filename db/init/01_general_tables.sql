CREATE TABLE public.app_setting
(
    key   text PRIMARY KEY,
    value text
);

COMMENT ON TABLE public.app_setting IS 'Application settings (e.g., custom UI parameters)';
COMMENT ON COLUMN public.app_setting.key IS 'Text identifier';
COMMENT ON COLUMN public.app_setting.value IS 'Text content';

CREATE TABLE public.phase
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.phase IS 'System phases controlling the course assignment workflow';
COMMENT ON COLUMN public.phase.value IS 'Phase identifier';
COMMENT ON COLUMN public.phase.description IS 'Summary of activities and permissions during this phase';

CREATE TABLE public.current_phase
(
    id    integer PRIMARY KEY DEFAULT 1 CHECK ( id = 1 ),
    value text REFERENCES public.phase ON UPDATE CASCADE
);
CREATE INDEX idx_current_phase_value ON public.current_phase (value);

COMMENT ON TABLE public.current_phase IS 'Singleton table that stores the active system phase reference';
COMMENT ON COLUMN public.current_phase.id IS 'Primary key with constraint to ensure only one record exists';
COMMENT ON COLUMN public.current_phase.value IS 'Reference to the currently active phase identifier';

CREATE TABLE public.year
(
    value   integer PRIMARY KEY,
    current boolean NOT NULL DEFAULT FALSE,
    visible boolean NOT NULL DEFAULT TRUE,
    CONSTRAINT year_current_visible_check CHECK (NOT current OR visible)
);
CREATE UNIQUE INDEX unique_current_year ON public.year (current) WHERE current = TRUE;

COMMENT ON TABLE public.year IS 'Academic year definitions with current year designation and visibility settings';
COMMENT ON COLUMN public.year.value IS 'Academic year identifier (e.g., 2024 for 2024-2025 academic year)';
COMMENT ON COLUMN public.year.current IS 'Current academic year flag. Constrained to have at most one current year';
COMMENT ON COLUMN public.year.visible IS 'Controls visibility of the year in the user interface and queries';

CREATE FUNCTION public.clear_current_year_flag_trigger_fn() RETURNS trigger AS
$$
BEGIN
    UPDATE public.year SET current = FALSE WHERE current IS TRUE;
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION clear_current_year_flag_trigger_fn() IS 'Trigger function that clears the current year flag before a year is set as current';

CREATE TRIGGER year_before_update_clear_current_flag_trigger
    BEFORE UPDATE OF current
    ON public.year
    FOR EACH ROW
    WHEN (new.current = TRUE)
EXECUTE FUNCTION clear_current_year_flag_trigger_fn();
