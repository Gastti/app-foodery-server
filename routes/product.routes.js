const { Router } = require('express');
const { check } = require('express-validator');
const { isAuthenticated, validateFields } = require('../middlewares');
const { getProducts, getProductsByQuery, addProduct } = require('../controllers/product_controllers');
const { validateFilesCurried } = require('../middlewares/validateFiles');
const router = Router();

router.get('/', [
    check(['page', 'limit'])
        .optional()
        .trim()
        .escape()
        .isNumeric().withMessage('The field must be an integer'),
], getProducts);

router.get('/search', [
    check(['name', 'category'])
        .optional()
        .isString().withMessage('The field must be a string')
        .trim()
        .escape(),
], getProductsByQuery);

router.post('/add', [
    isAuthenticated,
    check(['name', 'desc', 'SKU', 'category'])
        .notEmpty().withMessage('This field is required')
        .isString().withMessage('The field must be a string')
        .trim()
        .escape(),
    validateFilesCurried('image', ["png", "jpeg", "jpg", "gif"]),
    validateFields
], addProduct)

module.exports = router;