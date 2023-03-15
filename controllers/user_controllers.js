const User = require("../models").User;
const Cart = require("../models").Cart;
const { newResponse } = require("../utils/newResponse");

async function getUserInformation(req, res) {
    const { user_id } = req.authenticatedUser;
    const user = await User.findByPk(user_id, {
        attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] },
        include: {
            model: Cart,
            as: 'cart',
            attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] }
        }
    });
    if (!user) return newResponse(res, 400, "Can't find user");

    return newResponse(res, 200, "User finded", user);
}

module.exports = { getUserInformation };