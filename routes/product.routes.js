const { Router } = require('express');
const { check, param } = require('express-validator');
const { isAuthenticated, validateFields } = require('../middlewares');
const { getProducts, getProductsByQuery, getPopularProducts, addProduct, editProduct, deleteProduct, restoreProduct, getProductById } = require('../controllers/product_controllers');
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

router.get('/find/:id', [
    param('id')
        .notEmpty().withMessage('Param "id" is required')
        .isNumeric().withMessage('Param {id} must be a number')
        .trim()
        .escape(),
], getProductById);

router.get('/search', getProductsByQuery);

router.get('/popular', [
    check(['limit'])
        .optional()
        .trim()
        .escape()
        .isNumeric().withMessage('The field must be an integer'),
], getPopularProducts)

router.post('/add', [
    isAuthenticated,
    check(['name', 'desc', 'SKU', 'category'])
        .notEmpty().withMessage('This field is required')
        .isString().withMessage('The field must be a string')
        .trim()
        .escape(),
    check(['price', 'discount_id'])
        .notEmpty().withMessage('This field is required')
        .isNumeric().withMessage('This field must be a number')
        .trim()
        .escape(),
    validateFiles('image', ["png", "jpeg", "jpg", "gif"]),
    hasPermissions('manager'),
    validateFields
], addProduct)

router.put('/edit/:id', [
    isAuthenticated,
    param('id')
        .notEmpty().withMessage('Param "id" is required')
        .isNumeric().withMessage('Param {id} must be a number')
        .trim()
        .escape(),
    check(['name', 'desc', 'SKU', 'category'])
        .optional()
        .isString().withMessage('The field must be a string')
        .trim()
        .escape(),
    check(['price', 'discount_id'])
        .optional()
        .isNumeric().withMessage('This field must be a number')
        .trim()
        .escape(),
    validateFiles('image', ["png", "jpeg", "jpg", "gif"], false),
    hasPermissions('manager'),
    validateFields
], editProduct)

router.delete('/delete/:id', [
    isAuthenticated,
    param('id')
        .notEmpty().withMessage('Param "id" is required')
        .isNumeric().withMessage('Param {id} must be a number')
        .trim()
        .escape(),
    hasPermissions('manager'),
    validateFields
], deleteProduct)

router.put('/restore/:id', [
    isAuthenticated,
    param('id')
        .notEmpty().withMessage('Param "id" is required')
        .isNumeric().withMessage('Param {id} must be a number')
        .trim()
        .escape(),
    hasPermissions('manager'),
    validateFields
], restoreProduct)

module.exports = router;