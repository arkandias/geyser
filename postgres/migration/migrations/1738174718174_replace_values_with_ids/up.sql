-- Position table changes
-- 1. Add new id column to reference tables
ALTER TABLE public.position ADD COLUMN id SERIAL;

-- 2. Drop the foreign key constraint from the referencing tables
ALTER TABLE public.teacher DROP CONSTRAINT intervenant_fonction_fkey;

-- 3. Switch primary key in reference tables
ALTER TABLE public.position DROP CONSTRAINT fonction_pkey;
ALTER TABLE public.position ADD CONSTRAINT position_pkey PRIMARY KEY (id);

-- 4. Add new column to referencing tables with reference to the primary key
ALTER TABLE public.teacher ADD COLUMN position_id INTEGER REFERENCES public.position ON UPDATE CASCADE;

-- 5. Update the new column with corresponding ids
UPDATE public.teacher t
SET position_id = p.id
FROM public.position p
WHERE p.value = t.position;

-- 6. Clean up old columns
ALTER TABLE public.teacher DROP COLUMN position;
ALTER TABLE public.position DROP COLUMN value;

-- Repeat the same pattern for service_modification_type
ALTER TABLE public.service_modification_type ADD COLUMN id SERIAL;
ALTER TABLE public.service_modification DROP CONSTRAINT modification_service_type_fkey;
ALTER TABLE public.service_modification_type DROP CONSTRAINT type_modification_pkey;
ALTER TABLE public.service_modification_type ADD CONSTRAINT service_modification_type_pkey PRIMARY KEY (id);
ALTER TABLE public.service_modification ADD COLUMN type_id INTEGER REFERENCES public.service_modification_type ON UPDATE CASCADE;
UPDATE public.service_modification sm
SET type_id = smt.id
FROM public.service_modification_type smt
WHERE smt.value = sm.type;
ALTER TABLE public.service_modification ALTER COLUMN type_id SET NOT NULL;
ALTER TABLE public.service_modification DROP COLUMN type;
ALTER TABLE public.service_modification_type DROP COLUMN value;

-- Repeat for course_type
ALTER TABLE public.course_type ADD COLUMN id SERIAL;
ALTER TABLE public.course DROP CONSTRAINT enseignement_type_fkey;
ALTER TABLE public.course_type DROP CONSTRAINT type_enseignement_pkey;
ALTER TABLE public.course_type ADD CONSTRAINT course_type_pkey PRIMARY KEY (id);
ALTER TABLE public.course ADD COLUMN type_id INTEGER REFERENCES public.course_type ON UPDATE CASCADE;
UPDATE public.course c
SET type_id = ct.id
FROM public.course_type ct
WHERE ct.value = c.type;
ALTER TABLE public.course ALTER COLUMN type_id SET NOT NULL;
ALTER TABLE public.course DROP COLUMN type;
ALTER TABLE public.course_type DROP COLUMN value;