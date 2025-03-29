require("dotenv").config();

const express = require("express");
const route = require("./router/route");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add JSON middleware

app.set("view engine", "ejs");

// router
app.use(route);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
