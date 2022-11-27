import $api from "../http";

export default class AuthService {
    static async login(login, password) {
        return await $api.post('/login', {login, password});
    }

    static async registration(formData) {
        return await $api.post('/registration', formData);
    }

    static async logout() {
        return await $api.post('/logout');
    }

}