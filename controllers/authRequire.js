const jwt = require("jsonwebtoken");

const { secret: secretKey } = require("../config/jwt.config");
const revokedTokenModel = require("../models/revokedToken.model");

const authRequire = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization
            ?.replace("Bearer", "")
            ?.trim();

        const payload = jwt.verify(accessToken, secretKey);

        if (!accessToken) return res.error("Unauthorized", 401);

        const revodToken = await revokedTokenModel.revokToken(accessToken);

        if (revodToken === accessToken) {
            return res.error("Unauthorized", 401);
        }
        req.user = {
            id: payload.sub,
            email: payload.email,
            accessToken,
        };

        next();
    } catch (e) {
        res.error("Unauthorized", 401);
    }
};

module.exports = authRequire;
