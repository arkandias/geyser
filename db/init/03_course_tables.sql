CREATE TABLE public.degree
(
    oid          integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id           integer UNIQUE GENERATED ALWAYS AS IDENTITY,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY (oid, id),
    UNIQUE (oid, name)
);
CREATE INDEX idx_degree_oid ON public.degree (oid);

COMMENT ON TABLE public.degree IS 'Academic degrees offered by the institution';
COMMENT ON COLUMN public.degree.oid IS 'Organization reference';
COMMENT ON COLUMN public.degree.id IS 'Unique identifier';
COMMENT ON COLUMN public.degree.name IS 'Full name, unique (e.g., Bachelor of Science)';
COMMENT ON COLUMN public.degree.name_short IS 'Abbreviated name (e.g., BSc)';
COMMENT ON COLUMN public.degree.name_display IS 'Computed display name';
COMMENT ON COLUMN public.degree.visible IS 'Controls visibility to teachers';

CREATE TABLE public.program
(
    oid          integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id           integer UNIQUE GENERATED ALWAYS AS IDENTITY,
    degree_id    integer NOT NULL,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, degree_id) REFERENCES public.degree ON UPDATE CASCADE,
    UNIQUE (oid, degree_id, name)
);
CREATE INDEX idx_program_oid ON public.program (oid);
CREATE INDEX idx_program_oid_degree_id ON public.program (oid, degree_id);

COMMENT ON TABLE public.program IS 'Academic programs within each degree';
COMMENT ON COLUMN public.program.oid IS 'Organization reference';
COMMENT ON COLUMN public.program.id IS 'Unique identifier';
COMMENT ON COLUMN public.program.degree_id IS 'Degree reference';
COMMENT ON COLUMN public.program.name IS 'Full name, unique within degree (e.g., Mathematics)';
COMMENT ON COLUMN public.program.name_short IS 'Abbreviated name';
COMMENT ON COLUMN public.program.name_display IS 'Computed display name';
COMMENT ON COLUMN public.program.visible IS 'Controls visibility to teachers';

CREATE TABLE public.track
(
    oid          integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id           integer UNIQUE GENERATED ALWAYS AS IDENTITY,
    program_id   integer NOT NULL,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, program_id) REFERENCES public.program ON UPDATE CASCADE,
    UNIQUE (oid, program_id, name),
    UNIQUE (oid, id, program_id) -- referenced in courses to ensure data consistency
);
CREATE INDEX idx_track_oid ON public.track (oid);
CREATE INDEX idx_track_oid_program_id ON public.track (oid, program_id);

COMMENT ON TABLE public.track IS 'Specialization tracks within academic programs';
COMMENT ON COLUMN public.track.oid IS 'Organization reference';
COMMENT ON COLUMN public.track.id IS 'Unique identifier';
COMMENT ON COLUMN public.track.program_id IS 'Program reference';
COMMENT ON COLUMN public.track.name IS 'Full name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.)';
COMMENT ON COLUMN public.track.name_short IS 'Abbreviated name';
COMMENT ON COLUMN public.track.name_display IS 'Computed display name';
COMMENT ON COLUMN public.track.visible IS 'Controls visibility to teachers';

CREATE TABLE public.course_type
(
    oid         integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id          integer UNIQUE GENERATED ALWAYS AS IDENTITY,
    label       text    NOT NULL,
    coefficient real    NOT NULL DEFAULT 1,
    description text,
    PRIMARY KEY (oid, id),
    UNIQUE (oid, label)
);
CREATE INDEX idx_course_type_oid ON public.course_type (oid);

COMMENT ON TABLE public.course_type IS 'Categories of courses';
COMMENT ON COLUMN public.course_type.oid IS 'Organization reference';
COMMENT ON COLUMN public.course_type.id IS 'Unique identifier';
COMMENT ON COLUMN public.course_type.label IS 'Course type name (unique)';
COMMENT ON COLUMN public.course_type.coefficient IS 'Workload multiplier for service hours calculations';
COMMENT ON COLUMN public.course_type.description IS 'Optional description';

CREATE TABLE public.course
(
    oid              integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id               integer UNIQUE GENERATED ALWAYS AS IDENTITY,
    year             integer NOT NULL,
    program_id       integer NOT NULL,
    track_id         integer,
    name             text    NOT NULL,
    name_short       text,
    name_display     text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    semester         integer NOT NULL CHECK (1 <= semester AND semester <= 6),
    type_id          integer NOT NULL,
    cycle_year       integer NOT NULL GENERATED ALWAYS AS (ceil(semester / 2.0)) STORED,
    hours            real    NOT NULL,
    hours_adjusted   real,
    hours_effective  integer GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED,
    groups           integer NOT NULL,
    groups_adjusted  integer,
    groups_effective integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups)) STORED,
    description      text,
    priority_rule    integer, -- 0=: Infinity; NULL: No rule
    visible          boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, year) REFERENCES public.year ON UPDATE CASCADE,
    FOREIGN KEY (oid, program_id) REFERENCES public.program ON UPDATE CASCADE,
    FOREIGN KEY (oid, track_id, program_id) REFERENCES public.track (oid, id, program_id) ON UPDATE CASCADE,
    FOREIGN KEY (oid, type_id) REFERENCES public.course_type ON UPDATE CASCADE,
    UNIQUE NULLS NOT DISTINCT (oid, year, program_id, track_id, name, semester, type_id),
    UNIQUE (oid, id, year),   -- referenced in requests and priorities to ensure data consistency
    CONSTRAINT course_hours_non_negative_check CHECK (hours >= 0),
    CONSTRAINT course_groups_non_negative_check CHECK (groups >= 0),
    CONSTRAINT course_priority_rule_non_negative_check CHECK (priority_rule >= 0)
);
CREATE INDEX idx_course_oid ON public.course (oid);
CREATE INDEX idx_course_oid_year ON public.course (oid, year);
CREATE INDEX idx_course_oid_program_id ON public.course (oid, program_id);
CREATE INDEX idx_course_oid_type_id ON public.course (oid, type_id);
CREATE INDEX idx_course_oid_track_id_program_id ON public.course (oid, track_id, program_id);

COMMENT ON TABLE public.course IS 'Course definitions and configurations';
COMMENT ON COLUMN public.course.oid IS 'Organization reference';
COMMENT ON COLUMN public.course.id IS 'Unique identifier';
COMMENT ON COLUMN public.course.year IS 'Academic year reference';
COMMENT ON COLUMN public.course.program_id IS 'Program reference';
COMMENT ON COLUMN public.course.track_id IS 'Optional track reference';
COMMENT ON COLUMN public.course.name IS 'Full name';
COMMENT ON COLUMN public.course.name_short IS 'Abbreviated name';
COMMENT ON COLUMN public.course.name_display IS 'Computed display name';
COMMENT ON COLUMN public.course.type_id IS 'Course type reference';
COMMENT ON COLUMN public.course.semester IS 'Academic semester';
COMMENT ON COLUMN public.course.cycle_year IS 'Computed study year (1-3) based on semester';
COMMENT ON COLUMN public.course.hours IS 'Base number of teaching hours per group';
COMMENT ON COLUMN public.course.hours_adjusted IS 'Modified number of teaching hours per group, if different from base';
COMMENT ON COLUMN public.course.hours_effective IS 'Actual number of teaching hours per group, defaulting to base if no adjustment';
COMMENT ON COLUMN public.course.groups IS 'Base number of groups';
COMMENT ON COLUMN public.course.groups_adjusted IS 'Modified number of groups, if different from base';
COMMENT ON COLUMN public.course.groups_effective IS 'Actual number of groups, defaulting to base if no adjustment';
COMMENT ON COLUMN public.course.description IS 'Optional description';
COMMENT ON COLUMN public.course.priority_rule IS 'Priority duration in years (1=none, 0=permanent, NULL=disabled)';
COMMENT ON COLUMN public.course.visible IS 'Controls visibility to teachers';

CREATE TABLE public.coordination
(
    oid        integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id         integer UNIQUE GENERATED ALWAYS AS IDENTITY,
    teacher_id integer NOT NULL,
    program_id integer,
    track_id   integer,
    course_id  integer,
    comment    text,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, teacher_id) REFERENCES public.teacher ON UPDATE CASCADE,
    FOREIGN KEY (oid, program_id) REFERENCES public.program ON UPDATE CASCADE,
    FOREIGN KEY (oid, track_id) REFERENCES public.track ON UPDATE CASCADE,
    FOREIGN KEY (oid, course_id) REFERENCES public.course ON UPDATE CASCADE,
    UNIQUE NULLS NOT DISTINCT (oid, teacher_id, course_id, track_id, program_id),
    CONSTRAINT coordination_exclusive_type_check CHECK (num_nonnulls(course_id, track_id, program_id) = 1)
);
CREATE INDEX idx_coordination_oid ON public.coordination (oid);
CREATE INDEX idx_coordination_oid_teacher_id ON public.coordination (oid, teacher_id);
CREATE INDEX idx_coordination_oid_program_id ON public.coordination (oid, program_id);
CREATE INDEX idx_coordination_oid_track_id ON public.coordination (oid, track_id);
CREATE INDEX idx_coordination_oid_course_id ON public.coordination (oid, course_id);

COMMENT ON TABLE public.coordination IS 'Academic coordination assignments at program, track, or course level';
COMMENT ON COLUMN public.coordination.oid IS 'Organization reference';
COMMENT ON COLUMN public.coordination.id IS 'Unique identifier';
COMMENT ON COLUMN public.coordination.teacher_id IS 'Teacher reference';
COMMENT ON COLUMN public.coordination.program_id IS 'Program reference (mutually exclusive with track_id and course_id)';
COMMENT ON COLUMN public.coordination.track_id IS 'Track reference (mutually exclusive with program_id and course_id)';
COMMENT ON COLUMN public.coordination.course_id IS 'Course reference (mutually exclusive with program_id and track_id)';
COMMENT ON COLUMN public.coordination.comment IS 'Additional information about this coordination';
