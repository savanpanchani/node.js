require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const database = require('./config/connectDB');
database();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', require('./router/index.route'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))  