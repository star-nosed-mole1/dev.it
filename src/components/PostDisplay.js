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
  const [postList, setPostList] = useState([]);

  const array = [];

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    for (let i = 0; i < postState.postsArray.length; i++) {
      // console.log("Content: ", postState.postsArray[i].content);
      console.log(postState);
      array.push(<Post key={i} content={postState.postsArray[i].content} />);
      setPostList(array);
    }
    // array.map((post, i) => {
    //   <Post id={i} content={post.content} />;
    // });
  }, [postState.postsArray]);
  // creating an array
  // push new post component

  return (
    <div>
      <Box
        sx={{
          width: "70vw",
          height: 700,
          backgroundColor: "primary.light",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
          borderRadius: 4,
        }}
      >
        {postList}
      </Box>
    </div>
  );
}
