import { readFile, writeFile } from "fs/promises"; // File system
import crypto from "crypto"; // For random codes
import http from "http"; // HTTP server
import path from "path"; // Path handling
import { fileURLToPath } from "url"; // ES module __dirname

const PORT = 3000; // Server port
const __filename = fileURLToPath(import.meta.url); // Current file path
const __dirname = path.dirname(__filename); // Current dir
const DATA_FILE = path.join(__dirname, "data", "links.json"); // Data file path

// Serve static files
const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath); // Read file
    res.writeHead(200, { "Content-Type": contentType }); // Success header
    res.end(data); // Send file
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" }); // Not found
    res.end("404 Page Not Found"); // Message
  }
};

// Load links safely
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8"); // Read JSON file
    return data.trim() ? JSON.parse(data) : {}; // Parse or empty
  } catch (error) {
    if (error.code === "ENOENT") {
      // If file missing
      await writeFile(DATA_FILE, JSON.stringify({}), "utf-8"); // Create empty
      return {};
    }
    if (error.name === "SyntaxError") {
      // If corrupted JSON
      await writeFile(DATA_FILE, JSON.stringify({}), "utf-8"); // Reset file
      return {};
    }
    throw error; // Other errors
  }
};

// Save links
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links), "utf-8"); // Save JSON
};

// Create HTTP server
const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url); // Log requests
  const links = await loadLinks(); // Load stored links

  if (req.method === "GET") {
    if (req.url === "/")
      return serveFile(
        res,
        path.join(__dirname, "public", "index.html"),
        "text/html"
      ); // Serve index
    if (req.url === "/styles.css")
      return serveFile(
        res,
        path.join(__dirname, "public", "styles.css"),
        "text/css"
      ); // Serve css
    if (req.url === "/favicon.ico") return res.writeHead(204).end(); // Ignore favicon
    if (req.url === "/links") {
      // API get all links
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    }
    const code = req.url.slice(1); // Remove /
    if (links[code]) {
      // If short code exists
      res.writeHead(302, { Location: links[code] }); // Redirect
      return res.end();
    }
    res.writeHead(404, { "Content-Type": "text/plain" }); // Not found
    return res.end("404 Page Not Found");
  }

  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";
    req.on("data", (chunk) => (body += chunk)); // Collect data
    req.on("end", async () => {
      try {
        const { url, shortCode } = JSON.parse(body); // Parse JSON body
        if (!url) {
          // Missing URL
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "URL is required" }));
        }
        const finalShortCode =
          shortCode || crypto.randomBytes(4).toString("hex"); // Generate code
        if (links[finalShortCode]) {
          // Duplicate code
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ error: "Short code already exists" })
          );
        }
        links[finalShortCode] = url; // Save link
        await saveLinks(links); // Persist
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: true, shortCode: finalShortCode })
        ); // Return success
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" })); // Invalid input
      }
    });
  }
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
); // Start server
