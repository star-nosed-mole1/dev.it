const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

router.post('/', commentController.newComment);

module.exports = router;
