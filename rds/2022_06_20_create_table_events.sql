CREATE TABLE IF NOT EXISTS events (
  id_events SERIAL,
  title VARCHAR(45) NOT NULL,
  description character VARYING NOT NULL,
  event_date timestamp NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  image_url VARCHAR(255) NULL,
  category_id INT NOT NULL,
  place_name VARCHAR(45) NOT NULL,
  active BOOLEAN DEFAULT FALSE,
  location POINT,
  distance_km DOUBLE PRECISION,
  PRIMARY KEY (id_events)
);


COMMENT ON TABLE events IS 'events directory';

 
