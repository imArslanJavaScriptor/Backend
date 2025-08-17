import { readFile } from "fs/promises";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    console.log("Error:", error);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page Not Found");
  }
};

const server = http.createServer(async (req, res) => {
  console.log(req.url);

  if (req.method === "GET") {
    switch (req.url) {
      case "/":
        return serveFile(
          res,
          path.join(__dirname, "public", "index.html"),
          "text/html"
        );

      case "/styles.css":
        return serveFile(
          res,
          path.join(__dirname, "public", "styles.css"),
          "text/css"
        );

      case "/favicon.ico": // optional: to stop error logs
        res.writeHead(204); // No Content
        return res.end();

      default:
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Page Not Found");
    }
  }

  if(req.method === "POST" && req.url === "/shorten") {
    const body = ""
    req.on("data", (chunk) => {
        body += chunk
    })
    req.on("end", () => {
        console.log(body)
        const {url, shortCode} = JSON.parse(body)

// URL Shortener Project in Node.js (Part 3) | Starts From Here

        if(!url) {
            res.writeHead(400, {"Content-Type":"text/plain"})
            return res.end("URL is required")
        }
    })
  }


});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
