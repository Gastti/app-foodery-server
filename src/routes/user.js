const { Router } = require("express");
const router = Router();
const { validateFields } = require("../middlewares/validateFields");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { getUserInformation } = require("../controllers/user_controllers");

router.get('/me', [
    isAuthenticated,
    validateFields
], getUserInformation)

module.exports = router;