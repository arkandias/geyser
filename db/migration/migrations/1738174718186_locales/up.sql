CREATE TABLE public.locale
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.locale IS 'Locales implemented in the web client';
COMMENT ON COLUMN public.locale.value IS 'Unique identifier';
COMMENT ON COLUMN public.locale.description IS 'Short description';

INSERT INTO public.locale(value, description)
VALUES ('fr-FR', 'French'),
       ('en-EN', 'English');

ALTER TABLE public.organization
    ADD COLUMN locale text NOT NULL REFERENCES public.locale ON UPDATE CASCADE DEFAULT 'fr-FR';
