const mongoose =   require("mongoose")

const DB_connection = async (req, res) => {
    await mongoose.connect("mongodb+srv://savanpanchani18_db_user:Savan0018@cluster0.9pjdcr1.mongodb.net/Adminpanel")
    .then("connection successfully ")
    .catch((err) =>  console.log(err))
}

module.exports = DB_connection;
