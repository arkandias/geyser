CREATE TABLE public.term
(
    oid         integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id          integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    label       text    NOT NULL,
    description text,
    PRIMARY KEY (oid, id),
    UNIQUE (oid, label)
);
CREATE INDEX idx_term_oid ON public.term (oid);

COMMENT ON TABLE public.term IS 'Academic terms';
COMMENT ON COLUMN public.term.oid IS 'Organization reference';
COMMENT ON COLUMN public.term.id IS 'Unique identifier';
COMMENT ON COLUMN public.term.label IS 'Term name (unique)';
COMMENT ON COLUMN public.term.description IS 'Optional description';

INSERT INTO public.term(oid, label, description)
SELECT id, 'S1', 'Semestre 1'
FROM public.organization;

INSERT INTO public.term(oid, label, description)
SELECT id, 'S2', 'Semestre 2'
FROM public.organization;

INSERT INTO public.term(oid, label, description)
SELECT id, 'S3', 'Semestre 3'
FROM public.organization;

INSERT INTO public.term(oid, label, description)
SELECT id, 'S4', 'Semestre 4'
FROM public.organization;

INSERT INTO public.term(oid, label, description)
SELECT id, 'S5', 'Semestre 5'
FROM public.organization;

INSERT INTO public.term(oid, label, description)
SELECT id, 'S6', 'Semestre 6'
FROM public.organization;


-- Step 1: Add the new term_id column
ALTER TABLE public.course
    ADD COLUMN term_id integer;
COMMENT ON COLUMN public.course.term_id IS 'Academic term reference';

-- Step 2: Populate term_id based on existing semester values
-- Assumes term labels are 'S1', 'S2', etc. matching semester numbers
UPDATE public.course
SET term_id = t.id
FROM public.term t
WHERE t.oid = public.course.oid
  AND t.label = 'S' || public.course.semester;

-- Step 3: Add NOT NULL constraint after data is populated
ALTER TABLE public.course
    ALTER COLUMN term_id SET NOT NULL;

-- Step 4: Add foreign key constraint
ALTER TABLE public.course
    ADD CONSTRAINT course_oid_term_id_fkey
        FOREIGN KEY (oid, term_id) REFERENCES public.term (oid, id) ON UPDATE CASCADE;

-- Step 5: Drop old constraints that reference semester
ALTER TABLE public.course
    DROP CONSTRAINT course_oid_year_program_id_track_id_name_semester_type_id_key;

-- Step 6: Add new unique constraint with term_id
ALTER TABLE public.course
    ADD CONSTRAINT course_oid_year_program_id_track_id_term_id_name_type_id_key
        UNIQUE NULLS NOT DISTINCT (oid, year, program_id, track_id, term_id, name, type_id);

-- Step 7: Add new index for term_id
CREATE INDEX idx_course_oid_program_id_track_id ON public.course (oid, program_id, track_id); -- fix
CREATE INDEX idx_course_oid_term_id ON public.course (oid, term_id);

-- Step 8: Drop old semester column and cycle_year (which depends on semester)
ALTER TABLE public.course
    DROP COLUMN cycle_year,
    DROP COLUMN semester;


CREATE OR REPLACE FUNCTION public.compute_service_priorities(service_row service) RETURNS setof public.priority AS
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
                  AND child.track_id IS NOT DISTINCT FROM c.track_id
                  AND child.name = c.name
                  AND child.term_id = c.term_id
                  AND child.type_id = c.type_id
WHERE s.year = service_row.year - 1
  AND s.teacher_id = service_row.teacher_id
ON CONFLICT (oid, service_id, course_id)
    DO UPDATE SET seniority = excluded.seniority
WHERE priority.computed IS TRUE;

UPDATE public.priority p
SET is_priority = (p.seniority > 0 AND (c.priority_rule > p.seniority OR c.priority_rule = 0))
FROM public.course c
WHERE p.computed IS TRUE
  AND p.service_id = service_row.id
  AND p.course_id = c.id
  AND c.priority_rule IS NOT NULL;

SELECT *
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;
$$ LANGUAGE sql;

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
                                   groups_adjusted, hours, hours_adjusted, description, priority_rule, visible)
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
                   c.visible
            FROM public.course c
            WHERE c.oid = org_id
              AND c.year = p_year - 1
            ON CONFLICT (oid, year, program_id, track_id, name, term_id, type_id) DO NOTHING
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
