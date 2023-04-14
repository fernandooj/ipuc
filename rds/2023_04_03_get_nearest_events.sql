CREATE OR REPLACE FUNCTION get_nearest_events(lat numeric, lon numeric)
RETURNS TABLE (
  id_events integer, 
  title varchar(45), 
  description varchar, 
  event_date timestamp, 
  created_at timestamp, 
  image_url varchar(255), 
  category_id integer, 
  place_name varchar(45), 
  active boolean, 
  location point, 
  distance_km DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY SELECT 
        e.id_events, 
        e.title, 
        e.description, 
        e.event_date, 
        e.created_at, 
        e.image_url, 
        e.category_id, 
        e.place_name, 
        e.active, 
        e.location, 
        ST_DistanceSphere(e.location::geometry, ST_MakePoint(lat, lon)::geometry) / 1000.0 as distance_km
    FROM 
        events e
    ORDER BY 
        e.location <-> ST_MakePoint(lat, lon)::point 
    LIMIT 30;
END;
$$ LANGUAGE plpgsql;

--  SELECT * FROM get_nearest_events(4.662795384557246, -74.11561761785137);
 

 