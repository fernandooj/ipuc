CREATE FUNCTION save_events(
    _title character varying,
    _description character varying,
    _event_date timestamp,
    _image_url character varying,
    _category_id int,
    _place_name character varying,
    _location point,
    _email character varying
)
RETURNS TABLE(id INTEGER)
LANGUAGE plpgsql
AS $function$
DECLARE
    _id_user integer;
BEGIN
    -- Busca el id del usuario con el email proporcionado
    SELECT id_user INTO _id_user FROM users WHERE email = _email;
    
    -- Si el usuario no existe, no se inserta el evento
    IF _id_user IS NULL THEN
        RAISE EXCEPTION 'El usuario con el email % no existe', _email;
    ELSE
        -- Inserta el evento y devuelve el id
        RETURN QUERY 
        INSERT INTO events(title, description, event_date, image_url, category_id, place_name, location, id_user)
        VALUES(_title, _description, _event_date, _image_url, _category_id, _place_name, _location, _id_user)
        RETURNING id_events;
    END IF;
END;
$function$;




-- select save_events('concierto zabad', 'que increible evento', '2023-04-13 10:00:00', 'http://miimagen.com', 1, 'ipuc central', POINT(4.6626775, -74.1160333), 'fer@gmail.com' )

