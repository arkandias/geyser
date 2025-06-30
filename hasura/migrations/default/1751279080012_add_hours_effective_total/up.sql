ALTER TABLE public.course
    ADD COLUMN hours_effective_total integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups) * coalesce(hours_adjusted, hours)) STORED;

COMMENT ON COLUMN public.course.hours_effective_total IS 'Effective teaching hours per group times effective number of groups';
