const { readFile, writeFile } = require("fs/promises");
const { createServer } = require("http");
const path = require("path");
const crypto = require("crypto");

const DATA_FILE = path.join("data", "link.json");

const serverFile = async (res, filepath, content) => {
  try {
    const data = await readFile(filepath);
    res.writeHead(200, content);
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 page not found " + error.message);
  }
};

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");

    if (!data.trim()) {
      return {};
    }
    return JSON.parse(data);
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

const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serverFile(res, path.join("public", "index.html"), {
        "Content-Type": "text/html",
      });
    } else if (req.url === "/style.css") {
      return serverFile(res, path.join("public", "style.css"), {
        "Content-Type": "text/css",
      });
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const links = await loadLinks();
      const { url, shortCode } = JSON.parse(body);

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Please provide a valid URL");
        return;
      }

      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Short code already exists. Please choose another ");
        return;
      }

      links[finalShortCode] = url;
      await saveLinks(links);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, shorten: finalShortCode }));
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
