const TaskService = require("../services/TaskService.js");

class TaskController {
    async getTasks (req, res, next) {
        try {
            const {id} = req.user;
            const users = await TaskService.getTasks(id);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async createTask(req, res, next) {
        try {
            const {task} = req.body;
            const newTask = await TaskService.createTask(task);
            return res.json(newTask);
        } catch (e) {
            next(e);
        }
    }

    async updateTaskStatus(req, res, next) {
        try {
            const {id, status} = req.body;
            const updatedTask = await TaskService.updateTaskStatus(id, status);
            return res.json(updatedTask);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TaskController();