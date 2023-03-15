const { Router } = require("express");
const { getCart } = require("../controllers/cart_controllers");
const { addCartItem } = require("../controllers/item_cart_controllers");
const { isAuthenticated, validateFields } = require("../middlewares");
const router = Router();

router.get("/", [
    isAuthenticated,
    validateFields
], getCart);

router.post('/additem', [
    isAuthenticated,
    validateFields
], addCartItem);

module.exports = router;