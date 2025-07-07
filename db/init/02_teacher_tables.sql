CREATE TABLE public.position
(
    oid                integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id                 integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    label              text    NOT NULL,
    label_short        text,
    description        text,
    base_service_hours real,
    PRIMARY KEY (oid, id),
    UNIQUE (oid, label),
    CONSTRAINT position_base_service_hours_non_negative CHECK (base_service_hours >= 0)
);
CREATE INDEX idx_position_oid ON public.position (oid);

COMMENT ON TABLE public.position IS 'Teaching positions with associated service hour requirements';
COMMENT ON COLUMN public.position.oid IS 'Organization reference';
COMMENT ON COLUMN public.position.id IS 'Unique identifier';
COMMENT ON COLUMN public.position.label IS 'Position name (unique)';
COMMENT ON COLUMN public.position.label_short IS 'Abbreviated name';
COMMENT ON COLUMN public.position.base_service_hours IS 'Default annual teaching hours';
COMMENT ON COLUMN public.position.description IS 'Optional description';


CREATE TABLE public.teacher
(
    oid                integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id                 integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    email              text    NOT NULL,
    firstname          text    NOT NULL,
    lastname           text    NOT NULL,
    alias              text,
    displayname        text GENERATED ALWAYS AS (firstname || ' ' || lastname || coalesce(' (' || alias || ')', '')) STORED,
    position_id        integer,
    base_service_hours real,
    visible            boolean NOT NULL DEFAULT TRUE,
    active             boolean NOT NULL DEFAULT TRUE,
    access             boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, position_id) REFERENCES public.position ON UPDATE CASCADE,
    UNIQUE (oid, email),
    CONSTRAINT teacher_base_service_hours_non_negative CHECK (base_service_hours >= 0)
);
CREATE INDEX idx_teacher_oid ON public.teacher (oid);
CREATE INDEX idx_teacher_oid_position_id ON public.teacher (oid, position_id);

COMMENT ON TABLE public.teacher IS 'Teachers information and status';
COMMENT ON COLUMN public.teacher.oid IS 'Organization reference';
COMMENT ON COLUMN public.teacher.id IS 'Unique identifier';
COMMENT ON COLUMN public.teacher.email IS 'Teacher''s email address (unique)';
COMMENT ON COLUMN public.teacher.firstname IS 'Teacher''s first name';
COMMENT ON COLUMN public.teacher.lastname IS 'Teacher''s last name';
COMMENT ON COLUMN public.teacher.alias IS 'Optional alias';
COMMENT ON COLUMN public.teacher.displayname IS 'Computed display name';
COMMENT ON COLUMN public.teacher.position_id IS 'Teacher''s position reference';
COMMENT ON COLUMN public.teacher.base_service_hours IS 'Individual teaching hour override';
COMMENT ON COLUMN public.teacher.visible IS 'Controls visibility to other teachers';
COMMENT ON COLUMN public.teacher.active IS 'Controls automatic service creation for upcoming years';
COMMENT ON COLUMN public.teacher.access IS 'Controls teacher login access';


CREATE TABLE public.teacher_role
(
    oid        integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id         integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    teacher_id integer NOT NULL,
    role       text    NOT NULL REFERENCES public.role ON UPDATE CASCADE,
    comment    text,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, teacher_id) REFERENCES public.teacher ON UPDATE CASCADE,
    UNIQUE (oid, teacher_id, role)
);
CREATE INDEX idx_teacher_role_oid ON public.teacher_role (oid);
CREATE INDEX idx_teacher_role_role ON public.teacher_role (role);
CREATE INDEX idx_teacher_role_oid_teacher_id ON public.teacher_role (oid, teacher_id);

COMMENT ON TABLE public.teacher_role IS 'Teacher role assignments';
COMMENT ON COLUMN public.teacher_role.oid IS 'Organization reference';
COMMENT ON COLUMN public.teacher_role.id IS 'Unique identifier';
COMMENT ON COLUMN public.teacher_role.teacher_id IS 'Teacher reference';
COMMENT ON COLUMN public.teacher_role.role IS 'Role reference';
COMMENT ON COLUMN public.teacher_role.comment IS 'Additional information about this assignment';


CREATE TABLE public.service
(
    oid         integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id          integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    year        integer NOT NULL,
    teacher_id  integer NOT NULL,
    position_id integer,
    hours       real    NOT NULL,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, year) REFERENCES public.year ON UPDATE CASCADE,
    FOREIGN KEY (oid, teacher_id) REFERENCES public.teacher ON UPDATE CASCADE,
    FOREIGN KEY (oid, position_id) REFERENCES public.position ON UPDATE CASCADE,
    UNIQUE (oid, year, teacher_id),
    UNIQUE (oid, id, year), -- referenced in requests and priorities to ensure data consistency
    CONSTRAINT service_hours_non_negative CHECK (hours >= 0)
);
CREATE INDEX idx_service_oid ON public.service (oid);
CREATE INDEX idx_service_oid_year ON public.service (oid, year);
CREATE INDEX idx_service_oid_teacher_id ON public.service (oid, teacher_id);
CREATE INDEX idx_service_oid_position_id ON public.service (oid, position_id);

COMMENT ON TABLE public.service IS 'Annual teaching service records';
COMMENT ON COLUMN public.service.oid IS 'Organization reference';
COMMENT ON COLUMN public.service.id IS 'Unique identifier';
COMMENT ON COLUMN public.service.year IS 'Academic year reference';
COMMENT ON COLUMN public.service.teacher_id IS 'Teacher reference';
COMMENT ON COLUMN public.service.position_id IS 'Teacher''s position reference';
COMMENT ON COLUMN public.service.hours IS 'Required teaching hours before modifications';


CREATE TABLE public.service_modification_type
(
    oid         integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id          integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    label       text    NOT NULL,
    description text,
    PRIMARY KEY (oid, id),
    UNIQUE (oid, label)
);
CREATE INDEX idx_service_modification_type_oid ON public.service_modification_type (oid);

COMMENT ON TABLE public.service_modification_type IS 'Categories of service modifications';
COMMENT ON COLUMN public.service_modification_type.oid IS 'Organization reference';
COMMENT ON COLUMN public.service_modification_type.id IS 'Unique identifier';
COMMENT ON COLUMN public.service_modification_type.label IS 'Modification type name (unique)';
COMMENT ON COLUMN public.service_modification_type.description IS 'Optional description';


CREATE TABLE public.service_modification
(
    oid        integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id         integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    service_id integer NOT NULL,
    type_id    integer NOT NULL,
    hours      real    NOT NULL,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, service_id) REFERENCES public.service ON UPDATE CASCADE,
    FOREIGN KEY (oid, type_id) REFERENCES public.service_modification_type ON UPDATE CASCADE
);
CREATE INDEX idx_service_modification_oid ON public.service_modification (oid);
CREATE INDEX idx_service_modification_oid_service_id ON public.service_modification (oid, service_id);
CREATE INDEX idx_service_modification_oid_type_id ON public.service_modification (oid, type_id);

COMMENT ON TABLE public.service_modification IS 'Individual modifications to base teaching service hours';
COMMENT ON COLUMN public.service_modification.oid IS 'Organization reference';
COMMENT ON COLUMN public.service_modification.id IS 'Unique identifier';
COMMENT ON COLUMN public.service_modification.service_id IS 'Service reference';
COMMENT ON COLUMN public.service_modification.type_id IS 'Modification type reference';
COMMENT ON COLUMN public.service_modification.hours IS 'Hour deduction amount';


CREATE TABLE public.external_course
(
    oid        integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id         integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    service_id integer NOT NULL,
    label      text    NOT NULL,
    hours      real    NOT NULL,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, service_id) REFERENCES public.service ON UPDATE CASCADE,
    CONSTRAINT priority_seniority_non_negative_check CHECK (hours >= 0)
);
CREATE INDEX idx_external_course_oid ON public.external_course (oid);
CREATE INDEX idx_external_course_oid_service_id ON public.external_course (oid, service_id);

COMMENT ON TABLE public.external_course IS 'Assignments of courses which are not in the database';
COMMENT ON COLUMN public.external_course.oid IS 'Organization reference';
COMMENT ON COLUMN public.external_course.id IS 'Unique identifier';
COMMENT ON COLUMN public.external_course.service_id IS 'Service reference';
COMMENT ON COLUMN public.external_course.label IS 'Course label';
COMMENT ON COLUMN public.external_course.hours IS 'Number of weighted hours';


CREATE TABLE public.message
(
    oid        integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id         integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    service_id integer NOT NULL,
    content    text    NOT NULL,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, service_id) REFERENCES public.service ON UPDATE CASCADE,
    UNIQUE (oid, service_id)
);
CREATE INDEX idx_message_oid ON public.message (oid);
CREATE INDEX idx_message_oid_service_id ON public.message (oid, service_id);

COMMENT ON TABLE public.message IS 'Messages to the assignment committee';
COMMENT ON COLUMN public.message.oid IS 'Organization reference';
COMMENT ON COLUMN public.message.id IS 'Unique identifier';
COMMENT ON COLUMN public.message.service_id IS 'Service reference';
COMMENT ON COLUMN public.message.content IS 'Message content';
