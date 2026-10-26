const response = (_, res, next) => {
    res.sussces = (data, status = 200, passprop = {}) => {
        res.status(status).json({
            status: "sussces",
            data,
            ...passprop,
        });
    };

    res.error = (error, status = 500) => {
        res.status(status).json({
            status: "error",
            error: error.message || error,
        });
    };

    next();
};

module.exports = response;
