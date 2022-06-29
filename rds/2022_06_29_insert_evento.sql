CREATE FUNCTION insert_event(
    _title character varying,
    _description character varying,
    _eventDate timestamp,  
    _image character varying,
    _idCategory INTEGER,
    _namePlace character varying
)
RETURNS TABLE(
    id INTEGER    
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    insert into eventos (
        title,
        description,
        eventDate,
        image,
        idCategory,
        namePlace
     ) VALUES (
        _title,
        _description,
        _event,
        _image,
        _idCategory,
        _nameplace

     );

END;
$function$
;
