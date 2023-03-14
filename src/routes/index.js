const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Ok'
    })
})

module.exports = router;