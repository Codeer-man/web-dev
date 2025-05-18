const express = require("express");
const authenticateRequest = require("../middleware/auth-middleware");
const { searchPost } = require("../controllers/search.controller");

const router = express.Router();

router.use(authenticateRequest);
router.get("/posts", searchPost);

module.exports = router;
