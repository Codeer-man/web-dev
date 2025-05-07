const { Pool } = require("pg");

require("dotenv").config();

//create a new pool instance to manage database connections
// -> postgre -> :// -> [user] -> [password] -> @ -> host:port -> [database]

const pool = new Pool({
  connectionString: process.env.Database_URL,
});

async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    const duration = Date.now() - start;

    console.log(
      `Executed query: , ${{ text, duration, rows: result.rowCount }}`
    );

    return result;
  } catch (e) {
    console.error(e);

    throw e;
  }
}

module.exports = { query };
