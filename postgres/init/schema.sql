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
    value       text PRIMARY KEY,
    current     boolean UNIQUE, -- TRUE or NULL
    description text,
    CHECK (current)             -- current is TRUE or NULL
);

COMMENT ON TABLE public.phase IS 'System phases controlling the course assignment workflow';
COMMENT ON COLUMN public.phase.value IS 'Phase identifier';
COMMENT ON COLUMN public.phase.current IS 'Current phase flag (TRUE or NULL). Constrained to have at most one current phase';
COMMENT ON COLUMN public.phase.description IS 'Summary of activities and permissions during this phase';

CREATE FUNCTION public.clear_current_phase_flag() RETURNS trigger AS
$$
BEGIN
    UPDATE public.phase SET current = NULL WHERE current IS TRUE;
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION clear_current_phase_flag() IS 'Trigger function that clears the current phase flag before a phase is set as current';

CREATE TRIGGER clear_current_phase_flag
    BEFORE UPDATE OF current
    ON public.phase
    FOR EACH ROW
    WHEN (new.current = TRUE)
EXECUTE FUNCTION clear_current_phase_flag();

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
COMMENT ON COLUMN public.year.comment IS 'Additional information about this academic year';

CREATE FUNCTION public.clear_current_year_flag() RETURNS trigger AS
$$
BEGIN
    UPDATE public.year SET current = NULL WHERE current IS TRUE;
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION clear_current_year_flag() IS 'Trigger function that clears the current year flag before a year is set as current';

CREATE TRIGGER clear_current_year_flag
    BEFORE UPDATE OF current
    ON public.year
    FOR EACH ROW
    WHEN (new.current = TRUE)
EXECUTE FUNCTION clear_current_year_flag();


--
-- Teacher-related tables
--

CREATE TABLE public.position
(
    id                 serial PRIMARY KEY,
    label              text NOT NULL UNIQUE,
    description        text,
    base_service_hours real
);

COMMENT ON TABLE public.position IS 'Teaching positions with associated service hour requirements';
COMMENT ON COLUMN public.position.id IS 'Unique position identifier';
COMMENT ON COLUMN public.position.label IS 'Human-readable position name for display purposes, unique';
COMMENT ON COLUMN public.position.base_service_hours IS 'Default annual teaching hours required for this position, can be overridden per teacher';
COMMENT ON COLUMN public.position.description IS 'Optional description of the position';

CREATE TABLE public.teacher
(
    uid                text PRIMARY KEY,
    firstname          text    NOT NULL,
    lastname           text    NOT NULL,
    alias              text,
    displayname        text GENERATED ALWAYS AS (coalesce(alias, firstname || ' ' || lastname)) STORED,
    position_id        integer REFERENCES public.position ON UPDATE CASCADE,
    base_service_hours real,
    visible            boolean NOT NULL DEFAULT TRUE,
    active             boolean NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE public.teacher IS 'Core teacher information and status';
COMMENT ON COLUMN public.teacher.uid IS 'Teacher''s email address (primary key).';
COMMENT ON COLUMN public.teacher.firstname IS 'Teacher''s first name';
COMMENT ON COLUMN public.teacher.lastname IS 'Teacher''s last name';
COMMENT ON COLUMN public.teacher.alias IS 'Optional display name, used instead of first/last name when set';
COMMENT ON COLUMN public.teacher.displayname IS 'Preferred display name, using alias when available, otherwise full name';
COMMENT ON COLUMN public.teacher.position_id IS 'Reference to teacher''s position, determines default service hours';
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
    UNIQUE (year, uid),
    UNIQUE (id, year) -- referenced in requests and priorities to ensure data consistency
);

COMMENT ON TABLE public.service IS 'Annual teaching service records tracking required hours and modifications';
COMMENT ON COLUMN public.service.id IS 'Unique service identifier';
COMMENT ON COLUMN public.service.year IS 'Academic year for this service record';
COMMENT ON COLUMN public.service.uid IS 'Teacher identifier linking to teacher table';
COMMENT ON COLUMN public.service.hours IS 'Required teaching hours for the year before modifications';
COMMENT ON COLUMN public.service.message IS 'Optional message from teacher to course assignment committee';

CREATE TABLE public.service_modification_type
(
    id          serial PRIMARY KEY,
    label       text NOT NULL UNIQUE,
    description text
);

COMMENT ON TABLE public.service_modification_type IS 'Categories of service hour modifications';
COMMENT ON COLUMN public.service_modification_type.id IS 'Unique modification type identifier';
COMMENT ON COLUMN public.service_modification_type.label IS 'Human-readable type name for display purposes, unique';
COMMENT ON COLUMN public.service_modification_type.description IS 'Detailed explanation of the modification type and its application';

CREATE TABLE public.service_modification
(
    id         serial PRIMARY KEY,
    service_id integer NOT NULL REFERENCES public.service ON UPDATE CASCADE,
    type_id    integer NOT NULL REFERENCES public.service_modification_type ON UPDATE CASCADE,
    hours      real    NOT NULL
);

COMMENT ON TABLE public.service_modification IS 'Individual modifications to base teaching service hours';
COMMENT ON COLUMN public.service_modification.id IS 'Unique modification identifier';
COMMENT ON COLUMN public.service_modification.service_id IS 'Reference to affected service record';
COMMENT ON COLUMN public.service_modification.type_id IS 'Reference to service modification type';
COMMENT ON COLUMN public.service_modification.hours IS 'Hour adjustment amount (negative values increase required hours)';

CREATE TABLE public.role_type
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.role_type IS 'System roles for privileged access';
COMMENT ON COLUMN public.role_type.value IS 'Role identifier';
COMMENT ON COLUMN public.role_type.description IS 'Description of the role privileges and responsibilities';

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
    id           serial PRIMARY KEY,
    name         text    NOT NULL UNIQUE,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE public.degree IS 'Academic degrees offered by the institution';
COMMENT ON COLUMN public.degree.id IS 'Unique degree identifier';
COMMENT ON COLUMN public.degree.name IS 'Full degree name, unique (e.g., Bachelor of Science)';
COMMENT ON COLUMN public.degree.name_short IS 'Abbreviated degree name (e.g., BSc)';
COMMENT ON COLUMN public.degree.name_display IS 'Preferred display name, using abbreviated name when available, otherwise full name';
COMMENT ON COLUMN public.degree.visible IS 'Controls degree visibility in the user interface and queries';

CREATE TABLE public.program
(
    id           serial PRIMARY KEY,
    degree_id    integer NOT NULL REFERENCES public.degree ON UPDATE CASCADE,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    UNIQUE (degree_id, name)
);

COMMENT ON TABLE public.program IS 'Academic programs within each degree';
COMMENT ON COLUMN public.program.id IS 'Unique program identifier';
COMMENT ON COLUMN public.program.degree_id IS 'Parent degree for this program';
COMMENT ON COLUMN public.program.name IS 'Full program name, unique within its degree (e.g., Mathematics)';
COMMENT ON COLUMN public.program.name_short IS 'Abbreviated program name';
COMMENT ON COLUMN public.program.name_display IS 'Preferred display name, using abbreviated name when available, otherwise full name';
COMMENT ON COLUMN public.program.visible IS 'Controls program visibility in the user interface and queries';

CREATE TABLE public.track
(
    id           serial PRIMARY KEY,
    program_id   integer NOT NULL REFERENCES public.program ON UPDATE CASCADE,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    UNIQUE (program_id, name),
    UNIQUE (id, program_id) -- referenced in courses to ensure data consistency
);

COMMENT ON TABLE public.track IS 'Specialization tracks within academic programs';
COMMENT ON COLUMN public.track.id IS 'Unique track identifier';
COMMENT ON COLUMN public.track.program_id IS 'Parent program for this track';
COMMENT ON COLUMN public.track.name IS 'Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.)';
COMMENT ON COLUMN public.track.name_short IS 'Abbreviated track name';
COMMENT ON COLUMN public.track.name_display IS 'Preferred display name, using abbreviated name when available, otherwise full name';
COMMENT ON COLUMN public.track.visible IS 'Controls track visibility in the user interface and queries';

CREATE TABLE public.course_type
(
    id          serial PRIMARY KEY,
    label       text NOT NULL UNIQUE,
    coefficient real NOT NULL DEFAULT 1,
    description text
);

COMMENT ON TABLE public.course_type IS 'Types of course delivery with associated workload coefficients';
COMMENT ON COLUMN public.course_type.id IS 'Unique course type identifier';
COMMENT ON COLUMN public.course_type.label IS 'Human-readable type name for display purposes, unique';
COMMENT ON COLUMN public.course_type.coefficient IS 'Workload multiplier for service hour calculations';
COMMENT ON COLUMN public.course_type.description IS 'Description of the course type and its characteristics';

CREATE TABLE public.course
(
    id               serial PRIMARY KEY,
    year             integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    program_id       integer NOT NULL REFERENCES public.program ON UPDATE CASCADE,
    track_id         integer,
    FOREIGN KEY (track_id, program_id) REFERENCES public.track (id, program_id) ON UPDATE CASCADE,
    name             text    NOT NULL,
    name_short       text,
    name_display     text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    semester         integer NOT NULL CHECK (1 <= semester AND semester <= 6),
    type_id          integer NOT NULL REFERENCES public.course_type ON UPDATE CASCADE,
    cycle_year       integer NOT NULL GENERATED ALWAYS AS (ceil(semester / 2.0)) STORED,
    hours            real    NOT NULL CHECK (hours >= 0),
    hours_adjusted   real,
    hours_effective  integer GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED,
    groups           integer NOT NULL CHECK (groups >= 0),
    groups_adjusted  integer,
    groups_effective integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups)) STORED,
    description      text,
    priority_rule    integer          DEFAULT 3 CHECK (priority_rule >= 0), -- 0=: Infinity; NULL: No rule
    visible          boolean NOT NULL DEFAULT TRUE,
    UNIQUE NULLS NOT DISTINCT (year, program_id, track_id, name, semester, type_id)
);

COMMENT ON TABLE public.course IS 'Detailed course definitions and configurations';
COMMENT ON COLUMN public.course.id IS 'Unique course identifier';
COMMENT ON COLUMN public.course.year IS 'Academic year when the course is offered';
COMMENT ON COLUMN public.course.program_id IS 'Program offering this course';
COMMENT ON COLUMN public.course.track_id IS 'Optional track specialization for this course';
COMMENT ON COLUMN public.course.name IS 'Full course name';
COMMENT ON COLUMN public.course.name_short IS 'Abbreviated course name';
COMMENT ON COLUMN public.course.name_display IS 'Preferred display name, using abbreviated name when available, otherwise full name';
COMMENT ON COLUMN public.course.type_id IS 'Reference to course delivery type affecting workload calculation';
COMMENT ON COLUMN public.course.semester IS 'Academic semester (1-6)';
COMMENT ON COLUMN public.course.cycle_year IS 'Computed study year (1-3) based on semester';
COMMENT ON COLUMN public.course.hours IS 'Standard teaching hours per group';
COMMENT ON COLUMN public.course.hours_adjusted IS 'Modified teaching hours per group if different from standard';
COMMENT ON COLUMN public.course.hours_effective IS 'Actual teaching hours used, defaulting to standard if no adjustment';
COMMENT ON COLUMN public.course.groups IS 'Standard number of student groups';
COMMENT ON COLUMN public.course.groups_adjusted IS 'Modified number of groups if different from standard';
COMMENT ON COLUMN public.course.groups_effective IS 'Actual number of groups used, defaulting to standard if no adjustment';
COMMENT ON COLUMN public.course.description IS 'Course description';
COMMENT ON COLUMN public.course.priority_rule IS 'Priority duration in years (3=default, 1=none, 0=permanent, NULL=disabled)';
COMMENT ON COLUMN public.course.visible IS 'Controls course visibility in the user interface and queries';

-- Computed field
CREATE FUNCTION public.total_hours_effective(course_row course) RETURNS real AS
$$
SELECT course_row.hours_effective * course_row.groups_effective;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.total_hours_effective(course) IS 'Calculates total effective teaching hours for a course by multiplying hours_effective by groups_effective';

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
-- Service/Course-related tables
--

CREATE TABLE public.priority
(
    id          serial PRIMARY KEY,
    year        integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    service_id  integer NOT NULL,
    FOREIGN KEY (year, service_id) REFERENCES public.service (year, id) ON UPDATE CASCADE,
    course_id   integer NOT NULL,
    FOREIGN KEY (year, course_id) REFERENCES public.course (year, id) ON UPDATE CASCADE,
    seniority   integer CHECK (seniority >= 0),
    computed    boolean NOT NULL DEFAULT FALSE,
    is_priority boolean,
    UNIQUE (service_id, course_id)
);

COMMENT ON TABLE public.priority IS 'Teacher course assignment history and priority status';
COMMENT ON COLUMN public.priority.id IS 'Unique priority record identifier';
COMMENT ON COLUMN public.priority.service_id IS 'Associated teacher service record';
COMMENT ON COLUMN public.priority.course_id IS 'Course for which priority is tracked';
COMMENT ON COLUMN public.priority.seniority IS 'Consecutive years teaching this course before current year';
COMMENT ON COLUMN public.priority.computed IS 'Flag indicating whether the seniority value was automatically computed rather than manually assigned';
COMMENT ON COLUMN public.priority.is_priority IS 'Current priority status based on seniority and course rules';

CREATE TABLE public.request_type
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.request_type IS 'Types of teaching assignment requests in workflow';
COMMENT ON COLUMN public.request_type.value IS 'Request type identifier';
COMMENT ON COLUMN public.request_type.description IS 'Description of the request type and its purpose';

CREATE TABLE public.request
(
    id         serial PRIMARY KEY,
    year       integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    service_id integer NOT NULL,
    FOREIGN KEY (year, service_id) REFERENCES public.service (year, id) ON UPDATE CASCADE,
    course_id  integer NOT NULL,
    FOREIGN KEY (year, course_id) REFERENCES public.course (year, id) ON UPDATE CASCADE,
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

-- Computed field
CREATE FUNCTION public.hours_weighted(request_row request) RETURNS real AS
$$
SELECT request_row.hours * ct.coefficient
FROM public.course c
         JOIN public.course_type ct ON ct.id = c.type_id
WHERE c.id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.hours_weighted(request) IS 'Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient';

-- Computed field
CREATE FUNCTION public.is_priority(request_row request) RETURNS boolean AS
$$
SELECT is_priority
FROM public.priority
WHERE service_id = request_row.service_id
  AND course_id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.is_priority(request) IS 'Determines the priority status of a request based on teaching history and course priority rules';


--
-- Functions
--

CREATE FUNCTION public.create_service(p_year integer, p_uid text) RETURNS setof service AS
$$
INSERT INTO public.service (year, uid, hours)
SELECT p_year, p_uid, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM public.teacher t
         LEFT JOIN public.position p ON p.id = t.position_id
WHERE t.uid = p_uid
ON CONFLICT (year, uid) DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_service(integer, text) IS 'Creates a new service entry for a specific year and teacher with default base hours, using personal base_service_hours if set and position''s base_service_hours otherwise';

CREATE FUNCTION public.compute_service_priorities(service_row service) RETURNS setof priority AS
$$
DELETE
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;

INSERT INTO public.priority (service_id, course_id, seniority, computed)
SELECT service_row.id, child.id, coalesce(p.seniority, 0) + 1, TRUE
FROM public.service s
         JOIN public.request r ON r.service_id = s.id AND r.type = 'assignment'
         LEFT JOIN public.priority p
                   ON p.service_id = r.service_id AND p.course_id = r.course_id
         JOIN public.course c ON c.id = r.course_id
         JOIN public.course child
              ON child.year = c.year + 1
                  AND child.program_id = c.program_id
                  AND child.track_id = c.track_id
                  AND child.name = c.name
                  AND child.semester = c.semester
                  AND child.type_id = c.type_id
WHERE s.year = service_row.year - 1
  AND s.uid = service_row.uid
ON CONFLICT (service_id, course_id)
    DO UPDATE SET seniority = excluded.seniority
WHERE priority.computed IS TRUE;

UPDATE public.priority p
SET is_priority = (p.seniority > 0 AND (coalesce(c.priority_rule, 0) > p.seniority OR c.priority_rule = 0))
FROM public.course c
WHERE p.service_id = service_row.id
  AND p.course_id = c.id;

SELECT *
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_service_priorities(service) IS 'Computes courses seniority and priority status for a given service based on previous year''s course assignments';

-- Compute Priorities Trigger

CREATE FUNCTION public.compute_service_priorities_trigger() RETURNS trigger AS
$$
BEGIN
    PERFORM public.compute_service_priorities(new);
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.compute_service_priorities_trigger() IS 'Trigger function that computes courses seniority and priority status for newly inserted services';

CREATE TRIGGER compute_service_priorities
    AFTER INSERT
    ON public.service
    FOR EACH ROW
EXECUTE FUNCTION public.compute_service_priorities_trigger();

-- Year Management

CREATE FUNCTION public.create_year_services(p_year integer) RETURNS setof service AS
$$
SELECT s.*
FROM public.teacher t
         CROSS JOIN LATERAL public.create_service(p_year, t.uid) s
WHERE t.active IS TRUE;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.create_year_services(integer) IS 'Creates service entries for all active teachers for a specific year, using personal base_service_hours if set and position''s base_service_hours otherwise';

CREATE FUNCTION public.copy_year_courses(p_year integer) RETURNS setof course AS
$$
INSERT INTO public.course (year, program_id, track_id, name, name_short, semester, type_id, hours, hours_adjusted,
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
WHERE c.year = p_year - 1
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.clone_year_courses(integer) IS 'Creates copies of all courses from the previous year into the specified year';

CREATE FUNCTION public.compute_year_priorities(p_year integer) RETURNS setof priority AS
$$
SELECT p.*
FROM public.service s
         CROSS JOIN LATERAL public.compute_service_priorities(s) p
WHERE s.year = p_year;
$$ LANGUAGE sql;
COMMENT ON FUNCTION public.compute_year_priorities(integer) IS 'Computes seniority and priority status for all services in a given year';


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

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION public.set_timestamp()
    ', target_table, target_table, target_table, target_table);

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
