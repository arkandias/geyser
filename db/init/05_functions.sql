CREATE FUNCTION public.dummy_function() RETURNS setof public.app_setting AS
$$
SELECT * FROM public.app_setting WHERE FALSE;
$$ LANGUAGE sql VOLATILE;
COMMENT ON FUNCTION public.dummy_function() IS 'Dummy function that does nothing (useful for GraphQL clients)';

CREATE FUNCTION public.create_teacher_service(p_year integer, p_uid text) RETURNS setof public.service AS
$$
INSERT INTO public.service (year_value, uid, hours)
SELECT p_year, p_uid, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM public.teacher t
         LEFT JOIN public.position p ON p.id = t.position_id
WHERE t.uid = p_uid
ON CONFLICT (year_value, uid) DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_teacher_service(integer, text) IS 'Creates a new service entry for a specific year and teacher with default base hours, using personal base_service_hours if set and position''s base_service_hours otherwise';

CREATE FUNCTION public.compute_service_priorities(service_row service) RETURNS setof public.priority AS
$$
DELETE
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;

INSERT INTO public.priority (year_value, service_id, course_id, seniority, computed)
SELECT service_row.year_value, service_row.id, child.id, coalesce(p.seniority, 0) + 1, TRUE
FROM public.service s
         JOIN public.request r ON r.service_id = s.id AND r.type = 'assignment'
         LEFT JOIN public.priority p
                   ON p.service_id = r.service_id AND p.course_id = r.course_id
         JOIN public.course c ON c.id = r.course_id
         JOIN public.course child
              ON child.year_value = c.year_value + 1
                  AND child.program_id = c.program_id
                  AND child.track_id = c.track_id
                  AND child.name = c.name
                  AND child.semester = c.semester
                  AND child.type_id = c.type_id
WHERE s.year_value = service_row.year_value - 1
  AND s.uid = service_row.uid
ON CONFLICT (service_id, course_id)
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

CREATE FUNCTION public.create_year_services(p_year integer) RETURNS setof public.service AS
$$
SELECT s.*
FROM public.teacher t
         CROSS JOIN LATERAL public.create_teacher_service(p_year, t.uid) s
WHERE t.active IS TRUE;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_year_services(integer) IS 'Creates service entries for all active teachers for a specific year, using personal base_service_hours if set and position''s base_service_hours otherwise';

CREATE FUNCTION public.copy_year_courses(p_year integer) RETURNS setof public.course AS
$$
INSERT INTO public.course (year_value, program_id, track_id, name, name_short, semester, type_id, hours, hours_adjusted,
                           groups, groups_adjusted, description, priority_rule, visible)
SELECT p_year,
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
WHERE c.year_value = p_year - 1
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.copy_year_courses(integer) IS 'Creates copies of all courses from the previous year into the specified year';

CREATE FUNCTION public.compute_year_priorities(p_year integer) RETURNS setof public.priority AS
$$
SELECT p.*
FROM public.service s
         CROSS JOIN LATERAL public.compute_service_priorities(s) p
WHERE s.year_value = p_year;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_year_priorities(integer) IS 'Computes seniority and priority status for all services in a given year';
