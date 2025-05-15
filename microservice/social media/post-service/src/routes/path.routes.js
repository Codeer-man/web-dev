const express = require("express");
const {
  createPost,
  getpost,
  getAllpost,
  deletepost,
} = require("../controllers/post.controller");
const authenticateRequest = require("../middleware/auth.middleware");
const router = express.Router();

router.use(authenticateRequest);
router.post("/create-post", createPost);
router.get("/get-Allpost", getAllpost);
router.get("/:id", getpost);
router.delete("/user/:userId/post/:postId", deletepost);

module.exports = router;
