const Product = require('../models/Product');

class ProductService {
    async createProduct(data) {
        return await Product.create(data);
    }

    async fetchAllProducts(query) {
        return await Product.find(query);
    }

    async fetchSingleProduct(query) {
        return await Product.findOne(query);
    }

    async updateProduct(id, data) {
        return await Product.findByIdAndUpdate(id, { $set: data }, { new: true });
    }
}

module.exports = ProductService;