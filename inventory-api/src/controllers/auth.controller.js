const AuthService = require("../services/auth.service");
const { MSG } = require("../utils/msg");
const { errorResponse, successResponse } = require("../utils/response");
const statusCode = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const authService = new AuthService();

module.exports.register = async (req, res) => {
    try {
        const userExist = await authService.fetchSingleUser({ email: req.body.email, isDelete: false });
        if (userExist) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, "Email already exists"));
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss A');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

        const newUser = await authService.registerUser(req.body);
        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, "User Registered Successfully", newUser));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, err.message));
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await authService.fetchSingleUser({ email: req.body.email, isDelete: false }, false);
        if (!user) {
            return res.status(statusCode.NOT_FOUND).json(errorResponse(statusCode.NOT_FOUND, true, "User not found"));
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, "Invalid credentials"));
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, "Login Success", { token }));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, err.message));
    }
};