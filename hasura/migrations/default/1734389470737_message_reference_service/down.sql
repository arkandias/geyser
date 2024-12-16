ALTER TABLE message
    ADD COLUMN annee integer REFERENCES annee ON UPDATE CASCADE,
    ADD COLUMN uid   text REFERENCES intervenant ON UPDATE CASCADE;

WITH cte AS (SELECT m.id AS id, intervenant.uid AS uid, s.annee AS annee
             FROM message m
                      JOIN service s ON s.id = m.service_id
                      JOIN intervenant ON intervenant.uid = s.uid)
UPDATE message
SET uid   = cte.uid,
    annee = cte.annee
FROM cte
WHERE message.id = cte.id;

ALTER TABLE message
    ALTER COLUMN annee SET NOT NULL,
    ALTER COLUMN uid SET NOT NULL;

ALTER TABLE message
    DROP COLUMN service_id;
