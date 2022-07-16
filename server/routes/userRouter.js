const express = require('express');

const userController = require('../controllers/userController');
const postController = require('../controllers/postController')

const router = express.Router();


//post request to /user/register 
router.post('/register', userController.registerUser);

//localhost:3000/user/post/authorID
router.get('/post/:id',postController.getPosts);



module.exports = router;