const User = require("../models/User");

const authController = {};

authController.login = (req, res, next) => {
  const { username, password } = req.query;
  const foundUser = User.findOne({ username: username, password: password })
    .then((data) => {
      if (data) {
        console.log(data);
        res.status(200).send(data);
      } else {
        res.status(200).send(false);
      }
      // if (data.password !== password) {
      //   res.status(200).send(false);
      //   return next({
      //     status: 400,
      //     message: "Wrong username and or password",
      //   });
      // } else {
      //   res.status(200).send(true);
      //   return next();
      // }
    })
    .catch((err) => {
      return next({
        status: 400,
        message: "login failed caught err",
      });
    });
};

module.exports = authController;
