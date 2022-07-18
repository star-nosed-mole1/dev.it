const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    upvoted_by: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    ],
    downvotes: {
      type: Number,
      default: 0,
    },
    downvoted_by: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    ],
    subdevit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subdevit',
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { collection: 'posts' },
);

module.exports = mongoose.model('Post', postSchema);
