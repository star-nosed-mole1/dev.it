const User = require("../models/User");

const userController = {};

userController.registerUser = async (req, res, next) => {
  try {
    const { username, password, avatar } = JSON.parse(req.body);
    const user = await User.create({ username, password, avatar });
    res.send(user);
  } catch (err) {
    res.send(false);
  }
};

// dev
userController.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};

// Gets an arr of user_ids **FOR DEV PURPOSES**
userController.getUserIds = async (req, res, next) => {
  const ids = await User.find({}).select("_id");
  res.send(ids);
};

// Look up specific user
userController.getOneUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);
  res.send(user);
};

module.exports = userController;
