INSERT INTO phase(value, current)
VALUES ('requests', TRUE),
       ('assignments', NULL),
       ('results', NULL),
       ('shutdown', NULL);

INSERT INTO request_type(value)
VALUES ('assignment'),
       ('primary'),
       ('secondary');

INSERT INTO service_modification_type(value, label, description)
VALUES ('autre', 'Autre', 'Tout autre type de modification'),
       ('conge_arret', 'Congé / arrêt', 'Congé maternité, arrêt maladie, etc.'),
       ('cpp', 'CPP', 'Congé pour projet pédagogique'),
       ('crct', 'CRCT', 'Congé pour recherches ou conversions thématiques'),
       ('delegation', 'Délégation', 'Délégation auprès d''un institut de recherche'),
       ('decharge', 'Décharge', 'Décharge d''enseignement pour une responsabilité'),
       ('depart', 'Départ', 'Service partiel en cas de départ en cours d''année'),
       ('enseignements_exterieurs', 'Enseignements extérieurs', 'Déduction des heures d''enseignement hors Geyser'),
       ('temps_partiel', 'Service à temps partiel');
