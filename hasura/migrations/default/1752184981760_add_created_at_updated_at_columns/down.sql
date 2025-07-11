ALTER TABLE public.external_course
    DROP COLUMN created_at,
    DROP COLUMN updated_at;

DROP TRIGGER external_course_before_update_set_timestamp_trigger
    ON public.external_course;

ALTER TABLE public.term
    DROP COLUMN created_at,
    DROP COLUMN updated_at;

DROP TRIGGER term_before_update_set_timestamp_trigger
    ON public.term;
