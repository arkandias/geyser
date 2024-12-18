/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

--
-- Tables générales
--

CREATE TABLE IF NOT EXISTS annee
(
    value    integer PRIMARY KEY,
    en_cours boolean UNIQUE,                    -- TRUE or NULL
    visible  boolean NOT NULL DEFAULT TRUE,
    CHECK (en_cours),                           -- en_cours est TRUE ou NULL
    CHECK (en_cours IS NULL OR visible IS TRUE) -- l'année en cours est visible
);
COMMENT ON TABLE annee IS 'Table contenant les différentes années.';
COMMENT ON COLUMN annee.value IS 'Le numéro de l''année (unique).';
COMMENT ON COLUMN annee.en_cours IS 'Indique si l''année correspondante est l''année en cours (TRUE) ou non (NULL). Une seule année peut être en cours à la fois.';
COMMENT ON COLUMN annee.visible IS 'Indique si l''année correspondante est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS phase
(
    value       text PRIMARY KEY,
    en_cours    boolean UNIQUE,                 -- TRUE or NULL
    visible     boolean NOT NULL DEFAULT TRUE,
    description text,
    CHECK (en_cours),                           -- en_cours est TRUE ou NULL
    CHECK (en_cours IS NULL OR visible IS TRUE) -- la phase en cours est visible
);
COMMENT ON TABLE phase IS 'Table contenant les différentes phases de Geyser.';
COMMENT ON COLUMN phase.value IS 'Le nom de la phase (unique).';
COMMENT ON COLUMN phase.en_cours IS 'Indique si la phase correspondante est la phase en cours (TRUE) ou non (NULL). Une seule phase peut être en cours à la fois.';
COMMENT ON COLUMN phase.visible IS 'Indique si la phase correspondante est visible par les utilisateurs.';
COMMENT ON COLUMN phase.description IS 'Une brève description.';

--
-- Tables relatives aux intervenants
--

CREATE TABLE IF NOT EXISTS intervenant
(
    uid     text PRIMARY KEY,
    nom     text    NOT NULL,
    prenom  text    NOT NULL,
    alias   text,
    service real             DEFAULT 192,
    visible boolean NOT NULL DEFAULT TRUE,
    actif   boolean NOT NULL DEFAULT TRUE
);
COMMENT ON TABLE intervenant IS 'Table contenant les intervenants.';
COMMENT ON COLUMN intervenant.uid IS 'L''identifiant unique de l''intervenant.';
COMMENT ON COLUMN intervenant.nom IS 'Le nom de l''intervenant.';
COMMENT ON COLUMN intervenant.prenom IS 'Le prénom de l''intervenant.';
COMMENT ON COLUMN intervenant.alias IS 'Un alias pour l''intervenant à afficher à la place du nom et prénom (optionnel).';
COMMENT ON COLUMN intervenant.service IS 'Le service de base en heures EQTD de l''intervenant (optionnel).';
COMMENT ON COLUMN intervenant.visible IS 'Indique si l''intervenant est visible par les utilisateurs.';
COMMENT ON COLUMN intervenant.actif IS 'Indique si un service doit être automatiquement créé pour l''intervenant lors de la prochaine année.';

CREATE TABLE IF NOT EXISTS service
(
    id          serial PRIMARY KEY,
    annee       integer NOT NULL REFERENCES annee ON UPDATE CASCADE,
    uid         text    NOT NULL REFERENCES intervenant ON UPDATE CASCADE,
    heures_eqtd real    NOT NULL DEFAULT 192 CHECK (heures_eqtd > 0),
    UNIQUE (annee, uid)
);
COMMENT ON TABLE service IS 'Table contenant les services de base, c''est-à-dire le nombre d''heures EQTD qu''un intervenant donné doit réaliser lors d''une année donnée avant modifications éventuelles.';
COMMENT ON COLUMN service.id IS 'L''identifiant unique du service.';
COMMENT ON COLUMN service.annee IS 'L''année correspondant au service.';
COMMENT ON COLUMN service.uid IS 'L''identifiant de l''intervenant correspond au service.';
COMMENT ON COLUMN service.heures_eqtd IS 'Le nombre d''heures EQTD du service.';

CREATE TABLE IF NOT EXISTS type_modification
(
    label       text PRIMARY KEY,
    description text
);
COMMENT ON TABLE type_modification IS 'Table contenant les différents types de modification de service.';
COMMENT ON COLUMN type_modification.label IS 'Le type de modification (unique).';
COMMENT ON COLUMN type_modification.description IS 'Une brève description.';

CREATE TABLE IF NOT EXISTS modification_service
(
    id          serial PRIMARY KEY,
    annee       integer NOT NULL REFERENCES annee ON UPDATE CASCADE,
    uid         text    NOT NULL REFERENCES intervenant ON UPDATE CASCADE,
    type        text    NOT NULL REFERENCES type_modification ON UPDATE CASCADE,
    heures_eqtd real    NOT NULL
);
COMMENT ON TABLE modification_service IS 'Table contenant les modifications du service de base d''un intervenant donné pour une année donnée.';
COMMENT ON COLUMN modification_service.id IS 'L''identifiant unique de la modification.';
COMMENT ON COLUMN modification_service.annee IS 'L''année correspondant au service modifié.';
COMMENT ON COLUMN modification_service.uid IS 'L''identifiant de l''intervenant correspondant au service modifié.';
COMMENT ON COLUMN modification_service.type IS 'Le type de modification.';
COMMENT ON COLUMN modification_service.heures_eqtd IS 'Le nombre d''heures EQTD dont le service est diminué (un nombre négatif correspond donc à une augmentation de service).';

CREATE TABLE IF NOT EXISTS type_message
(
    value       text PRIMARY KEY,
    description text
);
COMMENT ON TABLE type_message IS 'Table contenant les différents types de messages enregistrés sur Geyser.';
COMMENT ON COLUMN type_message.value IS 'Le type de message (unique).';
COMMENT ON COLUMN type_message.description IS 'Une brève description.';

CREATE TABLE IF NOT EXISTS message
(
    id      serial PRIMARY KEY,
    annee   integer NOT NULL REFERENCES annee ON UPDATE CASCADE,
    uid     text    NOT NULL REFERENCES intervenant ON UPDATE CASCADE,
    type    text    NOT NULL REFERENCES type_message ON UPDATE CASCADE,
    contenu text    NOT NULL,
    UNIQUE (annee, uid, type)
);
COMMENT ON TABLE message IS 'Table contenant les messages enregistrés sur Geyser.';
COMMENT ON COLUMN message.id IS 'L''identifiant unique du message.';
COMMENT ON COLUMN message.annee IS 'L''année du message.';
COMMENT ON COLUMN message.uid IS 'L''identifiant de l''intervenant concerné.';
COMMENT ON COLUMN message.type IS 'Le type de message.';
COMMENT ON COLUMN message.contenu IS 'Le contenu du message.';

--
-- Tables relatives aux enseignements
--

CREATE TABLE IF NOT EXISTS cursus
(
    id        serial PRIMARY KEY,
    nom       text    NOT NULL UNIQUE,
    nom_court text,
    visible   boolean NOT NULL DEFAULT TRUE
);
COMMENT ON TABLE cursus IS 'Table contenant les différents cursus (licence, master, etc.).';
COMMENT ON COLUMN cursus.id IS 'L''identifiant unique du cursus.';
COMMENT ON COLUMN cursus.nom IS 'Le nom du cursus (unique).';
COMMENT ON COLUMN cursus.nom_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN cursus.visible IS 'Indique si le cursus correspondant est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS mention
(
    id         serial PRIMARY KEY,
    cursus_id  integer NOT NULL REFERENCES cursus ON UPDATE CASCADE,
    nom        text    NOT NULL,
    nom_court  text,
    nom_import text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (cursus_id, nom)
);
COMMENT ON TABLE mention IS 'Table contenant les différentes mentions.';
COMMENT ON COLUMN mention.id IS 'L''identifiant unique de la mention.';
COMMENT ON COLUMN mention.nom IS 'Le nom de la mention (unique).';
COMMENT ON COLUMN mention.nom_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN mention.visible IS 'Indique si la mention correspondante est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS parcours
(
    id         serial PRIMARY KEY,
    mention_id integer NOT NULL REFERENCES mention ON UPDATE CASCADE,
    nom        text    NOT NULL,
    nom_court  text,
    nom_import text,
    visible    boolean NOT NULL DEFAULT TRUE,
    UNIQUE (mention_id, nom)
);
COMMENT ON TABLE parcours IS 'Table contenant les différents parcours.';
COMMENT ON COLUMN parcours.id IS 'L''identifiant unique du parcours.';
COMMENT ON COLUMN parcours.nom IS 'Le nom du parcours (unique).';
COMMENT ON COLUMN parcours.nom_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN parcours.visible IS 'Indique si le parcours correspondant est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS type_enseignement
(
    label       text PRIMARY KEY,
    label_court text,
    coefficient real NOT NULL
);
COMMENT ON TABLE type_enseignement IS 'Table contenant les différents types d''enseignement (CM, TD, etc.).';
COMMENT ON COLUMN type_enseignement.label IS 'Le type d''enseignement (unique).';
COMMENT ON COLUMN type_enseignement.label_court IS 'Le nom abrégé (optionnel).';
COMMENT ON COLUMN type_enseignement.coefficient IS 'Le coefficient multiplicateur pour obtenir le nombre d''heures EQTD à partir du nombre d''heures d''enseignement de ce type.';

CREATE TABLE IF NOT EXISTS enseignement
(
    id                  serial PRIMARY KEY,
    ens_id_import       text UNIQUE,
    formation_id_import text,
    annee               integer NOT NULL REFERENCES annee ON UPDATE CASCADE,
    mention_id          integer NOT NULL REFERENCES mention ON UPDATE CASCADE,
    parcours_id         integer REFERENCES parcours ON UPDATE CASCADE,
    parent_id           integer REFERENCES enseignement ON UPDATE CASCADE,
    nom                 text    NOT NULL,
    nom_court           text,
    nom_import          text,
    type                text    NOT NULL REFERENCES type_enseignement ON UPDATE CASCADE,
    semestre            integer NOT NULL CHECK (1 <= semestre AND semestre <= 6),
    annee_cycle         integer NOT NULL GENERATED ALWAYS AS (ceil(semestre / 2.0)) STORED,
    heures              real    NOT NULL CHECK (heures >= 0),
    heures_ouvertes     real CHECK (0 <= heures_ouvertes AND heures_ouvertes < heures),
    groupes             integer NOT NULL CHECK (groupes >= 0),
    groupes_ouverts     integer CHECK (0 <= groupes_ouverts AND groupes_ouverts < groupes),
    description         text,
    regle_priorite      integer          DEFAULT 3 CHECK (regle_priorite >= 0), -- 0=infini; NULL=pas de règle
    visible             boolean NOT NULL DEFAULT TRUE,
    UNIQUE (annee, mention_id, parcours_id, nom, semestre, type)
);
COMMENT ON TABLE enseignement IS 'Table contenant les enseignements.';
COMMENT ON COLUMN enseignement.id IS 'L''identifiant unique de l''enseignement.';
COMMENT ON COLUMN enseignement.annee IS 'L''année de l''enseignement.';
COMMENT ON COLUMN enseignement.mention_id IS 'L''identifiant de la mention de l''enseignement.';
COMMENT ON COLUMN enseignement.parcours_id IS 'L''identifiant du parcours de l''enseignement.';
COMMENT ON COLUMN enseignement.parent_id IS 'L''identifiant de l''enseignement parent, c''est-à-dire le même cours l''année précédente (optionnel).';
COMMENT ON COLUMN enseignement.nom IS 'Le nom de l''enseignement.';
COMMENT ON COLUMN enseignement.nom_court IS 'Le nom abrégé (optionnel)';
COMMENT ON COLUMN enseignement.type IS 'Le type d''enseignement.';
COMMENT ON COLUMN enseignement.semestre IS 'Le semestre durant lequel l''enseignement a lieu.';
COMMENT ON COLUMN enseignement.annee_cycle IS 'L''année du cycle universitaire durant laquelle l''enseignement a lieu (calculée automatiquement à partir du semestre).';
COMMENT ON COLUMN enseignement.heures IS 'Le nombre d''heures d''enseignement par groupe.';
COMMENT ON COLUMN enseignement.heures_ouvertes IS 'Le nombre d''heures d''enseignement ouvertes par groupe (optionnel, si différent du nombre d''heures d''enseignement initial).';
COMMENT ON COLUMN enseignement.groupes IS 'Le nombre de groupes.';
COMMENT ON COLUMN enseignement.groupes_ouverts IS 'Le nombre de groupes ouverts (optionnel, si différent du nombre de groupes initial).';
COMMENT ON COLUMN enseignement.description IS 'Une description de l''enseignement.';
COMMENT ON COLUMN enseignement.regle_priorite IS 'Une règle de priorité (optionnelle) : nombre d''année pendant lesquelles un intervenant est prioritaire sur un enseignement (3 par défaut ; 1 si pas de priorité d''une année sur l''autre ; 0 si pas limite de priorité).';
COMMENT ON COLUMN enseignement.visible IS 'Indique si l''enseignement correspondant est visible par les utilisateurs.';

CREATE OR REPLACE FUNCTION heures_corrigees(enseignement_row enseignement) RETURNS real AS
$$
SELECT coalesce(enseignement_row.heures_ouvertes, enseignement_row.heures);
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION heures_corrigees(enseignement_row enseignement) IS 'Fonction qui renvoie, pour un enseignement donné, le nombre d''heures d''enseignement ouvertes par groupe, et à défaut le nombre d''heures d''enseignement par groupe.';

CREATE OR REPLACE FUNCTION groupes_corriges(enseignement_row enseignement) RETURNS integer AS
$$
SELECT coalesce(enseignement_row.groupes_ouverts, enseignement_row.groupes);
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION groupes_corriges(enseignement_row enseignement) IS 'Fonction qui renvoie, pour un enseignement donné, le nombre de groupes ouverts, et à défaut le nombre de groupes.';

CREATE OR REPLACE FUNCTION check_parent_annee() RETURNS trigger AS
$$
DECLARE
    parent_annee integer;
BEGIN
    IF new.parent_id IS NOT NULL THEN
        SELECT annee INTO parent_annee FROM enseignement WHERE id = new.parent_id;
        IF parent_annee IS NOT NULL AND parent_annee >= new.annee THEN
            RAISE EXCEPTION 'L''année de l''enseignement parent doit être strictement inférieure à celle de l''enseignement '
                '(id enseignement: %, année enseignement: %, id parent: %, année parent: %)',
                new.id, new.annee, new.parent_id, parent_annee;
        END IF;
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION check_parent_annee() IS 'Fonction qui vérifie que l''année de l''enseignement parent (s''il existe) est bien strictement inférieure à celle de l''enseignement.';

CREATE OR REPLACE TRIGGER check_parent_annee
    BEFORE INSERT OR UPDATE OF parent_id, annee
    ON enseignement
    FOR EACH ROW
EXECUTE FUNCTION check_parent_annee();
COMMENT ON TRIGGER check_parent_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute insertion d''un enseignement et toute mise à jour des valeurs de parent_id ou annee d''un enseignement.';

CREATE OR REPLACE FUNCTION check_enfant_annee() RETURNS trigger AS
$$
DECLARE
    enfant_annee integer;
    enfant_id    integer;
BEGIN
    SELECT annee, id
    INTO enfant_annee, enfant_id
    FROM enseignement
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
COMMENT ON FUNCTION check_enfant_annee() IS 'Fonction qui vérifie que les années des enseignements enfants (s''ils existent) sont bien strictement supérieures à celle de l''enseignement.';

CREATE OR REPLACE TRIGGER check_enfant_annee
    BEFORE UPDATE OF annee
    ON enseignement
    FOR EACH ROW
EXECUTE FUNCTION check_enfant_annee();
COMMENT ON TRIGGER check_enfant_annee ON enseignement IS 'Trigger qui exécute la fonction check_parent_annee() avant toute mise à jour de la valeur de annee d''un enseignement.';

CREATE OR REPLACE FUNCTION check_mention_parcours() RETURNS trigger AS
$$
BEGIN
    IF new.parcours_id IS NOT NULL THEN
        IF (SELECT mention_id FROM parcours WHERE id = new.parcours_id) != new.mention_id THEN
            RAISE EXCEPTION 'La mention du parcours n''est pas celle de l''enseignement '
                '(id mention: %, id parcours: %)', new.mention_id, new.parcours_id;
        END IF;
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION check_mention_parcours() IS 'Fonction qui vérifie que la mention du parcours est la même que celle de l''enseignement.';

CREATE TRIGGER check_mention_parcours
    BEFORE INSERT OR UPDATE OF mention_id, parcours_id
    ON enseignement
    FOR EACH ROW
EXECUTE PROCEDURE check_mention_parcours();
COMMENT ON TRIGGER check_mention_parcours ON enseignement IS 'Trigger qui exécute la fonction check_mention_parcours() avant toute insertion d''un enseignement et toute mise à jour des valeurs de mention_id ou parcours_id d''un enseignement.';

--
-- Tables relatives aux demandes
--

CREATE TABLE IF NOT EXISTS type_demande
(
    value       text PRIMARY KEY,
    description text
);
COMMENT ON TABLE type_demande IS 'Table contenant les différents types de demande (principale, secondaire, attribution).';
COMMENT ON COLUMN type_demande.value IS 'Le type de demande (unique).';
COMMENT ON COLUMN type_demande.description IS 'Une brève description.';

CREATE TABLE IF NOT EXISTS demande
(
    id     serial PRIMARY KEY,
    uid    text    NOT NULL REFERENCES intervenant ON UPDATE CASCADE,
    ens_id integer NOT NULL REFERENCES enseignement ON UPDATE CASCADE,
    type   text    NOT NULL REFERENCES type_demande ON UPDATE CASCADE,
    heures real    NOT NULL CHECK (heures > 0),
    UNIQUE (uid, ens_id, type)
);
COMMENT ON TABLE demande IS 'Table contenant les demandes.';
COMMENT ON COLUMN demande.uid IS 'L''identifiant de l''intervenant correspondant à la demande.';
COMMENT ON COLUMN demande.ens_id IS 'L''identifiant de l''enseignement correspondant à la demande.';
COMMENT ON COLUMN demande.type IS 'Le type de demande.';
COMMENT ON COLUMN demande.heures IS 'Le nombre d''heures demandées.';

CREATE OR REPLACE FUNCTION heures_eqtd(demande_row demande) RETURNS real AS
$$
SELECT d.heures * te.coefficient
FROM demande d
         JOIN enseignement e ON d.ens_id = e.id
         JOIN type_enseignement te ON e.type = te.label
WHERE d.id = demande_row.id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION heures_eqtd(demande) IS 'Fonction qui renvoie, pour une demande donnée, le nombre d''heures EQTD correspondant en utilisant le coefficient multiplicateur du type d''enseignement correspondant.';

CREATE TABLE IF NOT EXISTS priorite
(
    id          serial PRIMARY KEY,
    uid         text    NOT NULL REFERENCES intervenant ON UPDATE CASCADE,
    ens_id      integer NOT NULL REFERENCES enseignement ON UPDATE CASCADE,
    prioritaire boolean,
    anciennete  integer CHECK (anciennete >= 0),
    UNIQUE (uid, ens_id)
);
COMMENT ON TABLE priorite IS 'Table contenant les informations relatives à l''ancienneté et la priorité des intervenants sur les enseignements.';
COMMENT ON COLUMN priorite.uid IS 'L''identifiant d''un intervenant.';
COMMENT ON COLUMN priorite.ens_id IS 'L''identifiant d''un enseignement.';
COMMENT ON COLUMN priorite.prioritaire IS 'Indique si l''intervenant est prioritaire sur l''enseignement.';
COMMENT ON COLUMN priorite.anciennete IS 'Le nombre d''années consécutives jusqu''à l''année en cours (exclue) durant lesquelles l''enseignement a été attribué à l''intervenant.';

CREATE OR REPLACE FUNCTION prioritaire(demande_row demande) RETURNS boolean AS
$$
SELECT prioritaire
FROM priorite
WHERE uid = demande_row.uid
  AND ens_id = demande_row.ens_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION prioritaire(demande) IS 'Fonction qui indique, pour une demande donnée, si celle-ci est prioritaire.';

--
-- Table des responsabilités
--

CREATE TABLE IF NOT EXISTS responsable
(
    id          serial PRIMARY KEY,
    uid         text NOT NULL REFERENCES intervenant ON UPDATE CASCADE,
    mention_id  integer REFERENCES mention ON UPDATE CASCADE,
    parcours_id integer REFERENCES parcours ON UPDATE CASCADE,
    ens_id      integer REFERENCES enseignement ON UPDATE CASCADE,
    commentaire text,
    UNIQUE NULLS NOT DISTINCT (uid, ens_id, parcours_id, mention_id),
    CHECK (num_nonnulls(ens_id, parcours_id, mention_id) = 1)
);
COMMENT ON TABLE responsable IS 'Table contenant les responsables d''une mention, d''un parcours ou d''un enseignement. Chaque ligne correspond à un et un seul de ces trois types de responsabilité.';
COMMENT ON COLUMN responsable.uid IS 'L''identifiant de l''intervenant responsable.';
COMMENT ON COLUMN responsable.mention_id IS 'L''identifiant de la mention (optionnel, si et seulement si la ligne correspond à une responsabilité de mention).';
COMMENT ON COLUMN responsable.parcours_id IS 'L''identifiant du parcours (optionnel, si et seulement si la ligne correspond à une responsabilité de parcours).';
COMMENT ON COLUMN responsable.ens_id IS 'L''identifiant de l''enseignement (optionnel, si et seulement si la ligne correspond à une responsabilité d''enseignement).';
COMMENT ON COLUMN responsable.commentaire IS 'Informations supplémentaires (optionnel, par exemple pour préciser l''année dans le cas d''une responsabilité de parcours ou de mention).';

--
-- Fonctions
--

CREATE OR REPLACE FUNCTION creation_services(annee integer) RETURNS setof service AS
$$
INSERT INTO service(annee, uid, heures_eqtd)
SELECT $1, uid, service
FROM intervenant
WHERE actif IS TRUE
  AND service > 0
ON CONFLICT DO NOTHING
RETURNING *;
$$ LANGUAGE sql;
COMMENT ON FUNCTION creation_services(annee integer) IS 'Fonction qui crée le service de tous les intervenants actifs pour une année donnée.';

CREATE OR REPLACE FUNCTION calcul_anciennetes(annee integer) RETURNS void AS
$$
INSERT INTO priorite (uid, ens_id, anciennete)
SELECT d.uid,
       e.id,
       coalesce(p.anciennete + 1, 1)
FROM enseignement e
         JOIN demande d ON d.ens_id = e.parent_id
         LEFT JOIN priorite p ON d.uid = p.uid AND e.parent_id = p.ens_id
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
WHERE p.ens_id = e.id
  AND e.annee = $1
  AND e.regle_priorite IS NOT NULL;
$$ LANGUAGE sql;
COMMENT ON FUNCTION calcul_priorites(annee integer) IS 'Fonction qui calcule la priorité des intervenants dans les enseignements d''une année donnée en utilisant l''ancienneté des intervenants et les règles de priorité des enseignements.';
