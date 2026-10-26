const { pool } = require("../config/database.config");

class userModel {
    async findUserByEmail(email) {
        const sql = `select * from user where email =?`;
        const [[row]] = await pool.execute(sql, [email]);
        return row;
    }
}
module.exports = new userModel();
