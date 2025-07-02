ALTER TABLE public.priority
    DROP CONSTRAINT priority_oid_year_service_id_fkey,
    DROP CONSTRAINT priority_oid_year_course_id_fkey;

ALTER TABLE public.priority
    ADD CONSTRAINT priority_oid_year_service_id_fkey
        FOREIGN KEY (oid, year, service_id) REFERENCES public.service (oid, year, id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    ADD CONSTRAINT priority_oid_year_course_id_fkey
        FOREIGN KEY (oid, year, course_id) REFERENCES public.course (oid, year, id)
            ON UPDATE CASCADE ON DELETE CASCADE;
