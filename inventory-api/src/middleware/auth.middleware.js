const jwt = require('jsonwebtoken');
const status = require('http-status-codes');
const { errorResponse } = require('../utils/response');
const { MSG } = require('../utils/msg');

module.exports.authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(status.UNAUTHORIZED).json(errorResponse(status.UNAUTHORIZED, true, MSG.TOKEN_MISSING));
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Token se user id mil gayi
        next();
    } catch (err) {
        return res.status(status.UNAUTHORIZED).json(errorResponse(status.UNAUTHORIZED, true, MSG.TOKEN_INVALID));
    }
};