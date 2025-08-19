const path = require("path");

console.log("File Name: ", __filename);
console.log("Directory Name: ", __dirname);

const FilePath = path.join("public", "images", "loader.png");
// console.log(FilePath);

const ParseData = path.parse(FilePath);
const ResolvePath = path.resolve(FilePath);
const ExtentionName = path.extname(FilePath);
const BaseName = path.basename(FilePath);
const DirectoryName = path.dirname(FilePath);

console.log("====", DirectoryName);
