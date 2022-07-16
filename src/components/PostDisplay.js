import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/reducers/PostsSlice";

export default function PostDisplay() {
  const postState = useSelector(state => state.post)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts);
  }, []);

  // creating an array
  // push new post component

  return (
    <Box
      sx={{
        width: 700,
        height: 700,
        backgroundColor: "secondary.light",
      }}
    />
  );
}
