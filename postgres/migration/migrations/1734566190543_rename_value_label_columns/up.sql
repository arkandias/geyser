ALTER TABLE fonction
    RENAME COLUMN value TO key;

BEGIN;

ALTER TABLE modification_service
    DROP CONSTRAINT modification_service_type_fk;

ALTER TABLE type_modification
    ADD COLUMN key text;

UPDATE type_modification
SET key = 'autre'
WHERE label = 'Autre';
UPDATE type_modification
SET key = 'conge_arret'
WHERE label = 'Congé / arrêt';
UPDATE type_modification
SET key = 'cpp'
WHERE label = 'CPP';
UPDATE type_modification
SET key = 'crct'
WHERE label = 'CRCT';
UPDATE type_modification
SET key = 'delegation'
WHERE label = 'Délégation';
UPDATE type_modification
SET key = 'decharge'
WHERE label = 'Décharge';
UPDATE type_modification
SET key = 'depart'
WHERE label = 'Départ';
UPDATE type_modification
SET key = 'enseignements_exterieurs'
WHERE label = 'Enseignements extérieurs';

ALTER TABLE type_modification
    ALTER COLUMN key SET NOT NULL;

UPDATE modification_service ms
SET type = tm.key
FROM type_modification tm
WHERE ms.type = tm.label;

ALTER TABLE type_modification
    DROP CONSTRAINT type_modification_pkey;

ALTER TABLE type_modification
    ADD PRIMARY KEY (key);

ALTER TABLE modification_service
    ADD CONSTRAINT modification_service_type_fkey
        FOREIGN KEY (type) REFERENCES type_modification (key)
            ON UPDATE CASCADE;

COMMENT ON COLUMN type_modification.key IS 'La clé du type de modification (unique).';
COMMENT ON COLUMN type_modification.label IS 'Le libellé du type de modification.';

COMMIT;

BEGIN;

ALTER TABLE enseignement
    DROP CONSTRAINT enseignement_type_fkey;

ALTER TABLE type_enseignement
    DROP COLUMN label_court,
    ADD COLUMN key text;

DELETE
FROM type_enseignement
WHERE label = 'CM/TD Distanciel';

UPDATE type_enseignement
SET key = 'cm'
WHERE label = 'CM';
UPDATE type_enseignement
SET key = 'cm_td'
WHERE label = 'CM/TD';
UPDATE type_enseignement
SET key = 'td'
WHERE label = 'TD';
UPDATE type_enseignement
SET key = 'tp'
WHERE label LIKE 'TP%';

ALTER TABLE type_enseignement
    ALTER COLUMN key SET NOT NULL;

UPDATE enseignement e
SET type = te.key
FROM type_enseignement te
WHERE e.type = te.label;

ALTER TABLE type_enseignement
    DROP CONSTRAINT type_enseignement_pkey;

ALTER TABLE type_enseignement
    ADD PRIMARY KEY (key);

ALTER TABLE enseignement
    ADD CONSTRAINT enseignement_type_fkey
        FOREIGN KEY (type) REFERENCES type_enseignement (key)
            ON UPDATE CASCADE;

COMMENT ON COLUMN type_enseignement.key IS 'La clé du type d''enseignement (unique).';
COMMENT ON COLUMN type_enseignement.label IS 'Le libellé type d''enseignement.';

COMMIT;

UPDATE type_enseignement
SET label = 'TP'
WHERE label = 'TP Sciences';
