ALTER TABLE public.course
    RENAME COLUMN year_value TO year;

ALTER TABLE public.priority
    RENAME COLUMN year_value TO year;

ALTER TABLE public.request
    RENAME COLUMN year_value TO year;

ALTER TABLE public.service
    RENAME COLUMN year_value TO year;
