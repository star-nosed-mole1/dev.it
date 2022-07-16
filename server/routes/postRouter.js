const express = require('express');

const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

const router = express.Router();


router.post('/',postController.createPost);

router.get('/all', postController.getPosts);

//get comments of specific post
router.get('/:post_id/comments', commentController.getComments);


router.get('/:post_id',postController.getPostsByPostID);



module.exports = router;