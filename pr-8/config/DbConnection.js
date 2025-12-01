const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
 await mongoose.connect("mongodb+srv://savanpanchani18_db_user:Savan0018@cluster0.9pjdcr1.mongodb.net/Adminpanel")       
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
  }
};

module.exports = dbConnect;
