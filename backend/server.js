const express = require("express");

const router = require("./router/auth-router.js")
// const router = require("./router/auth-router");
const connectionDB = require("./utils/db.js")

const app = express();

app.use(express.json());

app.use("/api/auth", router);

const PORT = 5000;

connectionDB().then(()=>  {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
})



