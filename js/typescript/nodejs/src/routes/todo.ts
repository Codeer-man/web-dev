// const express = require("express");

// const route = express.Router();

import express from "express";

const router = express.Router();

router.route("/").post();
router.route("/").get();
router.route("/:todoId").patch();
router.route("/:todoId").delete();

export default router;
