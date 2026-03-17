const category = require("../model/category"); // Path sahi check karlein
const subcategory = require("../model/subcategory.model")
const extracategory = require("../model/extracategory.model");
const Product = require("../model/product.model");
const fs = require('fs');

// Add Category Page
module.exports.addCategory = (req, res) => {
    return res.render("category/addCategory");
}

// Insert Category Logic
module.exports.insertCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.category_image = req.file.path;
        }

        await category.create(req.body);
        req.flash('success', "Category successfully created!"); // FLASH_MESSAGE_ADDED
        return res.redirect('/category/viewCategory');
    } catch (err) {
        console.log("Error in inserting category:", err);
        req.flash('error', "Something went wrong while creating category."); // FLASH_MESSAGE_ADDED
        return res.redirect('back');
    }
}
// View Category Logic
module.exports.viewCategory = async (req, res) => {
    try {
        // CORRECTED: Database se real data nikalna
        const allCategories = await category.find({});

        console.log(allCategories);

        return res.render("category/viewCategory", {
            allCategories: allCategories
        });
    } catch (err) {
        console.log("Error in viewing category:", err);
        return res.redirect('back');
    }
}

// --- DELETE CATEGORY ---
// --- DELETE CATEGORY (With Cascading Delete) ---
module.exports.deleteCategory = async (req, res) => {
    try {
        const catId = req.query.catId;

        // 1. Category ki details nikalein (Image delete karne ke liye)
        let categoryData = await category.findById(catId);
        if (!categoryData) {
            req.flash('error', "Category nahi mili!");
            return res.redirect('back');
        }

        // 2. Us Category se jude saare PRODUCTS delete karein
        // Pehle products ki images unlink karna chahein toh yahan loop chala sakte hain
        await Product.deleteMany({ categoryId: catId });

        // 3. Us Category se jude saare EXTRA-CATEGORIES delete karein
        await extracategory.deleteMany({ categoryId: catId });

        // 4. Us Category se jude saare SUB-CATEGORIES delete karein
        await subcategory.deleteMany({ categoryId: catId });

        // 5. Category ki apni image storage se delete karein
        if (categoryData.category_image && fs.existsSync(categoryData.category_image)) {
            fs.unlinkSync(categoryData.category_image);
        }

        // 6. Last mein MAIN CATEGORY ko database se delete karein
        await category.findByIdAndDelete(catId);

       req.flash('success', "Category and all its associated data (Products, Sub-Categories) have been deleted!");
        return res.redirect('/category/viewCategory');

    } catch (err) {
        console.log("Cascading Delete Error:", err);
        req.flash('error', "Kuch galat hua, data puri tarah delete nahi ho paya.");
        return res.redirect('back');
    }
}
// --- EDIT PAGE ---
module.exports.editCategoryPage = async (req, res) => {
    try {
        let singleCategory = await category.findById(req.params.catId);
        return res.render("category/editCategory", { singleCategory });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// --- UPDATE CATEGORY ---
module.exports.updateCategory = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await category.findById(req.params.catId);
            if (oldData.category_image && fs.existsSync(oldData.category_image)) {
                fs.unlinkSync(oldData.category_image);
            }
            req.body.category_image = req.file.path;
        }
        await category.findByIdAndUpdate(req.params.catId, req.body);
        req.flash('success', "Category updated successfully!"); // FLASH_MESSAGE_ADDED
        return res.redirect('/category/viewCategory');
    } catch (err) {
        console.log(err);
        req.flash('error', "Update failed."); // FLASH_MESSAGE_ADDED
        return res.redirect('back');
    }
}