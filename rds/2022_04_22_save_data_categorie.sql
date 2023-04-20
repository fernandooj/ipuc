-- CREATE FUNCTION save_data_categorie(
--     _name character varying,
--     _url_image character varying,
--     _alt_image character varying,
--     _icon character varying,
--     _color character varying
-- )
-- RETURNS TABLE(id INTEGER)
-- LANGUAGE plpgsql
-- AS $function$
-- BEGIN
--     INSERT INTO categories(name, url_image, alt_image, icon, color)
--     VALUES(_name, _url_image, _alt_image, _icon, _color);
-- END;
-- $function$
-- ;


-- select * from save_data_categorie('Concierto', 'https://categories-picpuc.s3.amazonaws.com/image1.jpg', 'Conciertos ipuc', 'icon1', '#dd00ff' )
-- select * from  save_data_categorie('Convencion', 'https://categories-picpuc.s3.amazonaws.com/image1.jpg', 'Convenciones ipuc', 'icon2', '#dd00ff' )
-- select * from save_data_categorie('Campamento', 'https://categories-picpuc.s3.amazonaws.com/image1.jpg', 'Campamentos ipuc', 'icon3', '#dd00ff' )
-- select * from save_data_categorie('Ayuno', 'https://categories-picpuc.s3.amazonaws.com/image1.jpg', 'Ayunos ipuc', 'icon4', '#dd00ff' )
-- select * from save_data_categorie('Vigilia', 'https://categories-picpuc.s3.amazonaws.com/image5.jpg', 'Vigilias ipuc', 'icon5', '#dd00ff' )
-- select * from save_data_categorie('Congreso', 'https://categories-picpuc.s3.amazonaws.com/image1.jpg', 'congresos ipuc', 'icon6', '#dd00ff' )

