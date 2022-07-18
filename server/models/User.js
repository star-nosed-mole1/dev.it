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
    githubID: String,
    googleID: String,
    avatar: String,
    devutation: {
      type: Number,
      default: 0,
    },
    upvoted_posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        unique: true,
      },
    ],
    downvoted_posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        unique: true,
      },
    ],
    upvoted_comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        unique: true,
      },
    ],
    downvoted_comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        unique: true,
      },
    ],
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
