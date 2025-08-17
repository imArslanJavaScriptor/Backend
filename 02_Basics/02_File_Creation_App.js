import fs from "fs/promises";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

// __dirname is not available in ES modules, so we recreate it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filedir = __dirname;

const fileCreatorFunction = () => {
  readLine.question("📄 Enter Your File Name: ", (fileName) => {
    readLine.question("📝 Enter The File Content: ", async (content) => {
      try {
        const filePath = path.join(filedir, `${fileName}.txt`);
        await fs.writeFile(filePath, content, "utf-8");
        console.log(`✅ File created successfully at: ${filePath}`);
      } catch (err) {
        console.log(`❌ Error in File Creation: ${err.message}`);
      } finally {
        readLine.close();
      }
    });
  });
};

fileCreatorFunction();
