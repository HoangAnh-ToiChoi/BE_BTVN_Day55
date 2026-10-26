const taskService = require("../services/task.service");

class taskController {
    async getAll(req, res) {
        const data = await taskService.getAllTasks();
        res.sussces(data);
    }

    async getOne(req, res) {
        const data = await taskService.getTaskById(+req.params.id);
        res.sussces(data);
    }

    async create(req, res) {
        const data = await taskService.createTask(req.body);
        res.sussces(data, 201);
    }

    async updateTask(req, res) {
        const data = await taskService.updateTask(+req.params.id, req.body);
        res.sussces(data);
    }

    async delTask(req, res) {
        const data = await taskService.deleteTask(+req.params.id);
        res.sussces(data);
    }
}

module.exports = new taskController();
