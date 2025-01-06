ALTER TABLE service
    ADD COLUMN message text;

UPDATE service s
SET message = m.contenu
FROM message m
WHERE m.service_id = s.id;

DROP TABLE message;
