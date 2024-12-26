CREATE OR REPLACE FUNCTION check_demande_service() RETURNS trigger AS
$$
BEGIN
    INSERT INTO service (uid, annee, heures_eqtd)
    SELECT new.uid, e.annee, coalesce(i.heures_eqtd_service_base, f.heures_eqtd_service_base)
    FROM intervenant i
             JOIN fonction f ON f.value = i.fonction
             JOIN enseignement e ON e.id = new.ens_id
    WHERE i.uid = new.uid
      AND NOT exists (SELECT 1
                      FROM service
                      WHERE uid = new.uid
                        AND annee = e.annee);
    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_priorite_service() RETURNS trigger AS
$$
BEGIN
    INSERT INTO service (uid, annee, heures_eqtd)
    SELECT new.uid, e.annee, coalesce(i.heures_eqtd_service_base, f.heures_eqtd_service_base)
    FROM intervenant i
             JOIN fonction f ON f.value = i.fonction
             JOIN enseignement e ON e.id = new.ens_id
    WHERE i.uid = new.uid
      AND NOT exists (SELECT 1
                      FROM service
                      WHERE uid = new.uid
                        AND annee = e.annee);
    RETURN new;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION check_demande_service() IS 'Function that creates a service row for the intervenant and year corresponding to a request if it does not exist yet.';

COMMENT ON FUNCTION check_priorite_service() IS 'Function that creates a service row for the intervenant and year corresponding to a priority if it does not exist yet.';
