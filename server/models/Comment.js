const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    upvote: {
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
    created_at: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: 'comments' },
);

module.exports = mongoose.model('Comment', commentSchema);
