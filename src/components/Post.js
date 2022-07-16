import React from "react";
import { Paper, Typography, Avatar } from "@mui/material";

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
          backgroundColor: "secondary.main",
          cursor: 'pointer'
        },
      }}
    >
      <Avatar>T</Avatar>
      <span>Username</span>
      {prop.content}
    </Paper>
  );
}
