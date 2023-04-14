-- CREATE FUNCTION save_events(
--     _title character varying,
--     _description character varying,
--     _event_date timestamp,
--     _image_url character varying,
--     _category_id int,
--     _place_name character varying,
--     _location point
-- )
-- RETURNS TABLE(id INTEGER)
-- LANGUAGE plpgsql
-- AS $function$
-- BEGIN
--     INSERT INTO events(title, description, event_date, image_url, category_id, place_name, location)
--     VALUES(_title, _description, _event_date, _image_url, _category_id, _place_name, _location);
-- END;
-- $function$
-- ;


select save_events('concierto zabad', 'que increible evento', '2023-04-13 10:00:00', 'http://miimagen.com', 1, 'ipuc central', POINT(4.6626775, -74.1160333) )

