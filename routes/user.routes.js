const { Router } = require('express');
const router = Router();
const { isAuthenticated, validateFields } = require('../middlewares');
const { getUserInformation } = require('../controllers/user_controllers');

router.get('/me', [
    isAuthenticated,
    validateFields
], getUserInformation)

module.exports = router;