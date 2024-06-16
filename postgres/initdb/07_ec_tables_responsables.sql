/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

CREATE TABLE IF NOT EXISTS ec.responsable
(
    id          serial PRIMARY KEY,
    uid         text NOT NULL REFERENCES ec.intervenant ON UPDATE CASCADE,
    mention_id  integer REFERENCES ec.mention,
    parcours_id integer REFERENCES ec.parcours,
    ens_id      integer REFERENCES ec.enseignement,
    commentaire text,
    UNIQUE NULLS NOT DISTINCT (uid, ens_id, parcours_id, mention_id),
    CHECK (num_nonnulls(ens_id, parcours_id, mention_id) = 1)
);
COMMENT ON TABLE ec.responsable IS 'Table contenant les responsables d''une mention, d''un parcours ou d''un enseignement. Chaque ligne correspond à un et un seul de ces trois types de responsabilité.';
COMMENT ON COLUMN ec.responsable.uid IS 'L''identifiant de l''intervenant responsable.';
COMMENT ON COLUMN ec.responsable.mention_id IS 'L''identifiant de la mention (optionnel, si et seulement si la ligne correspond à une responsabilité de mention).';
COMMENT ON COLUMN ec.responsable.parcours_id IS 'L''identifiant du parcours (optionnel, si et seulement si la ligne correspond à une responsabilité de parcours).';
COMMENT ON COLUMN ec.responsable.ens_id IS 'L''identifiant de l''enseignement (optionnel, si et seulement si la ligne correspond à une responsabilité d''enseignement).';
COMMENT ON COLUMN ec.responsable.commentaire IS 'Informations supplémentaires (optionnel, par exemple pour préciser l''année dans le cas d''une responsabilité de parcours ou de mention).';
