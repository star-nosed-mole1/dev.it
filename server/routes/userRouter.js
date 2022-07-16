const express = require('express');

const userController = require('../controller/userController');
const postController = require('../controller/postController');

const router = express.Router();

//post request to /user/register
router.post('/register', userController.registerUser);

// Get user's posts
router.get('/post/:id', postController.getPosts);

// Gets a list of users ** FOR DEV PURPOSES **
router.get('/all', userController.getUsers);

// Gets a list of user ids ** FOR DEV PURPOSES **
router.get('/user_ids', userController.getUserIds);

module.exports = router;
