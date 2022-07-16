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

  function login() {
    // perform fetch to the server for authentication
    console.log(username, password);
  }

  if (loginAccount) {
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
