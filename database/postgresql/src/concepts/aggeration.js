const db = require("../db/db");

async function CountPostUser() {
  const count = `
    SELECT users.username, COUNT(posts.id) as post_count
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.username
    `;

  try {
    const res = await db.query(count);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { CountPostUser };
