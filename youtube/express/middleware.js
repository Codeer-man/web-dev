const express = require("express");

const app = express();

const middleware = (req, res, next) => {
  console.log("This is going to be seem in all the pages");
  next();
};

app.use(middleware);

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.listen(3000, () => {
  console.log("server is running in 3000");
});
