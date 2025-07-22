CREATE OR REPLACE FUNCTION public.copy_year_courses(p_year integer) RETURNS setof public.course AS
$$
DECLARE
    session_variables json;
    org_id            integer;
BEGIN
    session_variables := current_setting('hasura.user', 't')::json;
    org_id := (session_variables ->> 'x-hasura-org-id')::integer;

    RETURN QUERY
        INSERT INTO public.course (oid, year, program_id, track_id, term_id, name, name_short, type_id, groups,
                                   groups_adjusted, hours, hours_adjusted, description, priority_rule, visible,
                                   external_reference)
            SELECT org_id,
                   p_year,
                   c.program_id,
                   c.track_id,
                   c.term_id,
                   c.name,
                   c.name_short,
                   c.type_id,
                   c.groups,
                   c.groups_adjusted,
                   c.hours,
                   c.hours_adjusted,
                   c.description,
                   c.priority_rule,
                   c.visible,
                   c.external_reference
            FROM public.course c
            WHERE c.oid = org_id
              AND c.year = p_year - 1
            ON CONFLICT (oid, year, program_id, track_id, term_id, name, type_id) DO NOTHING
            RETURNING *;

    -- Copy course coordinations
    INSERT INTO public.coordination(oid, teacher_id, course_id, comment)
    SELECT org_id, coord.teacher_id, c_new.id, coord.comment
    FROM public.coordination coord
             JOIN public.course c_old
                  ON c_old.oid = org_id
                      AND c_old.id = coord.course_id
             JOIN public.course c_new
                  ON c_new.oid = org_id
                      AND c_new.year = p_year
                      AND c_new.program_id = c_old.program_id
                      AND c_new.track_id IS NOT DISTINCT FROM c_old.track_id
                      AND c_new.term_id = c_old.term_id
                      AND c_new.name = c_old.name
                      AND c_new.type_id = c_old.type_id
    WHERE coord.oid = org_id
      AND c_old.year = p_year - 1
      AND coord.course_id IS NOT NULL
    ON CONFLICT (oid, teacher_id, course_id, track_id, program_id) DO NOTHING;
END
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.copy_year_courses(integer) IS 'Creates copies of all courses from the previous year into the specified year';
