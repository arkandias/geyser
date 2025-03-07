DROP TRIGGER IF EXISTS check_demande_service ON demande;
DROP TRIGGER IF EXISTS check_priorite_service ON priorite;
DROP FUNCTION IF EXISTS check_service_enseignement_annee;

ALTER TABLE demande
    ADD COLUMN uid text REFERENCES intervenant;

UPDATE demande d
SET uid = s.uid
FROM service s
WHERE s.id = d.service_id;

ALTER TABLE demande
    ALTER COLUMN uid SET NOT NULL;

ALTER TABLE priorite
    ADD COLUMN uid text REFERENCES intervenant;

UPDATE priorite p
SET uid = s.uid
FROM service s
WHERE s.id = p.service_id;

ALTER TABLE priorite
    ALTER COLUMN uid SET NOT NULL;

ALTER TABLE message
    ADD COLUMN uid text REFERENCES intervenant;

UPDATE message m
SET uid = s.uid
FROM service s
WHERE s.id = m.service_id;

ALTER TABLE message
    ALTER COLUMN uid SET NOT NULL;

CREATE OR REPLACE FUNCTION prioritaire(demande_row demande) RETURNS boolean AS
$$
SELECT prioritaire
FROM priorite
WHERE uid = demande_row.uid
  AND ens_id = demande_row.ens_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION prioritaire(demande) IS 'Fonction qui indique, pour une demande donnée, si celle-ci est prioritaire.';
