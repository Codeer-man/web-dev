import express from "express";
import router from "./router/auth-router.js";
// const router = require("./router/auth-router");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
