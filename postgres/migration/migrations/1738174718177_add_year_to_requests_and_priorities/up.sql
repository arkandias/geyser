ALTER TABLE priority
    ADD COLUMN year integer;

UPDATE priority
SET year = service.year
FROM service
WHERE priority.service_id = service.id;

ALTER TABLE request
    ADD COLUMN year integer;

UPDATE request
SET year = service.year
FROM service
WHERE request.service_id = service.id;
