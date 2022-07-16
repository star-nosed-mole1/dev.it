const User = require('../models/User');

const userController = {};

userController.registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
