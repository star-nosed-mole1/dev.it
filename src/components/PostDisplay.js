import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/reducers/PostsSlice";
import Post from "./Post";

export default function PostDisplay() {
  const postState = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const array = [];

  console.log("PostState: ", postState);

  useEffect(() => {
    dispatch(getPosts());
    for (let i = 0; i < postState.length; i++) {
      array.push(<Post />);
    }
  }, []);

  // creating an array
  // push new post component

  return (
    <div>
      <Box
        sx={{
          width: 700,
          height: 700,
          backgroundColor: "secondary.light",
          display: "flex",
          flexDirection: "column",
        }}
      />
    </div>
  );
}
