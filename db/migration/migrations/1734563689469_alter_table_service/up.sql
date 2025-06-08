ALTER TABLE service
    DROP CONSTRAINT service_heures_eqtd_check;

ALTER TABLE service
    ALTER COLUMN heures_eqtd SET DEFAULT 0;

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
