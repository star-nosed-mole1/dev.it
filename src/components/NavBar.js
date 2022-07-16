import React from "react";
import { AppBar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../assets/devit.png";
import GitHubIcon from "@mui/icons-material/GitHub";

export function NavBar() {
  return (
    <AppBar
      sx={{
        width: "100%",
        height: "100px",
        backgroundColor: "primary.light",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <IconButton>
        <img src={logo} width="100%" height="100%" />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          small
          sx={{
            height: "30%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          >
            HOME
          </Typography>
        </Button>
        <IconButton>
          <a href="https://github.com/star-nosed-mole1/dev.it" target="_blank">
            <GitHubIcon></GitHubIcon>
          </a>
        </IconButton>
      </Box>
    </AppBar>
  );
}
