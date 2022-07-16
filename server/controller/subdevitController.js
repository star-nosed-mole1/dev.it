const Sub = require('../models/Subdevit');
const User = require('../models/User');

const subController = {};

// Still need to update other models to include subs

subController.create = async (req, res, next) => {
  const { name, created_by } = req.body;
  const sub = await Sub.create({
    name,
    created_by,
    mods: [created_by],
    subscribers: [created_by],
  });

  User.findByIdAndUpdate(created_by, { $push: { subscribed_to: sub } })
    .then((subbed) => res.send(subbed))
    .catch((err) => next(err));
};

subController.subscribe = async (req, res, next) => {
  const { user, sub } = req.body;
  Sub.findByIdAndUpdate(sub, { $push: { subscribers: user } })
    .then((newSub) => res.send(newSub))
    .catch((err) => next(err));
};

module.exports = subController;
