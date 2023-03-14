const User = require("../models").User;
const Shopping_Session = require("../models").Shopping_Session;
const { newResponse } = require("../utils/newResponse");

async function getUserInformation(req, res) {
    const { user_id } = req.authenticatedUser;
    const user = await User.findByPk(user_id, {
        attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] },
        include: {
            model: Shopping_Session,
            as: 'shopping_session',
            attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] }
        }
    });
    if (!user) return newResponse(res, 400, "Can't find user");

    return newResponse(res, 200, "User finded", user);
}

module.exports = { getUserInformation };