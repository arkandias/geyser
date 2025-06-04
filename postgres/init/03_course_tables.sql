CREATE TABLE public.degree
(
    id           integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    id           integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    degree_id    integer NOT NULL REFERENCES public.degree ON UPDATE CASCADE,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    UNIQUE (degree_id, name)
);
CREATE INDEX idx_program_degree_id ON public.program (degree_id);

COMMENT ON TABLE public.program IS 'Academic programs within each degree';
COMMENT ON COLUMN public.program.id IS 'Unique program identifier';
COMMENT ON COLUMN public.program.degree_id IS 'Parent degree for this program';
COMMENT ON COLUMN public.program.name IS 'Full program name, unique within its degree (e.g., Mathematics)';
COMMENT ON COLUMN public.program.name_short IS 'Abbreviated program name';
COMMENT ON COLUMN public.program.name_display IS 'Preferred display name, using abbreviated name when available, otherwise full name';
COMMENT ON COLUMN public.program.visible IS 'Controls program visibility in the user interface and queries';

CREATE TABLE public.track
(
    id           integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    program_id   integer NOT NULL REFERENCES public.program ON UPDATE CASCADE,
    name         text    NOT NULL,
    name_short   text,
    name_display text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    visible      boolean NOT NULL DEFAULT TRUE,
    UNIQUE (program_id, name),
    UNIQUE (id, program_id) -- referenced in courses to ensure data consistency
);
CREATE INDEX idx_track_program_id ON public.track (program_id);

COMMENT ON TABLE public.track IS 'Specialization tracks within academic programs';
COMMENT ON COLUMN public.track.id IS 'Unique track identifier';
COMMENT ON COLUMN public.track.program_id IS 'Parent program for this track';
COMMENT ON COLUMN public.track.name IS 'Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.)';
COMMENT ON COLUMN public.track.name_short IS 'Abbreviated track name';
COMMENT ON COLUMN public.track.name_display IS 'Preferred display name, using abbreviated name when available, otherwise full name';
COMMENT ON COLUMN public.track.visible IS 'Controls track visibility in the user interface and queries';

CREATE TABLE public.course_type
(
    id          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    id               integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    year_value       integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    program_id       integer NOT NULL REFERENCES public.program ON UPDATE CASCADE,
    track_id         integer,
    name             text    NOT NULL,
    name_short       text,
    name_display     text GENERATED ALWAYS AS (coalesce(name_short, name)) STORED,
    semester         integer NOT NULL CHECK (1 <= semester AND semester <= 6),
    type_id          integer NOT NULL REFERENCES public.course_type ON UPDATE CASCADE,
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
    FOREIGN KEY (track_id, program_id) REFERENCES public.track (id, program_id) ON UPDATE CASCADE,
    UNIQUE NULLS NOT DISTINCT (year_value, program_id, track_id, name, semester, type_id),
    UNIQUE (id, year_value),  -- referenced in requests and priorities to ensure data consistency
    CONSTRAINT course_hours_non_negative_check CHECK (hours >= 0),
    CONSTRAINT course_groups_non_negative_check CHECK (groups >= 0),
    CONSTRAINT course_priority_rule_non_negative_check CHECK (priority_rule >= 0)
);
CREATE INDEX idx_course_year ON public.course (year_value);
CREATE INDEX idx_course_program_id ON public.course (program_id);
CREATE INDEX idx_course_type_id ON public.course (type_id);
CREATE INDEX idx_course_track_id_program_id ON public.course (track_id, program_id);

COMMENT ON TABLE public.course IS 'Detailed course definitions and configurations';
COMMENT ON COLUMN public.course.id IS 'Unique course identifier';
COMMENT ON COLUMN public.course.year_value IS 'Academic year when the course is offered';
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
COMMENT ON COLUMN public.course.priority_rule IS 'Priority duration in years (1=none, 0=permanent, NULL=disabled)';
COMMENT ON COLUMN public.course.visible IS 'Controls course visibility in the user interface and queries';

CREATE TABLE public.coordination
(
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    uid        text NOT NULL REFERENCES public.teacher ON UPDATE CASCADE,
    program_id integer REFERENCES public.program ON UPDATE CASCADE,
    track_id   integer REFERENCES public.track ON UPDATE CASCADE,
    course_id  integer REFERENCES public.course ON UPDATE CASCADE,
    comment    text,
    UNIQUE NULLS NOT DISTINCT (uid, course_id, track_id, program_id),
    CONSTRAINT coordination_exclusive_type_check CHECK (num_nonnulls(course_id, track_id, program_id) = 1)
);
CREATE INDEX idx_coordination_uid ON public.coordination (uid);
CREATE INDEX idx_coordination_program_id ON public.coordination (program_id);
CREATE INDEX idx_coordination_track_id ON public.coordination (track_id);
CREATE INDEX idx_coordination_course_id ON public.coordination (course_id);

COMMENT ON TABLE public.coordination IS 'Academic coordination assignments at program, track, or course level';
COMMENT ON COLUMN public.coordination.id IS 'Unique coordination identifier';
COMMENT ON COLUMN public.coordination.uid IS 'Coordinating teacher';
COMMENT ON COLUMN public.coordination.program_id IS 'Program being coordinated (mutually exclusive with track_id and course_id)';
COMMENT ON COLUMN public.coordination.track_id IS 'Track being coordinated (mutually exclusive with program_id and course_id)';
COMMENT ON COLUMN public.coordination.course_id IS 'Course being coordinated (mutually exclusive with program_id and track_id)';
COMMENT ON COLUMN public.coordination.comment IS 'Additional coordination details';
