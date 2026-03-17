const ProductService = require("../services/product.service");
const { MSG } = require("../utils/msg");
const { errorResponse, successResponse } = require("../utils/response");
const statusCode = require('http-status-codes');
const moment = require('moment');

const productService = new ProductService();

module.exports.addProduct = async (req, res) => {
    try {
        if (req.body.quantity < 0) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.NEGATIVE_QTY));
        }

        req.body.userId = req.user.id;
        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss A');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

        const product = await productService.createProduct(req.body);
        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, MSG.PRODUCT_CREATED, product));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, err.message));
    }
};

module.exports.getAllProducts = async (req, res) => {
    try {
        let query = { isDeleted: false, userId: req.user.id };
        if (req.query.category) query.category = req.query.category;

        const products = await productService.fetchAllProducts(query);
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.PRODUCT_FETCHED, products));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, err.message));
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.fetchSingleProduct({ _id: req.params.id, userId: req.user.id, isDeleted: false });
        if (!product) {
            return res.status(statusCode.NOT_FOUND).json(errorResponse(statusCode.NOT_FOUND, true, MSG.PRODUCT_NOT_FOUND));
        }

        await productService.updateProduct(req.params.id, { isDeleted: true, update_at: moment().format('DD/MM/YYYY, h:mm:ss A') });
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.PRODUCT_DELETED));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, err.message));
    }
};
module.exports.updateProduct = async (req, res) => {
    try {
       
        const product = await productService.fetchSingleProduct({ 
            _id: req.params.id, 
            userId: req.user.id, 
            isDeleted: false 
        });

        if (!product) {
            return res.status(statusCode.NOT_FOUND).json(errorResponse(statusCode.NOT_FOUND, true, "Product not found"));
        }

        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

        const updatedProduct = await productService.updateProduct(req.params.id, req.body);

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, "Product Updated Successfully", updatedProduct));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, err.message));
    }
};