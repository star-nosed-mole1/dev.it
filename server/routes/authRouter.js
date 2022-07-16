const express = require('express');

const authController = require('../controller/authController');

const router = express.Router();


router.get('/login', authController.login);

module.exports = router;
