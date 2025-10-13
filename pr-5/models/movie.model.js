const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: 
    { type: String, 
        required: true },
    director: 
    { type: String,
        required: true },
    genre: 
    { type: String,
         required: true },
    cast: 
    { type: String,
        },
    year:
     { type: Number, 
        required: true },
    description:
     { type: String },
    category: { type: String },
    image: { type: String },
});

module.exports = mongoose.model('Movie',movieSchema);

