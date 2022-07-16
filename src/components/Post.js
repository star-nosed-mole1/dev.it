import React, { useState } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import { Paper, Typography, Avatar, IconButton, Grow } from "@mui/material";
import moment from 'moment';

export default function Post(prop) {
  const [checked, setChecked] = useState(false)

  function commentChange() {
    setChecked((prev) => !prev)
  }
  // console.log("these are the post texts: ", prop.content);

  // const dateCreated = moment(prop.createdAt, 'YYYY-MM-DD').format('MMMM D Y')
  // console.log(dateCreated)
  return (
    <Paper
      elevation={4}
      checked={checked}
      onMouseEnter={() => commentChange()}
      onMouseLeave={() => commentChange()}
      sx={{
        height: 55,
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '5px'
      }}>
      <span style={{
        fontSize: '14px',
        whiteSpace: 'nowrap',
        maxWidth: '100px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{prop.username}</span>
      <span style={{
        fontSize: '12px'
      }}>{moment(prop.createdAt, 'YYYY-MM-DD').format('MMMM D Y')}</span>
      </span>
      <div style={{ 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}> 
        <span style={{
          position: 'fixed',
          left: '250px'
        }}>
        {prop.content}</span>
        <Grow in={checked} mountOnEnter unmountOnExit> 
          <IconButton sx={{
            fontSize: 'small',
            marginLeft: 'auto',
            marginRight: '7px',
            color: 'primary.dark',
          }}>
            <CommentIcon />
          </IconButton>
        </Grow>
      </div>

    </Paper>
  );
}
