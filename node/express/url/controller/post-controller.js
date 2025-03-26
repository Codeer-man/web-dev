const crypto = require("crypto");
const { loadLinks, saveLinks } = require("../models/links");

const postfolder = async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Please provide a valid URL" });
    }

    const links = await loadLinks();
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    if (links[finalShortCode]) {
      return res.status(400).json({ error: "Short code already exists" });
    }

    links[finalShortCode] = url;
    await saveLinks(links);

    res.json({ success: true, shorten: finalShortCode });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Redirect to the original URL if shortCode exists
const getData = async (req, res) => {
  try {
    const links = await loadLinks();
    const { shortCode } = req.params;

    if (links[shortCode]) {
      return res.redirect(302, links[shortCode]);
    }

    res.status(404).send("Shortened code not found");
  } catch (error) {
    console.error("Error fetching link:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { postfolder, getData };
