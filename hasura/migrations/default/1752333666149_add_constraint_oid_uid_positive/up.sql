ALTER TABLE public.organization
    ADD CONSTRAINT organization_id_positive CHECK (id > 0);

ALTER TABLE public.teacher
    ADD CONSTRAINT teacher_id_positive CHECK (id > 0);
