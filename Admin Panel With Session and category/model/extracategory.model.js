const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    // Category se link karne ke liye
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Aapke Category model ka naam yahan hona chahiye
        required: true
    },
    // SubCategory se link karne ke liye
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory', // Aapke SubCategory model ka naam yahan hona chahiye
        required: true
    },
    // Extra Category ka naam
    extracategoryname: {
        type: String,
        required: true
    },
    // Extra Category ki image ka path
    extracategory_image: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Isse createdAt aur updatedAt automatically add ho jayenge
});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema, 'ExtraCategory');

