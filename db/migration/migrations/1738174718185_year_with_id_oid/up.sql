CREATE TABLE public.organization
(
    id       integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    key      text NOT NULL UNIQUE,
    label    text NOT NULL,
    sublabel text,
    CHECK (id = 1)
);

INSERT INTO public.organization(key, label, sublabel)
VALUES ('univ-lille-dpt-math', 'Université de Lille', 'Département de mathématiques');

ALTER TABLE public.year
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.position
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.teacher
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.service
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.message
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.service_modification_type
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.service_modification
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.coordination
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.degree
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.program
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.track
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.course_type
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.course
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.priority
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
ALTER TABLE public.request
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization;
