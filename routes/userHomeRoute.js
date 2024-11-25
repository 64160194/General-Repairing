const express = require('express');
const router = express.Router();
const UserHomeController = require('../controllers/userHomeController');

router.get('/user_home', UserHomeController.getUserHome);

module.exports = router;