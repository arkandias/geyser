/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

DELETE
FROM message
WHERE type != 'message_intervenant';


ALTER TABLE message
    DROP CONSTRAINT message_annee_uid_type_key,
    DROP CONSTRAINT message_type_fkey,
    DROP COLUMN type;

DROP TABLE type_message;

ALTER TABLE message
    ADD CONSTRAINT message_annee_uid_key UNIQUE (annee, uid);
