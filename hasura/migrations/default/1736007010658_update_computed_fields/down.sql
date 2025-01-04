CREATE OR REPLACE FUNCTION heures_eqtd(demande_row demande) RETURNS real AS
$$
SELECT d.heures * te.coefficient
FROM demande d
         JOIN enseignement e ON d.ens_id = e.id
         JOIN type_enseignement te ON e.type = te.label
WHERE d.id = demande_row.id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION heures_eqtd(demande) IS 'Fonction qui renvoie, pour une demande donnée, le nombre d''heures EQTD correspondant en utilisant le coefficient multiplicateur du type d''enseignement correspondant.';
