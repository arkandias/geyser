ALTER TABLE demande
    ADD COLUMN uid text REFERENCES intervenant ON UPDATE CASCADE;
ALTER TABLE demande
    ADD UNIQUE (uid, ens_id, type);

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
COMMENT ON TRIGGER check_parent_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute insertion d''un enseignement et toute mise à jour des valeurs de parent_id ou annee d''un enseignement.';
COMMENT ON TRIGGER check_enfant_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute mise à jour de la valeur de annee d''un enseignement.';
COMMENT ON TRIGGER check_mention_parcours ON enseignement IS 'Trigger qui exécute la fonction check_mention_parcours() avant toute insertion d''un enseignement et toute mise à jour des valeurs de mention_id ou parcours_id d''un enseignement.';

ALTER TABLE demande
    DROP COLUMN service_id;

DELETE
FROM service
WHERE heures_eqtd = 0;

ALTER TABLE service
    ALTER COLUMN heures_eqtd SET DEFAULT 192;
ALTER TABLE service
    ADD CONSTRAINT service_heures_eqtd_check CHECK (heures_eqtd > 0);

CREATE OR REPLACE FUNCTION prioritaire(demande_row demande) RETURNS boolean AS
$$
SELECT prioritaire
FROM priorite
WHERE uid = demande_row.uid
  AND ens_id = demande_row.ens_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION prioritaire(demande) IS 'Fonction qui indique, pour une demande donnée, si celle-ci est prioritaire.';
