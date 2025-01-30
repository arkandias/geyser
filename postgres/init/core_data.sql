-- Phases
INSERT INTO public.phase(value, current, description)
VALUES ('requests', NULL,
        'Teachers submit their teaching preferences by making primary and secondary course requests, while also confirming their required teaching hours and any service modifications.'),
       ('assignments', NULL,
        'The course assignment committee reviews requests and makes final teaching assignments, during which teachers can view but not modify their requests.'),
       ('results', NULL,
        'Teachers can view their final course assignments for the upcoming year, along with historical assignments from previous years.'),
       ('shutdown', TRUE,
        'System is temporarily closed, typically between academic years or during maintenance periods.');

-- Request types
INSERT INTO public.request_type(value, description)
VALUES ('assignment', 'Final course assignment made by the committee during the assignments phase'),
       ('primary', 'Teacher''s preferred course choices submitted during the requests phase'),
       ('secondary', 'Teacher''s backup course choices submitted during the requests phase');

-- Role types
INSERT INTO public.role_type(value, description)
VALUES ('admin', 'Full system administration access with ability to manage users, roles, and system configuration'),
       ('commissioner',
        'Member of the course assignment committee with ability to make course assignments during the assignments phase');

-- Default admin teacher
INSERT INTO public.teacher(uid, firstname, lastname, alias)
VALUES ('admin', '', '', 'Admin');

INSERT INTO public.role(uid, type, comment)
VALUES ('admin', 'admin', 'Default admin user'),
       ('admin', 'commissioner', 'Default admin user');
