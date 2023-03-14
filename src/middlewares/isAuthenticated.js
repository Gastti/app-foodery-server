const jwt = require("jsonwebtoken");
const config = require(__dirname + '/../config/config').server;
const User = require("../models").User;
const { newResponse } = require("../utils/newResponse");

async function isAuthenticated(req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) return newResponse(res, 400, 'Token not provided')

        token = token.split(' ')[1];

        const { user_id } = jwt.verify(token, config.SECRET_KEY);
        const user = await User.findByPk(user_id)
        req.authenticatedUser = { user_id: user.id }
        if (!req.authenticatedUser) return newResponse(res, 404, 'Invalid token');

        next();
    } catch (error) {
        console.log(error);
        return newResponse(res, 400, 'Invalid token');
    }
}

module.exports = { isAuthenticated };