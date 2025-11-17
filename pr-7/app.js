const express = require("express");
const port = 9990;
const dbConnect = require("./config/DbConnection");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const { flashMessage } = require("./middleware/flashMessage");

// Routes
const indexRoutes = require("./routes/index.routes");
const blogRoutes = require("./routes/blog.routes");

// Passport
const passport = require("./middleware/localStrategy");

// Connect Database
dbConnect();

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Body parser + cookie
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session
app.use(session({
    name: "admin-session",
    secret: "admin12345",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Flash
app.use(flash());

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Custom middlewares
app.use(passport.setValidateUser); // add res.locals.user
app.use((req, res, next) => {
    res.locals.user = req.user || null; // for header ejs
    next();
});
app.use(flashMessage); // flash messages

// Routes
app.use("/", indexRoutes);
app.use("/blog", blogRoutes);

// 404 Page
app.use((req, res) => res.status(404).send("Page Not Found"));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
