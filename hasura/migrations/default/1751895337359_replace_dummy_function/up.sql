DROP FUNCTION public.dummy_function();

CREATE FUNCTION public.dummy_function() RETURNS setof public.custom_text AS
$$
SELECT *
FROM public.custom_text
WHERE FALSE;
$$ LANGUAGE sql VOLATILE;

COMMENT ON FUNCTION public.dummy_function() IS 'Dummy function that does nothing (used by GraphQL clients)';
