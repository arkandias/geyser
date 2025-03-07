COMMENT ON COLUMN intervenant.alias IS 'Un alias pour l''intervenant à afficher à la place du nom et prénom (optionnel).';
COMMENT ON COLUMN intervenant.visible IS 'Indique si l''intervenant est visible par les utilisateurs.';
COMMENT ON COLUMN intervenant.actif IS 'Indique si un service doit être automatiquement créé pour l''intervenant lors de la prochaine année.';
COMMENT ON TRIGGER check_parent_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute insertion d''un enseignement ou mise à jour des colonnes parent_id ou annee.';
COMMENT ON TRIGGER check_enfant_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute mise à jour de la colonne annee d''un enseignement.';
COMMENT ON TRIGGER check_mention_parcours ON enseignement IS 'Trigger qui exécute la fonction check_mention_parcours() avant toute insertion d''un enseignement ou mise à jour des colonnes mention_id ou parcours_id.';
