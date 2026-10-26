const { pool } = require("../config/database.config");

class authModel {
    async register(email, password) {
        try {
            const sql = `insert into user (email, password) values (?,?)`;
            const [{ insertId }] = await pool.execute(sql, [email, password]);
            return {
                id: insertId,
                email,
            };
        } catch (e) {
            throw e;
        }
    }

    async login(email, password) {
        try {
            const sql = `select id,  email from user where email = ? and password = ?`;
            const [row] = await pool.execute(sql, [email, password]);
            return row;
        } catch (e) {
            throw e;
        }
    }

    async updateRefreshToken(refreshToken, refreshTokenTt, email) {
        try {
            const sql = `update user set refresh_token = ?, refresh_token_ttl =? where email = ?`;
            const data = await pool.execute(sql, [
                refreshToken,
                refreshTokenTt,
                email,
            ]);

            return data;
        } catch (e) {
            throw e;
        }
    }

    async findUserByRefeshToken(token) {
        try {
            const sql = `select * from user where refresh_token = ? and refresh_token_ttl >= now()`;
            const [rows] = await pool.execute(sql, [token]);
            return rows[0];
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new authModel();
