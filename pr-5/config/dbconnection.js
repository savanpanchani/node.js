const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose.connect("mongodb://localhost:27017/")
        .then(() => console.log("DB is connected..."))
        .catch(err => console.error("DB Connection Error:", err));
};

module.exports = dbconnection();