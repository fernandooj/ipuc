CREATE FUNCTION get_categorie_by_id(
    _id integer
)
RETURNS TABLE(
    id INTEGER,
    name character varying,
    image character varying,
    icon character varying,
    color character varying
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT ca.id, ca.name, ca.image, ca.icon, ca.color
    FROM categories as ca
    WHERE ca.id = _id;
END;
$function$
;


-- select get_categorie_by_id(1)

