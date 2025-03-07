ALTER TABLE fonction
    RENAME COLUMN key TO value;

BEGIN;

ALTER TABLE modification_service
    DROP CONSTRAINT modification_service_type_fkey;

UPDATE modification_service ms
SET type = tm.label
FROM type_modification tm
WHERE ms.type = tm.key;

ALTER TABLE type_modification
    DROP CONSTRAINT type_modification_pkey;

ALTER TABLE type_modification
    DROP COLUMN key;

ALTER TABLE type_modification
    ADD PRIMARY KEY (label);

ALTER TABLE modification_service
    ADD CONSTRAINT modification_service_type_fkey
        FOREIGN KEY (type) REFERENCES type_modification (label)
            ON UPDATE CASCADE;

COMMENT ON COLUMN type_modification.label IS 'Le type de modification (unique).';

COMMIT;

BEGIN;

ALTER TABLE enseignement
    DROP CONSTRAINT enseignement_type_fkey;

ALTER TABLE type_enseignement
    ADD COLUMN label_court text;
COMMENT ON COLUMN type_enseignement.label_court IS 'Le nom abrégé (optionnel).';

UPDATE enseignement e
SET type = te.label
FROM type_enseignement te
WHERE e.type = te.key;

ALTER TABLE type_enseignement
    DROP CONSTRAINT type_enseignement_pkey;

ALTER TABLE type_enseignement
    DROP COLUMN key;

ALTER TABLE type_enseignement
    ADD PRIMARY KEY (label);

ALTER TABLE enseignement
    ADD CONSTRAINT enseignement_type_fkey
        FOREIGN KEY (type) REFERENCES type_enseignement (label)
            ON UPDATE CASCADE;

COMMENT ON COLUMN type_enseignement.label IS 'Le type d''enseignement (unique).';

COMMIT;
