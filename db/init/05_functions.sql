CREATE FUNCTION public.dummy_function() RETURNS setof public.app_setting AS
$$
SELECT *
FROM public.app_setting
WHERE FALSE;
$$ LANGUAGE sql VOLATILE;
COMMENT ON FUNCTION public.dummy_function() IS 'Dummy function that does nothing (used by GraphQL clients)';

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

CREATE FUNCTION public.compute_service_priorities(service_row service) RETURNS setof public.priority AS
$$
DELETE
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;

INSERT INTO public.priority (oid, year, service_id, course_id, seniority, computed)
SELECT service_row.oid, service_row.year, service_row.id, child.id, coalesce(p.seniority, 0) + 1, TRUE
FROM public.service s
         JOIN public.request r
              ON r.oid = s.oid
                  AND r.service_id = s.id
                  AND r.type = 'assignment'
         LEFT JOIN public.priority p
                   ON p.oid = r.oid
                       AND p.service_id = r.service_id
                       AND p.course_id = r.course_id
         JOIN public.course c
              ON c.oid = r.oid
                  AND c.id = r.course_id
         JOIN public.course child
              ON child.oid = c.oid
                  AND child.year = c.year + 1
                  AND child.program_id = c.program_id
                  AND child.track_id = c.track_id
                  AND child.name = c.name
                  AND child.semester = c.semester
                  AND child.type_id = c.type_id
WHERE s.year = service_row.year - 1
  AND s.teacher_id = service_row.teacher_id
ON CONFLICT (oid, service_id, course_id)
    DO UPDATE SET seniority = excluded.seniority
WHERE priority.computed IS TRUE;

UPDATE public.priority p
SET is_priority = (p.seniority > 0 AND (c.priority_rule > p.seniority OR c.priority_rule = 0))
FROM public.course c
WHERE p.service_id = service_row.id
  AND p.course_id = c.id
  AND c.priority_rule IS NOT NULL;

SELECT *
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_service_priorities(service) IS 'Computes courses seniority and priority status for a given service based on previous year''s course assignments';

-- Compute Priorities Trigger

CREATE FUNCTION public.compute_service_priorities_trigger_fn() RETURNS trigger AS
$$
BEGIN
    PERFORM public.compute_service_priorities(new);
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.compute_service_priorities_trigger_fn() IS 'Trigger function that computes courses seniority and priority status for newly inserted services';

CREATE TRIGGER service_after_insert_compute_priorities_trigger
    AFTER INSERT
    ON public.service
    FOR EACH ROW
EXECUTE FUNCTION public.compute_service_priorities_trigger_fn();

-- Year Management

CREATE FUNCTION public.create_year_services(p_oid integer, p_year integer) RETURNS setof public.service AS
$$
SELECT s.*
FROM public.teacher t
         CROSS JOIN LATERAL public.create_teacher_service(p_oid, p_year, t.id) s
WHERE t.oid = p_oid
  AND t.active IS TRUE;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_year_services(integer, integer) IS 'Creates service entries for all active teachers in organization for specified year';

CREATE FUNCTION public.copy_year_services(p_oid integer, p_year integer) RETURNS setof public.service AS
$$
INSERT INTO public.service (oid, year, teacher_id, hours)
SELECT p_oid, p_year, s.teacher_id, s.hours
FROM public.service s
         JOIN public.teacher t
              ON t.oid = s.oid
                  AND t.id = s.teacher_id
WHERE s.oid = p_oid
  AND s.year = p_year - 1
  AND t.active IS TRUE
ON CONFLICT (oid, year, teacher_id) DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.copy_year_services(integer, integer) IS 'Creates copies of active teacher services from the previous year into the specified year';

CREATE FUNCTION public.copy_year_courses(p_oid integer, p_year integer) RETURNS setof public.course AS
$$
INSERT INTO public.course (oid, year, program_id, track_id, name, name_short, semester, type_id, hours, hours_adjusted,
                           groups, groups_adjusted, description, priority_rule, visible)
SELECT p_oid,
       p_year,
       c.program_id,
       c.track_id,
       c.name,
       c.name_short,
       c.semester,
       c.type_id,
       c.hours,
       c.hours_adjusted,
       c.groups,
       c.groups_adjusted,
       c.description,
       c.priority_rule,
       c.visible
FROM public.course c
WHERE c.oid = p_oid
  AND c.year = p_year - 1
ON CONFLICT (oid, year, program_id, track_id, name, semester, type_id) DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.copy_year_courses(integer, integer) IS 'Creates copies of all courses from the previous year into the specified year';

CREATE FUNCTION public.compute_year_priorities(p_oid integer, p_year integer) RETURNS setof public.priority AS
$$
SELECT p.*
FROM public.service s
         CROSS JOIN LATERAL public.compute_service_priorities(s) p
WHERE s.oid = p_oid
  AND s.year = p_year;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_year_priorities(integer, integer) IS 'Computes seniority and priority status for all services in a given year';
