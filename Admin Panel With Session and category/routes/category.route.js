const express = require('express');
const { addCategory, insertCategory, viewCategory , deleteCategory, editCategoryPage, updateCategory } = require('../controllers/category.controller');
const upload = require('../middleware/multer.middleware');

const categoryRoute = express.Router();

categoryRoute.get('/addCategory', addCategory);
categoryRoute.get('/viewCategory', viewCategory); 
// POST route for form submission
categoryRoute.post('/insertCategory', upload.single('category_image'), insertCategory);

// Delete Route
categoryRoute.get('/deleteCategory', deleteCategory);

// Edit Routes
categoryRoute.get('/editCategory/:catId', editCategoryPage);
categoryRoute.post('/updateCategory/:catId', upload.single('category_image'), updateCategory);

module.exports = categoryRoute; // CORRECTED: variable name changed to categoryRoute