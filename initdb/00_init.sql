--
-- General tables
--

CREATE TABLE IF NOT EXISTS year
(
    value   integer PRIMARY KEY,
    current boolean UNIQUE,                    -- TRUE or NULL
    visible boolean NOT NULL DEFAULT TRUE,
    CHECK (current),                           -- current is TRUE or NULL
    CHECK (current IS NULL OR visible IS TRUE) -- current year is visible
);

CREATE TABLE IF NOT EXISTS phase
(
    value   text PRIMARY KEY,
    current boolean UNIQUE, -- TRUE or NULL
    CHECK (current)         -- current is TRUE or NULL
);


--
-- Teacher-related tables
--

CREATE TABLE IF NOT EXISTS position
(
    value              text PRIMARY KEY,
    label              text NOT NULL,
    base_service_hours real,
    description        text
);

CREATE TABLE IF NOT EXISTS teacher
(
    uid                text PRIMARY KEY,
    firstname          text    NOT NULL,
    lastname           text    NOT NULL,
    alias              text,
    position           text REFERENCES position ON UPDATE CASCADE,
    base_service_hours real,
    visible            boolean NOT NULL DEFAULT TRUE,
    active             boolean NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS service
(
    id         serial PRIMARY KEY,
    year       integer     NOT NULL REFERENCES year ON UPDATE CASCADE,
    uid        text        NOT NULL REFERENCES teacher ON UPDATE CASCADE,
    base_hours real        NOT NULL,
    message    text,
    created_at timestamptz NOT NULL DEFAULT current_timestamp,
    updated_at timestamptz NOT NULL DEFAULT current_timestamp,
    UNIQUE (year, uid)
);

CREATE OR REPLACE TRIGGER set_timestamp
    BEFORE UPDATE
    ON service
    FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

CREATE TABLE IF NOT EXISTS service_modification_type
(
    value       text PRIMARY KEY,
    label       text NOT NULL,
    description text
);

CREATE TABLE IF NOT EXISTS service_modification
(
    id         serial PRIMARY KEY,
    service_id integer     NOT NULL REFERENCES service ON UPDATE CASCADE,
    type       text        NOT NULL REFERENCES service_modification_type ON UPDATE CASCADE,
    hours      real        NOT NULL,
    created_at timestamptz NOT NULL DEFAULT current_timestamp,
    updated_at timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE OR REPLACE TRIGGER set_timestamp
    BEFORE UPDATE
    ON service_modification
    FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

--
-- Course-related tables
--

CREATE TABLE IF NOT EXISTS degree
(
    id         serial PRIMARY KEY,
    name       text    NOT NULL UNIQUE,
    name_short text,
    visible    boolean NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS program
(
    id         serial PRIMARY KEY,
    degree_id  integer NOT NULL REFERENCES degree ON UPDATE CASCADE,
    name       text    NOT NULL,
    name_short text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (degree_id, name)
);

CREATE TABLE IF NOT EXISTS track
(
    id         serial PRIMARY KEY,
    program_id integer NOT NULL REFERENCES program ON UPDATE CASCADE,
    name       text    NOT NULL,
    name_short text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (program_id, name)
);

CREATE TABLE IF NOT EXISTS course_type
(
    value       text PRIMARY KEY,
    label       text NOT NULL,
    coefficient real NOT NULL DEFAULT 1,
    description text
);

CREATE TABLE IF NOT EXISTS course
(
    id               serial PRIMARY KEY,
    year             integer NOT NULL REFERENCES year ON UPDATE CASCADE,
    program_id       integer NOT NULL REFERENCES program ON UPDATE CASCADE,
    track_id         integer REFERENCES track ON UPDATE CASCADE,
    parent_id        integer REFERENCES course ON UPDATE CASCADE,
    name             text    NOT NULL,
    name_short       text,
    type             text    NOT NULL REFERENCES course_type ON UPDATE CASCADE,
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

CREATE OR REPLACE FUNCTION total_hours_effective(course_row course) RETURNS real AS
$$
SELECT course_row.hours_effective * course_row.groups_effective;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION total_hours_effective(course) IS 'Calculates total effective teaching hours for a course by multiplying hours_effective by groups_effective';

CREATE OR REPLACE FUNCTION check_parent_year() RETURNS trigger AS
$$
DECLARE
    parent_year integer;
BEGIN
    IF new.parent_id IS NOT NULL THEN
        SELECT year
        INTO parent_year
        FROM course
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
COMMENT ON FUNCTION check_parent_year() IS 'Ensures that the parent course''s year is less than the course''s year';

CREATE OR REPLACE TRIGGER check_parent_year
    BEFORE INSERT OR UPDATE OF parent_id, year
    ON course
    FOR EACH ROW
EXECUTE FUNCTION check_parent_year();

CREATE OR REPLACE FUNCTION check_children_year() RETURNS trigger AS
$$
DECLARE
    child_id   integer;
    child_year integer;
BEGIN
    SELECT id, year
    INTO child_id, child_year
    FROM course
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
COMMENT ON FUNCTION check_children_year() IS 'Ensures that child courses'' years are greater than the course''s year';

CREATE OR REPLACE TRIGGER check_children_year
    BEFORE UPDATE OF year
    ON course
    FOR EACH ROW
EXECUTE FUNCTION check_children_year();

CREATE OR REPLACE FUNCTION check_track_program() RETURNS trigger AS
$$
DECLARE
    track_program_id integer;
BEGIN
    IF new.track_id IS NOT NULL THEN
        SELECT program_id
        INTO track_program_id
        FROM track
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
COMMENT ON FUNCTION check_track_program() IS 'Ensures that a course''s track belongs to the course''s program';

CREATE TRIGGER check_track_program
    BEFORE INSERT OR UPDATE OF program_id, track_id
    ON course
    FOR EACH ROW
EXECUTE FUNCTION check_track_program();

CREATE TRIGGER check_track_program_on_track_update
    BEFORE UPDATE OF program_id
    ON track
    FOR EACH ROW
EXECUTE FUNCTION check_track_program();

CREATE TABLE IF NOT EXISTS coordinator
(
    id         serial PRIMARY KEY,
    uid        text NOT NULL REFERENCES teacher ON UPDATE CASCADE,
    program_id integer REFERENCES program ON UPDATE CASCADE,
    track_id   integer REFERENCES track ON UPDATE CASCADE,
    course_id  integer REFERENCES course ON UPDATE CASCADE,
    comment    text,
    UNIQUE NULLS NOT DISTINCT (uid, course_id, track_id, program_id),
    CHECK (num_nonnulls(course_id, track_id, program_id) = 1)
);

--
-- Request-related tables
--

CREATE TABLE IF NOT EXISTS request_type
(
    value text PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS request
(
    id         serial PRIMARY KEY,
    service_id integer     NOT NULL REFERENCES service ON UPDATE CASCADE,
    course_id  integer     NOT NULL REFERENCES course ON UPDATE CASCADE,
    type       text        NOT NULL REFERENCES request_type ON UPDATE CASCADE,
    hours      real        NOT NULL CHECK (hours > 0),
    created_at timestamptz NOT NULL DEFAULT current_timestamp,
    updated_at timestamptz NOT NULL DEFAULT current_timestamp,
    UNIQUE (service_id, course_id, type)
);

CREATE OR REPLACE TRIGGER set_timestamp
    BEFORE UPDATE
    ON request
    FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

CREATE OR REPLACE FUNCTION hours_weighted(request_row request) RETURNS real AS
$$
SELECT r.hours * ct.coefficient
FROM request r
         JOIN course c ON r.course_id = c.id
         JOIN course_type ct ON c.type = ct.value
WHERE r.id = request_row.id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION hours_weighted(request) IS 'Calculates weighted hours for a request by applying the course type coefficient to the requested hours';

CREATE TABLE IF NOT EXISTS priority
(
    id          serial PRIMARY KEY,
    service_id  integer NOT NULL REFERENCES service ON UPDATE CASCADE,
    course_id   integer NOT NULL REFERENCES course ON UPDATE CASCADE,
    seniority   integer CHECK (seniority >= 0),
    is_priority boolean,
    UNIQUE (service_id, course_id)
);

CREATE OR REPLACE FUNCTION is_priority(request_row request) RETURNS boolean AS
$$
SELECT is_priority
FROM priority
WHERE service_id = request_row.service_id
  AND course_id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION is_priority(request) IS 'Determines if a request is prioritized based on teaching history and course priority rules';

CREATE OR REPLACE FUNCTION check_service_course_year() RETURNS trigger AS
$$
DECLARE
    service_year integer;
    course_year  integer;
BEGIN
    SELECT year INTO service_year FROM service WHERE id = new.service_id;
    SELECT year INTO course_year FROM course WHERE id = new.course_id;

    IF service_year != course_year THEN
        RAISE EXCEPTION 'Service year must match course year '
            '(service year: %, course year: %)',
            service_year, course_year;
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION check_service_course_year() IS 'Ensures that service and course years match for requests and priorities';

CREATE TRIGGER check_request_service
    BEFORE INSERT OR UPDATE OF service_id, course_id
    ON request
    FOR EACH ROW
EXECUTE FUNCTION check_service_course_year();

CREATE TRIGGER check_priority_service
    BEFORE INSERT OR UPDATE OF service_id, course_id
    ON priority
    FOR EACH ROW
EXECUTE FUNCTION check_service_course_year();

--
-- Functions
--

CREATE OR REPLACE FUNCTION compute_seniorities(p_service_id integer) RETURNS setof priority AS
$$
WITH service_info AS (SELECT year, uid
                      FROM service
                      WHERE id = p_service_id)
INSERT
INTO priority (service_id, course_id, seniority)
SELECT p_service_id, c.id, coalesce(p.seniority + 1, 1)
FROM course c
         JOIN request r ON r.course_id = c.parent_id AND r.type = 'assignment'
         JOIN service s ON r.service_id = s.id AND s.uid = (SELECT uid FROM service_info)
         LEFT JOIN priority p ON r.service_id = p.service_id AND r.course_id = p.course_id
WHERE c.year = (SELECT year FROM service_info)
ON CONFLICT (service_id, course_id) DO UPDATE
    SET seniority = excluded.seniority
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION compute_seniorities(integer) IS 'Inserts priorities or updates seniority column for a given service based on previous course assignments';

CREATE OR REPLACE FUNCTION compute_priorities(p_service_id integer) RETURNS setof priority AS
$$
UPDATE priority p
SET is_priority = (p.seniority > 0 AND (c.priority_rule > p.seniority OR c.priority_rule = 0))
FROM course c
WHERE p.service_id = p_service_id
  AND c.id = p.course_id
  AND c.priority_rule IS NOT NULL
RETURNING p.*;
$$ LANGUAGE sql;
COMMENT ON FUNCTION compute_priorities(integer) IS 'Updates is_priority column for a given service based on seniority and course priority rules';

CREATE OR REPLACE FUNCTION compute_service_priorities() RETURNS trigger AS
$$
BEGIN
    PERFORM compute_seniorities(new);
    PERFORM compute_priorities(new);
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION compute_service_priorities() IS 'Trigger function that fully computes all priorities for a given service';

CREATE TRIGGER compute_service_priorities
    AFTER INSERT
    ON service
    FOR EACH ROW
EXECUTE FUNCTION compute_service_priorities();

CREATE OR REPLACE FUNCTION create_service(p_year integer, p_uid text) RETURNS service AS
$$
INSERT INTO service (year, uid, base_hours)
SELECT p_year, p_uid, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM teacher t
         JOIN position p ON t.position = p.value
WHERE t.uid = p_uid
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION create_service(integer, text) IS 'Creates a new service entry for a specific year and teacher with default base hours, using personal base_service_hours if set and position''s base_service_hours otherwise';

CREATE OR REPLACE FUNCTION create_services(p_year integer) RETURNS setof service AS
$$
INSERT INTO service (year, uid, base_hours)
SELECT p_year, t.uid, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM teacher t
         JOIN position p ON t.position = p.value
WHERE t.active IS TRUE
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION create_services(integer) IS 'Creates service entries for all active teachers for a specific year, using personal base_service_hours if set and position''s base_service_hours otherwise';

--
-- Timestamps
--

CREATE OR REPLACE FUNCTION set_timestamp() RETURNS trigger AS
$$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION set_timestamp() IS 'Trigger function to automatically update updated_at timestamp column on row updates';


CREATE OR REPLACE FUNCTION add_timestamp_columns(target_table text) RETURNS void AS
$$
BEGIN
    EXECUTE format('
        ALTER TABLE %I 
        ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT current_timestamp,
        ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT current_timestamp
    ', target_table);

    EXECUTE format('
        CREATE OR REPLACE TRIGGER set_timestamp
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION set_timestamp()
    ', target_table);

    RAISE NOTICE 'Added timestamp columns and trigger to table: %', target_table;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION add_timestamp_columns(text) IS 'Adds created_at and updated_at timestamp columns to the specified table, along with an automatic update trigger for updated_at';

CREATE OR REPLACE FUNCTION add_timestamp_columns_to_all_tables() RETURNS void AS
$$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        LOOP
            PERFORM add_timestamp_columns(table_name);
        END LOOP;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION add_timestamp_columns_to_all_tables() IS 'Adds created_at and updated_at timestamp columns to all tables in the public schema, along with an automatic update trigger for updated_at';

SELECT add_timestamp_columns_to_all_tables();

--
-- Comments
--

-- General tables
COMMENT ON TABLE year IS 'Table containing different academic years.';
COMMENT ON COLUMN year.value IS 'Year number (unique).';
COMMENT ON COLUMN year.current IS 'Indicates if this is the current year (TRUE) or not (NULL). Only one year can be current at a time.';
COMMENT ON COLUMN year.visible IS 'Indicates if the year is visible to users.';

COMMENT ON TABLE phase IS 'Table containing the different phases: requests, assignments, results, and shutdown.';
COMMENT ON COLUMN phase.value IS 'Phase identifier.';
COMMENT ON COLUMN phase.current IS 'Indicates if this is the current phase (TRUE) or not (NULL). Only one phase can be current at a time.';

-- Teacher-related tables
COMMENT ON TABLE position IS 'Table containing different teaching positions.';
COMMENT ON COLUMN position.value IS 'Position name (unique).';
COMMENT ON COLUMN position.label IS 'Display label for this position.';
COMMENT ON COLUMN position.base_service_hours IS 'Default annual teaching service hours required for this position.';
COMMENT ON COLUMN position.description IS 'Brief description.';

COMMENT ON TABLE teacher IS 'Table containing teacher information.';
COMMENT ON COLUMN teacher.uid IS 'Unique identifier for the teacher. Must be an email.';
COMMENT ON COLUMN teacher.firstname IS 'Teacher''s first name.';
COMMENT ON COLUMN teacher.lastname IS 'Teacher''s last name.';
COMMENT ON COLUMN teacher.alias IS 'Optional display alias instead of first and last name.';
COMMENT ON COLUMN teacher.position IS 'Teacher''s position.';
COMMENT ON COLUMN teacher.base_service_hours IS 'Teacher''s annual teaching service hours requirement. If set, this overrides the default value from their position.';
COMMENT ON COLUMN teacher.visible IS 'Indicates if the teacher is visible to users.';
COMMENT ON COLUMN teacher.active IS 'Indicates if the teacher is currently active. Controls both application access and whether a service should be automatically created for the next year.';

COMMENT ON TABLE service IS 'Table containing base services, i.e. the number of teaching hours a teacher must fulfill in a given year before any modifications.';
COMMENT ON COLUMN service.id IS 'Unique identifier for the service.';
COMMENT ON COLUMN service.year IS 'Academic year of the service.';
COMMENT ON COLUMN service.uid IS 'Teacher''s identifier for this service.';
COMMENT ON COLUMN service.base_hours IS 'Base number of teaching hours.';
COMMENT ON COLUMN service.message IS 'Optional message from the teacher to the course assignment commission.';
COMMENT ON COLUMN service.created_at IS 'Timestamp of when the modification was created.';
COMMENT ON COLUMN service.updated_at IS 'Timestamp of when the modification was last updated.';

COMMENT ON TABLE service_modification_type IS 'Table containing different types of service modifications.';
COMMENT ON COLUMN service_modification_type.value IS 'Modification type (unique).';
COMMENT ON COLUMN service_modification_type.label IS 'Display label for the modification type.';
COMMENT ON COLUMN service_modification_type.description IS 'Brief description.';

COMMENT ON TABLE service_modification IS 'Table containing modifications to a teacher''s base service for a given year.';
COMMENT ON COLUMN service_modification.id IS 'Unique identifier for the modification.';
COMMENT ON COLUMN service_modification.service_id IS 'Reference to the service being modified. Links the modification to a specific teacher''s service for a given year.';
COMMENT ON COLUMN service_modification.type IS 'Type of modification.';
COMMENT ON COLUMN service_modification.hours IS 'Number of hours by which the service is modified (negative number indicates service increase).';
COMMENT ON COLUMN service_modification.created_at IS 'Timestamp of when the modification was created.';
COMMENT ON COLUMN service_modification.updated_at IS 'Timestamp of when the modification was last updated.';

-- Course-related tables
COMMENT ON TABLE degree IS 'Table containing different degrees (bachelor, master, etc.).';
COMMENT ON COLUMN degree.id IS 'Unique identifier for the degree.';
COMMENT ON COLUMN degree.name IS 'Degree name (unique).';
COMMENT ON COLUMN degree.name_short IS 'Abbreviated name.';
COMMENT ON COLUMN degree.visible IS 'Indicates if the degree is visible to users.';

COMMENT ON TABLE program IS 'Table containing different programs (mathematics, computer science, etc.).';
COMMENT ON COLUMN program.id IS 'Unique identifier for the program.';
COMMENT ON COLUMN program.degree_id IS 'Associated degree ID.';
COMMENT ON COLUMN program.name IS 'Program name (unique within degree).';
COMMENT ON COLUMN program.name_short IS 'Abbreviated name.';
COMMENT ON COLUMN program.visible IS 'Indicates if the program is visible to users.';

COMMENT ON TABLE track IS 'Table containing different tracks within programs.';
COMMENT ON COLUMN track.id IS 'Unique identifier for the track.';
COMMENT ON COLUMN track.program_id IS 'Associated program ID.';
COMMENT ON COLUMN track.name IS 'Track name (unique within program).';
COMMENT ON COLUMN track.name_short IS 'Abbreviated name.';
COMMENT ON COLUMN track.visible IS 'Indicates if the track is visible to users.';

COMMENT ON TABLE course_type IS 'Table containing different course types (lecture, tutorial, etc.).';
COMMENT ON COLUMN course_type.value IS 'Course type (unique).';
COMMENT ON COLUMN course_type.label IS 'Display label for the course type.';
COMMENT ON COLUMN course_type.coefficient IS 'Multiplicative coefficient applied to teaching hours for service calculations.';
COMMENT ON COLUMN course_type.description IS 'Brief description.';

COMMENT ON TABLE course IS 'Table containing courses.';
COMMENT ON COLUMN course.id IS 'Unique identifier for the course.';
COMMENT ON COLUMN course.year IS 'Academic year of the course.';
COMMENT ON COLUMN course.program_id IS 'Associated program ID.';
COMMENT ON COLUMN course.track_id IS 'Associated track ID (optional).';
COMMENT ON COLUMN course.parent_id IS 'ID of parent course (same course from previous year).';
COMMENT ON COLUMN course.name IS 'Course name.';
COMMENT ON COLUMN course.name_short IS 'Abbreviated name.';
COMMENT ON COLUMN course.type IS 'Course type.';
COMMENT ON COLUMN course.semester IS 'Semester number (1-6).';
COMMENT ON COLUMN course.cycle_year IS 'Academic cycle year (automatically calculated from semester: S1/S2 -> 1; S3/S4 -> 2; S5/S6 -> 3).';
COMMENT ON COLUMN course.hours IS 'Teaching hours per group.';
COMMENT ON COLUMN course.hours_adjusted IS 'Adjusted teaching hours per group (if different from initial hours).';
COMMENT ON COLUMN course.hours_effective IS 'Actual number of teaching hours per group, using hours_adjusted if set, otherwise using the initial hours value.';
COMMENT ON COLUMN course.groups IS 'Number of groups.';
COMMENT ON COLUMN course.groups_adjusted IS 'Adjusted number of groups (if different from initial groups).';
COMMENT ON COLUMN course.groups_effective IS 'Actual number of groups, using groups_adjusted if set, otherwise using the initial groups value.';
COMMENT ON COLUMN course.description IS 'Course description.';
COMMENT ON COLUMN course.priority_rule IS 'Priority rule (optional): number of years a teacher has priority for this course (3 by default; 1 for no year-to-year priority; 0 for unlimited priority).';
COMMENT ON COLUMN course.visible IS 'Indicates if the course is visible to users.';

COMMENT ON TABLE coordinator IS 'Table containing coordinators of programs, tracks, or courses. Each row corresponds to exactly one of these three types of responsibility.';
COMMENT ON COLUMN coordinator.id IS 'Unique identifier for the coordinator entry.';
COMMENT ON COLUMN coordinator.uid IS 'Teacher''s identifier.';
COMMENT ON COLUMN coordinator.program_id IS 'Program ID (optional, if and only if the row corresponds to program coordination).';
COMMENT ON COLUMN coordinator.track_id IS 'Track ID (optional, if and only if the row corresponds to track coordination).';
COMMENT ON COLUMN coordinator.course_id IS 'Course ID (optional, if and only if the row corresponds to course coordination).';
COMMENT ON COLUMN coordinator.comment IS 'Additional information (optional, e.g., to specify year for program or track coordination).';

-- Request-related tables
COMMENT ON TABLE request_type IS 'Table containing different types of teaching requests: primary (first choice), secondary (backup choice), and assignment (final allocation).';
COMMENT ON COLUMN request_type.value IS 'Request type (unique).';

COMMENT ON TABLE request IS 'Table containing teaching requests.';
COMMENT ON COLUMN request.id IS 'Unique identifier for the request.';
COMMENT ON COLUMN request.service_id IS 'Associated service ID.';
COMMENT ON COLUMN request.course_id IS 'Associated course ID.';
COMMENT ON COLUMN request.type IS 'Request type.';
COMMENT ON COLUMN request.hours IS 'Requested teaching hours.';
COMMENT ON COLUMN request.created_at IS 'Timestamp of when the modification was created.';
COMMENT ON COLUMN request.updated_at IS 'Timestamp of when the modification was last updated.';

COMMENT ON TABLE priority IS 'Table containing information about teacher seniority and priority for courses.';
COMMENT ON COLUMN priority.id IS 'Unique identifier for the priority entry.';
COMMENT ON COLUMN priority.service_id IS 'Associated service ID.';
COMMENT ON COLUMN priority.course_id IS 'Associated course ID.';
COMMENT ON COLUMN priority.seniority IS 'Number of consecutive years up to the current year (excluded) during which the course was assigned to the teacher.';
COMMENT ON COLUMN priority.is_priority IS 'Indicates if the teacher has priority for this course.';
