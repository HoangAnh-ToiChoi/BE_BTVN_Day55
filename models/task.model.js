const { pool } = require("../config/database.config");

class taskModel {
    async getAll() {
        try {
            const [rows] = await pool.query("select * from task");

            return rows;
        } catch (e) {
            throw e;
        }
    }

    async findOne(id) {
        try {
            const [rows] = await pool.execute(
                "select * from task where id = ?",
                [id],
            );
            if (rows.length === 0) throw new Error("Không tìm thấy tài nguyên");

            return rows[0];
        } catch (e) {
            throw e;
        }
    }

    async create(taskData) {
        try {
            const [result] = await pool.execute(
                "insert into task(title) values (?)",
                [taskData.title],
            );
            return this.findOne(result.insertId);
        } catch (e) {
            throw e;
        }
    }

    async update(id, taskData) {
        try {
            const sql = `update task set title = ? where id = ?`;
            const [result] = await pool.execute(sql, [taskData.title, id]);
            if (result.affectedRows === 0)
                throw new Error("Không tìm thấy tài nguyên");

            return this.findOne(id);
        } catch (e) {
            throw e;
        }
    }

    async destroy(id) {
        try {
            const [rows] = await pool.execute("DELETE FROM task WHERE id = ?", [
                id,
            ]);
            if (rows.affectedRows === 0)
                throw new Error("Không tìm thấy tài nguyên");

            return { id, message: "Xóa thành công" };
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new taskModel();
