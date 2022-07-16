import React from "react";
import {
  Paper,
  TextField,
  Button,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";

export function PostSpecific(prop) {
  const postObject = prop.postDetail;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        padding: "0px",
        margin: "0px",
      }}
    >
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
            height: "250px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box></Box>
          <Box></Box>
        </Paper>
      </Box>
    </Box>
  );
}
