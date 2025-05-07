const db = require("../db/db");

async function createUserTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY ,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `;

  try {
    await db.query(createTableQuery);
    console.log("user table created");
  } catch (error) {
    console.error(error);
  }
}

async function insertUserQuery(username, email) {
  const insertData = `
  INSERT INTO users (username,email)
  VALUES ($1, $2)
  RETURNING *
  `;
  try {
    const res = await db.query(insertData, [username, email]);
    console.log("Data inserted", res.rows[0]);

    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchallUser() {
  const getAlluserFromTable = "SELECT * FROM users";

  try {
    const res = await db.query(getAlluserFromTable);

    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function updateUserEmail(username, newEmail) {
  const UpdateUserQuery = `
  UPDATE users
  SET email = $2
  WHERE username = $1
  RETURNING *
  `;

  try {
    const res = await db.query(UpdateUserQuery, [username, newEmail]);
    if (res.rows.length > 0) {
      console.log("user updated ");
      return res.rows[0];
    } else {
      console.log("no user found with given username");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteInfo(username) {
  const deleteQuery = `
  DELETE FROM users
  WHERE username = $1
  RETURNING *
  `;
  try {
    const res = await db.query(deleteQuery, [username]);
    if (res.rows.length > 0) {
      console.log("user updated ");
      return res.rows[0];
    } else {
      console.log("no user found with given username");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUserTable,
  insertUserQuery,
  fetchallUser,
  updateUserEmail,
  deleteInfo,
};
