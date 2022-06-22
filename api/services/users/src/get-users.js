const { Pool } = require('pg');

/** RDS Pool */
const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

/** create user update*/
const GET_USER_BY_EMAIL = 'SELECT * FROM get_users()';


/** get user
 *  save user active in the table
 * @param {boolean} active - username user
 * @returns {response} Response contains the data of cognito
 */

module.exports.main = async (event) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  const {
    email
  } = event;
  const client  = await pool.connect();

  try {
    const data = await client.query(GET_USER_BY_EMAIL)
    return data.rows
  } catch (error) { 
    throw JSON.stringify(error);
  }
}; 