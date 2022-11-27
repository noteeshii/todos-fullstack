const db = require('../db/db.js');

class TaskService {
    async getTasks(userId) {
        return await db('tasks')
                        .select('*')
                        .where('owner_id', userId)
                        .orWhere('responsible_id', userId);
    }

    async createTask(task) {
        const [newTask] = await db('tasks')
                                .insert(task)
                                .returning('*');
        return newTask;
    }

    async updateTask(task) {

    }

    async updateTaskStatus(id, status) {
        const [updatedTask] = await db('tasks')
                                        .where('id', id)
                                        .update({status})
                                        .returning('*');

        return updatedTask;
    }

    async deleteTask(id) {
        const [deletedTask] = await db('tasks')
                        .where('id', id)
                        .del()
                        .returning('*');

        return deletedTask;
    }
}

module.exports = new TaskService();