
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
   image: {
    type: String,
},
    description: {
        type: String, 
    },
    title: {
        type: String,
    },
    
    author: {
        type: String,
    },

    language: {
        type: String,
    },
    edition: {
        type: String,
    },
    
    pages: {
        type: String,
    },
    price: {
        type: Number,
    },

    publishedYear: {
        type: Number,
    },

});

let Book = mongoose.model('Book', bookSchema);
module.exports = Book;
