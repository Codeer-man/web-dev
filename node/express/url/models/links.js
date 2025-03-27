const path = require("path");
const { readFile, writeFile } = require("fs/promises");

const DATA_FILE = path.join("data", "link.json");

// Load stored links from JSON
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return data.trim() ? JSON.parse(data) : {};
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}), "utf-8");
      return {};
    }
    throw error;
  }
};

// Save links to JSON file
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

module.exports = { loadLinks, saveLinks };
