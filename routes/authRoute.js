const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/check-login', AuthController.checkLoginStatus);

module.exports = router;