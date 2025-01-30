ALTER TABLE request
    DROP CONSTRAINT demande_type_fkey;
ALTER TABLE request
    ADD CONSTRAINT request_type_fkey
        FOREIGN KEY (type) REFERENCES request_type (value) ON UPDATE CASCADE;

UPDATE request_type
SET value='assignment'
WHERE value = 'attribution';

UPDATE request_type
SET value='primary'
WHERE value = 'principale';

UPDATE request_type
SET value='secondary'
WHERE value = 'secondaire';
