/******************************************************************************
 * Copyright (c) 2024 Julien Hauseux.                                         *
 * This file is part of Geyser.                                               *
 * Distributed under the GNU Affero General Public License, version 3.        *
 ******************************************************************************/

INSERT INTO phase(value, en_cours, description)
VALUES ('voeux', TRUE, 'Phase pendant laquelle les intervenants peuvent formuler leurs demandes.'),
       ('commission', NULL,
        'Phase pendant laquelle la commission des services attribue les différents enseignements aux intervenants.'),
       ('consultation', NULL,
        'Phase pendant laquelle les intervenants peuvent consulter les enseignements qui leur ont été attribués.'),
       ('fermeture', NULL,
        'Phase pendant laquelle seuls les administrateurs peuvent accéder à Geyser.');

INSERT INTO type_modification(label, description)
VALUES ('Autre', 'Tout autre type de modification'),
       ('Congé / arrêt', 'Congé maternité, arrêt maladie, etc.'),
       ('CPP', 'Congé pour projet pédagogique'),
       ('CRCT', 'Congé pour recherches ou conversions thématiques'),
       ('Délégation', 'Délégation auprès d''un institut de recherche'),
       ('Décharge', 'Décharge d''enseignement pour une responsabilité'),
       ('Départ', 'Service partiel en cas de départ en cours d''année'),
       ('Enseignements extérieurs', 'Déduction des heures d''enseignement hors Geyser');

INSERT INTO type_message(value, description)
VALUES ('message_intervenant',
        'Message à l''attention de la commission des services et visible par elle seule pour lui signaler toute information utile.'),
       ('note_commission',
        'Note visible uniquement par les membres de la commission des services et contenant des informations utiles à son travail.');

INSERT INTO type_demande(value, description)
VALUES ('attribution', 'Attribution d''un enseignement à un intervenant par la commission des services.'),
       ('principale', 'Demande principale d''un intervenant pour un enseignement.'),
       ('secondaire', 'Demande secondaire au cas où une demande principale n''est pas accordée.');
