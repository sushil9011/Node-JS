const express = require('express');
const extraCategoryRoute = express.Router();
const extraController = require('../controllers/extracategory.controller');
const upload = require('../middleware/multer.middleware');

extraCategoryRoute.get('/addExtraCategory', extraController.addExtraCategory);
extraCategoryRoute.post('/insertExtraCategory', upload.single('extracategory_image'), extraController.insertExtraCategory);
extraCategoryRoute.get('/viewExtraCategory', extraController.viewExtraCategory);
extraCategoryRoute.get('/deleteExtraCategory', extraController.deleteExtraCategory);

// Edit & Update Routes
extraCategoryRoute.get('/editExtraCategory', extraController.editExtraCategory);
extraCategoryRoute.post('/updateExtraCategory', upload.single('extracategory_image'), extraController.updateExtraCategory);

extraCategoryRoute.get('/getSubcategories/:catId', extraController.getSubcategories);

module.exports = extraCategoryRoute;