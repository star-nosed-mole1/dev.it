import React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import PostDisplay from "./PostDisplay";
import { NavBar } from "./NavBar";

export function MainDisplay() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      {/* add navigation bar */}
      <div>Test</div>

      {/* for bottom container in the post display */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container xs={12}>
          <Grid item xs={8}>
            <PostDisplay />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </Box>
  );
}
