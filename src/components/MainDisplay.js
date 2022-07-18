import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import PostDisplay from "./PostDisplay";
import { NavBar } from "./NavBar";
import { UserProfile } from "./UserLogin";

export function MainDisplay() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      const mode = localStorage.getItem("darkMode");
      if (mode === "true") {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: darkMode ? "#222831" : "white",
      }}
    >
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* add navigation bar */}
      {/* for bottom container in the post display */}
      <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          padding: "0px",
          margin: "0px",
        }}
      >
        <Box>
          <PostDisplay darkMode={darkMode} />
        </Box>
        <Box>
          <UserProfile darkMode={darkMode} />
        </Box>
      </Box>
    </Box>
  );
}
