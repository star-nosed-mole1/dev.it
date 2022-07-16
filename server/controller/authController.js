const User = require("../models/User");

const authController = {};

authController.login = (req, res, next) => {
    const { username, password } = req.query;
    const foundUser = User.findOne({username: username, password: password}).then(data =>{
      if (data.password !== password ){
        res.locals.foundUser = false;
        return next({
        status: 400,
        message: "Wrong username and or password",
      });
};
      else{
        res.locals.foundUser = true;
        res.status(200).json(data);
        return next();
      }
    }).catch ( err =>{
      return next({
        status: 400,
        message: 'login failed caught err'
      })
    });

    
  };

module.exports = authController;
