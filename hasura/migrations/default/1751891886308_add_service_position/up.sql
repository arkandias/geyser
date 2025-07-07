ALTER TABLE public.position
    ADD COLUMN label_short text;

COMMENT ON COLUMN public.position.label_short IS 'Abbreviated name';


ALTER TABLE public.service
    ADD COLUMN position_id integer;

COMMENT ON COLUMN public.service.position_id IS 'Teacher''s position reference';

ALTER TABLE public.service
    ADD CONSTRAINT service_oid_position_id_fkey FOREIGN KEY (oid, position_id) REFERENCES public.position ON UPDATE CASCADE;

CREATE INDEX idx_service_oid_position_id ON public.service (oid, position_id);


DROP FUNCTION public.create_teacher_service(p_oid integer, p_year integer, p_teacher_id integer);

CREATE FUNCTION public.create_teacher_service(p_oid integer, p_year integer, p_teacher_id integer) RETURNS setof public.service AS
$$
INSERT INTO public.service (oid, year, teacher_id, position_id, hours)
SELECT p_oid, p_year, p_teacher_id, t.position_id, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM public.teacher t
         LEFT JOIN public.position p
                   ON p.oid = t.oid
                       AND p.id = t.position_id
WHERE t.oid = p_oid
  AND t.id = p_teacher_id
  AND t.active IS TRUE
ON CONFLICT (oid, year, teacher_id) DO NOTHING
RETURNING *;
$$ LANGUAGE sql;

COMMENT ON FUNCTION public.create_teacher_service(integer, integer, integer) IS 'Creates service entry for teacher with default hours from position or personal override';

DROP FUNCTION public.copy_year_services(p_year integer);

CREATE FUNCTION public.copy_year_services(p_year integer) RETURNS setof public.service AS
$$
DECLARE
    session_variables json;
    org_id            integer;
BEGIN
    session_variables := current_setting('hasura.user', 't')::json;
    org_id := (session_variables ->> 'x-hasura-org-id')::integer;

    RETURN QUERY
        INSERT INTO public.service (oid, year, teacher_id, position_id, hours)
            SELECT org_id, p_year, s.teacher_id, s.position_id, s.hours
            FROM public.service s
                     JOIN public.teacher t
                          ON t.oid = s.oid
                              AND t.id = s.teacher_id
            WHERE s.oid = org_id
              AND s.year = p_year - 1
              AND t.active IS TRUE
            ON CONFLICT (oid, year, teacher_id) DO NOTHING
            RETURNING *;
END
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.copy_year_services(integer) IS 'Creates copies of active teacher services from the previous year into the specified year';

UPDATE public.service
SET position_id = t.position_id
FROM public.teacher t
WHERE t.oid = service.oid
  AND t.id = service.teacher_id
  AND service.year = 2025;
