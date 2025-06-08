ALTER TABLE demande
    DROP COLUMN uid;

ALTER TABLE priorite
    DROP COLUMN uid;

ALTER TABLE message
    DROP COLUMN uid;

CREATE OR REPLACE FUNCTION check_service_enseignement_annee()
    RETURNS trigger AS
$$
DECLARE
    service_annee      integer;
    enseignement_annee integer;
BEGIN
    SELECT annee INTO service_annee FROM service WHERE id = new.service_id;
    SELECT annee INTO enseignement_annee FROM enseignement WHERE id = new.ens_id;

    IF service_annee != enseignement_annee THEN
        RAISE EXCEPTION 'Service year must match course year';
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_demande_service
    BEFORE INSERT OR UPDATE OF service_id, ens_id
    ON demande
    FOR EACH ROW
EXECUTE FUNCTION check_service_enseignement_annee();

CREATE TRIGGER check_priorite_service
    BEFORE INSERT OR UPDATE OF service_id, ens_id
    ON priorite
    FOR EACH ROW
EXECUTE FUNCTION check_service_enseignement_annee();

CREATE OR REPLACE FUNCTION prioritaire(demande_row demande) RETURNS boolean AS
$$
SELECT prioritaire
FROM priorite
WHERE service_id = demande_row.service_id
  AND ens_id = demande_row.ens_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION prioritaire(demande) IS 'Fonction qui indique, pour une demande donnée, si celle-ci est prioritaire.';
