const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProductsByQuery } = require('../controllers/product_controllers');
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

module.exports = router;