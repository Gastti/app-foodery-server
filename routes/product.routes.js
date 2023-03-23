const { Router } = require('express');
const { check } = require('express-validator');
const { isAuthenticated, validateFields } = require('../middlewares');
const { getProducts, getProductsByQuery, addProduct, editProduct } = require('../controllers/product_controllers');
const { validateFiles } = require('../middlewares/validateFiles');
const { hasPermissions } = require('../middlewares/hasPermissions');
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
    validateFiles('image', ["png", "jpeg", "jpg", "gif"]),
    hasPermissions('manager'),
    validateFields
], addProduct)

router.put('/edit/:id', [
    isAuthenticated,
    // validateFiles('image', ["png", "jpeg", "jpg", "gif"]),
    hasPermissions('manager'),
    validateFields
], editProduct)

module.exports = router;