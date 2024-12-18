ALTER TABLE service
    ALTER COLUMN heures_eqtd SET DEFAULT 192;

ALTER TABLE service
    ADD CONSTRAINT service_heures_eqtd_check CHECK (heures_eqtd > 0);
