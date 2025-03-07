CREATE TABLE IF NOT EXISTS fonction
(
    value                    text PRIMARY KEY,
    label                    text NOT NULL,
    heures_eqtd_service_base real
);

INSERT INTO fonction(value, label, heures_eqtd_service_base)
VALUES ('mcf', 'Maître de conférences', 192 ),
       ('pr', 'Professeur des universités', 192),
       ('cr', 'Chargé de recherche', 0),
       ('dr', 'Directeur de recherche', 0),
       ('prag', 'Professeur agrégé', 384),
       ('ater', 'ATER', 192),
       ('demi-ater', 'Demi-ATER', 96),
       ('doctorant', 'Doctorant', 64),
       ('postdoc', 'Post-doctorant', 0);

ALTER TABLE intervenant
    ADD COLUMN fonction text REFERENCES fonction ON UPDATE CASCADE;

ALTER TABLE intervenant
    RENAME COLUMN service TO heures_eqtd_service_base;

ALTER TABLE intervenant
    ALTER COLUMN heures_eqtd_service_base SET DEFAULT NULL;

CREATE OR REPLACE FUNCTION creation_services(annee integer) RETURNS setof service AS
$$
INSERT INTO service(annee, uid, heures_eqtd)
SELECT $1, uid, coalesce(i.heures_eqtd_service_base, f.heures_eqtd_service_base)
FROM intervenant i
         JOIN fonction f ON i.fonction = f.value
WHERE actif IS TRUE
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION creation_services(annee integer) IS 'Fonction qui crée le service de tous les intervenants actifs pour une année donnée, en prenant leur nombre d''heures service, à défaut celui de leur fonction, à défaut 0.';
