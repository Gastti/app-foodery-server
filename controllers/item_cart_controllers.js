const { Cart_Item, Product, Cart } = require('../models');
const { newResponse } = require('../utils/newResponse');

async function addCartItem(req, res) {
    try {
        const { product_id, quantity = 1 } = req.body;
        const { cart_id } = req.authenticatedUser;

        if (quantity <= 0) return newResponse(res, 400, 'Quantity must be > 0');

        const findProduct = await Product.findByPk(product_id);
        if (!findProduct) return newResponse(res, 404, 'Product not found');

        const findCartItem = await Cart_Item.findOne({ where: { cart_id, product_id } });

        if (findCartItem) {
            findCartItem.quantity = quantity;
            findCartItem.save();
            return newResponse(res, 200, "Cart item added", { cart_item: findCartItem })
        }

        const newCartItem = await Cart_Item.create({ cart_id, product_id, quantity });

        return newResponse(res, 200, "Cart item added", { cart_item: newCartItem })
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, "Server side error");
    }
}

async function removeCartItem(req, res) {
    try {
        const { cart_item_id } = req.body;
        const { cart_id } = req.authenticatedUser;

        const findItem = await Cart_Item.findOne({ where: { id: cart_item_id, cart_id } });
        if (!findItem) return newResponse(res, 400, "Can't found item");

        findItem.destroy();

        return newResponse(res, 200, 'Item removed');
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, "Server side error");
    }
}

module.exports = {
    addToCart: addCartItem,
    removeFromCart: removeCartItem
}