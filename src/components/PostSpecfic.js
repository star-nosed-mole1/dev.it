import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import moment from 'moment';
import { Comment } from './Comment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { motion } from 'framer-motion';
import { refreshPost } from '../redux/reducers/PostsSlice';
import axios from 'axios';

export function PostSpecific(prop) {
  const postObject = prop.postDetail;
  const { darkMode } = prop;
  const [comments, setComments] = useState([]);
  const [submitComment, setSubmitComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [userPost, setUserPost] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const commentArray = [];
  useEffect(() => {
    getSpecificPost();

    if (postObject.author_id._id === user.id) {
      setUserPost(true);
    }
  }, [comments]);

  useEffect(() => {
    async function getKarma() {
      const { _id } = postObject;
      const result = await axios.get(`http://localhost:3000/post/${_id}`);
      setUpvotes(result.data.upvotes);
      setDownvotes(result.data.downvotes);
    }
    getKarma();
  }, []);

  async function upvote() {
    const { author_id, _id } = postObject;
    const authorId = author_id._id;
    const result = await axios.post(
      `http://localhost:3000/post/${_id}/upvote`,
      {
        user_id: authorId,
      }
    );
    setUpvotes(result.data.upvotes);
  }

  async function handleVote(e, vote) {
    if (vote === 'upvote') {
      upvote();
    } else {
      downvote();
    }
  }

  async function downvote() {
    const { author_id, _id } = postObject;
    const authorId = author_id._id;
    const result = await axios.post(
      `http://localhost:3000/post/${_id}/downvote`,
      {
        user_id: authorId,
      }
    );
    setDownvotes(result.data.downvotes);
  }

  // getting comments from the current
  // hasn't update the entire post fetch yet
  // need to pass in the entire post
  async function getSpecificPost() {
    setLoadingComments(true);
    const post = await fetch(
      `http://localhost:3000/post/${postObject._id}`,
    ).then((response) => response.json());
    const postComments = post.comments;
    for (let comment of postComments) {
      const user = await fetch(
        `http://localhost:3000/user/${comment.author_id}`,
      ).then((response) => response.json());
      commentArray.push(
        <motion.div
          animate={{
            marginTop: 0,
            opacity: 1,
          }}
          initial={{
            marginTop: 500,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <Comment
            commentInfo={comment}
            userInfo={user}
            refreshComments={getSpecificPost}
          ></Comment>
        </motion.div>,
      );
    }
    if (postComments.length !== comments.length) {
      setComments(commentArray);
    }
    setLoadingComments(false);
  }

  async function registerComment() {
    // get user for the state -> need to create reducer for the user to update when the user logs in
    // need to send author_id, post_id, and content
    const currentUserId = user.id;
    const postId = postObject._id;
    const result = await fetch('http://localhost:3000/comment/new', {
      method: 'POST',
      body: JSON.stringify({
        author_id: currentUserId,
        post_id: postId,
        content: submitComment,
      }),
    });
    setComments([]);
  }

  async function deletePost() {
    const postId = postObject._id;
    const currentUserId = user.id;
    const response = await fetch(`http://localhost:3000/post/${postId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        author_id: currentUserId,
      }),
    });
    dispatch(refreshPost());
    prop.return(false);
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        padding: '0px',
        margin: '0px',
      }}
    >
      {/* back arrow to return to all posts */}
      <Button
        sx={{
          marginBottom: '10px',
        }}
        onClick={() => {
          prop.return(false);
        }}
      >
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        <Typography>RETURN TO ALL POSTS</Typography>
      </Button>
      {/* content section */}
      <Box
        sx={{
          width: '100%',
          height: 'max-content',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <Avatar
          atl={postObject.author_id.username}
          src={postObject.author_id.avatar}
          sx={{
            width: '10%',
            height: '10%',
          }}
        ></Avatar>
        <Paper
          elevation={9}
          sx={{
            width: '100%',
            height: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            gap: '20px',
          }}
        >
          {/* section for title */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Quicksand',
                fontWeight: 600,
                minWidth: '80%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {postObject.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <ToggleButtonGroup
                exclusive='true'
                color='primary'
                onChange={handleVote}
              >
                <ToggleButton value='upvote' aria-label='upvote'>
                  <ThumbUpIcon />
                </ToggleButton>
                <ToggleButton value='downvote' aria-label='downvote'>
                  <ThumbDownIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          {/* section for content */}
          <Box>
            <Typography
              sx={{
                fontFamily: 'Quicksand',
                fontWeight: 400,
              }}
            >
              {postObject.content}
            </Typography>
            <span
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                fontFamily: 'Quicksand',
                fontWeight: 400,
                fontSize: '1.4vh',
              }}
            >
              {upvotes - downvotes} devutation
            </span>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <Box
              sx={{
                width: '20%',
              }}
            >
              {userPost && (
                <a>
                  <Typography
                    sx={{
                      fontSize: '0.4em',
                      padding: '0px',
                      margin: '0px',
                      color: '#2196f3',
                      textDecoration: 'underline',
                      fontStyle: 'italic',
                      '&:hover': {
                        color: '#64b5f6',
                      },
                      transitionDuration: '0.3s',
                    }}
                    onClick={deletePost}
                  >
                    Delete Post
                  </Typography>
                </a>
              )}
            </Box>

            <Box
              sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Quicksand',
                  fontSize: '0.6em',
                }}
              >
                {moment(postObject.created_at).format('MMMM D Y h:mm:ss')}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* section to submit comments */}
      <Box
        sx={{
          width: '100%',
          height: 'max-content',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: '20px',
          gap: '10px',
        }}
      >
        <TextField
          variant='outlined'
          placeholder='Enter a comment'
          sx={{
            width: '100%',
          }}
          multiline
          rows={4}
          onChange={(e) => {
            setSubmitComment(e.target.value);
          }}
        ></TextField>
        <Button variant='contained' onClick={registerComment}>
          SUBMIT
        </Button>
      </Box>

      {loadingComments && (
        <Box
          sx={{
            marginTop: '10px',
            width: '100%',
            height: 'max-content',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {/* section to display comments */}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {comments}
      </Box>
    </Box>
  );
}
