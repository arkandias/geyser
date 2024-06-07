/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

CREATE TABLE IF NOT EXISTS ec.type_demande
(
    value       text PRIMARY KEY,
    description text
);
INSERT INTO ec.type_demande(value)
VALUES ('principale'),
       ('secondaire'),
       ('attribution')
ON CONFLICT DO NOTHING;
COMMENT ON TABLE ec.type_demande IS 'Table contenant les différents types de demande (principale, secondaire, attribution).';
COMMENT ON COLUMN ec.type_demande.value IS 'Le type de demande (unique).';

CREATE TABLE IF NOT EXISTS ec.demande
(
    id     serial PRIMARY KEY,
    uid    text    NOT NULL REFERENCES ec.intervenant ON UPDATE CASCADE,
    ens_id integer NOT NULL REFERENCES ec.enseignement,
    type   text    NOT NULL REFERENCES ec.type_demande,
    heures real    NOT NULL CHECK (heures > 0),
    UNIQUE (uid, ens_id, type)
);
COMMENT ON TABLE ec.demande IS 'Table contenant les demandes.';
COMMENT ON COLUMN ec.demande.uid IS 'L''identifiant de l''intervenant correspondant à la demande.';
COMMENT ON COLUMN ec.demande.ens_id IS 'L''identifiant de l''enseignement correspondant à la demande.';
COMMENT ON COLUMN ec.demande.type IS 'Le type de demande.';
COMMENT ON COLUMN ec.demande.heures IS 'Le nombre d''heures demandées.';

CREATE OR REPLACE FUNCTION ec.heures_eqtd(demande_row ec.demande) RETURNS real AS
$$
SELECT d.heures * te.coefficient
FROM ec.demande d
         JOIN ec.enseignement e ON d.ens_id = e.id
         JOIN ec.type_enseignement te ON e.type = te.label
WHERE d.id = demande_row.id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION ec.heures_eqtd(ec.demande) IS 'Fonction qui renvoie, pour une demande donnée, le nombre d''heures EQTD correspondant en utilisant le coefficient multiplicateur du type d''enseignement correspondant.';

CREATE TABLE IF NOT EXISTS ec.priorite
(
    id          serial PRIMARY KEY,
    uid         text    NOT NULL REFERENCES ec.intervenant ON UPDATE CASCADE,
    ens_id      integer NOT NULL REFERENCES ec.enseignement,
    prioritaire boolean,
    anciennete  integer CHECK (anciennete >= 0),
    UNIQUE (uid, ens_id)
);
COMMENT ON TABLE ec.priorite IS 'Table contenant les informations relatives à l''ancienneté et la priorité des intervenants sur les enseignements.';
COMMENT ON COLUMN ec.priorite.uid IS 'L''identifiant d''un intervenant.';
COMMENT ON COLUMN ec.priorite.ens_id IS 'L''identifiant d''un enseignement.';
COMMENT ON COLUMN ec.priorite.prioritaire IS 'Indique si l''intervenant est prioritaire sur l''enseignement.';
COMMENT ON COLUMN ec.priorite.anciennete IS 'Le nombre d''années consécutives jusqu''à l''année en cours (exclue) durant lesquelles l''enseignement a été attribué à l''intervenant.';

CREATE OR REPLACE FUNCTION ec.prioritaire(demande_row ec.demande) RETURNS boolean AS
$$
SELECT prioritaire
FROM ec.priorite
WHERE uid = demande_row.uid
  AND ens_id = demande_row.ens_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION ec.prioritaire(ec.demande) IS 'Fonction qui indique, pour une demande donnée, si celle-ci est prioritaire.';
