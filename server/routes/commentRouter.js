const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

router.post('/new', commentController.newComment);

module.exports = router;
