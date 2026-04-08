const express = require('express');
const router = express.Router(); // ye ek mini Express app banata hai jo related routes ko alag file me organize aur handle karne ke liye use hota hai.
const authController = require('../controller/auth.controller')

//User Auth APIs
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)
// protected endpoint that returns the logged‑in user
const authMiddleware = require('../middlewares/auth.middleware');
router.get('/user/me', authMiddleware.authUserMiddleware, authController.getUser);

//Food Partner Auth APis
router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login',authController.LoginFoodPartner)
router.get('/food-partner/logout',authController.logoutFoodpartner)

module.exports = router;