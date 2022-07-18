const Comment = require("../models/Comment");
const Post = require("../models/Post");

const commentController = {};

commentController.newComment = async (req, res, next) => {
  const { author_id, post_id, content } = JSON.parse(req.body);
  const comment = await Comment.create({ author_id, post_id, content });
  Post.findByIdAndUpdate(
    post_id,
    {
      $push: {
        comments: comment,
      },
    },
    { safe: true, upsert: true }
  )
    .then((data) => res.send(data))
    .catch((err) => next(err));
};

commentController.deleteComment = async (req, res, next) => {
  console.log("test");
  try {
    const { comment_id } = req.params;

    await Comment.findOneAndDelete({ _id: comment_id });

    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

module.exports = commentController;
