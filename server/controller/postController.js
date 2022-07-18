const Post = require('../models/Post');
const User = require('../models/User');

const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    const { author_id, title, content } = req.body;

    const post = await Post.create({
      author_id,
      title,
      content,
    });

    await User.findByIdAndUpdate(author_id, { $push: { posts: post } });

    res.send(post);
  } catch (err) {
    return next(err);
  }
};

postController.getPosts = async (req, res, next) => {
  if (req.params.id) {
    const { id } = req.params;
    User.findById(id)
      .populate('posts')
      .exec((err, posts) => {
        if (err) return next(err);
        res.send(posts);
      });
  } else {
    Post.find({})
      .populate('comments')
      .populate({ path: 'author_id', select: ['username', 'avatar'] })
      .exec((err, posts) => {
        if (err) return next(err);
        res.send(posts);
      });
  }
};

postController.getPostsByPostID = async (req, res, next) => {
  const { post_id } = req.params;
  Post.findById(post_id)
    .populate('comments')
    .then((data) => res.send(data))
    .catch((err) => {
      return next(err);
    });
};

postController.deletePost = async (req, res, next) => {
  // This assumes that the user deleting the post is the OP.
  // Authentication TBA
  try {
    const { post_id } = req.params;
    const { author_id } = req.body;
    const post = await Post.findById(post_id);
    // Removes reference to deleted post from original poster's user model
    // await User.findByIdAndUpdate(author_id, { $pull: { posts: post } });
    await Post.deleteOne(post);
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

postController.upvote = async (req, res, next) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  const user = await User.findById(user_id);
  const post = await Post.findByIdAndUpdate(
    post_id,
    {
      $inc: { upvotes: 1 },
      $push: { upvoted_by: user },
    },
    { new: true },
  );
  // Add to OP's karma
  const originalPoster = await User.findById(post.author_id);
  originalPoster.devutation += 1;
  user.upvoted_posts.push(post);
  await user.save();
  await originalPoster.save();

  res.send(post);
};

postController.downvote = async (req, res, next) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  const user = await User.findById(user_id);
  const post = await Post.findByIdAndUpdate(
    post_id,
    {
      $inc: { downvotes: 1 },
      $push: { downvoted_by: user },
    },
    { new: true },
  );
  // Remove from OP's karma
  const originalPoster = await User.findById(post.author_id);
  originalPoster.devutation -= 1;
  user.downvoted_posts.push(post);
  await user.save();
  await originalPoster.save();

  res.send(post);
};

module.exports = postController;
