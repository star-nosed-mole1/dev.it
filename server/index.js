require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const authRouter = require('./routes/authRouter');
const subRouter = require('./routes/subdevitRouter');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:8080',
  }),
);
app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/sub', subRouter);
// app.use('/auth', authRouter);

//create auth/login route

mongoose.connect(
  'mongodb+srv://carmencarmen:wmPqLPdW1u7nxr2k@cluster0.4fpu4.mongodb.net/devit?retryWrites=true&w=majority',
  () => console.log('Connected to Mongo DB'),
);

app.listen(3000, () => console.log('Listening on port 3000'));
