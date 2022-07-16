import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/reducers/PostsSlice";
import Post from "./Post";
import { Paper } from "@mui/material";

export default function PostDisplay() {
  const postState = useSelector((state) => state.posts);
  const arrayRerender = postState.postsArray;
  const dispatch = useDispatch();
  const [rendered, setRendered] = useState(false);

  const array = [];

  console.log(array);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    for (let i = 0; i < postState.postsArray.length; i++) {
      console.log("Content: ", postState.postsArray[i].content);
      array.push(<Post content={postState.postsArray[i].content} />);
    }
  }, [postState.postsArray]);
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
      >
        <Paper>I'm inside the box</Paper>
        {array}
      </Box>
    </div>
  );
}
