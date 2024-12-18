CREATE TABLE IF NOT EXISTS fonction
(
    value                    text PRIMARY KEY,
    label                    text NOT NULL,
    heures_eqtd_service_base real
);

ALTER TABLE intervenant
    ADD COLUMN fonction text REFERENCES fonction ON UPDATE CASCADE;

ALTER TABLE intervenant
    RENAME COLUMN service TO heures_eqtd_service_base;

ALTER TABLE intervenant
    ALTER COLUMN heures_eqtd_service_base SET DEFAULT NULL;

CREATE OR REPLACE FUNCTION creation_services(annee integer) RETURNS setof service AS
$$
INSERT INTO service(annee, uid, heures_eqtd)
SELECT $1, uid, coalesce(i.heures_eqtd_service_base, s.heures_eqtd_service_base)
FROM intervenant i
         JOIN fonction s ON i.statut = s.value
WHERE actif IS TRUE
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION creation_services(annee integer) IS 'Fonction qui crée le service de tous les intervenants actifs pour une année donnée, en prenant leur nombre d''heures service, à défaut celui de leur fonction, à défaut 0.';
