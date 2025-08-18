import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Hello World! | About Page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Hello World! | Contact Page</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
