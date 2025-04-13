import dotenv from "dotenv";

import express from "express";
import path from "path";

const app = express();
dotenv.config();

const staticpath = path.join(import.meta.dirname, "public");
const pagenotFound = path.join(import.meta.dirname, "views");
// const staticPath = path.join(__dirname, "public");
app.use("/", express.static(staticpath));
app.use((req, res) => {
  // res.status(404).send("Page not found");
  res.sendFile(express.static(pagenotFound));
});

app.get("/contact", (req, res) => {
  console.log(req.query);
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
