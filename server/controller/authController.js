const User = require("../models/User");

const authController = {};

authController.login = (req, res, next) => {
  const { username, password } = req.query;
  console.log(username, password);
  const foundUser = User.findOne({ username: username, password: password })
    .then((data) => {
      console.log(data, "data");
      if (data.password !== password) {
        res.send(false);
        return next({
          status: 400,
          message: "Wrong username and or password",
        });
      } else {
        res.status(200).send(true);
      }
    })
    .catch((err) => {
      return next({
        status: 400,
        message: "login failed caught err",
      });
    });
};

module.exports = authController;
