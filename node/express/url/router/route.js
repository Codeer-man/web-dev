const { readFile, writeFile } = require("fs/promises");
const crypto = require("crypto");
const path = require("path");
const express = require("express");

const route = express.Router();
const DATA_FILE = path.join("data", "link.json");

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return data.trim() ? JSON.parse(data) : {};
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

route.get("/", async (req, res) => {
  try {
    const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks();
    const linksHtml = Object.entries(links)
      .map(
        ([shortCode, url]) =>
          `<li><a href="/${shortCode}" target="_blank">${shortCode}</a> → ${url}</li>`
      )
      .join("");

    const content = file.toString().replaceAll("{{shortened_url}}", linksHtml);
    return res.send(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

route.post("/", async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    if (!url) {
      return res.status(400).send("URL is required.");
    }

    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();
    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }

    links[finalShortCode] = url;
    await saveLinks(links);

    res.status(201).json({ shortCode: finalShortCode, url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

route.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occurred.");

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = route;
