const fs = require("fs");
const path = require("path");

const dirPath = __dirname;

// Read Directory Using Promises
fs.promises
  .readdir(dirPath)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Read Directory Using Async Await
const readFolder = async () => {
  try {
    const res = await fs.promises.readdir(dirPath);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

readFolder();

// CRUD Operation Using Async Await

const docFile = 'Async_Await_Doc.txt'
const filePath = path.join(__dirname, docFile)
const FileData = 'This is Async Await File Document.\nI Perfrom CRUD Operation using Async Await on this file.'

const createFile = async () => {
    try {
        const data = await fs.promises.writeFile(filePath, FileData, "utf-8")
        return data
    } catch (error) {
        console.log(error)
    }
}

// createFile()

const readFile = async () => {
    try {
        const data = await fs.promises.readFile(filePath, "utf-8")
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// readFile()

const updateFile = async () => {
    try {
        const data = await fs.promises.appendFile(filePath, "\nUpdate Date From Async Await")
        console.log("Data Updated Successfully")
    } catch (error) {
        console.log(error)
    }
}

// updateFile()

const deleteFile = async () => {
    try {
        const data = await fs.promises.unlink(filePath)
        console.log(`${docFile} Deleted Successfully.`)
        // return data
    } catch (error) {
        console.log(error)
        
    }
}

// deleteFile()