require('dotenv').config();
const express = require ('express');
const port = process.env.PORT;
const app = express();
const dbConnect = require('./config/dbConnection');
const cors = require('cors');


//Database Connection
dbConnect();

//Middleware
app.use(cors({
    origin: "your frontend live url"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


//routes
app.use("/api", require('./routes/index.routes'));

//Server started
app.listen(port, ()=>{
    console.log(`Server Listening on http://localhost:${port}`); 
})