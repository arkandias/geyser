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

CREATE OR REPLACE FUNCTION set_timestamp() RETURNS trigger AS
$$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql;

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
    year       integer     NOT NULL REFERENCES year ON UPDATE CASCADE,
    uid        text        NOT NULL REFERENCES teacher ON UPDATE CASCADE,
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
    id          serial PRIMARY KEY,
    degree_id   integer NOT NULL REFERENCES degree ON UPDATE CASCADE,
    name        text    NOT NULL,
    name_short  text,
    name_import text,
    visible     boolean NOT NULL DEFAULT TRUE,
    UNIQUE (degree_id, name)
);

CREATE TABLE IF NOT EXISTS track
(
    id          serial PRIMARY KEY,
    program_id  integer NOT NULL REFERENCES program ON UPDATE CASCADE,
    name        text    NOT NULL,
    name_short  text,
    name_import text,
    visible     boolean NOT NULL DEFAULT TRUE,
    UNIQUE (program_id, name)
);

CREATE TABLE IF NOT EXISTS course_type
(
    value       text PRIMARY KEY,
    label       text NOT NULL,
    weight      real NOT NULL DEFAULT 1,
    description text
);

CREATE TABLE IF NOT EXISTS course
(
    id                  serial PRIMARY KEY,
    ens_id_import       text UNIQUE,
    formation_id_import text,
    year                integer NOT NULL REFERENCES year ON UPDATE CASCADE,
    program_id          integer NOT NULL REFERENCES program ON UPDATE CASCADE,
    track_id            integer REFERENCES track ON UPDATE CASCADE,
    parent_id           integer REFERENCES course ON UPDATE CASCADE,
    name                text    NOT NULL,
    name_short          text,
    name_import         text,
    type                text    NOT NULL REFERENCES course_type ON UPDATE CASCADE,
    semester            integer NOT NULL CHECK (1 <= semester AND semester <= 6),
    cycle_year          integer NOT NULL GENERATED ALWAYS AS (ceil(semester / 2.0)) STORED,
    hours               real    NOT NULL CHECK (hours >= 0),
    hours_adjusted      real CHECK (0 <= hours_adjusted AND hours_adjusted < hours),
    hours_effective     integer GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED,
    groups              integer NOT NULL CHECK (groups >= 0),
    groups_adjusted     integer CHECK (0 <= groups_adjusted AND groups_adjusted < groups),
    groups_effective    integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups)) STORED,
    description         text,
    priority_rule       integer          DEFAULT 3 CHECK (priority_rule >= 0), -- 0=: Infinity; NULL: No rule
    visible             boolean NOT NULL DEFAULT TRUE,
    UNIQUE (year, program_id, track_id, name, semester, type)
);

CREATE OR REPLACE FUNCTION total_hours_effective(course_row course) RETURNS real AS
$$
SELECT course_row.hours_effective * course_row.groups_effective;
$$ LANGUAGE sql STABLE;

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
SELECT r.hours * ct.weight
FROM request r
         JOIN course c ON r.course_id = c.id
         JOIN course_type ct ON c.type = ct.value
WHERE r.id = request_row.id;
$$ LANGUAGE sql STABLE;

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

CREATE OR REPLACE FUNCTION compute_service_priorities() RETURNS trigger AS
$$
BEGIN
    PERFORM compute_seniorities(new);
    PERFORM compute_priorities(new);
    RETURN new;
END;
$$ LANGUAGE plpgsql;

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
