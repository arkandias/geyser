CREATE TABLE public.message
(
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    service_id integer NOT NULL UNIQUE REFERENCES public.service ON UPDATE CASCADE,
    content    text    NOT NULL
);
CREATE INDEX idx_message_service ON public.message (service_id);

INSERT INTO public.message (service_id, content)
SELECT id, message
FROM public.service
WHERE message IS NOT NULL;

ALTER TABLE public.service
    DROP COLUMN message;
