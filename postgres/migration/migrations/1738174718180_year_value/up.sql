ALTER TABLE public.course
    RENAME COLUMN year TO year_value;

ALTER TABLE public.priority
    RENAME COLUMN year TO year_value;

ALTER TABLE public.request
    RENAME COLUMN year TO year_value;

ALTER TABLE public.service
    RENAME COLUMN year TO year_value;
