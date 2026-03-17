const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/', authMiddleware, productController.addProduct);
router.get('/', authMiddleware, productController.getAllProducts);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.put('/:id', authMiddleware, productController.updateProduct);

module.exports = router;