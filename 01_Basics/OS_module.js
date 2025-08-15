const os = require("os")

console.log(os)
console.log('Platform', os.platform())
console.log("User: ", os.userInfo())
console.log("CPU Architecture:", os.arch())
console.log('Free Memory:', os.freemem(), 'Bytes')
console.log('Total Memory:', os.totalmem(), 'Bytes')