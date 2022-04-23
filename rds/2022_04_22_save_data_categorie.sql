CREATE FUNCTION save_data_categorie(
    _name character varying,
    _image character varying,
    _icon character varying,
    _color character varying
)
RETURNS TABLE(id INTEGER)
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO categories(name, image, icon, color)
    VALUES(_name, _image, _icon, _color);
END;
$function$
;


-- select save_data_categorie('Concierto', 'http://miimagen.com', 'music', '#dd00ff' )

