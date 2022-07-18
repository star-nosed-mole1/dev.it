const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const router = express.Router();

// New post
router.post('/new', postController.createPost);

// Get all posts with comments, userinfo ** FOR HOMEPAGE**
router.get('/all', postController.getPosts);

// Get specific post and its comments
router.get('/:post_id', postController.getPostsByPostID);

// Delete post
router.delete('/:post_id', postController.deletePost);

module.exports = router;
