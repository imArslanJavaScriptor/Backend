const fs = require("fs")
const path = require("path")

// const fileName = 'Async.txt'
// const filePath = path.join(__dirname, fileName)
// const FileData = 'This is Async File Document.'

// Syntext Diffrence:
// fs.writeFile(path, data, options, callback)
// Everything Same like we did in Sync Methods
// Here Just we get an CallBack FN with err argument.

// Create File
// const createFileAsync = fs.writeFile(filePath, FileData, "utf-8", (err) => {
//     if(err) console.error(err)
//     else console.log('File Created Successfully.')
// })

// console.log(createFileAsync)

// Read File
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
const renamedFileName = 'AsyncRenamed.txt'
const oldPath = path.join(__dirname, "Async.txt")
const newPath = path.join(__dirname, renamedFileName)

const renameFileAsync = fs.rename(oldPath, newPath, (err) => {
    if(err) console.error(err)
    else console.log(`${renamedFileName}  Successfully Renamed.`)
})
console.log(renameFileAsync)