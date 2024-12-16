ALTER TABLE demande
    ADD COLUMN uid text REFERENCES intervenant;
ALTER TABLE demande
    ADD CONSTRAINT demande_ens_id_uid_type_key UNIQUE (ens_id, uid, type);

WITH cte AS (SELECT d.id AS demande_id, s.uid AS service_uid
             FROM demande d
                      JOIN service s ON d.service_id = s.id)
UPDATE demande
SET uid = cte.service_uid
FROM cte
WHERE demande.id = cte.demande_id;

ALTER TABLE demande
    ALTER COLUMN uid SET NOT NULL;

DROP TRIGGER IF EXISTS check_demande_annee ON demande;
DROP FUNCTION IF EXISTS check_demande_annee();

ALTER TABLE demande
    DROP COLUMN service_id;

DELETE
FROM service
WHERE heures_eqtd = 0;

ALTER TABLE service
    ALTER COLUMN heures_eqtd SET DEFAULT 192;
ALTER TABLE service
    ADD CONSTRAINT service_heures_eqtd_check CHECK (heures_eqtd > 0);
