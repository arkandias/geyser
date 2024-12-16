/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

DELETE
FROM message
WHERE type != 'message_intervenant';

ALTER TABLE message
    DROP COLUMN type,
    ADD UNIQUE (annee, uid);

DROP TABLE type_message;
