ALTER TABLE public.service_modification
    ADD COLUMN label text;

UPDATE public.service_modification
SET label = smt.label
FROM public.service_modification sm
         JOIN public.service_modification_type smt ON sm.oid = smt.oid AND sm.type_id = smt.id;

ALTER TABLE public.service_modification
    ALTER COLUMN label SET NOT NULL;

ALTER TABLE public.service_modification
    DROP COLUMN type_id;

DROP TABLE public.service_modification_type;
