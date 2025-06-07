CREATE TABLE public.priority
(
    id          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    year  integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    service_id  integer NOT NULL,
    course_id   integer NOT NULL,
    seniority   integer,
    is_priority boolean,
    computed    boolean NOT NULL DEFAULT FALSE,
    FOREIGN KEY (year, service_id) REFERENCES public.service (year, id) ON UPDATE CASCADE,
    FOREIGN KEY (year, course_id) REFERENCES public.course (year, id) ON UPDATE CASCADE,
    UNIQUE (service_id, course_id),
    CONSTRAINT priority_seniority_non_negative_check CHECK (seniority >= 0)
);
CREATE INDEX idx_priority_year ON public.priority (year);
CREATE INDEX idx_priority_year_service_id ON public.priority (year, service_id);
CREATE INDEX idx_priority_year_course_id ON public.priority (year, course_id);

COMMENT ON TABLE public.priority IS 'Teacher course assignment history and priority status';
COMMENT ON COLUMN public.priority.id IS 'Unique priority record identifier';
COMMENT ON COLUMN public.priority.year IS 'Year of the priority (must match service''s and course''s year)';
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
    id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    year integer NOT NULL REFERENCES public.year ON UPDATE CASCADE,
    service_id integer NOT NULL,
    course_id  integer NOT NULL,
    type       text    NOT NULL REFERENCES public.request_type ON UPDATE CASCADE,
    hours      real    NOT NULL,
    FOREIGN KEY (year, service_id) REFERENCES public.service (year, id) ON UPDATE CASCADE,
    FOREIGN KEY (year, course_id) REFERENCES public.course (year, id) ON UPDATE CASCADE,
    UNIQUE (service_id, course_id, type),
    CONSTRAINT request_hours_positive_check CHECK (hours > 0)
);
CREATE INDEX idx_request_year ON public.request (year);
CREATE INDEX idx_request_year_service_id ON public.request (year, service_id);
CREATE INDEX idx_request_year_course_id ON public.request (year, course_id);
CREATE INDEX idx_request_type ON public.request (type);

COMMENT ON TABLE public.request IS 'Teacher requests and assignments for courses';
COMMENT ON COLUMN public.request.id IS 'Unique request identifier';
COMMENT ON COLUMN public.request.year IS 'Year of the request (must match service''s and course''s year)';
COMMENT ON COLUMN public.request.service_id IS 'Associated teacher service record';
COMMENT ON COLUMN public.request.course_id IS 'Requested or assigned course';
COMMENT ON COLUMN public.request.type IS 'Type of request (primary choice, backup, or final assignment)';
COMMENT ON COLUMN public.request.hours IS 'Requested or assigned teaching hours';

-- Computed field
CREATE FUNCTION public.request_hours_weighted(request_row request) RETURNS real AS
$$
SELECT request_row.hours * ct.coefficient
FROM public.course c
         JOIN public.course_type ct ON ct.id = c.type_id
WHERE c.id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.request_hours_weighted(request) IS 'Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient';

-- Computed field
CREATE FUNCTION public.request_is_priority(request_row request) RETURNS boolean AS
$$
SELECT is_priority
FROM public.priority
WHERE service_id = request_row.service_id
  AND course_id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.request_is_priority(request) IS 'Determines the priority status of a request based on teaching history and course priority rules';
