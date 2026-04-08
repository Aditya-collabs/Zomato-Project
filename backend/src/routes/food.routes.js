const express = require('express');
const router = express.Router()
const foodController = require('../controller/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer'); // ye Express/Node me file uploads (jaise images, videos, documents) handle karne ke liye use hota hai.
const foodPartnerModel = require('../models/foodpartner.model');


const upload = multer({
    storage: multer.memoryStorage()
})


/* Method-POST, ye prefix hai:- /api/food/ and it should be PROTECTED */
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood)


/* GET /api/food/ and it should be protected */
router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems)


router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood)

module.exports = router