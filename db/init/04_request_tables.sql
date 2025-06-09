CREATE TABLE public.priority
(
    oid         integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id          integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    year        integer NOT NULL,
    service_id  integer NOT NULL,
    course_id   integer NOT NULL,
    seniority   integer,
    is_priority boolean,
    computed    boolean NOT NULL DEFAULT FALSE,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, year) REFERENCES public.year ON UPDATE CASCADE,
    FOREIGN KEY (oid, year, service_id) REFERENCES public.service (oid, year, id) ON UPDATE CASCADE,
    FOREIGN KEY (oid, year, course_id) REFERENCES public.course (oid, year, id) ON UPDATE CASCADE,
    UNIQUE (oid, service_id, course_id),
    CONSTRAINT priority_seniority_non_negative_check CHECK (seniority >= 0)
);
CREATE INDEX idx_priority_oid ON public.priority (oid);
CREATE INDEX idx_priority_oid_year ON public.priority (oid, year);
CREATE INDEX idx_priority_oid_year_service_id ON public.priority (oid, year, service_id);
CREATE INDEX idx_priority_oid_year_course_id ON public.priority (oid, year, course_id);

COMMENT ON TABLE public.priority IS 'Teacher course assignments';
COMMENT ON COLUMN public.priority.oid IS 'Organization reference';
COMMENT ON COLUMN public.priority.id IS 'Unique identifier';
COMMENT ON COLUMN public.priority.year IS 'Academic year reference';
COMMENT ON COLUMN public.priority.service_id IS 'Teacher''s service reference';
COMMENT ON COLUMN public.priority.course_id IS 'Course reference';
COMMENT ON COLUMN public.priority.seniority IS 'Number of consecutive years teaching this course before current year';
COMMENT ON COLUMN public.priority.computed IS 'Indicates if seniority was computed automatically';
COMMENT ON COLUMN public.priority.is_priority IS 'Current priority status based on seniority and course rules';

CREATE TABLE public.request
(
    oid        integer NOT NULL REFERENCES public.organization ON UPDATE CASCADE,
    id         integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    year       integer NOT NULL,
    service_id integer NOT NULL,
    course_id  integer NOT NULL,
    type       text    NOT NULL REFERENCES public.request_type ON UPDATE CASCADE,
    hours      real    NOT NULL,
    PRIMARY KEY (oid, id),
    FOREIGN KEY (oid, year) REFERENCES public.year ON UPDATE CASCADE,
    FOREIGN KEY (oid, year, service_id) REFERENCES public.service (oid, year, id) ON UPDATE CASCADE,
    FOREIGN KEY (oid, year, course_id) REFERENCES public.course (oid, year, id) ON UPDATE CASCADE,
    UNIQUE (oid, service_id, course_id, type),
    CONSTRAINT request_hours_positive_check CHECK (hours > 0)
);
CREATE INDEX idx_request_oid ON public.request (oid);
CREATE INDEX idx_request_oid_year ON public.request (oid, year);
CREATE INDEX idx_request_oid_year_service_id ON public.request (oid, year, service_id);
CREATE INDEX idx_request_oid_year_course_id ON public.request (oid, year, course_id);
CREATE INDEX idx_request_type ON public.request (type);
-- Extra indexes with type
CREATE INDEX idx_request_oid_year_type ON public.request (oid, year, type);
CREATE INDEX idx_request_oid_service_id_type ON public.request (oid, year, service_id, type);
CREATE INDEX idx_request_oid_course_id_type ON public.request (oid, year, course_id, type);

COMMENT ON TABLE public.request IS 'Teacher requests and assignments for courses';
COMMENT ON COLUMN public.request.oid IS 'Organization reference';
COMMENT ON COLUMN public.request.id IS 'Unique identifier';
COMMENT ON COLUMN public.request.year IS 'Academic year reference';
COMMENT ON COLUMN public.request.service_id IS 'Teacher''s service reference';
COMMENT ON COLUMN public.request.course_id IS 'Course reference';
COMMENT ON COLUMN public.request.type IS 'Request type reference';
COMMENT ON COLUMN public.request.hours IS 'Number of requested or assigned teaching hours';

-- Computed field
CREATE FUNCTION public.request_hours_weighted(request_row request) RETURNS real AS
$$
SELECT request_row.hours * ct.coefficient
FROM public.course c
         JOIN public.course_type ct
              ON ct.id = c.type_id
WHERE c.id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.request_hours_weighted(request) IS 'Calculates a request''s weighted hours by multiplying the request''s hours with the course type coefficient';

-- Computed field
CREATE FUNCTION public.request_is_priority(request_row request) RETURNS boolean AS
$$
SELECT is_priority
FROM public.priority
WHERE oid = request_row.oid
  AND service_id = request_row.service_id
  AND course_id = request_row.course_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.request_is_priority(request) IS 'Determines a request''s priority status based on the priority table';
