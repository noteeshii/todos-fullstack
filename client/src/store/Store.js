import {computed, makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from "../http";
import UserService from "../services/UserService.js";
import TaskService from "../services/TaskService.js";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    users = [];
    tasks = [];

    constructor() {
        makeAutoObservable(this, {
            usersMap: computed
        });
    }

    get usersMap() {
        let mapUsers = new Map();
        this.users.forEach((user) => {
            mapUsers.set(user.id, user)
        });
        return mapUsers;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setUsers(users) {
        this.users = users;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async fetchAllUsers() {
        const response = await UserService.fetchUsers();
        this.setUsers(response?.data);
    }

    async fetchAllTasks() {
        const response = await TaskService.fetchTasks();
        this.setTasks(response?.data);
    }

    async login(login, password) {
        const response = await AuthService.login(login, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    }

    async registration(formData) {
        const response = await AuthService.registration(formData);
        localStorage.setItem('accessToken', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    }

    async logout() {
        const response = await AuthService.logout();
        localStorage.removeItem('accessToken');
        this.setAuth(false);
        this.setUser({});
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async createNewTask(newTask) {
        const response = await TaskService.createNewTask(newTask);
        this.setTasks([...this.tasks, response.data]);
    }

    async updateTaskStatus(data) {
        const response = await TaskService.updateTaskStatus(data);
        this.setTasks(this.tasks.map(task => {
            if (task.id === data.id)
                return response.data;
            return task;
        }));
    }
}