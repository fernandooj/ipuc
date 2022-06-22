const { Pool } = require('pg');
const DatabaseError = require('../../../lib/errors/database-error');

const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

const selectAsesores = 'SELECT * FROM eventos';

module.exports.main = async (event) => {
  const client = await pool.connect();

  try {
    client.query('BEGIN');

    const { rows } = await client.query(selectAsesores);

    client.query('COMMIT');

    return rows;
  } catch (error) {
    throw new DatabaseError(error);
  }
};
