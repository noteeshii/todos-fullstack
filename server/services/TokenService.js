const jwt = require('jsonwebtoken');
const db = require('../db/db.js');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '1d'});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const [prev] = await db('tokens')
                                .select('*')
                                .where('user_id',userId);
        if (prev) {
            const [updatedToken] = await db('tokens')
                                            .where('id', prev.id)
                                            .update({
                                                refresh_token: refreshToken
                                            })
                                            .returning('*');

            return updatedToken;
        }

        const [newToken] = await db('tokens')
                                    .insert({
                                        user_id: userId,
                                        refresh_token: refreshToken
                                    })
                                    .returning('*');
        return newToken;
    }

    async removeToken(refreshToken) {
        const [removedToken] = await db('tokens')
                                        .where('refresh_token', refreshToken)
                                        .del()
                                        .returning('*');
        return removedToken;
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const [token] = await db('tokens')
                                .select('*')
                                .where('refresh_token', refreshToken);

        return token;
    }
}

module.exports = new TokenService();