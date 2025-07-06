ALTER TABLE public.app_setting RENAME TO custom_text;

ALTER TABLE public.custom_text RENAME CONSTRAINT app_setting_pkey TO custom_text_pkey;

ALTER TABLE public.custom_text RENAME CONSTRAINT app_setting_oid_fkey TO custom_text_oid_fkey;

ALTER INDEX idx_app_setting_oid RENAME TO idx_custom_text_oid;

COMMENT ON TABLE public.custom_text IS 'Application settings (e.g., custom UI parameters)';
COMMENT ON COLUMN public.custom_text.oid IS 'Organization reference';
COMMENT ON COLUMN public.custom_text.key IS 'Text key';
COMMENT ON COLUMN public.custom_text.value IS 'Text value';


