const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

let books = [
  {
    bookNo: "501",
    bookName: "The Art of Thinking Clearly",
    author: "Rolf Dobelli",
    language: "English",
    publishedDate: "2013-04-01",
    duplicates: 8,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnG0S9JyErE_jFmbfLIfGn4xJW4X_1yRP17w&s"
  },
  {
    bookNo: "502",
    bookName: "Atomic Habits",
    author: "James Clear",
    language: "English",
    publishedDate: "2018-10-16",
    duplicates: 10,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
  },
  {
    bookNo: "503",
    bookName: "Deep Work",
    author: "Cal Newport",
    language: "English",
    publishedDate: "2016-01-05",
    duplicates: 6,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg"
  },
  {
    bookNo: "504",
    bookName: "Educated: A Memoir",
    author: "Tara Westover",
    language: "English",
    publishedDate: "2018-02-20",
    duplicates: 5,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg"
  },
  {
    bookNo: "505",
    bookName: "The Psychology of Money",
    author: "Morgan Housel",
    language: "English",
    publishedDate: "2020-09-08",
    duplicates: 7,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRo5pGzVIYUE7JI6Ke9BI4OzkTTRIevVi8Ew&s"
  },
  {
    bookNo: "506",
    bookName: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    language: "English",
    publishedDate: "2016-09-13",
    duplicates: 9,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg"
  }
];

// Home page
server.get("/", (req, res) => {
  res.render("Index", { books });
});

// Add book form
server.get("/add", (req, res) => {
  res.render("Add");
});

// Add book handler
server.post("/add-book", (req, res) => {
  console.log(req.body);
  const { bookNo, bookName, author, language, publishedDate, duplicates, imageUrl } = req.body;

  const newBook = {
    bookNo: bookNo.trim(),
    bookName: bookName.trim(),
    author: author.trim(),
    language: language.trim(),
    publishedDate: publishedDate,
    duplicates: parseInt(duplicates) || 1,
    imageUrl: imageUrl.trim()
  };

  books.push(newBook);
  res.redirect("/");
});

// Delete book handler
server.get("/delete-book/:bookNo", (req, res) => {
  const bookNo = req.params.bookNo;
  books = books.filter(bk => bk.bookNo !== bookNo);
  res.redirect("/");
});

// Edit book form
server.get("/edit-book/:bookNo", (req, res) => {
  const bookNo = req.params.bookNo;
  const singleBook = books.find(bk => bk.bookNo === bookNo);
  if (!singleBook) return res.status(404).render("NotFound");
  res.render("Edit", { book: singleBook });
});

// Update book handler
server.post("/update-book/:bookNo", (req, res) => {
  const bookNo = req.params.bookNo;
  const { bookName, author, language, publishedDate, duplicates, imageUrl } = req.body;

  books = books.map(bk => {
    if (bk.bookNo === bookNo) {
      return {
        bookNo: bookNo,
        bookName: bookName.trim(),
        author: author.trim(),
        language: language.trim(),
        publishedDate: publishedDate,
        duplicates: parseInt(duplicates) || 1,
        imageUrl: imageUrl.trim()
      };
    }
    return bk;
  });

  res.redirect("/");
});

// 404 page
server.use((req, res) => {
  res.status(404).render("NotFound");
});

// Start the server
server.listen(8005, () => {
  console.log("Server started at http://localhost:8005");
});
