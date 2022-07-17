import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Comment } from "./Comment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export function PostSpecific(prop) {
  const postObject = prop.postDetail;
  const [comments, setComments] = useState([]);
  const [submitComment, setSubmitComment] = useState("");
  const user = useSelector((state) => state.user);

  const commentArray = [];
  useEffect(() => {
    getSpecificPost();
  }, [comments]);

  async function getSpecificPost() {
    for (let comment of postObject.comments) {
      const user = await fetch(
        `http://localhost:3000/user/${comment.author_id}`
      ).then((response) => response.json());
      commentArray.push(
        <Comment commentInfo={comment} userInfo={user}></Comment>
      );
    }
    setComments(commentArray);
  }

  async function registerComment() {
    // get user for the state -> need to create reducer for the user to update when the user logs in
    // need to send author_id, post_id, and content
    const currentUserId = user.id;
    const postId = postObject._id;
    const result = await fetch("http://localhost:3000/comment/new", {
      method: "POST",
      body: JSON.stringify({
        author_id: currentUserId,
        post_id: postId,
        content: submitComment,
      }),
    });
    setComments("");
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        padding: "0px",
        margin: "0px",
      }}
    >
      {/* back arrow to return to all posts */}
      <Button
        sx={{
          marginBottom: "10px",
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
          width: "100%",
          height: "max-content",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <Avatar
          atl={postObject.author_id.username}
          src={postObject.author_id.avatar}
          sx={{
            width: "10%",
            height: "10%",
          }}
        ></Avatar>
        <Paper
          elevation={9}
          sx={{
            width: "100%",
            height: "max-content",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            gap: "20px",
          }}
        >
          {/* section for title */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontWeight: 600,
              }}
            >
              {postObject.title}
            </Typography>
          </Box>

          {/* section for content */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontWeight: 400,
              }}
            >
              {postObject.content}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontSize: "0.6em",
              }}
            >
              {moment(postObject.created_at).format("MMMM D Y h:mm:ss")}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "max-content",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter a comment"
          sx={{
            width: "100%",
          }}
          multiline
          rows={4}
          onChange={(e) => {
            setSubmitComment(e.target.value);
          }}
        ></TextField>
        <Button variant="contained" onClick={registerComment}>
          SUBMIT
        </Button>
      </Box>

      {/* comment section */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {comments}
      </Box>
    </Box>
  );
}
