import dotenv from "dotenv";

import express from "express";
import path from "path";

const app = express();
dotenv.config();

const staticpath = path.join(import.meta.dirname, "public");
// const staticPath = path.join(__dirname, "public");
app.use("/public", express.static(staticpath));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
