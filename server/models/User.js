const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    github: String,
    avatar: String,
    joined_on: {
      type: Date,
      default: Date.now,
    },
    subscribed_to: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subdevit',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { collection: 'users' },
);

module.exports = mongoose.model('User', userSchema);
