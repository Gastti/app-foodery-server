const { Router } = require('express');
const { check } = require('express-validator');
const { getCart } = require('../controllers/cart_controllers');
const { addToCart, removeFromCart } = require('../controllers/item_cart_controllers');
const { isAuthenticated, validateFields } = require('../middlewares');
const router = Router();

router.get('/', [
    isAuthenticated,
    validateFields
], getCart);

router.post('/additem', [
    isAuthenticated,
    check(['product_id', 'quantity'])
        .notEmpty().withMessage('This field is required')
        .trim()
        .escape()
        .isNumeric().withMessage('The field must contain an integer'),
    validateFields
], addToCart);

router.delete('/deleteitem', [
    isAuthenticated,
    check(['cart_item_id'])
        .notEmpty().withMessage('This field is required')
        .trim()
        .escape()
        .isNumeric().withMessage('The field must contain an integer'),
    validateFields
], removeFromCart);

module.exports = router;