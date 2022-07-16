import React from "react";
import { Box } from "@mui/system";
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
      <PostDisplay />
    </Box>
  );
}
