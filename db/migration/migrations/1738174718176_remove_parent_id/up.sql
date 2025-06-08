DROP TRIGGER check_enfant_annee ON public.course;
DROP TRIGGER check_parent_annee ON public.course;

ALTER TABLE public.course
    DROP COLUMN parent_id;

ALTER TABLE public.priority
    ADD COLUMN computed boolean NOT NULL DEFAULT FALSE;

DROP TRIGGER check_priorite_service ON public.priority;

INSERT INTO public.priority (service_id, course_id, seniority, computed)
SELECT s2.id, c2.id, coalesce(p.seniority + 1, 1), TRUE
FROM public.request r
         JOIN public.service s ON r.service_id = s.id
         JOIN public.course c ON r.course_id = c.id
         LEFT JOIN public.priority p ON p.service_id = s.id AND p.course_id = c.id
         JOIN public.service s2 ON s2.year = s.year + 1 AND s2.uid = s.uid
         JOIN public.course c2
              ON c2.program_id = c.program_id
                  AND c2.track_id = c.track_id
                  AND c2.name = c.name
                  AND c2.semester = c.semester
                  AND c2.type_id = c.type_id
                  AND c2.year = c.year + 1
         LEFT JOIN public.priority p2 ON p2.service_id = s2.id AND p2.course_id = c2.id
WHERE r.type = 'assignment'
ON CONFLICT (service_id, course_id)
    DO UPDATE SET computed = TRUE
WHERE priority.seniority = excluded.seniority;
