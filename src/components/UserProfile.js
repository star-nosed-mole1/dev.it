import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Box,
  TextField,
} from "@mui/material";

export function UserProfile() {
  // image
  // name
  //

  return (
    <Box
      sx={{
        width: "100%",
        height: "30%",
        border: 1,
        borderRadius: "10px",
      }}
    >
      <TextField variant="outlined" placeholder="Username"></TextField>
      <TextField variant="outlined" placeholder="Password"></TextField>
    </Box>
  );
}
