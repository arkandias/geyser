ALTER TABLE public.organization
    ADD COLUMN private_service boolean NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN public.organization.private_service IS 'When true, teachers can only view their own services';
