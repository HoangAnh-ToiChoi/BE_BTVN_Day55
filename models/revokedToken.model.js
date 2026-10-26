const { pool } = require("../config/database.config");

class revokedTokenmodel {
    async revokToken(token) {
        try {
            const sql = `select access_token from revoked_tokens where access_token = ?`;
            const [rows] = await pool.execute(sql, [token]);
            return rows[0];
        } catch (e) {
            throw e;
        }
    }

    async updaterevokToken(token) {
        try {
            const sql = `insert into revoked_tokens (access_token) values (?)`;
            const data = pool.execute(sql, [token]);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new revokedTokenmodel();
