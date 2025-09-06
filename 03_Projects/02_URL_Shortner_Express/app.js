import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);

const PORT = 3000;
const DATA_FILE = path.join(directoryName, "data", "links.json");

// Serve static files like HTML/CSS
const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Page not found.");
  }
};

// Load saved links from JSON file
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create one
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// Save links to JSON file
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
};

// Main server
const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(
        res,
        path.join(directoryName, "public", "index.html"),
        "text/html"
      );
    } else if (req.url === "/styles.css") {
      return serveFile(
        res,
        path.join(directoryName, "public", "styles.css"),
        "text/css"
      );
    } else if (req.url === "/links") {
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(links));
    } else {
      // Redirect if short code exists
      const links = await loadLinks();
      const shortCode = req.url.slice(1); // remove "/"
      if (links[shortCode]) {
        res.writeHead(302, { location: links[shortCode] });
        return res.end();
      }

      // Fallback if short code not found
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Page not found.");
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    const links = await loadLinks();

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { url, shortCode } = JSON.parse(body);

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("URL is required");
      }

      // Generate random short code if user didn’t provide
      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

      // Check if short code already exists
      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Short Code already exists. Please choose another.");
      }

      // Save new shortened URL
      links[finalShortCode] = url;
      await saveLinks(links);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
