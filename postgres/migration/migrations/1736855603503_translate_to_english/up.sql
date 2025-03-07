ALTER TABLE annee
    RENAME TO year;
ALTER TABLE year
    RENAME COLUMN en_cours TO current;

ALTER TABLE cursus
    RENAME TO degree;
ALTER TABLE degree
    RENAME COLUMN nom TO name;
ALTER TABLE degree
    RENAME COLUMN nom_court TO name_short;

ALTER TABLE demande
    RENAME TO request;
ALTER TABLE request
    RENAME COLUMN ens_id TO course_id;
ALTER TABLE request
    RENAME COLUMN heures TO hours;

ALTER TABLE enseignement
    RENAME TO course;
ALTER TABLE course
    RENAME COLUMN annee TO year;
ALTER TABLE course
    RENAME COLUMN mention_id TO program_id;
ALTER TABLE course
    RENAME COLUMN parcours_id TO track_id;
ALTER TABLE course
    RENAME COLUMN nom TO name;
ALTER TABLE course
    RENAME COLUMN nom_court TO name_short;
ALTER TABLE course
    RENAME COLUMN semestre TO semester;
ALTER TABLE course
    RENAME COLUMN annee_cycle TO cycle_year;
ALTER TABLE course
    RENAME COLUMN heures TO hours;
ALTER TABLE course
    RENAME COLUMN heures_ouvertes TO hours_adjusted;
ALTER TABLE course
    RENAME COLUMN groupes TO groups;
ALTER TABLE course
    RENAME COLUMN groupes_ouverts TO groups_adjusted;
ALTER TABLE course
    RENAME COLUMN regle_priorite TO priority_rule;

ALTER TABLE fonction
    RENAME TO position;
ALTER TABLE position
    RENAME COLUMN heures_eqtd_service_base TO base_service_hours;

ALTER TABLE intervenant
    RENAME TO teacher;
ALTER TABLE teacher
    RENAME COLUMN nom TO lastname;
ALTER TABLE teacher
    RENAME COLUMN prenom TO firstname;
ALTER TABLE teacher
    RENAME COLUMN heures_eqtd_service_base TO base_service_hours;
ALTER TABLE teacher
    RENAME COLUMN actif TO active;
ALTER TABLE teacher
    RENAME COLUMN fonction TO position;

ALTER TABLE mention
    RENAME TO program;
ALTER TABLE program
    RENAME COLUMN cursus_id TO degree_id;
ALTER TABLE program
    RENAME COLUMN nom TO name;
ALTER TABLE program
    RENAME COLUMN nom_court TO name_short;

ALTER TABLE modification_service
    RENAME TO service_modification;
ALTER TABLE service_modification
    RENAME COLUMN heures_eqtd TO hours;

ALTER TABLE parcours
    RENAME TO track;
ALTER TABLE track
    RENAME COLUMN mention_id TO program_id;
ALTER TABLE track
    RENAME COLUMN nom TO name;
ALTER TABLE track
    RENAME COLUMN nom_court TO name_short;

ALTER TABLE priorite
    RENAME TO priority;
ALTER TABLE priority
    RENAME COLUMN ens_id TO course_id;
ALTER TABLE priority
    RENAME COLUMN anciennete TO seniority;
ALTER TABLE priority
    RENAME COLUMN prioritaire TO is_priority;

ALTER TABLE responsable
    RENAME TO coordinator;
ALTER TABLE coordinator
    RENAME COLUMN mention_id TO program_id;
ALTER TABLE coordinator
    RENAME COLUMN parcours_id TO track_id;
ALTER TABLE coordinator
    RENAME COLUMN ens_id TO course_id;
ALTER TABLE coordinator
    RENAME COLUMN commentaire TO comment;

ALTER TABLE type_demande
    RENAME TO request_type;

ALTER TABLE type_enseignement
    RENAME TO course_type;

ALTER TABLE type_modification_service
    RENAME TO service_modification_type;

ALTER TABLE service
    RENAME COLUMN annee TO year;
ALTER TABLE service
    RENAME COLUMN heures_eqtd TO hours;

ALTER TABLE phase
    RENAME COLUMN en_cours TO current;

ALTER TABLE course
    ADD COLUMN hours_effective integer GENERATED ALWAYS AS (coalesce(hours_adjusted, hours)) STORED;
ALTER TABLE course
    ADD COLUMN groups_effective integer GENERATED ALWAYS AS (coalesce(groups_adjusted, groups)) STORED;
