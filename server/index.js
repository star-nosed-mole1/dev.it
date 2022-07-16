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
app.use('/post', postRouter);
app.use('/comment', commentRouter);

mongoose.connect(process.env.MONGO_DB, () =>
  console.log('Connected to Mongo DB'),
);

app.listen(3000, () => console.log('Listening on port 3000'));
