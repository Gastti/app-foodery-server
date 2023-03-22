const { Router } = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth_controllers');
const { validateFields } = require('../middlewares');
const router = Router();

router.post('/register', [
    // Global Validations
    check(['first_name', 'last_name'])
        .isLength({ min: 3, max: 25 }).withMessage('This field must have between 3 and 25 characters')
        .matches(/^[a-zA-Z\u00C0-\u024F]+$/).withMessage('This field can only contain letters'),
    check(['first_name', 'last_name', 'username', 'email', 'password'])
        .notEmpty().withMessage('This field is required')
        .isString().withMessage('This field must be a string')
        .trim()
        .escape(),
    // Custom Validations
    check('username')
        .isLength({ min: 5, max: 20 }).withMessage('The username must be between 5 and 20 characters')
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('The username must contain only letters, numbers and dashes'),
    check('email')
        .isEmail().withMessage('This field must be a valid email address'),
    check('password')
        .isLength({ min: 8, max: 20 }).withMessage('The password must be between 8 and 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/)
        .withMessage('The password must contain at least one lowercase letter, one uppercase letter, and one number'),
    validateFields
], register);

router.post('/login', [
    // Global Validations
    check('username', 'email')
        .optional()
        .isString().withMessage('This field must be a string')
        .trim()
        .escape(),
    check('password')
        .isString().withMessage('This field must be a string')
        .trim()
        .escape(),
    check('username')
        .optional()
        .isLength({ min: 5, max: 20 }).withMessage('The username must be between 5 and 20 characters')
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('The username must contain only letters, numbers and dashes'),
    // EMAIL Validate and Sanitize
    check('email')
        .optional()
        .isEmail().withMessage('This field must be a valid email address'),
    // PASSWORD Validate and Sanitize
    check('password')
        .notEmpty().withMessage('This password is required')
        .isLength({ min: 8, max: 20 }).withMessage('The password must be between 8 and 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/)
        .withMessage('This field must contain at least one lowercase letter, one uppercase letter, and one number'),
    validateFields
], login);

module.exports = router;