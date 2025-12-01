const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
    }
});

categorySchema.pre("findOneAndDelete", async function(next) {
    try {
        const categoryId = this.getQuery()._id;
        await mongoose.model("SubCategory").deleteMany({ category: categoryId });
        await mongoose.model("ExtraCategory").deleteMany({ categoryId: categoryId });
        next();
    } catch (error) {
        console.log("Cascade delete error:", error);
        next(error);
    }
});

module.exports = mongoose.model("Category", categorySchema);
