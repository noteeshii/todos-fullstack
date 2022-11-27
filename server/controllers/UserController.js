const UserService = require('../services/UserService.js');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/ApiError.js');
const DAY = 24 * 60 * 60 * 1000;
class UserController {

    async registration (req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));

            const {first_name, second_name, third_name, login, password, chief_id} = req.body;

            const newUser = await UserService
                                    .registration({
                                        first_name,
                                        second_name,
                                        third_name,
                                        login,
                                        password,
                                        chief_id
                                    });

            res.cookie('refreshToken',newUser.refreshToken, {maxAge: DAY, httpOnly: true});

            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }

    async login (req, res, next) {
        try {
            const {login, password} = req.body;
            const userData = await UserService.login({login, password});
            res.cookie('refreshToken',userData.refreshToken, {maxAge: DAY, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken',userData.refreshToken, {maxAge: DAY, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await UserService.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();