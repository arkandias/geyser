CREATE TABLE type_message
(
    value       text PRIMARY KEY,
    description text
);
COMMENT ON TABLE type_message IS 'Table contenant les différents types de messages enregistrés sur Geyser.';
COMMENT ON COLUMN type_message.value IS 'Le type de message (unique).';
COMMENT ON COLUMN type_message.description IS 'Une brève description.';

INSERT INTO type_message(value, description)
VALUES ('message_intervenant',
        'Message à l''attention de la commission des services et visible par elle seule pour lui signaler toute information utile.'),
       ('note_commission',
        'Note visible uniquement par les membres de la commission des services et contenant des informations utiles à son travail.');

ALTER TABLE message
    DROP CONSTRAINT message_annee_uid_key,
    ADD COLUMN type text NOT NULL DEFAULT 'message_intervenant' REFERENCES type_message ON UPDATE CASCADE;

ALTER TABLE message
    ALTER COLUMN type DROP DEFAULT,
    ADD UNIQUE (annee, uid, type);
