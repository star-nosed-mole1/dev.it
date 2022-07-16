const express = require('express');
const commentController = require('../controller/commentController');

const commentRouter = require('../controllers/commentRouter')

const router = express.Router();

// router.get('/',
//   userController.getUser,
//   (req, res) => res.status(200).send(JSON.stringify(res.locals.user))
// );


router.post('/',commentController.newComment);

module.exports = router;