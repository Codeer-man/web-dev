const { readFile } = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const { loadLinks, saveLinks } = require("../models/links");

const getData = async (req, res) => {
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
};

const postdata = async (req, res) => {
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
};

const shortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occurred.");

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
module.exports = { getData, postdata, shortCode };
