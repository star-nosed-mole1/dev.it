const Post = require('../models/Post');

const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    const { id, title, content } = req.body;
    const post = await Post.create({ author_id: id, title, content });
    res.send(post);
  } catch (err) {
    return next(err);
  }
};

postController.getPosts = async (req, res, next) => {
  if (req.params.user_id) {
    const { id } = req.params;
    const posts = await Post.find({ author_id: id });
    res.send(posts);
  } else {
    const posts = await Post.find({});
    res.send(posts);
  }
};

postController.getPostsByPostID = async (req, res, next) => {
  const { id } = req.params.post_id;
  const posts = await Post.findById(id);
  res.send(posts);
};

module.exports = postController;
