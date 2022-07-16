import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/reducers/PostsSlice";
import Post from "./Post";
import { Paper } from "@mui/material";
import moment from 'moment';

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
      // console.log((postState.postsArray[i].created_at).split('').slice(6, 8).join(''));
      // const year = (postState.postsArray[i].created_at).split('').slice(0, 4).join('')
      const post = postState.postsArray[i]
      console.log(postState.postsArray[i])
      array.push(<Post 
        key={i} 
        content={post.title} 
        avatar={post.author_id.avatar} 
        username={post.author_id.username}
        createdAt={(post.created_at).split('').slice(0, 10).join('')}
        />
      );
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
          backgroundColor: "secondary.light",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
          borderRadius: 4,
          overflow: 'auto',
        }}
      >
        {postList}
      </Box>
    </div>
  );
}
