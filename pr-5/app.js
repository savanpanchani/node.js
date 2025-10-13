const express = require("express");
const port = 9999;

const dbConnection = require("./config/dbconnection");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static('uploads'));

app.use('/', require("./routes/movie.routes"))

app.listen(port, () => {
    dbConnection;
    console.log(`Server started at http://localhost:${port}`);
});