const mongoose = require("mongoose");


const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    category: { type: String, required: true ,
        enum : ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
    },
    isdelete: { type: Boolean, default: false },

});
module.exports = mongoose.model("Recipe", recipeSchema);
