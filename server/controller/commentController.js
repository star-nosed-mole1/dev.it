const Comment = require('../models/Comment');

const commentController = {};

commentController.newComment = async (req, res, next) => {
  const { author_id, post_id, content } = req.body;
  const comment = await Comment.create({ author_id, post_id, content });
  const post = await Post.findById(post_id);

  post.update({
    $push: {
      comments: comment,
    },
  });

  res.send(comment);
};

commentController.getComments = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const comments = await Comment.find({ post_id });
    res.send(comments);
  } catch (err) {
    return next(err);
  }
};

module.exports = commentController;
