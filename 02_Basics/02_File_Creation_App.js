import fs from "fs/promises";
import path, { dirname } from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirPath = path.dirname(fileName);

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createFile = () => {
  readLineInterface.question("Enter Your File Name: ", (fileName) => {
    readLineInterface.question("File Content: ", async (content) => {
      try {
        const filePath = path.join(dirPath, `${fileName}.txt`);
        await fs.writeFile(filePath, content, "utf-8");
        console.log(`✅ File ${fileName} Created Successfully at ${filePath}`);
      } catch (error) {
        console.log(`Error is File Creation: `, error);
      } finally {
        readLineInterface.close();
      }
    });
  });
};

createFile();
