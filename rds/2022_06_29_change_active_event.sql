CREATE FUNCTION change_active_event(
    _id integer,
    _active boolean
)
RETURNS TABLE(
    id INTEGER,
    title character varying
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    UPDATE eventos SET active=_active
    WHERE id=_id;

END;
$function$
;
