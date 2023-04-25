-- CREATE TABLE CATEGORIES
create table if not exists users(
  id_user SERIAL PRIMARY KEY,
  name character varying NOT NULL,
  id_social character varying,
  photo character varying,
  email character varying NOT NULL,
  status  boolean DEFAULT TRUE,
  created_at timestamp DEFAULT NOW()
);

COMMENT ON TABLE users IS 'Info data of users';
