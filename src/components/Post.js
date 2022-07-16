import React from "react";
import CommentIcon from '@mui/icons-material/Comment';
import { Paper, Typography, Avatar, IconButton } from "@mui/material";

export default function Post(prop) {
  // console.log("these are the post texts: ", prop.content);
  return (
    <Paper
      elevation={24}
      variant="outlined"
      sx={{
        height: 60,
        display: "flex",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: "secondary.light",
          cursor: 'pointer'
        },
      }}
    >
      <Avatar>T</Avatar>

      <IconButton>
      </IconButton>
      <span>Username</span>
      {prop.content}
    </Paper>
  );
}
