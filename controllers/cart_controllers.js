const Cart = require("../models").Cart;
const Cart_Item = require("../models").Cart_Item;
const Product = require("../models").Product;
const Discount = require("../models").Discount;
const { newResponse } = require("../utils/newResponse");

async function generateCart(user_id) {
    try {
        const findCart = await Cart.findOne({ where: { user_id } });
        const newCart = findCart
            ? findCart
            : await Cart.create({ user_id, total: 0 });

        return newCart.id;
    } catch (error) {
        console.log(error);
        return null
    }
}

async function getCart(req, res) {
    const { user_id } = req.authenticatedUser;

    const cart = await Cart.findOne({
        where: { user_id },
        attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
        include: {
            model: Cart_Item,
            as: 'cart_items',
            attributes: ['id', 'quantity'],
            include: {
                model: Product,
                as: 'product',
                attributes: { exclude: ['discount_id', 'deletedAt', 'createdAt', 'updatedAt'] },
                include: {
                    model: Discount,
                    as: 'discount_coupon'
                }
            }
        }
    });

    if (!cart) return newResponse(res, 404, "Can't find this cart");

    return newResponse(res, 200, 'Cart found', cart);
}

module.exports = {
    generateCart,
    getCart
}