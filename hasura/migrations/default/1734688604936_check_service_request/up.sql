INSERT INTO service (annee, uid)
SELECT DISTINCT e.annee, d.uid
FROM demande d
         JOIN enseignement e ON d.ens_id = e.id
ON CONFLICT (annee, uid) DO NOTHING;

CREATE OR REPLACE FUNCTION check_demande_service() RETURNS trigger AS
$$
DECLARE
    enseignement_annee integer;
BEGIN
    -- Get the annee from the corresponding enseignement
    SELECT annee
    INTO enseignement_annee
    FROM enseignement
    WHERE id = new.ens_id;

    -- Check if a service exists for this uid and annee
    IF NOT exists (SELECT 1
                   FROM service
                   WHERE uid = new.uid
                     AND annee = enseignement_annee) THEN
        RAISE EXCEPTION 'No service found for intervenant % in year % (required for demande)',
            new.uid, enseignement_annee;
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION check_demande_service() IS 'Function that checks if a service exists for the intervenant and year corresponding to a demande.';

CREATE OR REPLACE TRIGGER check_demande_service
    BEFORE INSERT OR UPDATE OF uid, ens_id
    ON demande
    FOR EACH ROW
EXECUTE FUNCTION check_demande_service();
COMMENT ON TRIGGER check_demande_service ON demande IS 'Trigger that executes the check_demande_service() function before any insertion of a demande and any update of the uid or ens_id values of a demande.';

CREATE OR REPLACE FUNCTION check_priorite_service() RETURNS trigger AS
$$
DECLARE
    enseignement_annee integer;
BEGIN
    -- Get the annee from the corresponding enseignement
    SELECT annee
    INTO enseignement_annee
    FROM enseignement
    WHERE id = new.ens_id;

    -- Check if a service exists for this uid and annee
    IF NOT exists (SELECT 1
                   FROM service
                   WHERE uid = new.uid
                     AND annee = enseignement_annee) THEN
        RAISE EXCEPTION 'No service found for intervenant % in year % (required for priorite)',
            new.uid, enseignement_annee;
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION check_priorite_service() IS 'Function that checks if a service exists for the intervenant and year corresponding to a priority.';

CREATE OR REPLACE TRIGGER check_priorite_service
    BEFORE INSERT OR UPDATE OF uid, ens_id
    ON priorite
    FOR EACH ROW
EXECUTE FUNCTION check_priorite_service();
COMMENT ON TRIGGER check_priorite_service ON priorite IS 'Trigger that executes the check_priorite_service() function before any insertion of a priority and any update of the uid or ens_id values of a priority.';

CREATE OR REPLACE FUNCTION calcul_anciennetes(annee integer) RETURNS void AS
$$
INSERT INTO priorite (uid, ens_id, anciennete)
SELECT s.uid, e.id, coalesce(p.anciennete + 1, 1)
FROM enseignement e
         JOIN service s ON s.annee = e.annee
         JOIN demande d ON d.uid = s.uid AND d.ens_id = e.parent_id
         LEFT JOIN priorite p ON p.uid = d.uid AND p.ens_id = e.parent_id
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
WHERE e.annee = $1
  AND p.ens_id = e.id
  AND e.regle_priorite IS NOT NULL;
$$ LANGUAGE sql;
COMMENT ON FUNCTION calcul_priorites(annee integer) IS 'Fonction qui calcule la priorité des intervenants dans les enseignements d''une année donnée en utilisant l''ancienneté des intervenants et les règles de priorité des enseignements.';
