INSERT INTO public.phase(value, description)
VALUES ('requests',
        'Teachers submit their teaching preferences by making primary and secondary course requests, while also confirming their required teaching hours and any service modifications.'),
       ('assignments',
        'The course assignment committee reviews requests and makes final teaching assignments, during which teachers can view but not modify their requests.'),
       ('results',
        'Teachers can view their final course assignments for the upcoming year, along with historical assignments from previous years.'),
       ('shutdown',
        'System is temporarily closed, typically between academic years or during maintenance periods.');

INSERT INTO public.current_phase(value)
VALUES ('shutdown');

INSERT INTO public.request_type(value, description)
VALUES ('assignment', 'Final course assignment made by the committee during the assignments phase'),
       ('primary', 'Teacher''s preferred course choices submitted during the requests phase'),
       ('secondary', 'Teacher''s backup course choices submitted during the requests phase');

INSERT INTO public.role_type(value, description)
VALUES ('admin', 'Full system administration access with ability to manage users, roles, and system configuration'),
       ('commissioner', 'Member of the course assignment committee with extra abilities during the assignments phase'),
       ('teacher', 'Base role with limited abilities');
