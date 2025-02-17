--
-- General tables
--

CREATE TABLE public.ui_text
(
    key   text PRIMARY KEY,
    value text NOT NULL
);

COMMENT ON TABLE ui_text IS 'Custom texts for the UI';
COMMENT ON COLUMN public.ui_text.key IS 'Text identifier';
COMMENT ON COLUMN public.ui_text.value IS 'Text content';

CREATE TABLE public.phase
(
    value   text PRIMARY KEY,
    current boolean UNIQUE, -- TRUE or NULL
    CHECK (current)         -- current is TRUE or NULL
);

COMMENT ON TABLE public.phase IS 'System phases controlling the course assignment workflow';
COMMENT ON COLUMN public.phase.value IS 'Phase identifier';
COMMENT ON COLUMN public.phase.current IS 'Current phase flag (TRUE or NULL). Constrained to have at most one current phase';

CREATE TABLE public.year
(
    value   integer PRIMARY KEY,
    current boolean UNIQUE,                    -- TRUE or NULL
    visible boolean NOT NULL DEFAULT TRUE,
    CHECK (current),                           -- current is TRUE or NULL
    CHECK (current IS NULL OR visible IS TRUE) -- current year is visible
);

COMMENT ON TABLE public.year IS 'Academic year definitions with current year designation and visibility settings';
COMMENT ON COLUMN public.year.value IS 'Academic year identifier (e.g., 2024 for 2024-2025 academic year)';
COMMENT ON COLUMN public.year.current IS 'Current academic year flag (TRUE or NULL). Constrained to have at most one current year';
COMMENT ON COLUMN public.year.visible IS 'Controls visibility of the year in the user interface and queries';


--
-- Teacher-related tables
--

CREATE TABLE public.position
(
    value              text PRIMARY KEY,
    label              text NOT NULL UNIQUE,
    description        text,
    base_service_hours real
);

COMMENT ON TABLE public.position IS 'Teaching positions with associated service hour requirements';
COMMENT ON COLUMN public.position.value IS 'Position identifier (e.g., professor, lecturer)';
COMMENT ON COLUMN public.position.label IS 'Human-readable position name for display purposes, unique';
COMMENT ON COLUMN public.position.base_service_hours IS 'Default annual teaching hours required for this position, can be overridden per teacher';
COMMENT ON COLUMN public.position.description IS 'Optional description of the position';

CREATE TABLE public.teacher
(
    uid                text PRIMARY KEY,
    firstname          text    NOT NULL,
    lastname           text    NOT NULL,
    alias              text,
    position           text REFERENCES public.position ON UPDATE CASCADE,
    base_service_hours real,
    visible            boolean NOT NULL DEFAULT TRUE,
    active             boolean NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE public.teacher IS 'Core teacher information and status';
COMMENT ON COLUMN public.teacher.uid IS 'Teacher''s email address (primary key).';
COMMENT ON COLUMN public.teacher.firstname IS 'Teacher''s first name';
COMMENT ON COLUMN public.teacher.lastname IS 'Teacher''s last name';
COMMENT ON COLUMN public.teacher.alias IS 'Optional display name, used instead of first/last name when set';
COMMENT ON COLUMN public.teacher.position IS 'Reference to teacher''s position, determines default service hours';
COMMENT ON COLUMN public.teacher.base_service_hours IS 'Individual override for annual teaching hours, takes precedence over position''s base hours';
COMMENT ON COLUMN public.teacher.visible IS 'Controls teacher visibility in the user interface and queries';
COMMENT ON COLUMN public.teacher.active IS 'Controls system access and automatic service creation for upcoming years';

CREATE TABLE public.service
(
    id      serial PRIMARY KEY,
    year    integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    uid     text    NOT NULL REFERENCES public.teacher ON UPDATE CASCADE,
    hours   real    NOT NULL,
    message text,
    UNIQUE (year, uid)
);

COMMENT ON TABLE public.service IS 'Annual teaching service records tracking required hours and modifications';
COMMENT ON COLUMN public.service.id IS 'Unique service identifier';
COMMENT ON COLUMN public.service.year IS 'Academic year for this service record';
COMMENT ON COLUMN public.service.uid IS 'Teacher identifier linking to teacher table';
COMMENT ON COLUMN public.service.hours IS 'Required teaching hours for the year before modifications';
COMMENT ON COLUMN public.service.message IS 'Optional message from teacher to course assignment committee';

CREATE TABLE public.service_modification_type
(
    value       text PRIMARY KEY,
    label       text NOT NULL UNIQUE,
    description text
);

COMMENT ON TABLE public.service_modification_type IS 'Categories of service hour modifications';
COMMENT ON COLUMN public.service_modification_type.value IS 'Modification type identifier';
COMMENT ON COLUMN public.service_modification_type.label IS 'Human-readable name for the modification type, unique';
COMMENT ON COLUMN public.service_modification_type.description IS 'Detailed explanation of the modification type and its application';

CREATE TABLE public.service_modification
(
    id         serial PRIMARY KEY,
    service_id integer NOT NULL REFERENCES public.service ON UPDATE CASCADE,
    type       text    NOT NULL REFERENCES public.service_modification_type ON UPDATE CASCADE,
    hours      real    NOT NULL
);

COMMENT ON TABLE public.service_modification IS 'Individual modifications to base teaching service hours';
COMMENT ON COLUMN public.service_modification.id IS 'Unique modification identifier';
COMMENT ON COLUMN public.service_modification.service_id IS 'Reference to affected service record';
COMMENT ON COLUMN public.service_modification.type IS 'Type of service modification being applied';
COMMENT ON COLUMN public.service_modification.hours IS 'Hour adjustment amount (negative values increase required hours)';

CREATE TABLE public.role_type
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.role_type IS 'System roles for privileged access';
COMMENT ON COLUMN public.role_type.value IS 'Role identifier';
COMMENT ON COLUMN public.role_type.description IS 'Description of role privileges and responsibilities';

CREATE TABLE public.role
(
    id      serial PRIMARY KEY,
    uid     text NOT NULL REFERENCES public.teacher,
    type    text NOT NULL REFERENCES public.role_type,
    comment text,
    UNIQUE (uid, type)
);

COMMENT ON TABLE public.role IS 'Teacher role assignments for system privileges';
COMMENT ON COLUMN public.role.id IS 'Unique role assignment identifier';
COMMENT ON COLUMN public.role.uid IS 'Teacher identifier with role access';
COMMENT ON COLUMN public.role.type IS 'Type of privileged role';
COMMENT ON COLUMN public.role.comment IS 'Additional information about this privilege assignment';


--
-- Course-related tables
--

CREATE TABLE public.degree
(
    id         serial PRIMARY KEY,
    name       text    NOT NULL UNIQUE,
    name_short text,
    visible    boolean NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE public.degree IS 'Academic degrees offered by the institution';
COMMENT ON COLUMN public.degree.id IS 'Unique degree identifier';
COMMENT ON COLUMN public.degree.name IS 'Full degree name, unique (e.g., Bachelor of Science)';
COMMENT ON COLUMN public.degree.name_short IS 'Abbreviated degree name (e.g., BSc)';
COMMENT ON COLUMN public.degree.visible IS 'Controls degree visibility in the user interface and queries';

CREATE TABLE public.program
(
    id         serial PRIMARY KEY,
    degree_id  integer NOT NULL REFERENCES public.degree ON UPDATE CASCADE,
    name       text    NOT NULL,
    name_short text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (degree_id, name)
);

COMMENT ON TABLE public.program IS 'Academic programs within each degree';
COMMENT ON COLUMN public.program.id IS 'Unique program identifier';
COMMENT ON COLUMN public.program.degree_id IS 'Parent degree for this program';
COMMENT ON COLUMN public.program.name IS 'Full program name, unique within its degree (e.g., Mathematics)';
COMMENT ON COLUMN public.program.name_short IS 'Abbreviated program name';
COMMENT ON COLUMN public.program.visible IS 'Controls program visibility in the user interface and queries';

CREATE TABLE public.track
(
    id         serial PRIMARY KEY,
    program_id integer NOT NULL REFERENCES public.program ON UPDATE CASCADE,
    name       text    NOT NULL,
    name_short text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (program_id, name)
);

COMMENT ON TABLE public.track IS 'Specialization tracks within academic programs';
COMMENT ON COLUMN public.track.id IS 'Unique track identifier';
COMMENT ON COLUMN public.track.program_id IS 'Parent program for this track';
COMMENT ON COLUMN public.track.name IS 'Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.)';
COMMENT ON COLUMN public.track.name_short IS 'Abbreviated track name';
COMMENT ON COLUMN public.track.visible IS 'Controls track visibility in the user interface and queries';

CREATE TABLE public.course_type
(
    value       text PRIMARY KEY,
    label       text NOT NULL UNIQUE,
    coefficient real NOT NULL DEFAULT 1,
    description text
);

COMMENT ON TABLE public.course_type IS 'Types of course delivery with associated workload coefficients';
COMMENT ON COLUMN public.course_type.value IS 'Course type identifier (e.g., lecture, tutorial)';
COMMENT ON COLUMN public.course_type.label IS 'Human-readable type name for display, unique';
COMMENT ON COLUMN public.course_type.coefficient IS 'Workload multiplier for service hour calculations';
COMMENT ON COLUMN public.course_type.description IS 'Detailed description of the course type and its characteristics';

CREATE TABLE public.course
(
    id               serial PRIMARY KEY,
    year             integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    program_id       integer NOT NULL REFERENCES public.program ON UPDATE CASCADE,
    track_id         integer REFERENCES public.track ON UPDATE CASCADE,
    parent_id        integer REFERENCES public.course ON UPDATE CASCADE,
    name             text    NOT NULL,
    name_short       text,
    type             text    NOT NULL REFERENCES public.course_type ON UPDATE CASCADE,
    semester         integer NOT NULL CHECK (1 <= semester AND semester <= 6),
    cycle_year       integer NOT NULL GENERATED ALWAYS AS (ceil(semester / 2.0)) STORED,
    hours            real    NOT NULL CHECK (hours >= 0),
    hours_adjusted   real CHECK (0 <= hours_adjusted AND hours_adjusted < hours),
    hours_effective  integer GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED,
    groups           integer NOT NULL CHECK (groups >= 0),
    groups_adjusted  integer CHECK (0 <= groups_adjusted AND groups_adjusted < groups),
    groups_effective integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups)) STORED,
    description      text,
    priority_rule    integer          DEFAULT 3 CHECK (priority_rule >= 0), -- 0=: Infinity; NULL: No rule
    visible          boolean NOT NULL DEFAULT TRUE,
    UNIQUE (year, program_id, track_id, name, semester, type)
);

COMMENT ON TABLE public.course IS 'Detailed course definitions and configurations';
COMMENT ON COLUMN public.course.id IS 'Unique course identifier';
COMMENT ON COLUMN public.course.year IS 'Academic year when the course is offered';
COMMENT ON COLUMN public.course.program_id IS 'Program offering this course';
COMMENT ON COLUMN public.course.track_id IS 'Optional track specialization for this course';
COMMENT ON COLUMN public.course.parent_id IS 'Reference to previous year''s version of this course';
COMMENT ON COLUMN public.course.name IS 'Full course name';
COMMENT ON COLUMN public.course.name_short IS 'Abbreviated course name';
COMMENT ON COLUMN public.course.type IS 'Course delivery type affecting workload calculation';
COMMENT ON COLUMN public.course.semester IS 'Academic semester (1-6)';
COMMENT ON COLUMN public.course.cycle_year IS 'Computed study year (1-3) based on semester';
COMMENT ON COLUMN public.course.hours IS 'Standard teaching hours per group';
COMMENT ON COLUMN public.course.hours_adjusted IS 'Modified teaching hours per group if different from standard';
COMMENT ON COLUMN public.course.hours_effective IS 'Actual teaching hours used, defaulting to standard if no adjustment';
COMMENT ON COLUMN public.course.groups IS 'Standard number of student groups';
COMMENT ON COLUMN public.course.groups_adjusted IS 'Modified number of groups if different from standard';
COMMENT ON COLUMN public.course.groups_effective IS 'Actual number of groups used, defaulting to standard if no adjustment';
COMMENT ON COLUMN public.course.description IS 'Detailed course description and objectives';
COMMENT ON COLUMN public.course.priority_rule IS 'Priority duration in years (3=default, 1=none, 0=permanent, NULL=disabled)';
COMMENT ON COLUMN public.course.visible IS 'Controls course visibility in the user interface and queries';

CREATE FUNCTION public.total_hours_effective(course_row course) RETURNS real AS
$$
SELECT course_row.hours_effective * course_row.groups_effective;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.total_hours_effective(course) IS 'Calculates total effective teaching hours for a course by multiplying hours_effective by groups_effective';

CREATE FUNCTION public.check_parent_year() RETURNS trigger AS
$$
DECLARE
    parent_year integer;
BEGIN
    IF new.parent_id IS NOT NULL THEN
        SELECT year
        INTO parent_year
        FROM public.course
        WHERE id = new.parent_id;

        IF parent_year IS NOT NULL AND parent_year >= new.year THEN
            RAISE EXCEPTION 'The parent course year must be less than the course year '
                '(course id: %, course year: %, parent id: %, parent year: %)',
                new.id, new.year, new.parent_id, parent_year;
        END IF;

    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION public.check_parent_year() IS 'Ensures that the parent course''s year is less than the course''s year';

CREATE TRIGGER check_parent_year
    BEFORE INSERT OR UPDATE OF parent_id, year
    ON public.course
    FOR EACH ROW
EXECUTE FUNCTION public.check_parent_year();

CREATE FUNCTION public.check_children_year() RETURNS trigger AS
$$
DECLARE
    child_id   integer;
    child_year integer;
BEGIN
    SELECT id, year
    INTO child_id, child_year
    FROM public.course
    WHERE parent_id = new.id
      AND year <= new.year
    LIMIT 1;

    IF child_id IS NOT NULL THEN
        RAISE EXCEPTION 'The child course year must be greater than the course year '
            '(course id: %, course year: %, child id: %, child year: %)',
            new.id, new.year, child_id, child_year;
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION public.check_children_year() IS 'Ensures that child courses'' years are greater than the course''s year';

CREATE TRIGGER check_children_year
    BEFORE UPDATE OF year
    ON public.course
    FOR EACH ROW
EXECUTE FUNCTION public.check_children_year();

CREATE FUNCTION public.check_track_program() RETURNS trigger AS
$$
DECLARE
    track_program_id integer;
BEGIN
    IF new.track_id IS NOT NULL THEN
        SELECT program_id
        INTO track_program_id
        FROM public.track
        WHERE id = new.track_id;

        IF track_program_id != new.program_id THEN
            RAISE EXCEPTION 'The track program must match the course program '
                '(program id: %, track id: %, track program id: %)',
                new.program_id, new.track_id, track_program_id;
        END IF;

    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION public.check_track_program() IS 'Ensures that a course''s track belongs to the course''s program';

CREATE TRIGGER check_track_program
    BEFORE INSERT OR UPDATE OF program_id, track_id
    ON public.course
    FOR EACH ROW
EXECUTE FUNCTION public.check_track_program();

CREATE TRIGGER check_track_program_on_track_update
    BEFORE UPDATE OF program_id
    ON public.track
    FOR EACH ROW
EXECUTE FUNCTION public.check_track_program();

CREATE TABLE public.coordination
(
    id         serial PRIMARY KEY,
    uid        text NOT NULL REFERENCES public.teacher ON UPDATE CASCADE,
    program_id integer REFERENCES public.program ON UPDATE CASCADE,
    track_id   integer REFERENCES public.track ON UPDATE CASCADE,
    course_id  integer REFERENCES public.course ON UPDATE CASCADE,
    comment    text,
    UNIQUE NULLS NOT DISTINCT (uid, course_id, track_id, program_id),
    CHECK (num_nonnulls(course_id, track_id, program_id) = 1)
);

COMMENT ON TABLE public.coordination IS 'Academic coordination assignments at program, track, or course level';
COMMENT ON COLUMN public.coordination.id IS 'Unique coordination identifier';
COMMENT ON COLUMN public.coordination.uid IS 'Coordinating teacher';
COMMENT ON COLUMN public.coordination.program_id IS 'Program being coordinated (mutually exclusive with track_id and course_id)';
COMMENT ON COLUMN public.coordination.track_id IS 'Track being coordinated (mutually exclusive with program_id and course_id)';
COMMENT ON COLUMN public.coordination.course_id IS 'Course being coordinated (mutually exclusive with program_id and track_id)';
COMMENT ON COLUMN public.coordination.comment IS 'Additional coordination details';


--
-- Request-related tables
--

CREATE TABLE public.request_type
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.request_type IS 'Types of teaching assignment requests in workflow';
COMMENT ON COLUMN public.request_type.value IS 'Request type identifier';
COMMENT ON COLUMN public.request_type.description IS 'Detailed description of the request type and its purpose';

CREATE TABLE public.request
(
    id         serial PRIMARY KEY,
    service_id integer NOT NULL REFERENCES public.service ON UPDATE CASCADE,
    course_id  integer NOT NULL REFERENCES public.course ON UPDATE CASCADE,
    type       text    NOT NULL REFERENCES public.request_type ON UPDATE CASCADE,
    hours      real    NOT NULL CHECK (hours > 0),
    UNIQUE (service_id, course_id, type)
);

COMMENT ON TABLE public.request IS 'Teacher requests and assignments for courses';
COMMENT ON COLUMN public.request.id IS 'Unique request identifier';
COMMENT ON COLUMN public.request.service_id IS 'Associated teacher service record';
COMMENT ON COLUMN public.request.course_id IS 'Requested or assigned course';
COMMENT ON COLUMN public.request.type IS 'Type of request (primary choice, backup, or final assignment)';
COMMENT ON COLUMN public.request.hours IS 'Requested or assigned teaching hours';

CREATE FUNCTION public.hours_weighted(request_row request) RETURNS real AS
$$
SELECT r.hours * ct.coefficient
FROM public.request r
         JOIN public.course c ON r.course_id = c.id
         JOIN public.course_type ct ON c.type = ct.value
WHERE r.id = request_row.id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.hours_weighted(request) IS 'Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient';

CREATE TABLE public.priority
(
    id          serial PRIMARY KEY,
    service_id  integer NOT NULL REFERENCES public.service ON UPDATE CASCADE,
    course_id   integer NOT NULL REFERENCES public.course ON UPDATE CASCADE,
    seniority   integer CHECK (seniority >= 0),
    is_priority boolean,
    UNIQUE (service_id, course_id)
);

COMMENT ON TABLE public.priority IS 'Teacher course assignment history and priority status';
COMMENT ON COLUMN public.priority.id IS 'Unique priority record identifier';
COMMENT ON COLUMN public.priority.service_id IS 'Associated teacher service record';
COMMENT ON COLUMN public.priority.course_id IS 'Course for which priority is tracked';
COMMENT ON COLUMN public.priority.seniority IS 'Consecutive years teaching this course before current year';
COMMENT ON COLUMN public.priority.is_priority IS 'Current priority status based on seniority and course rules';

CREATE FUNCTION public.is_priority(request_row request) RETURNS boolean AS
$$
SELECT is_priority
FROM public.priority
WHERE service_id = request_row.service_id
  AND course_id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.is_priority(request) IS 'Determines if a request is prioritized based on teaching history and course priority rules';

CREATE FUNCTION public.check_service_course_year() RETURNS trigger AS
$$
DECLARE
    service_year integer;
    course_year  integer;
BEGIN
    SELECT year INTO service_year FROM public.service WHERE id = new.service_id;
    SELECT year INTO course_year FROM public.course WHERE id = new.course_id;

    IF service_year != course_year THEN
        RAISE EXCEPTION 'Service year must match course year '
            '(service year: %, course year: %)',
            service_year, course_year;
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.check_service_course_year() IS 'Ensures that service and course years match for requests and priorities';

CREATE TRIGGER check_request_service
    BEFORE INSERT OR UPDATE OF service_id, course_id
    ON public.request
    FOR EACH ROW
EXECUTE FUNCTION public.check_service_course_year();

CREATE TRIGGER check_priority_service
    BEFORE INSERT OR UPDATE OF service_id, course_id
    ON public.priority
    FOR EACH ROW
EXECUTE FUNCTION public.check_service_course_year();


--
-- Functions
--

CREATE FUNCTION public.compute_seniorities(p_service_id integer) RETURNS setof priority AS
$$
WITH service_info AS (SELECT year, uid
                      FROM public.service
                      WHERE id = p_service_id)
INSERT
INTO public.priority (service_id, course_id, seniority)
SELECT p_service_id, c.id, coalesce(p.seniority + 1, 1)
FROM public.course c
         JOIN public.request r ON r.course_id = c.parent_id AND r.type = 'assignment'
         JOIN public.service s ON r.service_id = s.id AND s.uid = (SELECT uid FROM service_info)
         LEFT JOIN public.priority p ON r.service_id = p.service_id AND r.course_id = p.course_id
WHERE c.year = (SELECT year FROM service_info)
ON CONFLICT (service_id, course_id) DO UPDATE
    SET seniority = excluded.seniority
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_seniorities(integer) IS 'Inserts priorities or updates seniority column for a given service based on previous course assignments';

CREATE FUNCTION public.compute_priorities(p_service_id integer) RETURNS setof priority AS
$$
UPDATE public.priority p
SET is_priority = (p.seniority > 0 AND (c.priority_rule > p.seniority OR c.priority_rule = 0))
FROM public.course c
WHERE p.service_id = p_service_id
  AND c.id = p.course_id
  AND c.priority_rule IS NOT NULL
RETURNING p.*;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_priorities(integer) IS 'Updates is_priority column for a given service based on seniority and course priority rules';

CREATE FUNCTION public.compute_service_priorities() RETURNS trigger AS
$$
BEGIN
    PERFORM public.compute_seniorities(new.id);
    PERFORM public.compute_priorities(new.id);
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.compute_service_priorities() IS 'Trigger function that fully computes all priorities for a given service';

CREATE TRIGGER compute_service_priorities
    AFTER INSERT
    ON public.service
    FOR EACH ROW
EXECUTE FUNCTION public.compute_service_priorities();

CREATE FUNCTION public.create_service(p_year integer, p_uid text) RETURNS service AS
$$
INSERT INTO public.service (year, uid, hours)
SELECT p_year, p_uid, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM public.teacher t
         JOIN public.position p ON t.position = p.value
WHERE t.uid = p_uid
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_service(integer, text) IS 'Creates a new service entry for a specific year and teacher with default base hours, using personal base_service_hours if set and position''s base_service_hours otherwise';

CREATE FUNCTION public.create_services(p_year integer) RETURNS setof service AS
$$
INSERT INTO public.service (year, uid, hours)
SELECT p_year, t.uid, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM public.teacher t
         JOIN public.position p ON t.position = p.value
WHERE t.active IS TRUE
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_services(integer) IS 'Creates service entries for all active teachers for a specific year, using personal base_service_hours if set and position''s base_service_hours otherwise';


--
-- Timestamps
--

CREATE FUNCTION public.set_timestamp() RETURNS trigger AS
$$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.set_timestamp() IS 'Trigger function to automatically update updated_at timestamp column on row updates';

CREATE FUNCTION public.add_timestamp_columns(target_table text) RETURNS void AS
$$
BEGIN
    EXECUTE format('
        ALTER TABLE public.%I 
        ADD COLUMN created_at timestamptz NOT NULL DEFAULT current_timestamp,
        ADD COLUMN updated_at timestamptz NOT NULL DEFAULT current_timestamp;
        COMMENT ON COLUMN public.%I.created_at IS ''Timestamp when the record was created'';
        COMMENT ON COLUMN public.%I.updated_at IS ''Timestamp when the record was last updated, automatically managed by trigger'';
    ', target_table, target_table, target_table);

    EXECUTE format('
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION public.set_timestamp()
    ', target_table);

    RAISE NOTICE 'Added timestamp columns and trigger to table: %', target_table;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.add_timestamp_columns(text) IS 'Adds created_at and updated_at timestamp columns to the specified table, along with an automatic update trigger for updated_at';

CREATE FUNCTION public.add_timestamp_columns_to_all_tables() RETURNS void AS
$$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        LOOP
            PERFORM public.add_timestamp_columns(table_name);
        END LOOP;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.add_timestamp_columns_to_all_tables() IS 'Adds created_at and updated_at timestamp columns to all tables in the public schema, along with an automatic update trigger for updated_at';

SELECT add_timestamp_columns_to_all_tables();
