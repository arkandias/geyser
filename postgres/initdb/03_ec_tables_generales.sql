/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

CREATE TABLE IF NOT EXISTS ec.annee
(
    value    integer PRIMARY KEY,
    en_cours boolean UNIQUE, -- TRUE or NULL
    visible  boolean NOT NULL DEFAULT TRUE,
    CHECK (en_cours)
);
COMMENT ON TABLE ec.annee IS 'Table contenant les différentes années.';
COMMENT ON COLUMN ec.annee.value IS 'Le numéro de l''année (unique).';
COMMENT ON COLUMN ec.annee.en_cours IS 'Indique si l''année correspondante est l''année en cours (TRUE) ou non (NULL). Une seule année peut être en cours à la fois.';
COMMENT ON COLUMN ec.annee.visible IS 'Indique si l''année correspondante est visible par les utilisateurs.';

CREATE TABLE IF NOT EXISTS ec.phase
(
    value       text PRIMARY KEY,
    en_cours    boolean UNIQUE, -- TRUE or NULL
    visible     boolean NOT NULL DEFAULT TRUE,
    description text,
    CHECK (en_cours)
);
INSERT INTO ec.phase(value, en_cours, description)
VALUES ('voeux', TRUE, 'Phase pendant laquelle les intervenants peuvent formuler leurs demandes.'),
       ('commission', NULL,
        'Phase pendant laquelle la commission des services attribue les différents enseignements aux intervenants.'),
       ('consultation', NULL,
        'Phase pendant laquelle les intervenants peuvent consulter les enseignements qui leur ont été attribués.'),
       ('fermeture', NULL,
        'Phase pendant laquelle seuls les administrateurs peuvent accéder à Geyser.')
ON CONFLICT DO NOTHING;
COMMENT ON TABLE ec.phase IS 'Table contenant les différentes phases (voeux, commission et consultation). D''autres phases pourront être ajoutées par la suite.';
COMMENT ON COLUMN ec.phase.value IS 'Le nom de la phase (unique).';
COMMENT ON COLUMN ec.phase.en_cours IS 'Indique si la phase correspondante est la phase en cours (TRUE) ou non (NULL). Une seule phase peut être en cours à la fois.';
COMMENT ON COLUMN ec.phase.visible IS 'Indique si la phase correspondante est visible par les utilisateurs.';
COMMENT ON COLUMN ec.phase.description IS 'Une brève description.';
