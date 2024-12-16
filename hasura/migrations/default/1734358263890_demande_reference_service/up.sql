ALTER TABLE service
    DROP CONSTRAINT service_heures_eqtd_check;
ALTER TABLE service
    ALTER COLUMN heures_eqtd SET DEFAULT 0;

INSERT INTO service (uid, annee)
SELECT DISTINCT d.uid, e.annee
FROM demande d
         JOIN enseignement e ON d.ens_id = e.id
         LEFT JOIN service s ON d.uid = s.uid AND e.annee = s.annee
WHERE s.id IS NULL;

DELETE
FROM service s
WHERE NOT exists (SELECT 1
                  FROM demande d
                           JOIN enseignement e ON d.ens_id = e.id
                  WHERE d.uid = s.uid
                    AND e.annee = s.annee);

ALTER TABLE demande
    ADD COLUMN service_id integer REFERENCES service;
ALTER TABLE demande
    ADD CONSTRAINT demande_ens_id_service_id_type_key UNIQUE (ens_id, service_id, type);

CREATE OR REPLACE FUNCTION check_demande_annee() RETURNS trigger AS
$$
DECLARE
    enseignement_annee integer;
    service_annee      integer;
BEGIN
    -- Get the annee for the enseignement associated with the demande
    SELECT annee
    INTO enseignement_annee
    FROM enseignement
    WHERE id = new.ens_id;

    -- Get the annee for the service associated with the demande
    SELECT annee
    INTO service_annee
    FROM service
    WHERE id = new.service_id;

    -- Verify if the two match
    IF enseignement_annee IS DISTINCT FROM service_annee THEN
        RAISE EXCEPTION 'L''année de l''enseignement et celle du service associés à la demande doivent être identiques '
            '(id demande: %, id enseignement: %, année enseignement: %, id service: %, année service: %)',
            new.id, new.ens_id, enseignement_annee, new.service_id, service_annee;
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION check_demande_annee() IS 'Fonction qui vérifie que l''année de l''enseignement et celle du service associés à une demande sont bien identiques.';

CREATE OR REPLACE TRIGGER check_demande_annee
    BEFORE INSERT OR UPDATE OF ens_id, service_id
    ON demande
    FOR EACH ROW
EXECUTE FUNCTION check_demande_annee();
COMMENT ON TRIGGER check_demande_annee ON demande IS 'Trigger qui exécute la fonction check_demande_annee() avant toute insertion d''une demande ou mise à jour des colonnes ens_id ou service_id.';

-- For consistency
COMMENT ON TRIGGER check_parent_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute insertion d''un enseignement ou mise à jour des colonnes parent_id ou annee.';
COMMENT ON TRIGGER check_enfant_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute mise à jour de la colonne annee d''un enseignement.';
COMMENT ON TRIGGER check_parent_annee ON enseignement IS 'Trigger qui exécute la fonction check_mention_parcours() avant toute insertion d''un enseignement ou mise à jour des colonnes mention_id ou parcours_id.';

WITH cte AS (SELECT d.id AS demande_id, s.id AS service_id
             FROM demande d
                      JOIN enseignement e ON d.ens_id = e.id
                      JOIN service s ON d.uid = s.uid AND e.annee = s.annee)
UPDATE demande
SET service_id = cte.service_id
FROM cte
WHERE demande.id = cte.demande_id;

ALTER TABLE demande
    ALTER COLUMN service_id SET NOT NULL;

ALTER TABLE demande
    DROP COLUMN uid;
