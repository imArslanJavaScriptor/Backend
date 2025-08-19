import express from "express";
import { PORT } from "./env.js";
import Path from "path";

const app = express();

// After Node Version 14.8 and above, we can use top-level await without needing to wrap it in an sync function.

const data = await fetch("https://jsonplaceholder.typicode.com/posts");
const jsonData = await data.json();

// To use import.meta.dirname and import.meta.filename, pur node version should be 20.11.0 or above.

// Middleware to serve static files
const staticPath = Path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  // console.log(__dirname);
  // console.log(__filename);

  console.log(import.meta.dirname);
  console.log(import.meta.filename);

  // To Get Absolute Path
  const fileName = new URL(import.meta.url);
  console.log(fileName.pathname);

  const homePage = Path.join(import.meta.dirname, "public", "index.html");

  res.sendFile(homePage);
});

// Dynamic route using Route Parameters
app.get("/profile/:username", (req, res) => {
  console.log(req.params);
  res.send(`<h1>Welcome to the profile ${req.params.username}</h1>`);
});

app.get("/profile/:username/article/:slug", (req, res) => {
  const { username, slug } = req.params;

  // This is RegEX = /-/g
  // It replaces all occurrences of '-' with ' ' globally in the string.
  // The 'g' flag means global, so it replaces all instances, not just the first one.

  const displayUserName = username.replace(/-/g, " ");
  const displaySlug = slug.replace(/-/g, " ");

  console.log({ username: displayUserName, slug: displaySlug });

  res.send(
    `<h1>Welcome to the article ${displaySlug} By ${displayUserName}</h1>`
  );
});

// Query Parameters
app.get("/product", (req, res) => {
  console.log(req.query);
  res.send(`<h1>Product Page ${JSON.stringify(req.query)}</h1>`);
  // res.send(`<h1>Product Page ${req.query.search}</h1>`);
});

// This Method will not work if you're using a form with method="POST"
// app.get("/contact", (req, res) => {
//   console.log(req.query);
//   // res.redirect("/");
//   res.send("OK");
// });

// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());
app.post("/contact", (req, res) => {
  console.log(req.body);
  // res.redirect("/");
  res.send("OK");
});

// Page Not Found Middleware
// app.use((req, res) => res.status(404).send("Page Not Found"));
app.use((req, res) => {
  return res
    .status(404)
    .sendFile(Path.join(import.meta.dirname, "views", "404.html"));
});

app.use((req, res) => res.status(404).send("Page Not Found"));

// Study About
// Problem with  Getting Form Data with Get Method
// Wht Post Method is Woking Fine.
// What is the Benefit of this Middleware app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
