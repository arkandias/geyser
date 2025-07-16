ALTER TABLE public.course
    DROP COLUMN hours_effective_total,
    DROP COLUMN hours_effective;

ALTER TABLE public.course
    ADD COLUMN hours_effective       real GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED,
    ADD COLUMN hours_effective_total real GENERATED ALWAYS AS (coalesce(groups_adjusted, groups) * coalesce(hours_adjusted, hours)) STORED;
