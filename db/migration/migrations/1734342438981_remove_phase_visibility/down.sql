ALTER TABLE phase
    ADD COLUMN visible boolean NOT NULL DEFAULT TRUE;
COMMENT ON COLUMN phase.visible IS 'Indique si la phase correspondante est visible par les utilisateurs.';
