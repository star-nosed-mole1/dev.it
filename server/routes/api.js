const express = require('express');

const userController = require('../controllers/');

const router = express.Router();

router.get('/',
  userController.getUser,
  (req, res) => res.status(200).send(JSON.stringify(res.locals.user))
);

router.post('/create',
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.newUser)
)



module.exports = router;