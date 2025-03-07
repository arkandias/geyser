ALTER TABLE service
    ALTER COLUMN heures_eqtd SET DEFAULT 192;

ALTER TABLE service
    ADD CONSTRAINT service_heures_eqtd_check CHECK (heures_eqtd > 0);

CREATE OR REPLACE FUNCTION creation_services(annee integer) RETURNS setof service AS
$$
INSERT INTO service(annee, uid, heures_eqtd)
SELECT $1, uid, service
FROM intervenant
WHERE actif IS TRUE
  AND service > 0
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION creation_services(annee integer) IS 'Fonction qui crée le service de tous les intervenants actifs pour une année donnée.';
