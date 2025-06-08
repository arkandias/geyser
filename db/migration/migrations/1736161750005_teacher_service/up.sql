DROP TRIGGER IF EXISTS check_demande_service ON demande;
DROP FUNCTION IF EXISTS check_demande_service();

DROP TRIGGER IF EXISTS check_priorite_service ON priorite;
DROP FUNCTION IF EXISTS check_priorite_service();

ALTER TABLE demande
    ADD COLUMN service_id integer REFERENCES service ON UPDATE CASCADE;

UPDATE demande d
SET service_id = s.id
FROM service s
         JOIN enseignement e ON e.annee = s.annee
WHERE d.uid = s.uid
  AND d.ens_id = e.id;

ALTER TABLE demande
    ALTER COLUMN service_id SET NOT NULL;

ALTER TABLE demande
    ADD UNIQUE (service_id, ens_id, type);

ALTER TABLE priorite
    ADD COLUMN service_id integer REFERENCES service ON UPDATE CASCADE;

UPDATE priorite p
SET service_id = s.id
FROM service s
         JOIN enseignement e ON e.annee = s.annee
WHERE p.uid = s.uid
  AND p.ens_id = e.id;

DELETE
FROM priorite
WHERE priorite.service_id IS NULL;

ALTER TABLE priorite
    ALTER COLUMN service_id SET NOT NULL;

ALTER TABLE priorite
    ADD UNIQUE (service_id, ens_id);

ALTER TABLE message
    ADD COLUMN service_id integer REFERENCES service ON UPDATE CASCADE;

UPDATE message m
SET service_id = s.id
FROM service s
WHERE m.annee = s.annee
  AND m.uid = s.uid;

DELETE
FROM message
WHERE message.service_id IS NULL;

ALTER TABLE message
    ALTER COLUMN service_id SET NOT NULL;
