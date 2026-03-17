module.exports.successResponse = (status, error, message, data) => {
    return { status, error, message, data };
};

module.exports.errorResponse = (status, error, message) => {
    return { status, error, message };
};