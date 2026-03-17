const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Category model ka reference
        required: true
    },
    subcategory_name: String,
    subcategory_image: String
});

module.exports = mongoose.model('SubCategory', subCategorySchema, 'SubCategory');