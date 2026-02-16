const category = require("../model/category"); // Path sahi check karlein
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
        
        console.log(req.body);
        // CORRECTED: Database mein data save karna
        await category.create(req.body);
        console.log("Category Saved!");
        return res.redirect('/category/viewCategory'); 
    } catch (err) {
        console.log("Error in inserting category:", err);
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
module.exports.deleteCategory = async (req, res) => {
    try {
        let deletedData = await category.findByIdAndDelete(req.query.catId);
        if (deletedData && deletedData.category_image) {
            // Server se image file delete karna
            fs.unlink(deletedData.category_image, (err) => {
                if (err) console.log("Image unlink error:", err);
            });
        }
        return res.redirect('/category/viewCategory');
    } catch (err) {
        console.log(err);
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
            if (oldData.category_image) {
                fs.unlink(oldData.category_image, () => { }); 
            }
            req.body.category_image = req.file.path; 
        }
        await category.findByIdAndUpdate(req.params.catId, req.body);
        return res.redirect('/category/viewCategory');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}