const productModel = require("../model/product.model");
const category = require("../model/category");
const subcategory = require("../model/subcategory.model");
const extracategory = require("../model/extracategory.model");
const fs = require('fs');

// 1. Add Product Page
module.exports.addProduct = async (req, res) => {
    try {
        const categories = await category.find({});
        return res.render("product/addProduct", { categories });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// 2. Insert Product
module.exports.insertProduct = async (req, res) => {
    try {
        if (req.file) {
            req.body.product_image = req.file.path;
        }
        await productModel.create(req.body);
        req.flash('success', 'Product added successfully'); // Simple Flash
        return res.redirect('/product/viewProduct');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('back');
    }
}

// 3. View Product
module.exports.viewProduct = async (req, res) => {
    try {
        const productData = await productModel.find({})
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('extracategoryId');
        return res.render("product/viewProduct", { productData });
    } catch (err) {
        return res.redirect('back');
    }
}

// 4. AJAX Logic
module.exports.getExtraFromSub = async (req, res) => {
    try {
        const extraData = await extracategory.find({ subcategoryId: req.params.subId });
        return res.json(extraData);
    } catch (err) {
        return res.json([]);
    }
}

// 5. Delete Logic
module.exports.deleteProduct = async (req, res) => {
    try {
        let data = await productModel.findById(req.query.id);
        if (data && data.product_image && fs.existsSync(data.product_image)) {
            fs.unlinkSync(data.product_image);
        }
        await productModel.findByIdAndDelete(req.query.id);
        req.flash('success', 'Product deleted successfully'); // Simple Flash
        return res.redirect('/product/viewProduct');
    } catch (err) {
        req.flash('error', 'Could not delete product');
        return res.redirect('back');
    }
}

// 6. Edit Page
module.exports.editProduct = async (req, res) => {
    try {
        const categories = await category.find({});
        const singleProduct = await productModel.findById(req.query.id)
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('extracategoryId');

        return res.render("product/editProduct", {
            categories,
            product: singleProduct
        });
    } catch (err) {
        return res.redirect('back');
    }
}

// 7. Data Update Logic
module.exports.updateProduct = async (req, res) => {
    try {
        let oldData = await productModel.findById(req.body.id);
        if (req.file) {
            if (oldData.product_image && fs.existsSync(oldData.product_image)) {
                fs.unlinkSync(oldData.product_image);
            }
            req.body.product_image = req.file.path;
        } else {
            req.body.product_image = oldData.product_image;
        }
        await productModel.findByIdAndUpdate(req.body.id, req.body);
        req.flash('success', 'Product updated successfully'); // Simple Flash
        return res.redirect('/product/viewProduct');
    } catch (err) {
        req.flash('error', 'Update failed');
        return res.redirect('back');
    }
}