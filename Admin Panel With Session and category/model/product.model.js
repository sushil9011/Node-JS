const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExtraCategory',
        required: true
    },
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },

    // Naya field: Old Price (Jo humne view mein add kiya hai)
    product_old_price: { type: Number },

    product_description: String,
    product_image: String,

    // Field name 'stock' rakhein kyunki EJS mein name="stock" hai
    stock: { type: String, default: 'In Stock' }
}, {
    timestamps: true // Isse createdAt aur updatedAt apne aap ban jayenge
});

module.exports = mongoose.model('Product', productSchema);