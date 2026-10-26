const { JsonWebTokenError } = require("jsonwebtoken");

const errorHandle = (error, req, res, next) => {
    let status;

    if (error instanceof JsonWebTokenError) {
        error = "Unauthorized";
        status = 401;
    }

    res.error(error, status);
};

module.exports = errorHandle;
