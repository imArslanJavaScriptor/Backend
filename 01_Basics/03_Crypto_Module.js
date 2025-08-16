const crypto = require("crypto")

console.log(crypto.randomBytes(8).toString("hex"))

const hashedValue = crypto
.createHash("sha256")
.update("Arslan")
.digest("hex")

const confirmHashedValue = crypto
.createHash('sha256')
.update("Arslan")
.digest("hex")

console.log(hashedValue)
console.log(confirmHashedValue)