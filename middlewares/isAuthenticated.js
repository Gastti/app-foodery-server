const jwt = require("jsonwebtoken");
const config = require(__dirname + '/../config/config').server;
const User = require("../models").User;
const { newResponse } = require("../utils/newResponse");

async function isAuthenticated(req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) return newResponse(res, 400, 'Token not provided');
        token = token.split(' ')[1];

        const { user_id, session_id } = jwt.verify(token, config.SECRET_KEY);

        const user = await User.findByPk(user_id);
        if (!user) return newResponse(res, 404, 'Invalid Token');

        req.authenticatedUser = { user_id: user.id, session_id };
        if (!req.authenticatedUser) return newResponse(res, 404, 'Invalid Token');

        next();
    } catch (error) {
        console.error(error);
        return error.name === 'TokenExpiredError'
            ? newResponse(res, 401, "Token Expired")
            : newResponse(res, 403, "Invalid Token")
    }
}

module.exports = isAuthenticated;