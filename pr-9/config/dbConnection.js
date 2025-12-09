const mongoose = require('mongoose');

const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Conneted Successfully...");
    })
    .catch((err)=>{
        console.log("Database Connection Failed...", err);
    })
}

module.exports = dbConnect;