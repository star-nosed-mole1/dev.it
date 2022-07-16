const express = require('express');
const router = express.Router();
const subController = require('../controller/subdevitController');

router.post('/new', subController.create);
router.post('/subscribe', subController.subscribe);

module.exports = router;
