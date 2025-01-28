const Book = require("../models/model");

const getAllBook = async (req, res) => {
  try {
    const viewAllBook = await Book.find({});
    if (viewAllBook && viewAllBook.length > 0) {
      res.status(200).json({
        sucess: true,
        data: viewAllBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
const getSingleBookById = async (req, res) => {
  try {
    const currentBook = req.params.id;
    const book = await Book.findById(currentBook);

    if (book) {
      res.status(200).json({
        msg: "Book founded",
        sucess: true,
        data: book,
      });
    } else {
      res.status(404).json({
        msg: "Book not found try different id",
        sucess: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      msg: "Book not found",
      sucess: false,
    });
  }
};
const addNewBook = async (req, res) => {
  try {
    const book = req.body;
    const newBook = await Book.create(book);

    if (newBook) {
      res.status(201).json({
        msg: "Book added sucessfully",
        data: newBook,
        sucess: true,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
const updateBookById = async (req, res) => {
  try {
    const updatedBookFormData = req.body;
    const currentBookId = req.params.id;
    const updatebook = await Book.findByIdAndUpdate(
      currentBookId,
      updatedBookFormData,
      {
        new: true,
      }
    );

    if (!updatebook) {
      res.status(404).json({ msg: "book not found", sucess: false });
    } else {
      res.status(200).json({
        msg: "Book has been updated",
        data: updatebook,
        sucess: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
const deleteBookById = async (req, res) => {
  const currentBookId = req.params.id;
  const deleteBook = await Book.findByIdAndDelete(currentBookId);
  try {
    if (deleteBook) {
      res.status(200).json({
        sucess: true,
        msg: "Book deleted successfully",
      });
    } else {
      res.status(404).json({
        sucess: false,
        msg: "Book not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {
  getAllBook,
  getSingleBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
};
