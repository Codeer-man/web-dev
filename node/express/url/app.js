const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

const publicFolder = path.join(__dirname, "public");
const DATA_FILE = path.join(__dirname, "data", "link.json");

// Middleware
app.use(express.static(publicFolder)); // Serve static files (HTML, CSS)
app.use(express.json()); // Parse JSON body

// Load stored links from JSON
const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return data.trim() ? JSON.parse(data) : {};
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// Save links to JSON file
const saveLinks = async (links) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

// Serve HTML file
app.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (error) {
    console.error("Internal server error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Handle URL shortening
app.post("/shorten", async (req, res) => {
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
});

// Redirect to the original URL if shortCode exists
app.get("/:shortCode", async (req, res) => {
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
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
