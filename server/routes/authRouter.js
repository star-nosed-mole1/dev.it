const express = require('express');

const authController = require('../controller/authController');

const router = express.router();


router.get('/login', authController.login);