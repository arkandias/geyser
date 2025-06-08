-- up.sql
ALTER SEQUENCE cursus_id_seq RENAME TO degree_id_seq;
ALTER SEQUENCE mention_id_seq RENAME TO program_id_seq;
ALTER SEQUENCE enseignement_id_seq RENAME TO course_id_seq;
ALTER SEQUENCE parcours_id_seq RENAME TO track_id_seq;
ALTER SEQUENCE demande_id_seq RENAME TO request_id_seq;
ALTER SEQUENCE modification_service_id_seq RENAME TO service_modification_id_seq;
ALTER SEQUENCE priorite_id_seq RENAME TO priority_id_seq;
ALTER SEQUENCE responsable_id_seq RENAME TO coordination_id_seq;
