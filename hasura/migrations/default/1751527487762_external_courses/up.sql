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

