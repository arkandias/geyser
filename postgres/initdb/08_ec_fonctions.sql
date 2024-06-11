/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

-- todo: script pour créer les nouveaux enseignements sur la base de ceux de l'an dernier
-- todo: script pour ajouter les responsabilités d'enseignement (pour les nouveaux enseignements)
-- todo: mettre bout à bout...

CREATE OR REPLACE FUNCTION ec.creation_services(annee integer) RETURNS void AS
$$
INSERT INTO ec.service(annee, uid, heures_eqtd)
SELECT $1, uid, service
FROM ec.intervenant
WHERE actif IS TRUE
  AND service > 0
ON CONFLICT DO NOTHING;
$$ LANGUAGE sql;
COMMENT ON FUNCTION ec.creation_services(annee integer) IS 'Fonction qui crée le service de tous les intervenants actifs pour une année donnée.';

CREATE OR REPLACE FUNCTION ec.calcul_anciennetes(annee integer) RETURNS void AS
$$
INSERT INTO ec.priorite (uid, ens_id, anciennete)
SELECT d.uid,
       e.id,
       coalesce(p.anciennete + 1, 1)
FROM ec.enseignement e
         JOIN ec.demande d ON d.ens_id = e.parent_id
         LEFT JOIN ec.priorite p ON d.uid = p.uid AND e.parent_id = p.ens_id
WHERE e.annee = $1
  AND d.type = 'attribution'
ON CONFLICT DO NOTHING;
$$ LANGUAGE sql;
COMMENT ON FUNCTION ec.calcul_anciennetes(annee integer) IS 'Fonction qui calcule l''ancienneté des intervenants dans les enseignements d''une année donnée.';

CREATE OR REPLACE FUNCTION ec.calcul_priorites(annee integer) RETURNS void AS
$$
UPDATE ec.priorite p
SET prioritaire = (e.regle_priorite > p.anciennete OR e.regle_priorite = 0)
FROM ec.enseignement e
WHERE p.ens_id = e.id
  AND e.annee = $1
  AND e.regle_priorite IS NOT NULL;
$$ LANGUAGE sql;
COMMENT ON FUNCTION ec.calcul_priorites(annee integer) IS 'Fonction qui calcule la priorité des intervenants dans les enseignements d''une année donnée en utilisant l''ancienneté des intervenants et les règles de priorité des enseignements.';

-- CREATE OR REPLACE FUNCTION import_from_parent(annee integer)
--     RETURNS setof ec.enseignement AS
-- $$
-- UPDATE ec.enseignement child
-- SET description    = parent.description,
--     regle_priorite = parent.regle_priorite
-- FROM ec.enseignement parent
-- WHERE child.annee = $1
--   AND child.parent_id = parent.id
-- RETURNING child.*;
-- $$ LANGUAGE sql;
-- COMMENT ON FUNCTION import_from_parent(integer) IS 'Met à jour les colonnes `description` et `regle_priorite` pour une année donnée dans la table `ec.enseignement` avec les valeurs de l''enseignement parent (référencé par `parent_id`) et retourne toutes les lignes mises à jour.';
