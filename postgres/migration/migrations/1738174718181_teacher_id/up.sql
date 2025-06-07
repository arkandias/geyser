ALTER TABLE public.teacher
    ADD COLUMN id integer GENERATED ALWAYS AS IDENTITY;

ALTER TABLE public.teacher
    ADD COLUMN email text;

UPDATE public.teacher
SET email = uid;

ALTER TABLE public.teacher
    ALTER COLUMN email SET NOT NULL;

ALTER TABLE public.teacher
    ADD CONSTRAINT teacher_email_unique UNIQUE (email);

ALTER TABLE public.teacher
    ADD CONSTRAINT teacher_id_unique UNIQUE (id);



ALTER TABLE public.service
    ADD COLUMN teacher_id integer;

UPDATE public.service
SET teacher_id = (SELECT id FROM public.teacher WHERE public.teacher.uid = public.service.uid);

ALTER TABLE public.service
    ALTER COLUMN teacher_id SET NOT NULL;

ALTER TABLE public.service
    ADD CONSTRAINT service_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher (id);

ALTER TABLE public.service
    DROP COLUMN uid;


ALTER TABLE public.coordination
    ADD COLUMN teacher_id integer;

UPDATE public.coordination
SET teacher_id = (SELECT id FROM public.teacher WHERE public.teacher.uid = public.coordination.uid);

ALTER TABLE public.coordination
    ALTER COLUMN teacher_id SET NOT NULL;

ALTER TABLE public.coordination
    ADD CONSTRAINT service_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher (id);

ALTER TABLE public.coordination
    DROP COLUMN uid;



ALTER TABLE public.teacher
    DROP CONSTRAINT intervenant_pkey;

ALTER TABLE public.teacher
    ADD PRIMARY KEY (id);

ALTER TABLE public.teacher
    DROP COLUMN uid;