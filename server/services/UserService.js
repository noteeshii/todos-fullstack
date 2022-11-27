const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const TokenService = require('./TokenService.js');
const UserDto = require('../dtos/UserDto.js');
const ApiError = require('../exceptions/ApiError.js');

class UserService {
    async registration (userData) {
        const {login, password} = userData;

        const [candidate] = await db('users')
                                    .select('*')
                                    .where('login',login);

        if (candidate)
            throw ApiError.BadRequest('Данный логин занят');

        const passwordHash = await bcrypt.hash(password, 3);
        const [user] = await db('users')
                                .insert({...userData, password: passwordHash})
                                .returning('*');

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({id:userDto.id});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async login ({login, password}) {
        const [candidate] = await db('users')
                                    .select('*')
                                    .where('login',login);

        if (!candidate)
            throw ApiError.BadRequest('Пользователя с таким логином не существует');

        const isPassEquals = await bcrypt.compare(password, candidate.password);

        if (!isPassEquals)
            throw ApiError.BadRequest('Неверный пароль');

        const userDto = new UserDto(candidate);
        const tokens = TokenService.generateTokens({id:userDto.id});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout (refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken)
            throw ApiError.UnauthorizedError();

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb)
            throw ApiError.UnauthorizedError();

        const [candidate] = await db('users')
                                    .select('*')
                                    .where('id', userData.id);

        const userDto = new UserDto(candidate);
        const tokens = TokenService.generateTokens({id:userDto.id});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async getUsers() {
        return await db('users')
                        .select(
                            'id',
                            'first_name',
                            'second_name',
                            'third_name',
                            'chief_id'
                        );
    }

    async updateUserData() {

    }
}

module.exports = new UserService();