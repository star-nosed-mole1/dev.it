const User = require('../models/User');

const authController = {}

authController.login = async (req, res, next) => {
    const { username, password } = req.query;
    console.log(username,password);
    const foundUser = await User.findOne({username: username});

    if (foundUser.password !== password ){
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