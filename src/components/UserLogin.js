import React, { useEffect } from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Divider } from "@mui/material";
import { updateUser } from "../redux/reducers/UserSlice";
import { useDispatch } from "react-redux";
import { refreshPost } from "../redux/reducers/PostsSlice";
import { motion } from "framer-motion";

export function UserProfile({ darkMode }) {
  const [loginAccount, setLoginAccount] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [statusRegistration, setStatusRegistration] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [karma, setKarma] = useState(0);

  // state for posts
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // indicate if the user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  async function login() {
    const data = await fetch(
      `http://localhost:3000/auth/login?username=${username}&password=${password}`
    ).then((response) => response.json());
    if (data) {
      // send dispatch
      console.log(data);
      dispatch(updateUser(data));
      setKarma(data.devutation);
      setAvatar(data.avatar);
      setUserId(data._id);
      setLoggedIn(true);
    }
  }

  function logoutUser() {
    dispatch(
      updateUser({
        _id: "",
        username: "",
        avatar: "",
      })
    );
  }

  async function submitPost() {
    const result = await fetch("http://localhost:3000/post/new", {
      method: "POST",
      body: JSON.stringify({
        author_id: userId,
        title: title,
        content: content,
      }),
    });
    dispatch(refreshPost());
  }

  async function signUp() {
    const register = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        avatar: "",
      }),
    }).then((response) => response.json());

    if (!register) {
      setStatusRegistration("Username is already taken!");
      setStatusColor("red");
    } else {
      setStatusRegistration("Successfully Registered!");
      setStatusColor("green");
    }
    setTimeout(() => {
      setStatusRegistration("");
      setLoginAccount(true);
    }, 1000);
  }

  if (loggedIn) {
    return (
      <Paper
        elevation={5}
        sx={{
          width: "20vw",
          height: "max-content",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "20px",
          backgroundColor: darkMode ? "black" : "secondary.light",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            height: "max-content",
            width: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* have to include image source here */}
          <Avatar alt={username} src={avatar}></Avatar>
          <Typography
            sx={{
              padding: "0px",
              margin: "0px",
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          >
            {username}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontSize: "1.45vh",
              marginLeft: "auto",
              marginRight: "0",
              alignSelf: "flex-end",
            }}
          >
            {karma} devutation
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: "80%",
            width: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* area for user to make post */}
          <TextField
            sx={{
              height: "100%",
              padding: "10px",
            }}
            label="Title"
            variant="filled"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></TextField>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TextField
              sx={{
                width: "100%",
                height: "100%",
                paddingLeft: "10px",
                paddingBottom: "5px",
                paddingRight: "10px",
              }}
              label="Content"
              variant="filled"
              rows="7"
              multiline
              onChange={(e) => setContent(e.target.value)}
            ></TextField>
          </Box>
          <motion.div
            animate={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            whileHover={{
              scale: 0.98,
            }}
          >
            <Button variant="contained" onClick={submitPost}>
              SUBMIT POST
            </Button>
          </motion.div>
        </Box>
        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            small
            variant="standard"
            sx={{
              scale: 0.6,
              fontFamily: "Quicksand",
              fontWeight: 600,
              color: "#fefefe",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "#e53935",
              },
            }}
            onClick={() => {
              setLoggedIn(false);
              logoutUser();
            }}
          >
            SIGN OUT
          </Button>
        </Box>
      </Paper>
    );
  } else if (loginAccount) {
    return (
      <Paper
        elevation={5}
        sx={{
          width: "20vw",
          height: "max-content",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10px",
          backgroundColor: darkMode ? "#393E46" : "primary.light",
          gap: "10px",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          type="username"
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          sx={{
            backgroundColor: "secondary.light",
          }}
        ></TextField>
        <TextField
          variant="outlined"
          label="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          sx={{
            backgroundColor: "secondary.light",
          }}
        ></TextField>
        <Button variant="contained" onClick={login}>
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          >
            LOGIN
          </Typography>
        </Button>
        <a
          onClick={() => {
            setLoginAccount(false);
          }}
        >
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 500,
              fontSize: "0.7em",
              textAlign: "center",
              color: darkMode ? "primary.light" : "primary.light",
              "&:hover": {
                color: "primary.dark",
                transitionDuration: "0.5s",
              },
            }}
          >
            Don't have an Account? Register!
          </Typography>
        </a>
      </Paper>
    );
  } else {
    return (
      <Paper
        elevation={5}
        sx={{
          width: "20vw",
          height: "max-content",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10px",
          backgroundColor: darkMode ? "#393E46" : "primary.light",
          gap: "10px",
        }}
      >
        <TextField
          variant="outlined"
          label="Username"
          sx={{
            backgroundColor: "secondary.light",
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></TextField>
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required
          sx={{
            backgroundColor: "secondary.light",
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>
        {
          <div>
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontSize: "0.7em",
                fontWeight: 600,
                color: statusColor,
              }}
            >
              {statusRegistration}
            </Typography>
          </div>
        }
        <Button variant="contained" onClick={signUp}>
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          >
            REGISTER
          </Typography>
        </Button>
        <a href="http://localhost:3000/auth/google">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1565c0",
              width: "100%",
              "&:hover": {
                backgroundColor: "#42a5f5",
              },
            }}
          >
            <GoogleIcon></GoogleIcon>
          </Button>
        </a>
        <a href="http://localhost:3000/auth/github">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              "&:hover": {
                backgroundColor: "#212121",
              },
            }}
          >
            <GitHubIcon></GitHubIcon>
          </Button>
        </a>
      </Paper>
    );
  }
}
