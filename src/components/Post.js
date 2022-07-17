import React, { useEffect, useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { Paper, Typography, Avatar, IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import moment from 'moment';
import { useSpring, animated } from 'react-spring';

export default function Post(prop) {
  const [checked, setChecked] = useState(false);
  const { comments, content, avatar, username, createdAt, onClick } = prop;

  function commentChange() {
    setChecked((prev) => !prev);
  }

  function onlineAvatar() {
    const randomNum = Math.floor(Math.random() * 10);
    if (randomNum > 4) {
      return (
        <Avatar
          src={avatar}
          sx={{
            padding: '5px',
            alignSelf: 'center',
          }}
        />
      );
    } else {
      return (
        <StyledBadge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
        >
          <Avatar src={avatar} sx={{ padding: '5px', alignSelf: 'center' }} />
        </StyledBadge>
      );
    }
  }

  useEffect(() => {
    if (checked) {
      const timeout = window.setTimeout(() => {
        setChecked(false);
      }, 150);
      return window.clearTimeout(timeout);
    } else {
      return;
    }
  }, [checked]);

  const commentStyle = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    transform: checked
      ? 'translate(0px, 0px) rotate(0deg) scale(1.3)'
      : 'translate(0px, 0px) rotate(0deg) scale(1)',
    config: {
      tension: 400,
      friction: 15,
    },
  });

  return (
    <Paper
      elevation={4}
      checked={checked}
      onMouseEnter={() => commentChange()}
      onMouseLeave={() => commentChange()}
      sx={{
        height: 55,
        display: 'flex',
        borderRadius: 4,
        fontFamily: `'Lato', sans-serif`,
        '&:hover': {
          backgroundColor: 'secondary.light',
          cursor: 'pointer',
        },
      }}
      onClick={onClick}
    >
      {
        <Avatar
          src={avatar}
          sx={{
            padding: '5px',
            alignSelf: 'center',
          }}
        />
      }

      <span
        style={{
          paddingLeft: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: '5px',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            whiteSpace: 'nowrap',
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {username}
        </span>
        <span
          style={{
            fontSize: '11px',
            minWidth: '100px',
          }}
        >
          {moment(createdAt, 'YYYY-MM-DD').format('MMMM D Y')}
        </span>
      </span>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: '100%',
            fontSize: '18px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {content}
        </span>
        <animated.span style={commentStyle}>
          <IconButton
            size='small'
            sx={{
              float: 'right',
              color: 'primary.main',
            }}
          >
            <CommentIcon />
          </IconButton>
        </animated.span>
      </div>
    </Paper>
  );
}
