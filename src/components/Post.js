import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import { Paper, Typography, Avatar, IconButton, Popover } from "@mui/material";
import Badge from "@mui/material/Badge";
import moment from "moment";
import { useSpring, animated } from "react-spring";

export default function Post(prop) {
  const [checked, setChecked] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const { comments, content, avatar, username, createdAt, onClick } = prop;

  function commentChange() {
    setChecked((prev) => !prev);
  }

  function popoverOpen(e) {
    setAnchor(e.currentTarget);
  }

  const open = Boolean(anchor);

  function popoverClose() {
    setAnchor(null);
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
    display: "inline-block",
    backfaceVisibility: "hidden",
    transform: checked
      ? "translate(0px, 0px) rotate(0deg) scale(1.3)"
      : "translate(0px, 0px) rotate(0deg) scale(1)",
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
        display: "flex",
        borderRadius: 4,
        fontFamily: "Quicksand",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "secondary.light",
          cursor: "pointer",
          "& .content": {
            fontWeight: "600",
          },
          "& .username": {
            maxWidth: "100%",
          },
        },
      }}
      onClick={onClick}
    >
      <Avatar
        aria-owns={open ? "popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={popoverOpen}
        onMouseLeave={popoverClose}
        src={avatar}
        sx={{
          padding: "5px",
          alignSelf: "center",
        }}
      />
      <Popover
        id="popover"
        open={open}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={popoverClose}
        disableRestoreFocus
        sx={{
          pointerEvents: "none",
        }}
      >
        <Avatar
          variant="rounded"
          src={avatar}
          sx={{
            zoom: 3,
          }}
        />
      </Popover>

      <Typography
        sx={{
          paddingLeft: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <Typography
          className="username"
          sx={{
            fontSize: "13px",
            whiteSpace: "nowrap",
            maxWidth: "75px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {username}
        </Typography>
        <Typography
          sx={{
            fontSize: "11px",
            minWidth: "100px",
          }}
        >
          {moment(createdAt, "YYYY-MM-DD").format("MMMM D Y")}
        </Typography>
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="content"
          style={{
            width: "100%",
            fontSize: "18px",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span
            style={{
              maxWidth: "600px",
            }}
          >
            {content}
          </span>
        </span>
        <animated.span style={commentStyle}>
          <Badge
            badgeContent={comments.length}
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <IconButton
              size="small"
              sx={{
                float: "right",
                color: "primary.main",
              }}
            >
              <CommentIcon />
            </IconButton>
          </Badge>
        </animated.span>
      </div>
    </Paper>
  );
}
