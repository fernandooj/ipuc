const {poolConection} = require('../../../lib/connection-pg.js')
const selectAsesores = 'SELECT * FROM events';

module.exports.main = async (event) => {
  const client = await poolConection.connect();

  try {
    client.query('BEGIN');

    const { rows } = await client.query(selectAsesores);

    client.query('COMMIT');

    return rows;
  } catch (error) {
    throw new DatabaseError(error);
  }
};
