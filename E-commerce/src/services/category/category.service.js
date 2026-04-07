const Category = require('../../model/category.model');

module.exports = class CategoryService {
    async insertNewCategory(body) {
        try {
            return await Category.create(body);
        } catch (err) {
            console.log("Add New Category Error: ", err);
        }
    }

    async fetchAllCategory() {
        try {
            return await Category.find({ isDelete: false });
        } catch (err) {
            console.log("Fetch All Category Error: ", err);
        }
    }

    async updateCategory(id, body) {
        try {
            return await Category.findByIdAndUpdate(id, body, { new: true });
        } catch (err) {
            console.log("Update Category Error: ", err);
        }
    }
}