/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

CREATE TABLE IF NOT EXISTS ec.intervenant
(
    uid     text PRIMARY KEY,
    nom     text    NOT NULL,
    prenom  text    NOT NULL,
    alias   text,
    service real             DEFAULT 192,
    visible boolean NOT NULL DEFAULT TRUE,
    actif   boolean NOT NULL DEFAULT TRUE
);
COMMENT ON TABLE ec.intervenant IS 'Table contenant les intervenants.';
COMMENT ON COLUMN ec.intervenant.uid IS 'L''identifiant unique de l''intervenant.';
COMMENT ON COLUMN ec.intervenant.nom IS 'Le nom de l''intervenant.';
COMMENT ON COLUMN ec.intervenant.prenom IS 'Le prénom de l''intervenant.';
COMMENT ON COLUMN ec.intervenant.alias IS 'Un alias pour l''intervenant (optionnel).';
COMMENT ON COLUMN ec.intervenant.alias IS 'Le service de base en heures EQTD de l''intervenant (optionnel).';
COMMENT ON COLUMN ec.intervenant.visible IS 'Indique si l''intervenant correspondant est visible par les utilisateurs.';
COMMENT ON COLUMN ec.intervenant.actif IS 'Indique si l''intervenant correspondant est actif, c''est-à-dire s''il intervient dans l''année en cours.';

CREATE TABLE IF NOT EXISTS ec.service
(
    id          serial PRIMARY KEY,
    annee       integer NOT NULL REFERENCES ec.annee,
    uid         text    NOT NULL REFERENCES ec.intervenant ON UPDATE CASCADE,
    heures_eqtd real    NOT NULL DEFAULT 192 CHECK (heures_eqtd > 0),
    UNIQUE (annee, uid)
);
COMMENT ON TABLE ec.service IS 'Table contenant les services de base, c''est-à-dire le nombre d''heures EQTD qu''un intervenant donné doit réaliser lors d''une année donnée avant modifications éventuelles.';
COMMENT ON COLUMN ec.service.id IS 'L''identifiant unique du service.';
COMMENT ON COLUMN ec.service.annee IS 'L''année correspondant au service.';
COMMENT ON COLUMN ec.service.uid IS 'L''identifiant de l''intervenant correspond au service.';
COMMENT ON COLUMN ec.service.heures_eqtd IS 'Le nombre d''heures EQTD du service.';

CREATE TABLE IF NOT EXISTS ec.type_modification
(
    value       text PRIMARY KEY,
    description text
);
INSERT INTO ec.type_modification(value, description)
VALUES ('CRCT', 'Congé pour recherches ou conversions thématiques'),
       ('CPP', 'Congé pour projet pédagogique'),
       ('Délégation', 'Délégation auprès d''un institut de recherche (CNRS, INRIA, etc.)'),
       ('Décharge', 'Décharge d''enseignement pour une activité annexe (e.g. responsabilité administrative)'),
       ('Enseignement extérieur', 'Déduction pour des heures d''enseignement réalisées en-dehors de l''université'),
       ('Congé / arrêt', 'Congé maternité, arrêt maladie, etc.'),
       ('Départ', 'Pour un intervenant ayant quitté le département en cours d''année'),
       ('Autre', 'Tout autre type de modification')
ON CONFLICT DO NOTHING;
COMMENT ON TABLE ec.type_modification IS 'Table contenant les différents types de modification de service.';
COMMENT ON COLUMN ec.type_modification.value IS 'Le type de modification (unique).';
COMMENT ON COLUMN ec.type_modification.description IS 'Une brève description.';

CREATE TABLE IF NOT EXISTS ec.modification_service
(
    id          serial PRIMARY KEY,
    annee       integer NOT NULL REFERENCES ec.annee,
    uid         text    NOT NULL REFERENCES ec.intervenant ON UPDATE CASCADE,
    type        text    NOT NULL REFERENCES ec.type_modification,
    heures_eqtd real    NOT NULL
);
COMMENT ON TABLE ec.modification_service IS 'Table contenant les modifications du service de base d''un intervenant donné pour une année donnée.';
COMMENT ON COLUMN ec.modification_service.id IS 'L''identifiant unique de la modification.';
COMMENT ON COLUMN ec.modification_service.annee IS 'L''année correspondant au service modifié.';
COMMENT ON COLUMN ec.modification_service.uid IS 'L''identifiant de l''intervenant correspondant au service modifié.';
COMMENT ON COLUMN ec.modification_service.type IS 'Le type de modification.';
COMMENT ON COLUMN ec.modification_service.heures_eqtd IS 'Le nombre d''heures EQTD dont le service est diminué (un nombre négatif correspond donc à une augmentation de service).';

CREATE TABLE IF NOT EXISTS ec.type_message
(
    value       text PRIMARY KEY,
    description text
);
INSERT INTO ec.type_message(value, description)
VALUES ('message_intervenant',
        'Message rédigé par un intervenant à l''attention de la commission pour lui signaler toute information utile.'),
       ('note_commission',
        'Note que la commission rédige au sujet d''un intervenant et contenant des informations utiles pour son travail d''attribution des enseignements ou pour la suite.')
ON CONFLICT DO NOTHING;
COMMENT ON TABLE ec.type_message IS 'Table contenant les différents types de messages enregistrés sur Geyser.';
COMMENT ON COLUMN ec.type_message.value IS 'Le type de message (unique).';
COMMENT ON COLUMN ec.type_message.description IS 'Une brève description.';

CREATE TABLE IF NOT EXISTS ec.message
(
    id      serial PRIMARY KEY,
    annee   integer NOT NULL REFERENCES ec.annee,
    uid     text    NOT NULL REFERENCES ec.intervenant ON UPDATE CASCADE,
    type    text    NOT NULL REFERENCES ec.type_message,
    contenu text    NOT NULL,
    UNIQUE (annee, uid, type)
);
COMMENT ON TABLE ec.message IS 'Table contenant les messages enregistrés sur Geyser.';
COMMENT ON COLUMN ec.message.id IS 'L''identifiant unique du message.';
COMMENT ON COLUMN ec.message.annee IS 'L''année du message.';
COMMENT ON COLUMN ec.message.uid IS 'L''identifiant de l''intervenant concerné.';
COMMENT ON COLUMN ec.message.type IS 'Le type de message.';
COMMENT ON COLUMN ec.message.contenu IS 'Le contenu du message.';
