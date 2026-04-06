const express = require('express');
const { addCategory, getAllCategory, updateCategory, deleteCategory } = require('../../controllers/category/category.controller');
const { storage } = require('../../middleware/storage.middleware');
const multer = require('multer');
const upload = multer({ storage });

const categoryRoute = express.Router();

categoryRoute.post('/', upload.single('category_image'), addCategory);
categoryRoute.get('/', getAllCategory); // Saari categories dekhne ke liye
categoryRoute.patch('/:id', upload.single('category_image'), updateCategory); // ID ke saath update
categoryRoute.delete('/:id', deleteCategory); // ID ke saath delete

module.exports = categoryRoute;