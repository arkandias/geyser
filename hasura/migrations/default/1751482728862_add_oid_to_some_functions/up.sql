DROP FUNCTION public.create_teacher_service(p_year integer, p_teacher_id integer);

CREATE FUNCTION public.create_teacher_service(p_oid integer, p_year integer, p_teacher_id integer) RETURNS setof public.service AS
$$
INSERT INTO public.service (oid, year, teacher_id, hours)
SELECT p_oid, p_year, p_teacher_id, coalesce(t.base_service_hours, p.base_service_hours, 0)
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

CREATE OR REPLACE FUNCTION public.create_year_services(p_year integer) RETURNS setof public.service AS
$$
DECLARE
    session_variables json;
    org_id            integer;
BEGIN
    session_variables := current_setting('hasura.user', 't')::json;
    org_id := (session_variables ->> 'x-hasura-org-id')::integer;

    RETURN QUERY
        SELECT s.*
        FROM public.teacher t
                 CROSS JOIN LATERAL public.create_teacher_service(org_id, p_year, t.id) s
        WHERE t.oid = org_id
          AND t.active IS TRUE;
END
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.create_year_services(integer) IS 'Creates service entries for all active teachers in organization for specified year';
