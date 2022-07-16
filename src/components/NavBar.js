import React from "react";
import { AppBar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../assets/devit.png";

export function NavBar() {
  return (
    <AppBar
      sx={{
        width: "100%",
        height: "100px",
        backgroundColor: "primary.light",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-between",
      }}
    >
      <IconButton>
        <img src={logo} width="100%" height="100%" />
      </IconButton>

      <Box>
        <Button>
          <Typography
            sx={{
              fontFamily: "Quicksand",
            }}
          >
            HOME
          </Typography>
        </Button>
      </Box>
    </AppBar>
  );
}
