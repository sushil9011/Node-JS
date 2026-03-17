const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/multer.middleware');

// --- Product GET Routes ---
router.get('/addProduct', productController.addProduct);
router.get('/viewProduct', productController.viewProduct);
router.get('/deleteProduct', productController.deleteProduct);

// ... existing routes ...
router.get('/editProduct', productController.editProduct);
router.post('/updateProduct', upload.single('product_image'), productController.updateProduct);

// AJAX Route: Sub-Category se Extra-Category fetch karne ke liye
router.get('/getExtraFromSub/:subId', productController.getExtraFromSub);

// --- Product POST Route ---
router.post('/insertProduct', upload.single('product_image'), productController.insertProduct);

module.exports = router;