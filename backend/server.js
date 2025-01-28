// const express = require("express");
// const router = require("./router/auth-router");
// const connectDb = require("./utils/db.js");
import express from 'express';
import router from './router/auth-router.js';
import connectDb from './utils/db.js';

const app = express();

app.use(express.json());
app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
