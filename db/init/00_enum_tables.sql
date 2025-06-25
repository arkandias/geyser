CREATE TABLE public.locale
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.locale IS 'Locales implemented in the web client';
COMMENT ON COLUMN public.locale.value IS 'Unique identifier';
COMMENT ON COLUMN public.locale.description IS 'Short description';

INSERT INTO public.locale(value, description)
VALUES ('fr-FR', 'French'),
       ('en-EN', 'English');


CREATE TABLE public.phase
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.phase IS 'Workflow phases that control system access and capabilities within an organization';
COMMENT ON COLUMN public.phase.value IS 'Unique identifier';
COMMENT ON COLUMN public.phase.description IS 'Short description';

INSERT INTO public.phase(value, description)
VALUES ('requests',
        'Teachers submit their teaching preferences by making primary and secondary course requests. They can also update their required teaching hours and leave a message to the assignment committee.'),
       ('assignments',
        'The course assignment committee reviews requests and makes final teaching assignments. Meanwhile, teachers can view but not modify their requests.'),
       ('results',
        'Teachers can view their final course assignments.'),
       ('shutdown',
        'System is temporarily closed, typically between academic years or during maintenance periods.');


CREATE TABLE public.role
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.role IS 'User roles that determine system access and capabilities within an organization';
COMMENT ON COLUMN public.role.value IS 'Unique identifier';
COMMENT ON COLUMN public.role.description IS 'Short description';

INSERT INTO public.role(value, description)
VALUES ('organizer', 'Administrator with full permissions within an organization'),
       ('commissioner', 'Committee member with extra permissions during assignment phase'),
       ('teacher', 'Standard user with basic permissions');


CREATE TABLE public.request_type
(
    value       text PRIMARY KEY,
    description text
);

COMMENT ON TABLE public.request_type IS 'Course request types that categorize teacher-course relationships';
COMMENT ON COLUMN public.request_type.value IS 'Unique identifier';
COMMENT ON COLUMN public.request_type.description IS 'Short description';

INSERT INTO public.request_type(value, description)
VALUES ('assignment', 'Final course assignment made by the committee during the assignments phase'),
       ('primary', 'Teacher''s preferred course choice submitted during the requests phase'),
       ('secondary', 'Teacher''s backup course choice submitted during the requests phase');
