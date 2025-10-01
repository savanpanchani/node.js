const express = require("express");
const dbConnection = require("./config/dbConnection");
const Book = require("./model/book.model");

dbConnection();
const server = express();
const port = 8111;

server.set("view engine", "ejs");
server.use(express.urlencoded());




server.get("/", async (req, res) => {
  try {
    const { language = "", genre = "", edition = "" } = req.query;

    let filter = {};
    if (language) filter.language = language;
    if (genre) filter.genre = genre;
    if (edition) filter.edition = edition;

    const books = await Book.find(filter);

    res.render("index", {
      books,
      language,
      genre,
      edition,
      notFound: books.length === 0
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
});


server.get("/add", (req, res) => {
  res.render("Add");
});


server.post("/add-book", async (req, res) => {
  try {
    await Book.create(req.body);
    console.log("Book Added Successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("Error adding book:", error);
    res.send("Something went wrong!");
  }
});


server.get("/delete-book/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    console.log("Book Deleted Successfully.");
    res.redirect("/");
  } catch (error) {
    console.log("Error: Book Not Deleted.");
    res.send("Something went wrong!");
  }
});


server.get("/edit-book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render("edit", { book });
  } catch (error) {
    console.error("Error fetching book for edit.");
    res.send("Something went wrong!");
  }
});


server.post("/edit/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Book Updated Successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("Error updating book.");
    res.send("Something went wrong!");
  }
});

server.get("/view-book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.render("view", { book });
  } catch (error) {
    console.error("Error loading book view:", error);
    res.send("Something went wrong!");
  }
});
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
