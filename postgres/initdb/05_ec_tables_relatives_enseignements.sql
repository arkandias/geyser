/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

CREATE TABLE IF NOT EXISTS ec.cursus
(
    id        serial PRIMARY KEY,
    nom       text    NOT NULL UNIQUE,
    nom_court text,
    visible   boolean NOT NULL DEFAULT TRUE
);
COMMENT ON TABLE ec.cursus IS 'Table contenant les différents cursus (licence, master, etc.).';
COMMENT ON COLUMN ec.cursus.id IS 'L''identifiant unique du cursus.';
COMMENT ON COLUMN ec.cursus.nom IS 'Le nom du cursus (unique).';
COMMENT ON COLUMN ec.cursus.nom_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN ec.cursus.visible IS 'Indique si le cursus correspondant est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS ec.mention
(
    id        serial PRIMARY KEY,
    cursus_id integer NOT NULL REFERENCES ec.cursus,
    nom       text    NOT NULL,
    nom_court text,
    visible   boolean NOT NULL DEFAULT TRUE,
    UNIQUE (cursus_id, nom)
);
COMMENT ON TABLE ec.mention IS 'Table contenant les différentes mentions.';
COMMENT ON COLUMN ec.mention.id IS 'L''identifiant unique de la mention.';
COMMENT ON COLUMN ec.mention.nom IS 'Le nom de la mention (unique).';
COMMENT ON COLUMN ec.mention.nom_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN ec.mention.visible IS 'Indique si la mention correspondante est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS ec.parcours
(
    id         serial PRIMARY KEY,
    mention_id integer NOT NULL REFERENCES ec.mention,
    nom        text    NOT NULL,
    nom_court  text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (mention_id, nom)
);
COMMENT ON TABLE ec.parcours IS 'Table contenant les différents parcours.';
COMMENT ON COLUMN ec.parcours.id IS 'L''identifiant unique du parcours.';
COMMENT ON COLUMN ec.parcours.nom IS 'Le nom du parcours (unique).';
COMMENT ON COLUMN ec.parcours.nom_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN ec.parcours.visible IS 'Indique si le parcours correspondant est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS ec.type_enseignement
(
    label       text PRIMARY KEY,
    label_court text,
    coefficient real NOT NULL
);
INSERT INTO ec.type_enseignement(label, label_court, coefficient)
VALUES ('CM', NULL, 1.5),
       ('CM/TD', NULL, 1.25),
       ('CM/TD Distanciel', NULL, 1.25),
       ('TD', NULL, 1),
       ('TP Sciences', 'TP', 1)
ON CONFLICT DO NOTHING;
COMMENT ON TABLE ec.type_enseignement IS 'Table contenant les différents types d''enseignement (CM, TD, etc.).';
COMMENT ON COLUMN ec.type_enseignement.label IS 'Le type d''enseignement (unique).';
COMMENT ON COLUMN ec.type_enseignement.label_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN ec.type_enseignement.coefficient IS 'Le coefficient multiplicateur pour obtenir le nombre d''heures EQTD à partir du nombre d''heures d''enseignement de ce type.';

CREATE TABLE IF NOT EXISTS ec.enseignement
(
    id              serial PRIMARY KEY,
    annee           integer NOT NULL REFERENCES ec.annee,
    mention_id      integer NOT NULL REFERENCES ec.mention,
    parcours_id     integer REFERENCES ec.parcours,
    parent_id       integer REFERENCES ec.enseignement,
    nom             text    NOT NULL,
    nom_court       text,
    type            text    NOT NULL REFERENCES ec.type_enseignement,
    semestre        integer NOT NULL CHECK (1 <= semestre AND semestre <= 6),
    annee_cycle     integer NOT NULL GENERATED ALWAYS AS (ceil(semestre / 2.0)) STORED,
    heures          real    NOT NULL CHECK (heures >= 0),
    groupes         integer NOT NULL CHECK (groupes >= 0),
    groupes_ouverts integer CHECK (0 <= groupes_ouverts AND groupes_ouverts < groupes),
    description     text,
    regle_priorite  integer          DEFAULT 3 CHECK (regle_priorite >= 0), -- 0=infini; NULL=pas de règle
    visible         boolean NOT NULL DEFAULT TRUE,
    UNIQUE (annee, mention_id, parcours_id, nom, semestre, type)
);
COMMENT ON TABLE ec.enseignement IS 'Table contenant les enseignements.';
COMMENT ON COLUMN ec.enseignement.id IS 'L''identifiant unique de l''enseignement.';
COMMENT ON COLUMN ec.enseignement.annee IS 'L''année de l''enseignement.';
COMMENT ON COLUMN ec.enseignement.mention_id IS 'L''identifiant de la mention de l''enseignement.';
COMMENT ON COLUMN ec.enseignement.parcours_id IS 'L''identifiant du parcours de l''enseignement.';
COMMENT ON COLUMN ec.enseignement.parent_id IS 'L''identifiant de l''enseignement parent, c''est-à-dire le même cours l''année précédente (optionnel).';
COMMENT ON COLUMN ec.enseignement.nom IS 'Le nom de l''enseignement.';
COMMENT ON COLUMN ec.enseignement.nom_court IS 'Le nom abrégé (optionnel)';
COMMENT ON COLUMN ec.enseignement.type IS 'Le type d''enseignement.';
COMMENT ON COLUMN ec.enseignement.semestre IS 'Le semestre durant lequel l''enseignement a lieu.';
COMMENT ON COLUMN ec.enseignement.annee_cycle IS 'L''année du cycle universitaire durant laquelle l''enseignement a lieu (calculée automatiquement à partir du semestre).';
COMMENT ON COLUMN ec.enseignement.heures IS 'Le nombre d''heures d''enseignement (devant les étudiants).';
COMMENT ON COLUMN ec.enseignement.groupes IS 'Le nombre de groupes.';
COMMENT ON COLUMN ec.enseignement.groupes_ouverts IS 'Le nombre de groupes ouverts (optionnel, si différent du nombre de groupes initial).';
COMMENT ON COLUMN ec.enseignement.description IS 'Une description de l''enseignement.';
COMMENT ON COLUMN ec.enseignement.regle_priorite IS 'Une règle de priorité (optionnelle) : nombre d''année pendant lesquelles un intervenant est prioritaire sur un enseignement (3 par défaut ; 1 si pas de priorité d''une année sur l''autre ; 0 si pas limite de priorité).';
COMMENT ON COLUMN ec.enseignement.visible IS 'Indique si l''enseignement correspondant est visible par les utilisateurs.';

CREATE OR REPLACE FUNCTION ec.groupes_corriges(enseignement_row ec.enseignement) RETURNS integer AS
$$
SELECT coalesce(enseignement_row.groupes_ouverts, enseignement_row.groupes);
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION ec.groupes_corriges(enseignement_row ec.enseignement) IS 'Fonction qui renvoie, pour un enseignement donné, le nombre de groupes ouverts, et à défaut le nombre de groupes.';

CREATE OR REPLACE FUNCTION ec.check_parent_annee() RETURNS trigger AS
$$
DECLARE
    parent_annee integer;
BEGIN
    IF new.parent_id IS NOT NULL THEN
        SELECT annee INTO parent_annee FROM ec.enseignement WHERE id = new.parent_id;
        IF parent_annee IS NOT NULL AND parent_annee >= new.annee THEN
            RAISE EXCEPTION 'L''année de l''enseignement parent doit être strictement inférieure à celle de l''enseignement '
                '(id enseignement: %, année enseignement: %, id parent: %, année parent: %)',
                new.id, new.annee, new.parent_id, parent_annee;
        END IF;
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION ec.check_parent_annee() IS 'Fonction qui vérifie que l''année de l''enseignement parent (s''il existe) est bien strictement inférieure à celle de l''enseignement.';

CREATE OR REPLACE TRIGGER check_parent_annee
    BEFORE INSERT OR UPDATE OF parent_id, annee
    ON ec.enseignement
    FOR EACH ROW
EXECUTE FUNCTION ec.check_parent_annee();
COMMENT ON TRIGGER check_parent_annee ON ec.enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute insertion d''un enseignement ou mise à jour des valeurs de parent_id ou annee d''un enseignement.';

CREATE OR REPLACE FUNCTION ec.check_enfant_annee() RETURNS trigger AS
$$
DECLARE
    enfant_annee integer;
    enfant_id    integer;
BEGIN
    SELECT annee, id
    INTO enfant_annee, enfant_id
    FROM ec.enseignement
    WHERE parent_id = new.id
    GROUP BY id
    ORDER BY annee
    LIMIT 1;
    IF enfant_annee IS NOT NULL AND enfant_annee <= new.annee THEN
        RAISE EXCEPTION 'L''année d''un enseignement enfant doit être strictement supérieure à celle de l''enseignement '
            '(id enseignement: %, année enseignement: %, id enfant: %, année enfant: %)',
            new.id, new.annee, enfant_id, enfant_annee;
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION ec.check_enfant_annee() IS 'Fonction qui vérifie que les années des enseignements enfants (s''ils existent) sont bien strictement supérieures à celle de l''enseignement.';

CREATE OR REPLACE TRIGGER check_enfant_annee
    BEFORE UPDATE OF annee
    ON ec.enseignement
    FOR EACH ROW
EXECUTE FUNCTION ec.check_enfant_annee();
COMMENT ON TRIGGER check_enfant_annee ON ec.enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute mise à jour de la valeur de annee d''un enseignement.';
