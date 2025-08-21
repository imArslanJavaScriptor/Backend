const fs = require("fs");
const path = require("path");

const fileName = "Async.txt";
const filePath = path.join(__dirname, fileName);
const FileData =
  "Once there was a crow. he was very thirsty. He saw a pot of water. The water was very low in the pot. He saw some stones nearby. He put the stones one by one into the pot. The water rose up. The crow drank the water and flew away.";

// Syntext Diffrence:
// fs.writeFile(path, data, options, callback)
// Everything Same like we did in Sync Methods
// Here Just we get an CallBack FN with err argument.

// Create File
const createFileAsync = fs.writeFile(filePath, FileData, "utf-8", (err) => {
  if (err) {
    console.log("Error Creating File:", err);
  } else {
    console.log("File Created Successfully.");
  }
});

// Read File
const readFileAsync = fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
// const readFileAsync = fs.readFile(filePath, "utf-8", (err, data) => {
//     if(err) console.error(err)
//     else console.log(data)
// })
// console.log(readFileAsync)

// Update File
// const updateFileAsync = fs.appendFile(filePath, "\nIm Appended into Async.txt File.", (err) => {
//     if(err) console.error(err)
//     else console.log('File Appended Successfully.')
// })
// console.log(updateFileAsync)

// Delete File
// const deleteFileAsync = fs.unlink(filePath, (err) => {
//     if(err) console.error(err)
//     else console.log(`${filePath} Successfully Deleted`)
// })
// console.log(deleteFileAsync)

// Rename File
// const renamedFileName = "AsyncRenamed.txt";
// const oldPath = path.join(__dirname, "Async.txt");
// const newPath = path.join(__dirname, renamedFileName);

// const renameFileAsync = fs.rename(oldPath, newPath, (err) => {
//   if (err) console.error(err);
//   else console.log(`${renamedFileName}  Successfully Renamed.`);
// });
// console.log(renameFileAsync);
