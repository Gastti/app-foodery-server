const { Router } = require("express");
const { getProducts, getProductsByQuery } = require("../controllers/product_controllers");
const router = Router();

router.get('/', [], getProducts);
router.get('/search', [], getProductsByQuery);

module.exports = router;