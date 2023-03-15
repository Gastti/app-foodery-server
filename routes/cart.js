const { Router } = require("express");
const { getCart } = require("../controllers/cart_controllers");
const { addToCart, removeFromCart } = require("../controllers/item_cart_controllers");
const { isAuthenticated, validateFields } = require("../middlewares");
const router = Router();

router.get("/", [
    isAuthenticated,
    validateFields
], getCart);

router.post('/additem', [
    isAuthenticated,
    validateFields
], addToCart);

router.delete('/deleteitem', [
    isAuthenticated,
    validateFields
], removeFromCart);

module.exports = router;