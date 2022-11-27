import $api from "../http";

export default class TaskService {

    static async fetchTasks() {
        return await $api.get('/tasks');
    }

    static async createNewTask(newTask) {
        return await $api.post('/tasks', {task:newTask});
    }

    static async updateTaskStatus(data) {
        return await $api.post('/tasks/update-status', data);
    }
}