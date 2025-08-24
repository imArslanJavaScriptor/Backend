import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);

const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      try {
        const data = await readFile(
          path.join(directoryName, "public", "index.html")
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } catch (error) {
        console.log(error);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Page not found");
      }
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
