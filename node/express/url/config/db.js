const { MongoClient } = require("mongodb");
const env = require("./env");

const dbclient = new MongoClient(env.MONGODB_URL);
// await dbclient.connect();

// const db = client.db(process.env.MONGODB_DATABASE_NAME)
// const collection = db.collection()

module.exports = dbclient;
