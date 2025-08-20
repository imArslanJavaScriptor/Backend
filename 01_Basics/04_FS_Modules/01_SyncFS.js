/*
 * fs.writeFileSync(): Writes data to a file.
 * 1- If the file does not exist, it will be created.
 * 2- If the file exists, its content will be overwritten.
 * ✅ Syntax: fs.writeFileSync(filePath, data, options);
 *
 *? filePath: The path of the file to write to.
 *? data: The content to write into the file (string or Buffer).
 *? options: Optional. Can include:
 *       - encoding (default: 'utf8')
 *       - mode (default: 0o666)
 *       - flag (default: 'w')
 */

const fs = require("fs");
const path = require("path");

// Create File

// let fileName = 'test.txt'
// let filePath = path.join(__dirname, fileName)
// let fileData = 'Where there is a will there is a way.'

// const writeFile = fs.writeFileSync(
//     filePath,
//     fileData,
//     "utf-8"
// )
// console.log(writeFile)

/*
 * fs.readFileSync(): Reads the content of a file and returns it as a string or Buffer.
 *
 *! Syntax:
 *   const data = fs.readFileSync(filePath, options);
 *
 *? filePath: The path of the file to read.
 *? options: Optional. Can include:
 *       - encoding (e.g., 'utf8') → returns data as a string.
 *       - flag (default: 'r')
 *
 * Note: If no encoding is specified, the method returns a Buffer.
 */

// Read File
// let fileName = 'test.txt'
// let filePath = path.join(__dirname, fileName)

// const readFile = fs.readFileSync(filePath, 'utf-8')
// console.log(readFile)

// const readFile = fs.readFileSync(filePath)
// console.log(readFile.toString())

// Importent: Use toString() if working with binary data (buffer): For example, if you  need both the raw binary data and its string representation.

/*
 * fs.appendFileSync(): Appends data to a file.
 * If the file does not exist, it will be created.
 *
 *! Syntax:
 *   fs.appendFileSync(filePath, data, options);
 *
 *? filePath: The path of the file to append to.
 *? data: The content to add to the file (string or Buffer).
 *? options: Optional. Can include:
 *       - encoding (default: 'utf8')
 *       - mode (default: 0o666)
 *       - flag (default: 'a')
 */

// Update File

// let fileName = 'test.txt'
// let filePath = path.join(__dirname, fileName)

// let updateFileData = '\n This is the Updated file data.'

// const appendFile = fs.appendFileSync(
//     filePath,
//     updateFileData,
//     "utf-8"
// )

// console.log(appendFile)

// Delete File: fs.unlinkSync(): Deleates a File By it's Path.
// filePath: The Path of the file to delete.

// Delete File

// let fileName = 'test.txt'
// let filePath = path.join(__dirname, fileName)

// const deleteFile = fs.unlinkSync(filePath)
// console.log(deleteFile)

// Rename File

// Rename File fs.renameFileSync(): Reanames a file from one name to another.
// Syntax: fs.renameSync(oldPath, newPath)

// let fileName = "update.txt";
// let oldPath = path.join(__dirname, fileName);
// let newPath = path.join(__dirname, "renamedTest.txt");

// const renameFile = fs.renameSync(oldPath, newPath);
// console.log(renameFile);
