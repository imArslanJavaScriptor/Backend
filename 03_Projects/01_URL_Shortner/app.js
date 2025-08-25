import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);

const PORT = 3000;
const DATA_FILE = path.join(directoryName, "data", "links.json");

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

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
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
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
};

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
    } else {
      // Check if it's a short code redirect
      const links = await loadLinks();
      const code = req.url.slice(1); // remove leading "/"
      if (links[code]) {
        res.writeHead(302, { Location: links[code] });
        return res.end();
      }

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

      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Short Code already exists. Please choose another.");
      }

      links[finalShortCode] = url;
      await saveLinks(links);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
