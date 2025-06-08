CREATE TABLE public.organization
(
    id       integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    key      text NOT NULL UNIQUE,
    label    text NOT NULL,
    sublabel text,
    CHECK (id == 1)
);

INSERT INTO public.organization(key, label, sublabel)
VALUES ('univ-lille-dpt-math', 'Université de Lille', 'Département de mathématiques');

ALTER TABLE public.course
    DROP CONSTRAINT enseignement_annee_fkey;

ALTER TABLE public.service
    DROP CONSTRAINT service_annee_fkey;

ALTER TABLE public.year
    DROP CONSTRAINT annee_pkey,
    ADD COLUMN id  integer GENERATED ALWAYS AS IDENTITY,
    ADD COLUMN oid integer NOT NULL DEFAULT 1 REFERENCES public.organization,
    ADD PRIMARY KEY (id);

UPDATE public.course
SET year = y.id
FROM public.year y
WHERE y.value = public.course.year;

UPDATE public.service
SET year = y.id
FROM public.year y
WHERE y.value = public.service.year;

UPDATE public.priority
SET year = y.id
FROM public.year y
WHERE y.value = public.priority.year;

UPDATE public.request
SET year = y.id
FROM public.year y
WHERE y.value = public.request.year;

ALTER TABLE public.course
    ADD CONSTRAINT course_year_fkey FOREIGN KEY (year) REFERENCES public.year;

ALTER TABLE public.service
    ADD CONSTRAINT service_year_fkey FOREIGN KEY (year) REFERENCES public.year;

ALTER TABLE public.priority
    ADD CONSTRAINT priority_year_fkey FOREIGN KEY (year) REFERENCES public.year;

ALTER TABLE public.request
    ADD CONSTRAINT request_year_fkey FOREIGN KEY (year) REFERENCES public.year;
