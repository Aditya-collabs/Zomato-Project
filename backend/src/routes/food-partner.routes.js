const express = require('express');
const foodPartnerController = require('../controller/food-partner.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()


/* GET /api/food/food-partner/profile/:id? */
router.get('/profile/:id',
    authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerProfile)

module.exports = router;