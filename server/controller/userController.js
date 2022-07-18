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

// dev
userController.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};

// Gets an arr of user_ids **FOR DEV PURPOSES**
userController.getUserIds = async (req, res, next) => {
  const ids = await User.find({}).select('_id');
  res.send(ids);
};

// Look up specific user
userController.getOneUser = async (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .populate('subscribed_to')
    .exec((err, user) => {
      if (err) return next(err);
      res.send(user);
    });
};

module.exports = userController;
