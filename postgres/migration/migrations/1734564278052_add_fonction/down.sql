ALTER TABLE intervenant
    RENAME COLUMN heures_eqtd_service_base TO service;

ALTER TABLE intervenant
    ALTER COLUMN service SET DEFAULT 192;

ALTER TABLE intervenant
    DROP COLUMN fonction;

DROP TABLE fonction;

CREATE OR REPLACE FUNCTION creation_services(annee integer) RETURNS setof service AS
$$
INSERT INTO service(annee, uid, heures_eqtd)
SELECT $1, uid, service
FROM intervenant
WHERE actif IS TRUE
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION creation_services(annee integer) IS 'Fonction qui crée le service de tous les intervenants actifs pour une année donnée.';
