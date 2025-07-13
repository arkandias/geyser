ALTER TABLE public.organization
    ADD CONSTRAINT organization_key_valid CHECK (
        key ~ '^[a-z0-9-]+$' AND
        key NOT IN ('admin', 'api', 'auth', 'auth-admin')
        );
