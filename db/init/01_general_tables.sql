CREATE TABLE public.organization
(
    id       integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    key      text    NOT NULL UNIQUE,
    label    text    NOT NULL,
    sublabel text,
    email    text    NOT NULL,
    active   boolean NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE public.organization IS 'Organization information';
COMMENT ON COLUMN public.organization.id IS 'Unique identifier';
COMMENT ON COLUMN public.organization.key IS 'Human-readable identifier (unique)';
COMMENT ON COLUMN public.organization.email IS 'Organization contact email address';
COMMENT ON COLUMN public.organization.label IS 'Label for display purposes';
COMMENT ON COLUMN public.organization.sublabel IS 'Sublabel for display purposes';
COMMENT ON COLUMN public.organization.active IS 'Organization status flag';

CREATE TABLE public.current_phase
(
    oid   integer PRIMARY KEY REFERENCES public.organization ON UPDATE CASCADE,
    value text NOT NULL REFERENCES public.phase ON UPDATE CASCADE
);
CREATE INDEX idx_current_phase_oid ON public.current_phase (oid);
CREATE INDEX idx_current_phase_value ON public.current_phase (value);

COMMENT ON TABLE public.current_phase IS 'Current active phase for each organization';
COMMENT ON COLUMN public.current_phase.oid IS 'Organization reference';
COMMENT ON COLUMN public.current_phase.value IS 'Active phase reference';

CREATE TABLE public.year
(
    oid     integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    value   integer NOT NULL,
    current boolean NOT NULL DEFAULT FALSE,
    visible boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY (oid, value),
    CONSTRAINT year_current_visible_check CHECK (NOT current OR visible)
);
CREATE UNIQUE INDEX unique_current_year ON public.year (oid, current) WHERE current = TRUE;
CREATE INDEX idx_year_oid ON public.year (oid);

COMMENT ON TABLE public.year IS 'Academic years with current year designation and visibility control';
COMMENT ON COLUMN public.year.oid IS 'Organization reference';
COMMENT ON COLUMN public.year.value IS 'Academic year identifier, unique (e.g., 2025 for 2025-2026)';
COMMENT ON COLUMN public.year.current IS 'Current year flag';
COMMENT ON COLUMN public.year.visible IS 'Controls visibility to teachers';

CREATE FUNCTION public.clear_current_year_flag_trigger_fn() RETURNS trigger AS
$$
BEGIN
    UPDATE public.year
    SET current = FALSE
    WHERE oid = new.oid
      AND current IS TRUE;
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

CREATE TABLE public.app_setting
(
    oid   integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    key   text    NOT NULL,
    value text    NOT NULL,
    PRIMARY KEY (oid, key)
);
CREATE INDEX idx_app_setting_oid ON public.app_setting (oid);

COMMENT ON TABLE public.app_setting IS 'Application settings (e.g., custom UI parameters)';
COMMENT ON COLUMN public.app_setting.oid IS 'Organization reference';
COMMENT ON COLUMN public.app_setting.key IS 'Setting name (unique)';
COMMENT ON COLUMN public.app_setting.value IS 'Setting value';
