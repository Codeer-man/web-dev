// const path = require("path");
// const { readFile, writeFile } = require("fs/promises");

// const DATA_FILE = path.join("data", "link.json");

// // Load stored links from JSON
// const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return data.trim() ? JSON.parse(data) : {};
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}), "utf-8");
//       return {};
//     }
//     throw error;
//   }
// };

// // Save links to JSON file
// const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links));
// };

// module.exports = { loadLinks, saveLinks };

const dbclient = require("../config/db");
const env = require("../config/env");
const { shortCode } = require("../controller/post-controller");

const db = dbclient.db(env.MONGODB_DATABASE_NAME);
const shortnerCollection = db.collection("Short_Links");

const saveLinks = async (link) => {
  return shortnerCollection.insertOne(link);
};

const loadLinks = async () => {
  return await shortnerCollection.find().toArray();
};

const getLinksByShortCode = async (shortCode) => {
  const result = await shortnerCollection.findOne({ shortCode: shortCode });
  console.log(result);
  return result;
};
module.exports = { loadLinks, saveLinks, getLinksByShortCode };
