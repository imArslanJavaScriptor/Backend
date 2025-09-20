import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

import express from "express";

const app = express();

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);

app.use(express.static("public"));

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

app.get("/", async (req, res) => {
  try {
    const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks();
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    // Generate random short code if user didn’t provide
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();

    // Check if short code already exists
    if (links[finalShortCode]) {
      return res
        .status(400)
        .res.end("Short Code already exists. Please choose another.");
    }

    // Save new shortened URL
    links[finalShortCode] = url;
    await saveLinks(links);
  } catch (error) {}
});

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
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
