const { readFile } = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const {
  loadLinks,
  saveLinks,
  getLinksByShortCode,
} = require("../models/links");

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
          `<li><a href="/${link.shortCode}" target="_blank">${
            link.shortCode
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
    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }

    // links[finalShortCode] = url;
    // await saveLinks(links);
    await saveLinks({ url, shortCode });

    res.status(201).json({ shortCode: finalShortCode, url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const shortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;
    // const links = await loadLinks();
    const link = await getLinksByShortCode(shortCode);
    console.log("Retrieved link:", link);

    // if (!links[shortCode]) return res.status(404).send("404 error occurred.");
    if (!link) return res.status(404).send("Links not found");

    return res.redirect(link.url);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
module.exports = { getData, postdata, shortCode };
