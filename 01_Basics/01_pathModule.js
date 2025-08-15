const path = require("path")

console.log("File Name", __filename)
console.log("Directory Name", __dirname)
const filePath = path.join("folder", "students", "data.txt") 
console.log(filePath)

const parseData = path.parse(filePath)
const resolvePath = path.resolve(filePath)
const extname = path.extname(filePath)
const basename = path.basename(filePath)
const dirname = path.dirname(filePath)

console.log({parseData, resolvePath, extname, basename, dirname, separator: path.sep})