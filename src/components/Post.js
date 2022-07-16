import React from "react";
import { Paper, Typography } from "@mui/material";

export default function Post(prop) {
  console.log("these are the post texts: ", prop.content);
  return <Paper elevation={3}>{prop.content}</Paper>;
}
