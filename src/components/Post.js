import React from "react";
import CommentIcon from '@mui/icons-material/Comment';
import { Paper, Typography, Avatar, IconButton } from "@mui/material";

export default function Post(prop) {
  // console.log("these are the post texts: ", prop.content);
  return (
    <Paper
      elevation={4}
      sx={{
        height: 60,
        display: "flex",
        borderRadius: 4,
        fontFamily: 'sans-serif',
        "&:hover": {
          backgroundColor: "secondary.light",
          cursor: 'pointer'
        },
      }}
    >
      <Avatar src={prop.avatar}
      sx={{
        padding: '5px',
        alignSelf: 'center',
      }}/>

      <span style={{
        paddingLeft: '10px',
      }}>{prop.username}</span>
      <div style={{ 
        paddingLeft: '50px', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}> 
        {prop.content}
        <IconButton style={{
          marginLeft: 'auto',
          marginRight: '7px',
        }}>
          <CommentIcon />
        </IconButton>
      </div>

    </Paper>
  );
}
