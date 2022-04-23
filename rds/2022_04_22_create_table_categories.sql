-- CREATE TABLE CATEGORIES
create table if not exists categories(
  id SERIAL PRIMARY KEY,
  name character varying NOT NULL,
  image character varying NOT NULL,
  icon character varying NOT NULL,
  color character varying NOT NULL,
  created_at timestamp DEFAULT NOW()
);

COMMENT ON TABLE categories IS 'Info data of categories';
