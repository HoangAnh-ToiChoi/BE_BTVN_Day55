const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const authModel = require("../models/auth.model");
const { secret: secretKey } = require("../config/jwt.config");
const userModel = require("../models/user.model");
const revokedTokenModel = require("../models/revokedToken.model");

class authService {
    async login({ email, password }) {
        const user = await userModel.findUserByEmail(email);

        if (!user) throw Error("Unauthorized", 401);

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) throw Error("Unauthorized", 401);

        await authModel.login(email, password);

        const { accessToken } = await this._issueTokens(user);

        return {
            accessToken,
        };
    }

    async register({ email, password }) {
        const hashPasswor = await bcrypt.hash(password, 16);
        const user = await authModel.register(email, hashPasswor);

        const { accessToken } = await this._issueTokens(user);

        return {
            accessToken,
        };
    }

    async refreshToken({ refresh_token }) {
        const user = await authModel.findUserByRefeshToken(refresh_token);
        if (!user) {
            const err = new Error("Unauthorized");
            err.status = 401;
            throw err;
        }
        return await this._issueTokens(user);
    }

    async logout(token) {
        await revokedTokenModel.updaterevokToken(token);
        return true;
    }

    async _issueTokens(user) {
        const payload = {
            id: user.id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        };

        const accessToken = jwt.sign(payload, secretKey);
        const refreshToken = crypto.randomBytes(16).toString("hex");
        const refreshTtl = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

        await authModel.updateRefreshToken(
            refreshToken,
            refreshTtl,
            user.email,
        );

        const data = {
            accessToken,
            refreshToken,
            refreshTtl,
        };
        return data;
    }
}

module.exports = new authService();
