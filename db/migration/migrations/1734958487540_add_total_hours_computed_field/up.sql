CREATE OR REPLACE FUNCTION total_heures_corrigees(enseignement_row enseignement) RETURNS real AS
$$
SELECT heures_corrigees(enseignement_row) * groupes_corriges(enseignement_row);
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION total_heures_corrigees(enseignement) IS 'Fonction qui renvoie, pour un enseignement donné, le nombre d''heures corrigé multiplié par le nombre de groupes corrigé.';
