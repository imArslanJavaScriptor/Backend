const fs = require("fs")
const path = require("path")

const fileName = 'FS_Promises_File.txt'
const filePath = path.join(__dirname, fileName)
const FileData = 'This is Promises File Document.'


const file = __dirname
fs.promises.readdir(file)
.then((data) => console.log(data))
.catch((err) => console.log(err))

// Create File
// fs.promises.writeFile(filePath, FileData, "utf-8")
// .then(() => console.log("File Created Successfully"))
// .catch((err) => console.log(err))


// Read File
// fs.promises.readFile(filePath, "utf-8")
// .then((data) => console.log(data))
// .catch((err) => console.log(err))


// Update File
// fs.promises.appendFile(filePath, "\nThis is Update Document For FS_Promises_File")
// .then(() => console.log("File Updated Successfully"))
// .catch((err) => console.log(err))


// Delete File
// fs.promises.unlink(filePath)
// .then(() => console.log("File Deleted Successfully"))
// .catch((err) => console.log(err))


// Tired of writing fs.promises everywhere 
// You can simply const fs = require("fs/promises")