const fs = require("fs");
const path = require("path");

/*
 * fs.writeFileSync(): Writes data to a file.
 * 1- If the file does not exist, it will be created.
 * 2- If the file exists, its content will be overwritten.
 */

// Create File
const filePath = path.join(__dirname, "FirstFile.txt");
let fileData = "Once upon a time, there was a brave knight.";

const writeFile = fs.writeFileSync(filePath, fileData, "utf-8");
// console.log(writeFile);

/*
 fs.readFileSync(filePath, options): Reads the content of a file and returns it as a string or Buffer.
 *options: Optional. Can include:
 *       - encoding (e.g., 'utf8') → returns data as a string.
 *       - flag (default: 'r')
 *
 * Note: If no encoding is specified, the method returns a Buffer.
 */

// Read File
// const readFile = fs.readFileSync(filePath, "utf-8");
// console.log(readFile);

// Importent: Use toString() if working with binary data (buffer): For example, if you  need both the raw binary data and its string representation.

/*
 * fs.appendFileSync(filePath, data, options): Appends data to a file.
 * If the file does not exist, it will be created.
 */

// Update File
// let updateFilePath = path.join(__dirname, "UpdatedFile.txt");
// let updateFileData = "Where there is a will there is a way.";
// const updateFile = fs.appendFileSync(updateFilePath, updateFileData, "utf-8");
// console.log(updateFile);

// Now Append Data to the File
// let appendData = "\nAnd the journey continues.";

// const appendFile = fs.appendFileSync(filePath, appendData, "utf-8");
// console.log(appendFile);

/* Delete File: fs.unlinkSync(): Deleates a File By it's Path */

// const deleteFile = fs.unlinkSync(filePath);
// console.log(deleteFile);

// Rename File fs.renameSync(oldPath, newPath): Reanames a file from one name to another.

let newFilePat = path.join(__dirname, "RenamedFile.txt");

const renameFile = fs.renameSync(filePath, newFilePat);
// console.log(renameFile);
