CREATE TABLE IF NOT EXISTS message
(
    id         serial PRIMARY KEY,
    service_id integer NOT NULL REFERENCES service ON UPDATE CASCADE,
    contenu    text    NOT NULL
);

INSERT INTO message(service_id, contenu)
SELECT s.id, s.message
FROM service s
WHERE s.message IS NOT NULL;

ALTER TABLE service
    DROP COLUMN message;
