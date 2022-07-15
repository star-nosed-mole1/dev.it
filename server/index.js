require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Subveddit = require('./models/Subveddit');

app.use(express.json());

app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send(user);
  } catch (err) {
    return next(err);
  }
});

app.post('/post', async (req, res, next) => {
  try {
    const { id, title, content } = req.body;
    const post = await Post.create({ author_id: id, title, content });
    res.send(post);
  } catch (err) {
    return next(err);
  }
});

app.post('/comment', async (req, res, next) => {
  const { author_id, post_id, content } = req.body;
  const comment = await Comment.create({ author_id, post_id, content });
  const post = await Post.findById(post_id);

  post.update({
    $push: {
      comments: comment,
    },
  });

  res.send(comment);
});

app.get('/post/all', async (req, res, next) => {
  const posts = await Post.find({});
  res.send(posts);
});

app.post('/user/posts/all', async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const posts = await Post.find({ user_id });
    res.send(posts);
  } catch (err) {
    return next(err);
  }
});

app.get('/post/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.send(post);
  } catch (err) {
    return next(err);
  }
});

app.get('/post/:id/comments', async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ id });
    res.send(comments);
  } catch (err) {
    return next(err);
  }
});

// Create subdevit
app.post('/sub/new', async (req, res, next) => {
  const { id, name } = req.body;
  const sub = await Subveddit.create({ created_by: id, name });
  const user = await User.findById(id);
  sub.subscribers.push(user);
  res.send(sub);
});

// Get subveddit subscribers
app.get('/sub/:id/subscribers', async (req, res, next) => {
  // try {
  //   const { sub_id } = req.body;
  //   const sub = await Subveddit.findById(sub_id);
  //   res.send(sub);
  // } catch (err) {
  //   return next(err);
  // }
  const { id } = req.params;
  const sub = await Subveddit.findById(id);
  res.send(sub);
});

mongoose.connect(process.env.MONGO_DB, () =>
  console.log('Connected to Mongo DB'),
);

app.listen(3000, () => console.log('Listening on port 3000'));
