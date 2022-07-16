const User = require('../models/User');

const authController = {}

authController.login = async (req, res, next) => {
    const { username,password } = req.params;
    const post = await User.findOne({username: username, password: password});
    if (!post){
      res.locals.foundUser = false;
      return next({
        status: 400,
        message: 'Wrong username and or password'
      });
    }
    res.locals.foundUser = true;
    res.sendStatus(200);
  };

module.exports = authController;