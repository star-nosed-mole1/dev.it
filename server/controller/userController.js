const User = require('../models/User');

const userController = {};

userController.registerUser = async (req, res, next) => {
  try {
    const { username, password, avatar } = req.body;
    const user = await User.create({ username, password, avatar });
    res.send(user);
  } catch (err) {
    return next(err);
  }
};

userController.getUsers = async (req, res, next) => {
  const users = await User.find({});
  //for each obj in users, curr = user.id
  users.forEach((curr) => (curr = curr._id));
  res.send(users);
};

module.exports = userController;
