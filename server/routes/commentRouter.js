const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

router.post('/new', commentController.newComment);
router.delete('/:comment_id', commentController.deleteComment);

module.exports = router;
