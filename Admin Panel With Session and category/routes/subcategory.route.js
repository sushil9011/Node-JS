const express = require('express');
const {
    addSubCategory, insertSubCategory, viewSubCategory,
    deleteSubCategory, editSubCategoryPage, updateSubCategory
} = require('../controllers/subcategory.controller');
const upload = require('../middleware/multer.middleware');

const subCategoryRoute = express.Router();

subCategoryRoute.get('/addSubCategory', addSubCategory);
subCategoryRoute.get('/viewSubCategory', viewSubCategory);
subCategoryRoute.post('/insertSubCategory', upload.single('subcategory_image'), insertSubCategory);

subCategoryRoute.get('/deleteSubCategory', deleteSubCategory);
subCategoryRoute.get('/editSubCategory/:subId', editSubCategoryPage);
subCategoryRoute.post('/updateSubCategory/:subId', upload.single('subcategory_image'), updateSubCategory);

module.exports = subCategoryRoute;