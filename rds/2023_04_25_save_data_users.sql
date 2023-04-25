CREATE FUNCTION save_users(
    _name character varying,
    _id_social character varying,
    _photo character varying,
    _email character varying
)
RETURNS text
LANGUAGE plpgsql
AS $function$
DECLARE
    email_exists boolean;
    new_id integer;
BEGIN
    SELECT EXISTS(SELECT 1 FROM users WHERE email = _email) INTO email_exists;
    
    IF email_exists THEN
        RETURN null; 
    ELSE
        INSERT INTO users(name, id_social, photo, email)
        VALUES(_name, _id_social, _photo, _email)
        RETURNING id_user INTO new_id;
        RETURN new_id::text;
    END IF;
END;
$function$

--select * from save_users('ferchiis', '564faaf3d222', 'http://miimagen.com', 'fer@fer.com');

