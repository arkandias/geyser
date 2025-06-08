DROP TRIGGER IF EXISTS check_demande_service ON demande;
DROP FUNCTION IF EXISTS check_demande_service();

DROP TRIGGER IF EXISTS check_priorite_service ON priorite;
DROP FUNCTION IF EXISTS check_priorite_service();

CREATE OR REPLACE FUNCTION calcul_anciennetes(annee integer) RETURNS void AS
$$
INSERT INTO priorite (uid, ens_id, anciennete)
SELECT d.uid, e.id, coalesce(p.anciennete + 1, 1)
FROM enseignement e
         JOIN demande d ON d.ens_id = e.parent_id
         LEFT JOIN priorite p ON d.uid = p.uid AND e.parent_id = p.ens_id
WHERE e.annee = $1
  AND d.type = 'attribution'
ON CONFLICT (uid, ens_id) DO UPDATE
    SET anciennete = excluded.anciennete;
$$ LANGUAGE sql;
COMMENT ON FUNCTION calcul_anciennetes(annee integer) IS 'Fonction qui calcule l''ancienneté des intervenants dans les enseignements d''une année donnée.';

CREATE OR REPLACE FUNCTION calcul_priorites(annee integer) RETURNS void AS
$$
UPDATE priorite p
SET prioritaire = (e.regle_priorite > p.anciennete OR e.regle_priorite = 0)
FROM enseignement e
WHERE p.ens_id = e.id
  AND e.annee = $1
  AND e.regle_priorite IS NOT NULL;
$$ LANGUAGE sql;
COMMENT ON FUNCTION calcul_priorites(annee integer) IS 'Fonction qui calcule la priorité des intervenants dans les enseignements d''une année donnée en utilisant l''ancienneté des intervenants et les règles de priorité des enseignements.';
