require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');

app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter), app.use('/comment', commentRouter);

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
