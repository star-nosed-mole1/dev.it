import React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import PostDisplay from "./PostDisplay";
import { NavBar } from "./NavBar";
import { UserProfile } from "./UserProfile";

export function MainDisplay() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <NavBar />
      {/* add navigation bar */}
      {/* for bottom container in the post display */}
      <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Box>
          <PostDisplay />
        </Box>
        <Box>
          <UserProfile />
        </Box>
      </Box>
    </Box>
  );
}
