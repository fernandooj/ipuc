const { Pool } = require('pg');
const DatabaseError = require('../../../lib/errors/database-error');

const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

const createEvent = 'SELECT * FROM insert_event($1, $2, $3, $4, $5, $6)';

module.exports.main = async (event) => {
  const client = await pool.connect();
   const {title, description, eventDate, image, idCategory, namePlace } = event
  try {
    client.query('BEGIN');

    const { rows } = await client.query(createEvent, [title, description, eventDate, image, idCategory, namePlace ]);

    client.query('COMMIT');

    return rows;
  } catch (error) {
    throw new DatabaseError(error);
  }
};
