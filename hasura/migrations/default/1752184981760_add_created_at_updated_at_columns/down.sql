ALTER TABLE public.external_course
    DROP COLUMN created_at,
    DROP COLUMN updated_at;

ALTER TABLE public.term
    DROP COLUMN created_at,
    DROP COLUMN updated_at;
