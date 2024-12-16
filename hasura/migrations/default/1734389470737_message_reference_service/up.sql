ALTER TABLE message
    ADD COLUMN service_id integer REFERENCES service ON UPDATE CASCADE;
ALTER TABLE message
    ADD UNIQUE (service_id);

WITH cte AS (SELECT m.id AS id, s.id AS service_id
             FROM message m
                      JOIN service s ON s.uid = m.uid AND s.annee = m.annee)
UPDATE message
SET service_id = cte.service_id
FROM cte
WHERE message.id = cte.id;

ALTER TABLE message
    ALTER COLUMN service_id SET NOT NULL;

ALTER TABLE message
    DROP COLUMN annee,
    DROP COLUMN uid;
