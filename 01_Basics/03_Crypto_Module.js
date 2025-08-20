const crypto = require("crypto");

// console.log(crypto.randomBytes(8).toString("hex"));

// const hashedValue = crypto.createHash("sha256").update("Arslan").digest("hex");

// const confirmHashedValue = crypto
//   .createHash("sha256")
//   .update("Arslan")
//   .digest("hex");

// console.log(hashedValue);
// console.log(confirmHashedValue);

// ============= Register User ==============
const password = "ThisIsMyPassword240";

const hasedPassword = crypto
  .createHash("sha256")
  .update(password)
  .digest("hex");

console.log("Hashed Password: ", hasedPassword);

// ============= Verify User ==============

const enteredPassword = "ThisIsMyPassword240";

const confirmHashedPassword = crypto
  .createHash("sha256")
  .update(enteredPassword)
  .digest("hex");

if (confirmHashedPassword === hasedPassword) {
  console.log("User Verified Successfully");
} else {
  console.log("User Verification Failed");
}
