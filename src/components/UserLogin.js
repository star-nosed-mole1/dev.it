import React from "react";
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

export function UserProfile() {
  const [loginAccount, setLoginAccount] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [statusRegistration, setStatusRegistration] = useState("");
  const [statusColor, setStatusColor] = useState("");

  // indicate if the user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  async function login() {
    // auth/login
    // Weldon_Orn
    // a_bTPLU5Rvo4Sla
    // perform fetch to the server for authentication
    const data = await fetch(
      `http://localhost:3000/auth/login?username=${username}&password=${password}`
    ).then((response) => response.json());
    if (data) {
      setAvatar(data.avatar);
      setLoggedIn(true);
    }
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
    }, 2000);
  }

  if (loggedIn) {
    return (
      <Paper
        elevation={5}
        sx={{
          width: "20vw",
          height: "50%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "20px",
          backgroundColor: "secondary.light",
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
        </Box>
        <Box
          sx={{
            height: "80%",
            width: "100%",
            border: 1,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* area for user to make post */}
          <TextField
            sx={{
              width: "93%",
              height: "100%",
              padding: "10px",
            }}
            placeholder="Title"
            variant="standard"
          ></TextField>
          <TextField
            sx={{
              width: "100%",
              height: "100%",
            }}
            placeholder="Content"
            rows="7"
            multiline
          ></TextField>
        </Box>
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
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 600,
              width: "60%",
              color: "#fefefe",
              borderRadius: "30px",
              backgroundColor: "#c62828",
              "&:hover": {
                backgroundColor: "#e53935",
              },
            }}
            onClick={() => {
              setLoggedIn(false);
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
          backgroundColor: "secondary.light",
          gap: "10px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Username"
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          sx={{
            backgroundColor: "primary.light",
          }}
        ></TextField>
        <TextField
          variant="outlined"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          sx={{
            backgroundColor: "primary.light",
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
          backgroundColor: "secondary.light",
          gap: "10px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Username"
          sx={{
            backgroundColor: "primary.light",
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></TextField>
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          sx={{
            backgroundColor: "primary.light",
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1565c0",
            "&:hover": {
              backgroundColor: "#42a5f5",
            },
          }}
        >
          <GoogleIcon></GoogleIcon>
        </Button>
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
