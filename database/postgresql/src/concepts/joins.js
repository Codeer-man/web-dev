const db = require("../db/db");

async function getUserWithPost() {
  const getUserWithPostQuery = `
    SELECT users.id,users.username, posts.title
    FROM users
    INNER JOIN posts ON users.id = posts.user_id
    `;

  try {
    const res = await db.query(getUserWithPostQuery);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUserWithPost() {
  const AllUser = `
  SELECT users.id , users.username, posts.title
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  `;

  try {
    const res = await db.query(AllUser);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}
module.exports = { getUserWithPost,getAllUserWithPost };
