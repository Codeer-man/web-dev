const db = require("../db/db");

async function filterQuery(condition) {
  const filter = `
    SELECT * FROM users
    WHERE ${condition}

    `;

  try {
    const res = await db.query(filter);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function SortQuery(condition, order = "ASC") {
  const sort = `
    SELECT * FROM users
    ORDER BY ${condition} ${order}
    `;
  try {
    const res = await db.query(sort);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function paginationQuert(limit, offset) {
  const pagination = `
    SELECT * FROM users
    LIMIT $1 OFFSET $2
    `;
  try {
    const res = await db.query(pagination, [limit, offset]);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}
module.exports = { filterQuery, SortQuery, paginationQuert };
