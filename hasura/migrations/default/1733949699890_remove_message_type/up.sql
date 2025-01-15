DELETE
FROM message
WHERE type != 'message_intervenant';

ALTER TABLE message
    DROP COLUMN type,
    ADD UNIQUE (annee, uid);

DROP TABLE type_message;
