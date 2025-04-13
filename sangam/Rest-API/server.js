const express = require("express");

const app = express();

app.use(express.json());

let books = [
  {
    id: 1,
    title: "book 1",
  },
  {
    id: 2,
    title: "book 2",
  },
];

app.get("/", (req, res) => {
  res.json("welcome to book store api");
});

app.get("/get-books", (req, res) => {
  res.json(books);
});

// get single book
app.get("/get/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((item) => item.id === bookId);

  if (book) {
    res.status(200).json(book);
    console.log("data given");
  } else {
    res.status(404).json({ msg: "choose a valid id" });
    console.log("data not given");
  }
});

// add new books
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `book ${books.length + 1}`,
  };

  books.push(newBook);
  res.status(200).json({ msg: "Book added successfully", data: newBook });
});

// update books
app.put("/update/:id", (req, res) => {
  const Bookid = parseInt(req.params.id);
  const currentBook = books.find((item) => item.id === Bookid);

  if (currentBook) {
    currentBook.title = req.body.title || currentBook.title;

    res.status(200).json({ msg: `book with id ${Bookid} has been updated` });
  } else {
    res.status(404).json({ msg: "book id not found", data: currentBook });
  }
});

// delete books
app.delete("/delete/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const currentBookIndex = books.findIndex((item) => item.id === bookId);

  if (currentBookIndex !== -1) {
    const deletedBook = books.splice(currentBookIndex, 1);
    res.status(200).json({
      msg: `Book with ID ${bookId} has been deleted`,
      data: deletedBook,
    });
  } else {
    res.status(404).json({ msg: "Book ID not found" });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`you are listening to port ${port}`);
});
