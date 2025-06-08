ALTER TABLE modification_service
    ADD COLUMN service_id integer REFERENCES service ON UPDATE CASCADE;
COMMENT ON COLUMN modification_service.service_id IS 'L''identifiant du service modifié.';

WITH cte AS (SELECT m.id AS id, s.id AS service_id
             FROM modification_service m
                      JOIN service s ON s.uid = m.uid AND s.annee = m.annee)
UPDATE modification_service
SET service_id = cte.service_id
FROM cte
WHERE modification_service.id = cte.id;

ALTER TABLE modification_service
    ALTER COLUMN service_id SET NOT NULL;

ALTER TABLE modification_service
    DROP COLUMN annee,
    DROP COLUMN uid;
