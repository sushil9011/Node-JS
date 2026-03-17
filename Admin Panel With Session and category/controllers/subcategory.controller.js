const subcategory = require("../model/subcategory.model");
const category = require("../model/category"); // Dropdown ke liye zaroori hai
const extracategory = require("../model/extracategory.model"); // Dropdown ke liye zaroori hai

const fs = require('fs');

// Add Sub-Category Page
module.exports.addSubCategory = async (req, res) => {
    try {
        const categories = await category.find({}); // Dropdown mein dikhane ke liye
        return res.render("subcategory/addSubCategory", { categories });
    } catch (err) {
        return res.redirect('back');
    }
}

// Insert Sub-Category Logic
module.exports.insertSubCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.subcategory_image = req.file.path;
        }
        await subcategory.create(req.body);
        req.flash('success', "Sub-Category added successfully!"); // FLASH_MESSAGE_ADDED
        return res.redirect('/subcategory/viewSubCategory');
    } catch (err) {
        console.log("Error:", err);
        req.flash('error', "Failed to add Sub-Category."); // FLASH_MESSAGE_ADDED
        return res.redirect('back');
    }
}

// View Sub-Category Logic (With Populate)
module.exports.viewSubCategory = async (req, res) => {
    try {
        // subcategories fetch karna aur parent category ka data populate karna
        const subcategories = await subcategory.find({}).populate('categoryId');
        return res.render("subcategory/viewSubCategory", { subcategories });
    } catch (err) {
        console.log("View Error:", err);
        return res.redirect('back');
    }
}

// / --- DELETE SUB-CATEGORY (With Cascading) ---
module.exports.deleteSubCategory = async (req, res) => {
    try {
        const subId = req.query.subId;

        // 1. Sub-category data aur image delete karein
        let subData = await subcategory.findById(subId);
        if (subData && subData.subcategory_image) {
            if (fs.existsSync(subData.subcategory_image)) {
                fs.unlinkSync(subData.subcategory_image);
            }
        }

        // 2. Is Sub-category se judi saari Extra-categories dhundo
        let allExtra = await extracategory.find({ subcategoryId: subId });

        for (let extra of allExtra) {
            // Extra-category image delete karein
            if (extra.extracategory_image && fs.existsSync(extra.extracategory_image)) {
                fs.unlinkSync(extra.extracategory_image);
            }
        }

        // 3. Extra-categories delete karein
        await extracategory.deleteMany({ subcategoryId: subId });

        // 4. Sub-category delete karein
        await subcategory.findByIdAndDelete(subId);

        req.flash('success', "Sub-Category and linked Extra-Categories deleted!"); // FLASH_MESSAGE_ADDED
        return res.redirect('/subcategory/viewSubCategory');
    } catch (err) {
        console.log("Sub-delete error:", err);
        req.flash('error', "Error deleting Sub-Category."); // FLASH_MESSAGE_ADDED
        return res.redirect('back');
    }
}
// Edit Page
module.exports.editSubCategoryPage = async (req, res) => {
    try {
        const categories = await category.find({}); // Dropdown ke liye saari categories
        let singleSub = await subcategory.findById(req.params.subId); // current subcategory ka data

        if (singleSub) {
            return res.render("subcategory/editSubCategory", {
                singleSub,
                categories
            });
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// Update Sub-Category
module.exports.updateSubCategory = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await subcategory.findById(req.params.subId);
            if (oldData && oldData.subcategory_image && fs.existsSync(oldData.subcategory_image)) {
                fs.unlinkSync(oldData.subcategory_image);
            }
            req.body.subcategory_image = req.file.path;
        }
        await subcategory.findByIdAndUpdate(req.params.subId, req.body);
        req.flash('success', "Sub-Category updated successfully!"); // FLASH_MESSAGE_ADDED
        return res.redirect('/subcategory/viewSubCategory');
    } catch (err) {
        req.flash('error', "Update failed."); // FLASH_MESSAGE_ADDED
        return res.redirect('back');
    }
}