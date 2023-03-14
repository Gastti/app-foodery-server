const Shopping_Session = require("../models").Shopping_Session;
const Cart_Item = require("../models").Cart_Item;
const Product = require("../models").Product;
const { newResponse } = require("../utils/newResponse");

async function generateShoppingSession(user_id) {
    try {
        const findShoppingSession = await Shopping_Session.findOne({ where: { user_id } });
        const shoppingSession = findShoppingSession
            ? findShoppingSession
            : await Shopping_Session.create({ user_id, total: 0 });

        return shoppingSession.id;
    } catch (error) {
        console.log(error);
        return null
    }
}

async function getShoppingSession(req, res) {
    const { user_id } = req.authenticatedUser;
    const shoppingSession = await Shopping_Session.findOne({
        where: { user_id },
        attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
        include: {
            model: Cart_Item,
            as: 'cart_items',
            include: {
                model: Product,
                as: 'product'
            }
        }
    });
    if (!shoppingSession) return newResponse(res, 404, "Can't find this shopping session");

    return newResponse(res, 200, 'Shopping session found', shoppingSession);
}

module.exports = {
    generateShoppingSession,
    getShoppingSession
}