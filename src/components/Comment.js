import React from "react";
import { Box, Avatar, Paper, Typography } from "@mui/material";
import moment from "moment";

export function Comment(prop) {
  const comment = prop.commentInfo;
  const user = prop.userInfo;
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
            justifyContent: "flex-end",
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
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
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
