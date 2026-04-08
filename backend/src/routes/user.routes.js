const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// all user-specific APIs (requires user authentication)
router.get('/saved-videos', authMiddleware.authUserMiddleware, userController.getSavedVideos);

module.exports = router;
