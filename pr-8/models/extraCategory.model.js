const mongoose = require("mongoose");

const extraCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    extraCategory: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("ExtraCategory", extraCategorySchema);
