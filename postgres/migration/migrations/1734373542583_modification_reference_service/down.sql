ALTER TABLE modification_service
    ADD COLUMN annee integer REFERENCES annee ON UPDATE CASCADE,
    ADD COLUMN uid   text REFERENCES intervenant ON UPDATE CASCADE;
COMMENT ON COLUMN modification_service.annee IS 'L''année correspondant au service modifié.';
COMMENT ON COLUMN modification_service.uid IS 'L''identifiant de l''intervenant correspondant au service modifié.';

WITH cte AS (SELECT m.id AS id, intervenant.uid AS uid, s.annee AS annee
             FROM modification_service m
                      JOIN service s ON s.id = m.service_id
                      JOIN intervenant ON intervenant.uid = s.uid)
UPDATE modification_service
SET uid   = cte.uid,
    annee = cte.annee
FROM cte
WHERE modification_service.id = cte.id;

ALTER TABLE modification_service
    ALTER COLUMN annee SET NOT NULL,
    ALTER COLUMN uid SET NOT NULL;

ALTER TABLE modification_service
    DROP COLUMN service_id;
