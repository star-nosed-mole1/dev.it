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

  // indicate if the user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    // perform fetch to the server for authentication
    console.log(username, password);
  }

  if (loggedIn) {
    return (
      <Paper
        elevation={5}
        sx={{
          width: "20vw",
          height: "30%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "10px",
          backgroundColor: "secondary.light",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            height: "max-content",
            width: "100%",
            border: 1,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* have to include image source here */}
          <Avatar alt={"name-profile"}></Avatar>
          <Typography
            sx={{
              padding: "0px",
              margin: "0px",
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          >
            Name
          </Typography>
        </Box>
        <Box
          sx={{
            height: "60%",
            width: "100%",
            border: 1,
            borderRadius: "20px",
          }}
        ></Box>
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
        ></TextField>
        <TextField
          variant="outlined"
          placeholder="Password"
          sx={{
            backgroundColor: "primary.light",
          }}
        ></TextField>
        <Button variant="contained">
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#212121",
            },
          }}
        >
          <GitHubIcon></GitHubIcon>
        </Button>
      </Paper>
    );
  }
}
