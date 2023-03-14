const { Router } = require("express");
const router = Router();
const { getShoppingSession } = require("../controllers/shopping_session_controllers");
const { isAuthenticated, validateFields } = require("../middlewares");

router.get("/", [
    isAuthenticated,
    validateFields
], getShoppingSession)

module.exports = router;