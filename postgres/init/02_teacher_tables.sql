CREATE TABLE public.position
(
    id                 integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    id                 integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email              text    NOT NULL UNIQUE,
    firstname          text    NOT NULL,
    lastname           text    NOT NULL,
    alias              text,
    displayname        text GENERATED ALWAYS AS (firstname || ' ' || lastname || coalesce(' (' || alias || ')', '')) STORED,
    position_id        integer REFERENCES public.position ON UPDATE CASCADE,
    base_service_hours real,
    visible            boolean NOT NULL DEFAULT TRUE,
    active             boolean NOT NULL DEFAULT TRUE
);
CREATE INDEX idx_teacher_position_id ON public.teacher (position_id);

COMMENT ON TABLE public.teacher IS 'Core teacher information and status';
COMMENT ON COLUMN public.teacher.id IS 'Unique teacher identifier';
COMMENT ON COLUMN public.teacher.email IS 'Teacher''s email address (unique)';
COMMENT ON COLUMN public.teacher.firstname IS 'Teacher''s first name';
COMMENT ON COLUMN public.teacher.lastname IS 'Teacher''s last name';
COMMENT ON COLUMN public.teacher.alias IS 'Optional display name, used instead of first/last name when set';
COMMENT ON COLUMN public.teacher.displayname IS 'Preferred display name, using alias when available, otherwise full name';
COMMENT ON COLUMN public.teacher.position_id IS 'Reference to teacher''s position, determines default service hours';
COMMENT ON COLUMN public.teacher.base_service_hours IS 'Individual override for annual teaching hours, takes precedence over position''s base hours';
COMMENT ON COLUMN public.teacher.visible IS 'Controls teacher visibility in the user interface and queries';
COMMENT ON COLUMN public.teacher.active IS 'Controls system access and automatic service creation for upcoming years';

CREATE TABLE public.role
(
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    teacher_id integer NOT NULL REFERENCES public.teacher ON UPDATE CASCADE,
    type       text    NOT NULL REFERENCES public.role_type ON UPDATE CASCADE,
    comment    text,
    UNIQUE (teacher_id, type)
);
CREATE INDEX idx_role_teacher_id ON public.role (teacher_id);
CREATE INDEX idx_role_type ON public.role (type);

COMMENT ON TABLE public.role IS 'Teacher role assignments for system privileges';
COMMENT ON COLUMN public.role.id IS 'Unique role assignment identifier';
COMMENT ON COLUMN public.role.teacher_id IS 'Teacher identifier with role access';
COMMENT ON COLUMN public.role.type IS 'Type of privileged role';
COMMENT ON COLUMN public.role.comment IS 'Additional information about this privilege assignment';

CREATE TABLE public.service
(
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    year integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    teacher_id integer NOT NULL REFERENCES public.teacher ON UPDATE CASCADE,
    hours      real    NOT NULL,
    UNIQUE (year, teacher_id),
    UNIQUE (id, year) -- referenced in requests and priorities to ensure data consistency
);
CREATE INDEX idx_service_year ON public.service (year);
CREATE INDEX idx_service_teacher_id ON public.service (teacher_id);

COMMENT ON TABLE public.service IS 'Annual teaching service records tracking required hours and modifications';
COMMENT ON COLUMN public.service.id IS 'Unique service identifier';
COMMENT ON COLUMN public.service.year IS 'Academic year for this service record';
COMMENT ON COLUMN public.service.teacher_id IS 'Teacher identifier linking to teacher table';
COMMENT ON COLUMN public.service.hours IS 'Required teaching hours for the year before modifications';

CREATE TABLE public.message
(
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    service_id integer NOT NULL UNIQUE REFERENCES public.service ON UPDATE CASCADE,
    content    text    NOT NULL
);
CREATE INDEX idx_message_service_id ON public.message (service_id);

COMMENT ON TABLE public.message IS 'Message to the assignment committee attached to a service';
COMMENT ON COLUMN public.message.id IS 'Unique message identifier';
COMMENT ON COLUMN public.message.service_id IS 'Identifier of the corresponding service';
COMMENT ON COLUMN public.message.content IS 'Content of the message';

CREATE TABLE public.service_modification_type
(
    id          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label       text NOT NULL UNIQUE,
    description text
);

COMMENT ON TABLE public.service_modification_type IS 'Categories of service hour modifications';
COMMENT ON COLUMN public.service_modification_type.id IS 'Unique modification type identifier';
COMMENT ON COLUMN public.service_modification_type.label IS 'Human-readable type name for display purposes, unique';
COMMENT ON COLUMN public.service_modification_type.description IS 'Detailed explanation of the modification type and its application';

CREATE TABLE public.service_modification
(
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    service_id integer NOT NULL REFERENCES public.service ON UPDATE CASCADE,
    type_id    integer NOT NULL REFERENCES public.service_modification_type ON UPDATE CASCADE,
    hours      real    NOT NULL
);
CREATE INDEX idx_service_modification_service_id ON public.service_modification (service_id);
CREATE INDEX idx_service_modification_type_id ON public.service_modification (type_id);

COMMENT ON TABLE public.service_modification IS 'Individual modifications to base teaching service hours';
COMMENT ON COLUMN public.service_modification.id IS 'Unique modification identifier';
COMMENT ON COLUMN public.service_modification.service_id IS 'Reference to affected service record';
COMMENT ON COLUMN public.service_modification.type_id IS 'Reference to service modification type';
COMMENT ON COLUMN public.service_modification.hours IS 'Hour adjustment amount (negative values increase required hours)';
