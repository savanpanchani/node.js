const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose.connect("mongodb+srv://savanpanchani18_db_user:Savan0018@cluster0.9pjdcr1.mongodb.net/movie")
        .then(() => console.log("DB is connected..."))
        .catch(err => console.error("DB Connection Error:", err));
};

module.exports = dbconnection();