ALTER TABLE public.course
    ADD COLUMN external_reference text;

COMMENT ON COLUMN public.course.external_reference IS 'External reference (optional)';
