const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("welcome to the home");
});

app.post("/api/auth", (req, res) => {
  res.json({ msg: "data reciver" });
});

app.use("/", (req, res) => {
  res.status(200).json({ msg: "data reciver" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
