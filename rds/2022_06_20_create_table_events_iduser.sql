ALTER TABLE events ADD COLUMN id_user INTEGER;

COMMENT ON COLUMN events.id_user IS 'User ID of the event creator';