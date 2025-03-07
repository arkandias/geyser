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

ALTER TABLE demande
    DROP COLUMN service_id;

ALTER TABLE priorite
    DROP COLUMN service_id;

ALTER TABLE message
    DROP COLUMN service_id;
