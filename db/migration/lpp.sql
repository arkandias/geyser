ALTER TABLE public.course
    ADD COLUMN ens_id_import       text UNIQUE,
    ADD COLUMN formation_id_import text,
    ADD COLUMN nom_import          text;

ALTER TABLE public.program
    ADD COLUMN nom_import text;

ALTER TABLE public.track
    ADD COLUMN nom_import text;

INSERT INTO public.teacher_role(oid, teacher_id, role)
VALUES (1, 95, 'admin');
