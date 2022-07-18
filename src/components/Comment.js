import React, { useEffect, useState } from "react";
import { Box, Avatar, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

export function Comment(prop) {
  const comment = prop.commentInfo;
  const user = prop.userInfo;
  const currentUser = useSelector((state) => state.user);
  const [userComment, setUserComment] = useState(false);
  const currentUserId = currentUser.id; // to check if the comment belongs to that specific user

  console.log(comment);

  useEffect(() => {
    if (comment.author_id === currentUserId) {
      setUserComment(true);
    }
  }, []);

  async function deleteComment() {}

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        displayDirection: "row",
        height: "max-content",
        paddingTop: "15px",
        gap: "10px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "70%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "max-content",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontSize: "0.6em",
              width: "max-content",
              height: "min-content",
            }}
          >
            {moment(comment.created_at).format("MMMM D Y h:mm:ss")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 400,
              width: "max-content",
              height: "100%",
            }}
          >
            {comment.content}
          </Typography>
          {userComment && (
            <a>
              <Typography
                sx={{
                  fontSize: "0.7em",
                  padding: "0px",
                  margin: "0px",
                  color: "#2196f3",
                  textDecoration: "underline",
                  fontStyle: "italic",
                  "&:hover": {
                    color: "#64b5f6",
                  },
                  transitionDuration: "0.3s",
                }}
              >
                remove comment
              </Typography>
            </a>
          )}
        </Box>
      </Paper>
      <Avatar
        alt={user.username}
        src={user.avatar}
        sx={{
          width: "5%",
          height: "100%",
        }}
      ></Avatar>
    </Box>
  );
}
