CREATE TABLE IF NOT EXISTS eventos (
  idEventos INT NOT NULL,
  title VARCHAR(45) NOT NULL,
  description character VARYING NOT NULL,
  eventDate timestamp NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  image VARCHAR(255) NULL,
  idCategory INT NOT NULL,
  namePlace VARCHAR(45) NOT NULL,
  estado BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (idEventos));


COMMENT ON TABLE eventos IS 'events directory';

