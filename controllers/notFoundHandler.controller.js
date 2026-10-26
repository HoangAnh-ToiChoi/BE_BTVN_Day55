const notFoundHandleer = (req, res, next) => {
    res.error("Resource not found", 404);
};

module.exports = notFoundHandleer;
