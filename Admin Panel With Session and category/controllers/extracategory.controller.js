const category = require("../model/category");
const subcategory = require("../model/subcategory.model");
const extracategory = require("../model/extracategory.model");
const Product = require("../model/product.model");

const fs = require('fs'); // Fix: fs module import kiya

// View Page
module.exports.viewExtraCategory = async (req, res) => {
    try {
        const extraData = await extracategory.find({})
            .populate('categoryId')
            .populate('subcategoryId');
        return res.render("extracategory/viewExtraCategory", { extraData });
    } catch (err) {
        req.flash('error', 'Something went wrong while fetching data');
        return res.redirect('back');
    }
}

// Add Page
module.exports.addExtraCategory = async (req, res) => {
    try {
        const categories = await category.find({});
        const subcategories = await subcategory.find({});
        return res.render("extracategory/addExtraCategory", { categories, subcategories });
    } catch (err) {
        return res.redirect('back');
    }
}

// Insert Logic
module.exports.insertExtraCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.extracategory_image = req.file.path;
        }
        await extracategory.create(req.body);
        req.flash('success', 'Extra Category added successfully! ✅'); // Flash Message Added
        return res.redirect('/extracategory/viewExtraCategory');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Failed to add Extra Category ❌'); // Flash Message Added
        return res.redirect('back');
    }
}

// Edit Page
module.exports.editExtraCategory = async (req, res) => {
    try {
        const categories = await category.find({});
        const subcategories = await subcategory.find({});
        const singleData = await extracategory.findById(req.query.id);
        return res.render("extracategory/editExtraCategory", {
            categories,
            subcategories,
            singleData
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// Update Logic
module.exports.updateExtraCategory = async (req, res) => {
    try {
        let oldData = await extracategory.findById(req.body.id);
        if (req.file) {
            if (oldData.extracategory_image && fs.existsSync(oldData.extracategory_image)) {
                fs.unlinkSync(oldData.extracategory_image);
            }
            req.body.extracategory_image = req.file.path;
        } else {
            req.body.extracategory_image = oldData.extracategory_image;
        }
        await extracategory.findByIdAndUpdate(req.body.id, req.body);
        req.flash('success', 'Extra Category updated successfully! 🔄'); // Flash Message Added
        return res.redirect('/extracategory/viewExtraCategory');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Failed to update Extra Category ❌'); // Flash Message Added
        return res.redirect('back');
    }
}

// Delete Logic
// Delete Logic - Fixed Cascade Deletion
module.exports.deleteExtraCategory = async (req, res) => {
    try {
        const extraCatId = req.query.id; // URL se ID li

        // 1. Pehle ExtraCategory ka data nikalein
        let extraCatData = await extracategory.findById(extraCatId);

        if (extraCatData) {
            // --- STEP A: Products Delete Logic ---
            // FIX: Field name 'extracategoryId' use karein jo model mein hai
            let relatedProducts = await Product.find({ extracategoryId: extraCatId });

            // Sabhi products ki images folder se delete karein
            relatedProducts.forEach(prod => {
                if (prod.product_image && fs.existsSync(prod.product_image)) {
                    fs.unlinkSync(prod.product_image);
                }
            });

            // Database se saare related products delete karein
            // FIX: Matching field name 'extracategoryId'
            await Product.deleteMany({ extracategoryId: extraCatId });

            // --- STEP B: ExtraCategory Delete Logic ---
            // ExtraCategory ki apni image delete karein
            if (extraCatData.extracategory_image && fs.existsSync(extraCatData.extracategory_image)) {
                fs.unlinkSync(extraCatData.extracategory_image);
            }

            // Database se ExtraCategory ko delete karein
            await extracategory.findByIdAndDelete(extraCatId);

            req.flash('success', "Extra Category and all associated products deleted successfully! 🗑️");
        } else {
            req.flash('error', "Category not found!");
        }

        return res.redirect('/extracategory/viewExtraCategory');

    } catch (err) {
        console.log("Delete Error:", err);
        req.flash('error', 'Error while deleting data ❌');
        return res.redirect('/extracategory/viewExtraCategory');
    }
}

// AJAX: Subcategories
module.exports.getSubcategories = async (req, res) => {
    try {
        const subData = await subcategory.find({ categoryId: req.params.catId });
        return res.json(subData);
    } catch (err) {
        return res.json([]);
    }
}