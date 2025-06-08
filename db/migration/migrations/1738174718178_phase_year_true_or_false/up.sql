ALTER TABLE public.year
DROP CONSTRAINT annee_en_cours_check;

ALTER TABLE public.year
DROP CONSTRAINT annee_en_cours_key;

UPDATE public.year
SET current = false
WHERE current IS NULL;
