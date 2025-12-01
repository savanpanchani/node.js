const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategoryName: String,
});

module.exports = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
