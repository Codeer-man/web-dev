const express = require("express");
const {
  getAllBook,
  getSingleBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/book-controller");

const router = express.Router();

router.get("/get", getAllBook);
router.get("/get/:id", getSingleBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBookById);
router.delete("/delete/:id", deleteBookById);

module.exports = router;
