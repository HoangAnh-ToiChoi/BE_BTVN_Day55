const taskModel = require("../models/task.model");

class taskService {
    async getAllTasks() {
        const data = await taskModel.getAll();
        return data;
    }

    async getTaskById(id) {
        if (!id || isNaN(id)) {
            throw new Error("ID không hợp lệ");
        }
        const data = await taskModel.findOne(id);
        return data;
    }

    async createTask(taskData) {
        if (!taskData.title || !taskData.title.trim()) {
            throw new Error("Tiêu đề task không được để trống");
        }
        const data = await taskModel.create(taskData);
        return data;
    }

    async updateTask(id, taskData) {
        if (!id || isNaN(id)) {
            throw new Error("ID không hợp lệ");
        }
        if (!taskData.title || !taskData.title.trim()) {
            throw new Error("Tiêu đề task không được để trống");
        }
        const data = await taskModel.update(id, taskData);
        return data;
    }

    async deleteTask(id) {
        if (!id || isNaN(id)) {
            throw new Error("ID không hợp lệ");
        }
        const data = await taskModel.destroy(id);
        return data;
    }
}

module.exports = new taskService();
