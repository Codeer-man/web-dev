const { readFile } = require("fs/promises");
const crypto = require("crypto");
const path = require("path");
const {
  loadLinks,
  saveLinks,
  getLinksByShortCode,
} = require("../services/services");

const getData = async (req, res) => {
  try {
    // Load the HTML template
    const file = await readFile(path.join("views", "index.html"), "utf-8");

    // Load all links from the database (now an array)
    const linksArray = await loadLinks();

    // Convert the array into HTML list items
    const linksHtml = linksArray
      .map(
        (link) =>
          `<li><a href="/${link.shortcode}" target="_blank">${
            link.shortcode
          }</a> → ${link.url.slice(0, 25)}</li>`
      )
      .join("");

    // Replace the placeholder in the HTML with the generated links
    const content = file.replaceAll("{{shortened_url}}", linksHtml);
    res.send(content);
  } catch (error) {
    console.error("Error loading data:", error.message);
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
    const existingLink = links.find(
      (link) => link.shortcode === finalShortCode
    );

    if (existingLink) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }

    // Insert the new short link into the database
    await saveLinks(url, finalShortCode);

    res.status(201).json({ shortCode: finalShortCode, url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const shortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Get the link by short code from the database
    const link = await getLinksByShortCode(shortCode);
    console.log("Retrieved link:", link);

    if (!link) return res.status(404).send("Link not found");

    return res.redirect(link.url);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getData, postdata, shortCode };
