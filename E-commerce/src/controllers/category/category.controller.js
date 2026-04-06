const statusCode = require('http-status-codes');
const moment = require('moment');
const { errorResponse, successResponse } = require('../../utils/response');
const { MSG } = require('../../utils/msg');
const CategoryService = require('../../services/category/category.service');

const categoryService = new CategoryService();

module.exports.addCategory = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.UNAUTHORIZED_ACCESS));
        }

        if (req.file) {
            req.body.category_image = req.file.path;
        }

        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss A');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

        await categoryService.insertNewCategory(req.body);
        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, MSG.CATEGORY_CREATE_SUCCESS));

    } catch (err) {
        console.log(err); 
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}
module.exports.getAllCategory = async (req, res) => {
    try {
        const categories = await categoryService.fetchAllCategory(); 
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, "Fetched", categories));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (req.file) {
            req.body.category_image = req.file.path; 
        }
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

        const updated = await categoryService.updateCategory(id, req.body);
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.CATEGORY_UPDATE_SUCCESS, updated));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await categoryService.updateCategory(id, { isDelete: true }); 
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.CATEGORY_DELETE_SUCCESS));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}