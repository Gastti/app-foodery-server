const User = require("../models").User;
const { newResponse } = require("../utils/newResponse");

async function getUserInformation(req, res) {
    try {
        const { user_id } = req.authenticatedUser;
        const user = await User.findByPk(user_id, {
            attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] }
        });

        if (!user) return newResponse(res, 400, "Can't find user");

        return newResponse(res, 200, "User finded", user);
    } catch (error) {
        console.log(error.status);
        
    }
}

module.exports = { getUserInformation };