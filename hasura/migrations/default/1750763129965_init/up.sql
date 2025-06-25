--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', FALSE);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: add_timestamp_columns(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.add_timestamp_columns(p_table text) RETURNS void
    LANGUAGE plpgsql
AS
$$
BEGIN
    EXECUTE format('
        ALTER TABLE public.%I
        ADD COLUMN created_at timestamptz NOT NULL DEFAULT current_timestamp,
        ADD COLUMN updated_at timestamptz NOT NULL DEFAULT current_timestamp;

        COMMENT ON COLUMN public.%I.created_at IS ''Timestamp when the record was created'';
        COMMENT ON COLUMN public.%I.updated_at IS ''Timestamp when the record was last updated, automatically managed by trigger'';

        CREATE TRIGGER %s_before_update_set_timestamp_trigger
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION public.set_timestamp_trigger_fn();
    ', p_table, p_table, p_table, p_table, p_table);

    RAISE NOTICE 'Added created_at and updated_at columns to table %', p_table;
END;
$$;


--
-- Name: FUNCTION add_timestamp_columns(p_table text); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.add_timestamp_columns(p_table text) IS 'Adds created_at and updated_at timestamp columns to the specified table, along with an automatic update trigger for updated_at';


--
-- Name: add_timestamp_columns_to_all_tables(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.add_timestamp_columns_to_all_tables() RETURNS void
    LANGUAGE plpgsql
AS
$$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
          AND tablename NOT IN ('phase', 'request_type', 'role')
        LOOP
            PERFORM public.add_timestamp_columns(table_name);
        END LOOP;
END;
$$;


--
-- Name: FUNCTION add_timestamp_columns_to_all_tables(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.add_timestamp_columns_to_all_tables() IS 'Adds created_at and updated_at timestamp columns to all tables in the public schema, along with an automatic update trigger for updated_at';


--
-- Name: clear_current_year_flag_trigger_fn(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.clear_current_year_flag_trigger_fn() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
BEGIN
    UPDATE public.year
    SET current = FALSE
    WHERE oid = new.oid
      AND current IS TRUE;
    RETURN new;
END;
$$;


--
-- Name: FUNCTION clear_current_year_flag_trigger_fn(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.clear_current_year_flag_trigger_fn() IS 'Trigger function that clears the current year flag before a year is set as current';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: priority; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.priority
(
    oid         integer                                            NOT NULL,
    id          integer                                            NOT NULL,
    year        integer                                            NOT NULL,
    service_id  integer                                            NOT NULL,
    course_id   integer                                            NOT NULL,
    seniority   integer,
    is_priority boolean,
    computed    boolean                  DEFAULT FALSE             NOT NULL,
    created_at  timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at  timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT priority_seniority_non_negative_check CHECK ((seniority >= 0))
);


--
-- Name: TABLE priority; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.priority IS 'Teacher course assignments';


--
-- Name: COLUMN priority.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.oid IS 'Organization reference';


--
-- Name: COLUMN priority.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.id IS 'Unique identifier';


--
-- Name: COLUMN priority.year; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.year IS 'Academic year reference';


--
-- Name: COLUMN priority.service_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.service_id IS 'Teacher''s service reference';


--
-- Name: COLUMN priority.course_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.course_id IS 'Course reference';


--
-- Name: COLUMN priority.seniority; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.seniority IS 'Number of consecutive years teaching this course before current year';


--
-- Name: COLUMN priority.is_priority; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.is_priority IS 'Current priority status based on seniority and course rules';


--
-- Name: COLUMN priority.computed; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.computed IS 'Indicates if seniority was computed automatically';


--
-- Name: COLUMN priority.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN priority.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.priority.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service
(
    oid        integer                                            NOT NULL,
    id         integer                                            NOT NULL,
    year       integer                                            NOT NULL,
    teacher_id integer                                            NOT NULL,
    hours      real                                               NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT service_hours_non_negative CHECK ((hours >= (0)::double precision))
);


--
-- Name: TABLE service; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.service IS 'Annual teaching service records';


--
-- Name: COLUMN service.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.oid IS 'Organization reference';


--
-- Name: COLUMN service.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.id IS 'Unique identifier';


--
-- Name: COLUMN service.year; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.year IS 'Academic year reference';


--
-- Name: COLUMN service.teacher_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.teacher_id IS 'Teacher reference';


--
-- Name: COLUMN service.hours; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.hours IS 'Required teaching hours before modifications';


--
-- Name: COLUMN service.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN service.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: compute_service_priorities(public.service); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.compute_service_priorities(service_row public.service) RETURNS setof public.priority
    LANGUAGE sql
AS
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
WHERE p.computed IS TRUE
  AND p.service_id = service_row.id
  AND p.course_id = c.id
  AND c.priority_rule IS NOT NULL;

SELECT *
FROM public.priority
WHERE service_id = service_row.id
  AND computed IS TRUE;
$$;


--
-- Name: FUNCTION compute_service_priorities(service_row public.service); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.compute_service_priorities(service_row public.service) IS 'Computes courses seniority and priority status for a given service based on previous year''s course assignments';


--
-- Name: compute_service_priorities_trigger_fn(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.compute_service_priorities_trigger_fn() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
BEGIN
    PERFORM public.compute_service_priorities(new);
    RETURN new;
END;
$$;


--
-- Name: FUNCTION compute_service_priorities_trigger_fn(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.compute_service_priorities_trigger_fn() IS 'Trigger function that computes courses seniority and priority status for newly inserted services';


--
-- Name: compute_year_priorities(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.compute_year_priorities(p_year integer) RETURNS setof public.priority
    LANGUAGE plpgsql
AS
$$
DECLARE
    session_variables json;
    org_id            text;
BEGIN
    session_variables := current_setting('hasura.user', 't');
    org_id := session_variables ->> 'x-hasura-org-id';

    SELECT p.*
    FROM public.service s
             CROSS JOIN LATERAL public.compute_service_priorities(s) p
    WHERE s.oid = org_id
      AND s.year = p_year;
END
$$;


--
-- Name: FUNCTION compute_year_priorities(p_year integer); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.compute_year_priorities(p_year integer) IS 'Computes seniority and priority status for all services in a given year';


--
-- Name: course; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.course
(
    oid                 integer                                                                NOT NULL,
    id                  integer                                                                NOT NULL,
    year                integer                                                                NOT NULL,
    program_id          integer                                                                NOT NULL,
    track_id            integer,
    name                text                                                                   NOT NULL,
    name_short          text,
    name_display        text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    semester            integer                                                                NOT NULL,
    type_id             integer                                                                NOT NULL,
    cycle_year          integer GENERATED ALWAYS AS (ceil(((semester)::numeric / 2.0))) STORED NOT NULL,
    hours               real                                                                   NOT NULL,
    hours_adjusted      real,
    hours_effective     integer GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED,
    groups              integer                                                                NOT NULL,
    groups_adjusted     integer,
    groups_effective    integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups)) STORED,
    description         text,
    priority_rule       integer,
    visible             boolean                  DEFAULT TRUE                                  NOT NULL,
    created_at          timestamp with time zone DEFAULT current_timestamp                     NOT NULL,
    updated_at          timestamp with time zone DEFAULT current_timestamp                     NOT NULL,
    ens_id_import       text,
    formation_id_import text,
    nom_import          text,
    CONSTRAINT course_groups_non_negative_check CHECK ((groups >= 0)),
    CONSTRAINT course_hours_non_negative_check CHECK ((hours >= (0)::double precision)),
    CONSTRAINT course_priority_rule_non_negative_check CHECK ((priority_rule >= 0)),
    CONSTRAINT course_semester_check CHECK (((1 <= semester) AND (semester <= 6)))
);


--
-- Name: TABLE course; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.course IS 'Course definitions and configurations';


--
-- Name: COLUMN course.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.oid IS 'Organization reference';


--
-- Name: COLUMN course.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.id IS 'Unique identifier';


--
-- Name: COLUMN course.year; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.year IS 'Academic year reference';


--
-- Name: COLUMN course.program_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.program_id IS 'Program reference';


--
-- Name: COLUMN course.track_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.track_id IS 'Optional track reference';


--
-- Name: COLUMN course.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.name IS 'Full name';


--
-- Name: COLUMN course.name_short; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.name_short IS 'Abbreviated name';


--
-- Name: COLUMN course.name_display; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.name_display IS 'Computed display name';


--
-- Name: COLUMN course.semester; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.semester IS 'Academic semester';


--
-- Name: COLUMN course.type_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.type_id IS 'Course type reference';


--
-- Name: COLUMN course.cycle_year; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.cycle_year IS 'Computed study year (1-3) based on semester';


--
-- Name: COLUMN course.hours; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.hours IS 'Base number of teaching hours per group';


--
-- Name: COLUMN course.hours_adjusted; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.hours_adjusted IS 'Modified number of teaching hours per group, if different from base';


--
-- Name: COLUMN course.hours_effective; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.hours_effective IS 'Actual number of teaching hours per group, defaulting to base if no adjustment';


--
-- Name: COLUMN course.groups; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.groups IS 'Base number of groups';


--
-- Name: COLUMN course.groups_adjusted; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.groups_adjusted IS 'Modified number of groups, if different from base';


--
-- Name: COLUMN course.groups_effective; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.groups_effective IS 'Actual number of groups, defaulting to base if no adjustment';


--
-- Name: COLUMN course.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.description IS 'Optional description';


--
-- Name: COLUMN course.priority_rule; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.priority_rule IS 'Priority duration in years (1=none, 0=permanent, NULL=disabled)';


--
-- Name: COLUMN course.visible; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.visible IS 'Controls visibility to teachers';


--
-- Name: COLUMN course.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN course.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: copy_year_courses(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.copy_year_courses(p_year integer) RETURNS setof public.course
    LANGUAGE plpgsql
AS
$$
DECLARE
    session_variables json;
    org_id            text;
BEGIN
    session_variables := current_setting('hasura.user', 't');
    org_id := session_variables ->> 'x-hasura-org-id';

    RETURN QUERY
        INSERT INTO public.course (oid, year, program_id, track_id, name, name_short, semester, type_id, hours,
                                   hours_adjusted, groups, groups_adjusted, description, priority_rule, visible)
            SELECT org_id,
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
            WHERE c.oid = org_id
              AND c.year = p_year - 1
            ON CONFLICT (oid, year, program_id, track_id, name, semester, type_id) DO NOTHING
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
                      AND c_new.name = c_old.name
                      AND c_new.semester = c_old.semester
                      AND c_new.type_id = c_old.type_id
    WHERE coord.oid = org_id
      AND c_old.year = p_year - 1
      AND coord.course_id IS NOT NULL
    ON CONFLICT (oid, teacher_id, course_id, track_id, program_id) DO NOTHING;
END
$$;


--
-- Name: FUNCTION copy_year_courses(p_year integer); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.copy_year_courses(p_year integer) IS 'Creates copies of all courses from the previous year into the specified year';


--
-- Name: copy_year_services(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.copy_year_services(p_year integer) RETURNS setof public.service
    LANGUAGE plpgsql
AS
$$
DECLARE
    session_variables json;
    org_id            text;
BEGIN
    session_variables := current_setting('hasura.user', 't');
    org_id := session_variables ->> 'x-hasura-org-id';

    INSERT INTO public.service (oid, year, teacher_id, hours)
    SELECT org_id, p_year, s.teacher_id, s.hours
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
$$;


--
-- Name: FUNCTION copy_year_services(p_year integer); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.copy_year_services(p_year integer) IS 'Creates copies of active teacher services from the previous year into the specified year';


--
-- Name: create_teacher_service(integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.create_teacher_service(p_year integer, p_teacher_id integer) RETURNS setof public.service
    LANGUAGE sql
AS
$$
INSERT INTO public.service (oid, year, teacher_id, hours)
SELECT t.oid, p_year, p_teacher_id, coalesce(t.base_service_hours, p.base_service_hours, 0)
FROM public.teacher t
         LEFT JOIN public.position p
                   ON p.oid = t.oid
                       AND p.id = t.position_id
WHERE t.id = p_teacher_id
  AND t.active IS TRUE
ON CONFLICT (oid, year, teacher_id) DO NOTHING
RETURNING *;
$$;


--
-- Name: FUNCTION create_teacher_service(p_year integer, p_teacher_id integer); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.create_teacher_service(p_year integer, p_teacher_id integer) IS 'Creates service entry for teacher with default hours from position or personal override';


--
-- Name: create_year_services(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.create_year_services(p_year integer) RETURNS setof public.service
    LANGUAGE plpgsql
AS
$$
DECLARE
    session_variables json;
    org_id            text;
BEGIN
    session_variables := current_setting('hasura.user', 't');
    org_id := session_variables ->> 'x-hasura-org-id';

    SELECT s.*
    FROM public.teacher t
             CROSS JOIN LATERAL public.create_teacher_service(org_id, p_year, t.id) s
    WHERE t.oid = org_id
      AND t.active IS TRUE;
END
$$;


--
-- Name: FUNCTION create_year_services(p_year integer); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.create_year_services(p_year integer) IS 'Creates service entries for all active teachers in organization for specified year';


--
-- Name: app_setting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.app_setting
(
    oid        integer                                            NOT NULL,
    key        text                                               NOT NULL,
    value      text                                               NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE app_setting; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.app_setting IS 'Application settings (e.g., custom UI parameters)';


--
-- Name: COLUMN app_setting.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_setting.oid IS 'Organization reference';


--
-- Name: COLUMN app_setting.key; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_setting.key IS 'Setting name (unique)';


--
-- Name: COLUMN app_setting.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_setting.value IS 'Setting value';


--
-- Name: COLUMN app_setting.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_setting.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN app_setting.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_setting.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: dummy_function(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.dummy_function() RETURNS setof public.app_setting
    LANGUAGE sql
AS
$$
SELECT *
FROM public.app_setting
WHERE FALSE;
$$;


--
-- Name: FUNCTION dummy_function(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.dummy_function() IS 'Dummy function that does nothing (used by GraphQL clients)';


--
-- Name: request; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.request
(
    oid        integer                                            NOT NULL,
    id         integer                                            NOT NULL,
    year       integer                                            NOT NULL,
    service_id integer                                            NOT NULL,
    course_id  integer                                            NOT NULL,
    type       text                                               NOT NULL,
    hours      real                                               NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT request_hours_positive_check CHECK ((hours > (0)::double precision))
);


--
-- Name: TABLE request; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.request IS 'Teacher requests and assignments for courses';


--
-- Name: COLUMN request.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.oid IS 'Organization reference';


--
-- Name: COLUMN request.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.id IS 'Unique identifier';


--
-- Name: COLUMN request.year; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.year IS 'Academic year reference';


--
-- Name: COLUMN request.service_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.service_id IS 'Teacher''s service reference';


--
-- Name: COLUMN request.course_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.course_id IS 'Course reference';


--
-- Name: COLUMN request.type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.type IS 'Request type reference';


--
-- Name: COLUMN request.hours; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.hours IS 'Number of requested or assigned teaching hours';


--
-- Name: COLUMN request.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN request.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: request_hours_weighted(public.request); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.request_hours_weighted(request_row public.request) RETURNS real
    LANGUAGE sql
    STABLE
AS
$$
SELECT request_row.hours * ct.coefficient
FROM public.course c
         JOIN public.course_type ct
              ON ct.id = c.type_id
WHERE c.id = request_row.course_id;
$$;


--
-- Name: FUNCTION request_hours_weighted(request_row public.request); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.request_hours_weighted(request_row public.request) IS 'Calculates a request''s weighted hours by multiplying the request''s hours with the course type coefficient';


--
-- Name: request_is_priority(public.request); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.request_is_priority(request_row public.request) RETURNS boolean
    LANGUAGE sql
    STABLE
AS
$$
SELECT is_priority
FROM public.priority
WHERE oid = request_row.oid
  AND service_id = request_row.service_id
  AND course_id = request_row.course_id;
$$;


--
-- Name: FUNCTION request_is_priority(request_row public.request); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.request_is_priority(request_row public.request) IS 'Determines a request''s priority status based on the priority table';


--
-- Name: set_timestamp_trigger_fn(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.set_timestamp_trigger_fn() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$;


--
-- Name: FUNCTION set_timestamp_trigger_fn(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.set_timestamp_trigger_fn() IS 'Trigger function to automatically update updated_at timestamp column on row updates';


--
-- Name: coordination; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coordination
(
    oid        integer                                            NOT NULL,
    id         integer                                            NOT NULL,
    teacher_id integer                                            NOT NULL,
    program_id integer,
    track_id   integer,
    course_id  integer,
    comment    text,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT coordination_exclusive_type_check CHECK ((num_nonnulls(course_id, track_id, program_id) = 1))
);


--
-- Name: TABLE coordination; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.coordination IS 'Academic coordination assignments at program, track, or course level';


--
-- Name: COLUMN coordination.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.oid IS 'Organization reference';


--
-- Name: COLUMN coordination.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.id IS 'Unique identifier';


--
-- Name: COLUMN coordination.teacher_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.teacher_id IS 'Teacher reference';


--
-- Name: COLUMN coordination.program_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.program_id IS 'Program reference (mutually exclusive with track_id and course_id)';


--
-- Name: COLUMN coordination.track_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.track_id IS 'Track reference (mutually exclusive with program_id and course_id)';


--
-- Name: COLUMN coordination.course_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.course_id IS 'Course reference (mutually exclusive with program_id and track_id)';


--
-- Name: COLUMN coordination.comment; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.comment IS 'Additional information about this coordination';


--
-- Name: COLUMN coordination.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN coordination.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.coordination.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: coordination_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.coordination
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.coordination_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.course
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.course_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: course_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.course_type
(
    oid         integer                                            NOT NULL,
    id          integer                                            NOT NULL,
    label       text                                               NOT NULL,
    coefficient real                     DEFAULT 1                 NOT NULL,
    description text,
    created_at  timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at  timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE course_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.course_type IS 'Categories of courses';


--
-- Name: COLUMN course_type.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.oid IS 'Organization reference';


--
-- Name: COLUMN course_type.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.id IS 'Unique identifier';


--
-- Name: COLUMN course_type.label; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.label IS 'Course type name (unique)';


--
-- Name: COLUMN course_type.coefficient; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.coefficient IS 'Workload multiplier for service hours calculations';


--
-- Name: COLUMN course_type.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.description IS 'Optional description';


--
-- Name: COLUMN course_type.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN course_type.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.course_type.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: course_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.course_type
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.course_type_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: current_phase; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.current_phase
(
    oid        integer                                            NOT NULL,
    value      text                                               NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE current_phase; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.current_phase IS 'Current active phase for each organization';


--
-- Name: COLUMN current_phase.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.current_phase.oid IS 'Organization reference';


--
-- Name: COLUMN current_phase.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.current_phase.value IS 'Active phase reference';


--
-- Name: COLUMN current_phase.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.current_phase.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN current_phase.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.current_phase.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: degree; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.degree
(
    oid          integer                                            NOT NULL,
    id           integer                                            NOT NULL,
    name         text                                               NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean                  DEFAULT TRUE              NOT NULL,
    created_at   timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at   timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE degree; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.degree IS 'Academic degrees offered by the institution';


--
-- Name: COLUMN degree.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.oid IS 'Organization reference';


--
-- Name: COLUMN degree.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.id IS 'Unique identifier';


--
-- Name: COLUMN degree.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.name IS 'Full name, unique (e.g., Bachelor of Science)';


--
-- Name: COLUMN degree.name_short; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.name_short IS 'Abbreviated name (e.g., BSc)';


--
-- Name: COLUMN degree.name_display; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.name_display IS 'Computed display name';


--
-- Name: COLUMN degree.visible; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.visible IS 'Controls visibility to teachers';


--
-- Name: COLUMN degree.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN degree.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.degree.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: degree_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.degree
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.degree_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: locale; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locale
(
    value       text NOT NULL,
    description text
);


--
-- Name: TABLE locale; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.locale IS 'Locales implemented in the web client';


--
-- Name: COLUMN locale.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.locale.value IS 'Unique identifier';


--
-- Name: COLUMN locale.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.locale.description IS 'Short description';


--
-- Name: message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.message
(
    oid        integer                                            NOT NULL,
    id         integer                                            NOT NULL,
    service_id integer                                            NOT NULL,
    content    text                                               NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE message; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.message IS 'Messages to the assignment committee';


--
-- Name: COLUMN message.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.message.oid IS 'Organization reference';


--
-- Name: COLUMN message.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.message.id IS 'Unique identifier';


--
-- Name: COLUMN message.service_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.message.service_id IS 'Service reference';


--
-- Name: COLUMN message.content; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.message.content IS 'Message content';


--
-- Name: COLUMN message.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.message.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN message.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.message.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.message
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.message_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: organization; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization
(
    id         integer                                            NOT NULL,
    key        text                                               NOT NULL,
    label      text                                               NOT NULL,
    sublabel   text,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    email      text                                               NOT NULL,
    active     boolean                  DEFAULT TRUE,
    locale     text                     DEFAULT 'fr-FR'::text     NOT NULL
);


--
-- Name: TABLE organization; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.organization IS 'Organization information';


--
-- Name: COLUMN organization.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.organization.id IS 'Unique identifier';


--
-- Name: COLUMN organization.key; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.organization.key IS 'Human-readable identifier (unique)';


--
-- Name: COLUMN organization.label; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.organization.label IS 'Label for display purposes';


--
-- Name: COLUMN organization.sublabel; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.organization.sublabel IS 'Sublabel for display purposes';


--
-- Name: COLUMN organization.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.organization.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN organization.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.organization.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.organization
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.organization_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: phase; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.phase
(
    value       text NOT NULL,
    description text
);


--
-- Name: TABLE phase; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.phase IS 'Workflow phases that control system access and capabilities within an organization';


--
-- Name: COLUMN phase.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.phase.value IS 'Unique identifier';


--
-- Name: COLUMN phase.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.phase.description IS 'Short description';


--
-- Name: position; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."position"
(
    oid                integer                                            NOT NULL,
    id                 integer                                            NOT NULL,
    label              text                                               NOT NULL,
    description        text,
    base_service_hours real,
    created_at         timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at         timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT position_base_service_hours_non_negative CHECK ((base_service_hours >= (0)::double precision))
);


--
-- Name: TABLE "position"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public."position" IS 'Teaching positions with associated service hour requirements';


--
-- Name: COLUMN "position".oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".oid IS 'Organization reference';


--
-- Name: COLUMN "position".id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".id IS 'Unique identifier';


--
-- Name: COLUMN "position".label; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".label IS 'Position name (unique)';


--
-- Name: COLUMN "position".description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".description IS 'Optional description';


--
-- Name: COLUMN "position".base_service_hours; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".base_service_hours IS 'Default annual teaching hours';


--
-- Name: COLUMN "position".created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN "position".updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."position".updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: position_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."position"
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.position_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: priority_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.priority
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.priority_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: program; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.program
(
    oid          integer                                            NOT NULL,
    id           integer                                            NOT NULL,
    degree_id    integer                                            NOT NULL,
    name         text                                               NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean                  DEFAULT TRUE              NOT NULL,
    created_at   timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at   timestamp with time zone DEFAULT current_timestamp NOT NULL,
    nom_import   text
);


--
-- Name: TABLE program; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.program IS 'Academic programs within each degree';


--
-- Name: COLUMN program.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.oid IS 'Organization reference';


--
-- Name: COLUMN program.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.id IS 'Unique identifier';


--
-- Name: COLUMN program.degree_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.degree_id IS 'Degree reference';


--
-- Name: COLUMN program.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.name IS 'Full name, unique within degree (e.g., Mathematics)';


--
-- Name: COLUMN program.name_short; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.name_short IS 'Abbreviated name';


--
-- Name: COLUMN program.name_display; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.name_display IS 'Computed display name';


--
-- Name: COLUMN program.visible; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.visible IS 'Controls visibility to teachers';


--
-- Name: COLUMN program.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN program.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.program.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: program_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.program
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.program_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.request
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.request_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: request_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.request_type
(
    value       text NOT NULL,
    description text
);


--
-- Name: TABLE request_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.request_type IS 'Course request types that categorize teacher-course relationships';


--
-- Name: COLUMN request_type.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request_type.value IS 'Unique identifier';


--
-- Name: COLUMN request_type.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.request_type.description IS 'Short description';


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role
(
    value       text NOT NULL,
    description text
);


--
-- Name: TABLE role; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.role IS 'User roles that determine system access and capabilities within an organization';


--
-- Name: COLUMN role.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.role.value IS 'Unique identifier';


--
-- Name: COLUMN role.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.role.description IS 'Short description';


--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.service
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.service_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: service_modification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service_modification
(
    oid        integer                                            NOT NULL,
    id         integer                                            NOT NULL,
    service_id integer                                            NOT NULL,
    type_id    integer                                            NOT NULL,
    hours      real                                               NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE service_modification; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.service_modification IS 'Individual modifications to base teaching service hours';


--
-- Name: COLUMN service_modification.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.oid IS 'Organization reference';


--
-- Name: COLUMN service_modification.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.id IS 'Unique identifier';


--
-- Name: COLUMN service_modification.service_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.service_id IS 'Service reference';


--
-- Name: COLUMN service_modification.type_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.type_id IS 'Modification type reference';


--
-- Name: COLUMN service_modification.hours; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.hours IS 'Hour deduction amount';


--
-- Name: COLUMN service_modification.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN service_modification.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: service_modification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.service_modification
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.service_modification_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: service_modification_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service_modification_type
(
    oid         integer                                            NOT NULL,
    id          integer                                            NOT NULL,
    label       text                                               NOT NULL,
    description text,
    created_at  timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at  timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE service_modification_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.service_modification_type IS 'Categories of service modifications';


--
-- Name: COLUMN service_modification_type.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification_type.oid IS 'Organization reference';


--
-- Name: COLUMN service_modification_type.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification_type.id IS 'Unique identifier';


--
-- Name: COLUMN service_modification_type.label; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification_type.label IS 'Modification type name (unique)';


--
-- Name: COLUMN service_modification_type.description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification_type.description IS 'Optional description';


--
-- Name: COLUMN service_modification_type.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification_type.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN service_modification_type.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.service_modification_type.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: service_modification_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.service_modification_type
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.service_modification_type_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teacher
(
    oid                integer                                            NOT NULL,
    id                 integer                                            NOT NULL,
    email              text                                               NOT NULL,
    firstname          text                                               NOT NULL,
    lastname           text                                               NOT NULL,
    alias              text,
    displayname        text GENERATED ALWAYS AS ((((firstname || ' '::text) || lastname) ||
                                                  coalesce(((' ('::text || alias) || ')'::text), ''::text))) STORED,
    position_id        integer,
    base_service_hours real,
    visible            boolean                  DEFAULT TRUE              NOT NULL,
    active             boolean                  DEFAULT TRUE              NOT NULL,
    access             boolean                  DEFAULT TRUE              NOT NULL,
    created_at         timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at         timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT teacher_base_service_hours_non_negative CHECK ((base_service_hours >= (0)::double precision))
);


--
-- Name: TABLE teacher; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.teacher IS 'Teachers information and status';


--
-- Name: COLUMN teacher.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.oid IS 'Organization reference';


--
-- Name: COLUMN teacher.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.id IS 'Unique identifier';


--
-- Name: COLUMN teacher.email; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.email IS 'Teacher''s email address (unique)';


--
-- Name: COLUMN teacher.firstname; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.firstname IS 'Teacher''s first name';


--
-- Name: COLUMN teacher.lastname; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.lastname IS 'Teacher''s last name';


--
-- Name: COLUMN teacher.alias; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.alias IS 'Optional alias';


--
-- Name: COLUMN teacher.displayname; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.displayname IS 'Computed display name';


--
-- Name: COLUMN teacher.position_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.position_id IS 'Teacher''s position reference';


--
-- Name: COLUMN teacher.base_service_hours; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.base_service_hours IS 'Individual teaching hour override';


--
-- Name: COLUMN teacher.visible; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.visible IS 'Controls visibility to other teachers';


--
-- Name: COLUMN teacher.active; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.active IS 'Controls automatic service creation for upcoming years';


--
-- Name: COLUMN teacher.access; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.access IS 'Controls teacher login access';


--
-- Name: COLUMN teacher.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN teacher.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.teacher
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.teacher_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: teacher_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teacher_role
(
    oid        integer                                            NOT NULL,
    id         integer                                            NOT NULL,
    teacher_id integer                                            NOT NULL,
    role       text                                               NOT NULL,
    comment    text,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL
);


--
-- Name: TABLE teacher_role; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.teacher_role IS 'Teacher role assignments';


--
-- Name: COLUMN teacher_role.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.oid IS 'Organization reference';


--
-- Name: COLUMN teacher_role.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.id IS 'Unique identifier';


--
-- Name: COLUMN teacher_role.teacher_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.teacher_id IS 'Teacher reference';


--
-- Name: COLUMN teacher_role.role; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.role IS 'Role reference';


--
-- Name: COLUMN teacher_role.comment; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.comment IS 'Additional information about this assignment';


--
-- Name: COLUMN teacher_role.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN teacher_role.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.teacher_role.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: teacher_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.teacher_role
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.teacher_role_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: track; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.track
(
    oid          integer                                            NOT NULL,
    id           integer                                            NOT NULL,
    program_id   integer                                            NOT NULL,
    name         text                                               NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean                  DEFAULT TRUE              NOT NULL,
    created_at   timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at   timestamp with time zone DEFAULT current_timestamp NOT NULL,
    nom_import   text
);


--
-- Name: TABLE track; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.track IS 'Specialization tracks within academic programs';


--
-- Name: COLUMN track.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.oid IS 'Organization reference';


--
-- Name: COLUMN track.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.id IS 'Unique identifier';


--
-- Name: COLUMN track.program_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.program_id IS 'Program reference';


--
-- Name: COLUMN track.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.name IS 'Full name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.)';


--
-- Name: COLUMN track.name_short; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.name_short IS 'Abbreviated name';


--
-- Name: COLUMN track.name_display; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.name_display IS 'Computed display name';


--
-- Name: COLUMN track.visible; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.visible IS 'Controls visibility to teachers';


--
-- Name: COLUMN track.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN track.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.track.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: track_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.track
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
        SEQUENCE NAME public.track_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        );


--
-- Name: year; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.year
(
    oid        integer                                            NOT NULL,
    value      integer                                            NOT NULL,
    current    boolean                  DEFAULT FALSE             NOT NULL,
    visible    boolean                  DEFAULT TRUE              NOT NULL,
    created_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    updated_at timestamp with time zone DEFAULT current_timestamp NOT NULL,
    CONSTRAINT year_current_visible_check CHECK (((NOT current) OR visible))
);


--
-- Name: TABLE year; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.year IS 'Academic years with current year designation and visibility control';


--
-- Name: COLUMN year.oid; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.year.oid IS 'Organization reference';


--
-- Name: COLUMN year.value; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.year.value IS 'Academic year identifier, unique (e.g., 2025 for 2025-2026)';


--
-- Name: COLUMN year.current; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.year.current IS 'Current year flag';


--
-- Name: COLUMN year.visible; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.year.visible IS 'Controls visibility to teachers';


--
-- Name: COLUMN year.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.year.created_at IS 'Timestamp when the record was created';


--
-- Name: COLUMN year.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.year.updated_at IS 'Timestamp when the record was last updated, automatically managed by trigger';


--
-- Name: app_setting app_setting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_setting
    ADD CONSTRAINT app_setting_pkey PRIMARY KEY (oid, key);


--
-- Name: coordination coordination_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_id_key UNIQUE (id);


--
-- Name: coordination coordination_oid_teacher_id_course_id_track_id_program_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_oid_teacher_id_course_id_track_id_program_id_key UNIQUE NULLS NOT DISTINCT (oid, teacher_id, course_id, track_id, program_id);


--
-- Name: coordination coordination_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_pkey PRIMARY KEY (oid, id);


--
-- Name: course course_ens_id_import_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_ens_id_import_key UNIQUE (ens_id_import);


--
-- Name: course course_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_id_key UNIQUE (id);


--
-- Name: course course_oid_id_year_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_id_year_key UNIQUE (oid, id, year);


--
-- Name: course course_oid_year_program_id_track_id_name_semester_type_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_year_program_id_track_id_name_semester_type_id_key UNIQUE NULLS NOT DISTINCT (oid, year, program_id, track_id, name, semester, type_id);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (oid, id);


--
-- Name: course_type course_type_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_type
    ADD CONSTRAINT course_type_id_key UNIQUE (id);


--
-- Name: course_type course_type_oid_label_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_type
    ADD CONSTRAINT course_type_oid_label_key UNIQUE (oid, label);


--
-- Name: course_type course_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_type
    ADD CONSTRAINT course_type_pkey PRIMARY KEY (oid, id);


--
-- Name: current_phase current_phase_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.current_phase
    ADD CONSTRAINT current_phase_pkey PRIMARY KEY (oid);


--
-- Name: degree degree_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.degree
    ADD CONSTRAINT degree_id_key UNIQUE (id);


--
-- Name: degree degree_oid_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.degree
    ADD CONSTRAINT degree_oid_name_key UNIQUE (oid, name);


--
-- Name: degree degree_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.degree
    ADD CONSTRAINT degree_pkey PRIMARY KEY (oid, id);


--
-- Name: locale locale_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locale
    ADD CONSTRAINT locale_pkey PRIMARY KEY (value);


--
-- Name: message message_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_id_key UNIQUE (id);


--
-- Name: message message_oid_service_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_oid_service_id_key UNIQUE (oid, service_id);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (oid, id);


--
-- Name: organization organization_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_key_key UNIQUE (key);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: phase phase_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.phase
    ADD CONSTRAINT phase_pkey PRIMARY KEY (value);


--
-- Name: position position_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_id_key UNIQUE (id);


--
-- Name: position position_oid_label_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_oid_label_key UNIQUE (oid, label);


--
-- Name: position position_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (oid, id);


--
-- Name: priority priority_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_id_key UNIQUE (id);


--
-- Name: priority priority_oid_service_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_oid_service_id_course_id_key UNIQUE (oid, service_id, course_id);


--
-- Name: priority priority_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_pkey PRIMARY KEY (oid, id);


--
-- Name: program program_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_id_key UNIQUE (id);


--
-- Name: program program_oid_degree_id_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_oid_degree_id_name_key UNIQUE (oid, degree_id, name);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (oid, id);


--
-- Name: request request_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_id_key UNIQUE (id);


--
-- Name: request request_oid_service_id_course_id_type_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_oid_service_id_course_id_type_key UNIQUE (oid, service_id, course_id, type);


--
-- Name: request request_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_pkey PRIMARY KEY (oid, id);


--
-- Name: request_type request_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request_type
    ADD CONSTRAINT request_type_pkey PRIMARY KEY (value);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (value);


--
-- Name: service service_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_id_key UNIQUE (id);


--
-- Name: service_modification service_modification_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification
    ADD CONSTRAINT service_modification_id_key UNIQUE (id);


--
-- Name: service_modification service_modification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification
    ADD CONSTRAINT service_modification_pkey PRIMARY KEY (oid, id);


--
-- Name: service_modification_type service_modification_type_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification_type
    ADD CONSTRAINT service_modification_type_id_key UNIQUE (id);


--
-- Name: service_modification_type service_modification_type_oid_label_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification_type
    ADD CONSTRAINT service_modification_type_oid_label_key UNIQUE (oid, label);


--
-- Name: service_modification_type service_modification_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification_type
    ADD CONSTRAINT service_modification_type_pkey PRIMARY KEY (oid, id);


--
-- Name: service service_oid_id_year_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_oid_id_year_key UNIQUE (oid, id, year);


--
-- Name: service service_oid_year_teacher_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_oid_year_teacher_id_key UNIQUE (oid, year, teacher_id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (oid, id);


--
-- Name: teacher teacher_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_id_key UNIQUE (id);


--
-- Name: teacher teacher_oid_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_oid_email_key UNIQUE (oid, email);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (oid, id);


--
-- Name: teacher_role teacher_role_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher_role
    ADD CONSTRAINT teacher_role_id_key UNIQUE (id);


--
-- Name: teacher_role teacher_role_oid_teacher_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher_role
    ADD CONSTRAINT teacher_role_oid_teacher_id_role_key UNIQUE (oid, teacher_id, role);


--
-- Name: teacher_role teacher_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher_role
    ADD CONSTRAINT teacher_role_pkey PRIMARY KEY (oid, id);


--
-- Name: track track_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_id_key UNIQUE (id);


--
-- Name: track track_oid_program_id_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_oid_program_id_id_key UNIQUE (oid, program_id, id);


--
-- Name: track track_oid_program_id_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_oid_program_id_name_key UNIQUE (oid, program_id, name);


--
-- Name: track track_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_pkey PRIMARY KEY (oid, id);


--
-- Name: year year_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.year
    ADD CONSTRAINT year_pkey PRIMARY KEY (oid, value);


--
-- Name: idx_app_setting_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_app_setting_oid ON public.app_setting USING btree (oid);


--
-- Name: idx_coordination_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_coordination_oid ON public.coordination USING btree (oid);


--
-- Name: idx_coordination_oid_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_coordination_oid_course_id ON public.coordination USING btree (oid, course_id);


--
-- Name: idx_coordination_oid_program_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_coordination_oid_program_id ON public.coordination USING btree (oid, program_id);


--
-- Name: idx_coordination_oid_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_coordination_oid_teacher_id ON public.coordination USING btree (oid, teacher_id);


--
-- Name: idx_coordination_oid_track_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_coordination_oid_track_id ON public.coordination USING btree (oid, track_id);


--
-- Name: idx_course_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_course_oid ON public.course USING btree (oid);


--
-- Name: idx_course_oid_program_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_course_oid_program_id ON public.course USING btree (oid, program_id);


--
-- Name: idx_course_oid_track_id_program_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_course_oid_track_id_program_id ON public.course USING btree (oid, track_id, program_id);


--
-- Name: idx_course_oid_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_course_oid_type_id ON public.course USING btree (oid, type_id);


--
-- Name: idx_course_oid_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_course_oid_year ON public.course USING btree (oid, year);


--
-- Name: idx_course_type_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_course_type_oid ON public.course_type USING btree (oid);


--
-- Name: idx_current_phase_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_current_phase_oid ON public.current_phase USING btree (oid);


--
-- Name: idx_current_phase_value; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_current_phase_value ON public.current_phase USING btree (value);


--
-- Name: idx_degree_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_degree_oid ON public.degree USING btree (oid);


--
-- Name: idx_message_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_message_oid ON public.message USING btree (oid);


--
-- Name: idx_message_oid_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_message_oid_service_id ON public.message USING btree (oid, service_id);


--
-- Name: idx_position_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_position_oid ON public."position" USING btree (oid);


--
-- Name: idx_priority_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_priority_oid ON public.priority USING btree (oid);


--
-- Name: idx_priority_oid_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_priority_oid_year ON public.priority USING btree (oid, year);


--
-- Name: idx_priority_oid_year_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_priority_oid_year_course_id ON public.priority USING btree (oid, year, course_id);


--
-- Name: idx_priority_oid_year_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_priority_oid_year_service_id ON public.priority USING btree (oid, year, service_id);


--
-- Name: idx_program_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_program_oid ON public.program USING btree (oid);


--
-- Name: idx_program_oid_degree_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_program_oid_degree_id ON public.program USING btree (oid, degree_id);


--
-- Name: idx_request_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid ON public.request USING btree (oid);


--
-- Name: idx_request_oid_course_id_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid_course_id_type ON public.request USING btree (oid, year, course_id, type);


--
-- Name: idx_request_oid_service_id_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid_service_id_type ON public.request USING btree (oid, year, service_id, type);


--
-- Name: idx_request_oid_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid_year ON public.request USING btree (oid, year);


--
-- Name: idx_request_oid_year_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid_year_course_id ON public.request USING btree (oid, year, course_id);


--
-- Name: idx_request_oid_year_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid_year_service_id ON public.request USING btree (oid, year, service_id);


--
-- Name: idx_request_oid_year_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_oid_year_type ON public.request USING btree (oid, year, type);


--
-- Name: idx_request_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_request_type ON public.request USING btree (type);


--
-- Name: idx_service_modification_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_modification_oid ON public.service_modification USING btree (oid);


--
-- Name: idx_service_modification_oid_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_modification_oid_service_id ON public.service_modification USING btree (oid, service_id);


--
-- Name: idx_service_modification_oid_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_modification_oid_type_id ON public.service_modification USING btree (oid, type_id);


--
-- Name: idx_service_modification_type_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_modification_type_oid ON public.service_modification_type USING btree (oid);


--
-- Name: idx_service_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_oid ON public.service USING btree (oid);


--
-- Name: idx_service_oid_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_oid_teacher_id ON public.service USING btree (oid, teacher_id);


--
-- Name: idx_service_oid_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_service_oid_year ON public.service USING btree (oid, year);


--
-- Name: idx_teacher_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teacher_oid ON public.teacher USING btree (oid);


--
-- Name: idx_teacher_oid_position_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teacher_oid_position_id ON public.teacher USING btree (oid, position_id);


--
-- Name: idx_teacher_role_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teacher_role_oid ON public.teacher_role USING btree (oid);


--
-- Name: idx_teacher_role_oid_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teacher_role_oid_teacher_id ON public.teacher_role USING btree (oid, teacher_id);


--
-- Name: idx_teacher_role_role; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teacher_role_role ON public.teacher_role USING btree (role);


--
-- Name: idx_track_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_track_oid ON public.track USING btree (oid);


--
-- Name: idx_track_oid_program_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_track_oid_program_id ON public.track USING btree (oid, program_id);


--
-- Name: idx_year_oid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_year_oid ON public.year USING btree (oid);


--
-- Name: unique_current_year; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX unique_current_year ON public.year USING btree (oid, current) WHERE (current = TRUE);


--
-- Name: app_setting app_setting_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER app_setting_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.app_setting
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: coordination coordination_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER coordination_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.coordination
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: course course_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER course_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.course
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: course_type course_type_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER course_type_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.course_type
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: current_phase current_phase_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER current_phase_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.current_phase
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: degree degree_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER degree_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.degree
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: message message_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER message_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.message
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: organization organization_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER organization_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.organization
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: position position_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER position_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public."position"
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: priority priority_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER priority_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.priority
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: program program_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER program_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.program
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: request request_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER request_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.request
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: service service_after_insert_compute_priorities_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER service_after_insert_compute_priorities_trigger
    AFTER INSERT
    ON public.service
    FOR EACH ROW
EXECUTE FUNCTION public.compute_service_priorities_trigger_fn();


--
-- Name: service service_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER service_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.service
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: service_modification service_modification_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER service_modification_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.service_modification
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: service_modification_type service_modification_type_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER service_modification_type_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.service_modification_type
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: teacher teacher_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER teacher_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.teacher
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: teacher_role teacher_role_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER teacher_role_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.teacher_role
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: track track_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER track_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.track
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: year year_before_update_clear_current_flag_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER year_before_update_clear_current_flag_trigger
    BEFORE UPDATE OF current
    ON public.year
    FOR EACH ROW
    WHEN ((new.current = TRUE))
EXECUTE FUNCTION public.clear_current_year_flag_trigger_fn();


--
-- Name: year year_before_update_set_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER year_before_update_set_timestamp_trigger
    BEFORE UPDATE
    ON public.year
    FOR EACH ROW
EXECUTE FUNCTION public.set_timestamp_trigger_fn();


--
-- Name: app_setting app_setting_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_setting
    ADD CONSTRAINT app_setting_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: coordination coordination_oid_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_oid_course_id_fkey FOREIGN KEY (oid, course_id) REFERENCES public.course (oid, id) ON UPDATE CASCADE;


--
-- Name: coordination coordination_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: coordination coordination_oid_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_oid_program_id_fkey FOREIGN KEY (oid, program_id) REFERENCES public.program (oid, id) ON UPDATE CASCADE;


--
-- Name: coordination coordination_oid_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_oid_teacher_id_fkey FOREIGN KEY (oid, teacher_id) REFERENCES public.teacher (oid, id) ON UPDATE CASCADE;


--
-- Name: coordination coordination_oid_track_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coordination
    ADD CONSTRAINT coordination_oid_track_id_fkey FOREIGN KEY (oid, track_id) REFERENCES public.track (oid, id) ON UPDATE CASCADE;


--
-- Name: course course_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: course course_oid_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_program_id_fkey FOREIGN KEY (oid, program_id) REFERENCES public.program (oid, id) ON UPDATE CASCADE;


--
-- Name: course course_oid_program_id_track_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_program_id_track_id_fkey FOREIGN KEY (oid, program_id, track_id) REFERENCES public.track (oid, program_id, id) ON UPDATE CASCADE;


--
-- Name: course course_oid_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_type_id_fkey FOREIGN KEY (oid, type_id) REFERENCES public.course_type (oid, id) ON UPDATE CASCADE;


--
-- Name: course course_oid_year_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_oid_year_fkey FOREIGN KEY (oid, year) REFERENCES public.year (oid, value) ON UPDATE CASCADE;


--
-- Name: course_type course_type_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_type
    ADD CONSTRAINT course_type_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: current_phase current_phase_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.current_phase
    ADD CONSTRAINT current_phase_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: current_phase current_phase_value_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.current_phase
    ADD CONSTRAINT current_phase_value_fkey FOREIGN KEY (value) REFERENCES public.phase (value) ON UPDATE CASCADE;


--
-- Name: degree degree_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.degree
    ADD CONSTRAINT degree_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: message message_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: message message_oid_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_oid_service_id_fkey FOREIGN KEY (oid, service_id) REFERENCES public.service (oid, id) ON UPDATE CASCADE;


--
-- Name: organization organization_locale_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_locale_fkey FOREIGN KEY (locale) REFERENCES public.locale (value) ON UPDATE CASCADE;


--
-- Name: position position_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: priority priority_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: priority priority_oid_year_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_oid_year_course_id_fkey FOREIGN KEY (oid, year, course_id) REFERENCES public.course (oid, year, id) ON UPDATE CASCADE;


--
-- Name: priority priority_oid_year_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_oid_year_fkey FOREIGN KEY (oid, year) REFERENCES public.year (oid, value) ON UPDATE CASCADE;


--
-- Name: priority priority_oid_year_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_oid_year_service_id_fkey FOREIGN KEY (oid, year, service_id) REFERENCES public.service (oid, year, id) ON UPDATE CASCADE;


--
-- Name: program program_oid_degree_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_oid_degree_id_fkey FOREIGN KEY (oid, degree_id) REFERENCES public.degree (oid, id) ON UPDATE CASCADE;


--
-- Name: program program_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: request request_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: request request_oid_year_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_oid_year_course_id_fkey FOREIGN KEY (oid, year, course_id) REFERENCES public.course (oid, year, id) ON UPDATE CASCADE;


--
-- Name: request request_oid_year_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_oid_year_fkey FOREIGN KEY (oid, year) REFERENCES public.year (oid, value) ON UPDATE CASCADE;


--
-- Name: request request_oid_year_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_oid_year_service_id_fkey FOREIGN KEY (oid, year, service_id) REFERENCES public.service (oid, year, id) ON UPDATE CASCADE;


--
-- Name: request request_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_type_fkey FOREIGN KEY (type) REFERENCES public.request_type (value) ON UPDATE CASCADE;


--
-- Name: service_modification service_modification_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification
    ADD CONSTRAINT service_modification_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: service_modification service_modification_oid_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification
    ADD CONSTRAINT service_modification_oid_service_id_fkey FOREIGN KEY (oid, service_id) REFERENCES public.service (oid, id) ON UPDATE CASCADE;


--
-- Name: service_modification service_modification_oid_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification
    ADD CONSTRAINT service_modification_oid_type_id_fkey FOREIGN KEY (oid, type_id) REFERENCES public.service_modification_type (oid, id) ON UPDATE CASCADE;


--
-- Name: service_modification_type service_modification_type_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_modification_type
    ADD CONSTRAINT service_modification_type_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: service service_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: service service_oid_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_oid_teacher_id_fkey FOREIGN KEY (oid, teacher_id) REFERENCES public.teacher (oid, id) ON UPDATE CASCADE;


--
-- Name: service service_oid_year_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_oid_year_fkey FOREIGN KEY (oid, year) REFERENCES public.year (oid, value) ON UPDATE CASCADE;


--
-- Name: teacher teacher_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: teacher teacher_oid_position_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_oid_position_id_fkey FOREIGN KEY (oid, position_id) REFERENCES public."position" (oid, id) ON UPDATE CASCADE;


--
-- Name: teacher_role teacher_role_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher_role
    ADD CONSTRAINT teacher_role_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: teacher_role teacher_role_oid_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher_role
    ADD CONSTRAINT teacher_role_oid_teacher_id_fkey FOREIGN KEY (oid, teacher_id) REFERENCES public.teacher (oid, id) ON UPDATE CASCADE;


--
-- Name: teacher_role teacher_role_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teacher_role
    ADD CONSTRAINT teacher_role_role_fkey FOREIGN KEY (role) REFERENCES public.role (value) ON UPDATE CASCADE;


--
-- Name: track track_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- Name: track track_oid_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_oid_program_id_fkey FOREIGN KEY (oid, program_id) REFERENCES public.program (oid, id) ON UPDATE CASCADE;


--
-- Name: year year_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.year
    ADD CONSTRAINT year_oid_fkey FOREIGN KEY (oid) REFERENCES public.organization (id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--


--
-- Insert default data for enum tables
--

INSERT INTO public.locale(value, description)
VALUES ('fr-FR', 'French'),
       ('en-EN', 'English');

INSERT INTO public.phase(value, description)
VALUES ('requests',
        'Teachers submit their teaching preferences by making primary and secondary course requests. They can also update their required teaching hours and leave a message to the assignment committee.'),
       ('assignments',
        'The course assignment committee reviews requests and makes final teaching assignments. Meanwhile, teachers can view but not modify their requests.'),
       ('results',
        'Teachers can view their final course assignments.'),
       ('shutdown',
        'System is temporarily closed, typically between academic years or during maintenance periods.');

INSERT INTO public.role(value, description)
VALUES ('organizer', 'Administrator with full permissions within an organization'),
       ('commissioner', 'Committee member with extra permissions during assignment phase'),
       ('teacher', 'Standard user with basic permissions');

INSERT INTO public.request_type(value, description)
VALUES ('assignment', 'Final course assignment made by the committee during the assignments phase'),
       ('primary', 'Teacher''s preferred course choice submitted during the requests phase'),
       ('secondary', 'Teacher''s backup course choice submitted during the requests phase');

