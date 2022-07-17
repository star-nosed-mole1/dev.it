import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/reducers/PostsSlice";
import Post from "./Post";
import { PostSpecific } from "./PostSpecfic";
import { Paper } from "@mui/material";
import moment from "moment";

export default function PostDisplay() {
  const postState = useSelector((state) => state.posts);
  const arrayRerender = postState.postsArray;
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const [specificPost, setSpecificPost] = useState(true);
  const [specificPostDetail, setSpecificPostDetail] = useState({
    _id: "62d3090a2967a6bf2963cbfd",
    author_id: {
      _id: "62d2290fbe13d65a80ea1f1f",
      username: "Keshawn35",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/323.jpg",
    },
    title: "egrerg",
    content: "34wfergr",
    comments: [
      {
        _id: "62d33997101eae47e3ba0f86",
        author_id: "62d2290fbe13d65a80ea1f15",
        post_id: "62d3090a2967a6bf2963cbfd",
        content: "Vel nobis quia tempora ut soluta.",
        created_at: "2022-07-16T22:20:07.804Z",
        __v: 0,
      },
      {
        _id: "62d3804725a9375a15967544",
        author_id: "62d2290fbe13d65a80ea1f0b",
        post_id: "62d3090a2967a6bf2963cbfd",
        content: "dfdfdfd",
        created_at: "2022-07-17T03:21:43.285Z",
        __v: 0,
      },
      {
        _id: "62d3804a25a9375a15967547",
        author_id: "62d2290fbe13d65a80ea1f0b",
        post_id: "62d3090a2967a6bf2963cbfd",
        content: "dfdfdfd",
        created_at: "2022-07-17T03:21:46.697Z",
        __v: 0,
      },
      {
        _id: "62d3804b25a9375a1596754a",
        author_id: "62d2290fbe13d65a80ea1f0b",
        post_id: "62d3090a2967a6bf2963cbfd",
        content: "dfdfdfd",
        created_at: "2022-07-17T03:21:47.077Z",
        __v: 0,
      },
      {
        _id: "62d3804b25a9375a1596754d",
        author_id: "62d2290fbe13d65a80ea1f0b",
        post_id: "62d3090a2967a6bf2963cbfd",
        content: "dfdfdfd",
        created_at: "2022-07-17T03:21:47.235Z",
        __v: 0,
      },
    ],
    created_at: "2022-07-16T18:52:58.583Z",
    __v: 0,
  });

  const array = [];

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  async function getSpecificPost(e) {
    console.log(e);
    setSpecificPost(true);
    setSpecificPostDetail(e);
  }

  useEffect(() => {
    for (let i = 0; i < postState.postsArray.length; i++) {
      const post = postState.postsArray[i];
      array.push(
        <Post
          key={i}
          content={post.title}
          avatar={post.author_id.avatar}
          username={post.author_id.username}
          createdAt={post.created_at.split("").slice(0, 10).join("")}
          onClick={() => {
            getSpecificPost(post);
          }}
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

  if (!specificPost) {
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
            overflowY: "auto",
          }}
        >
          {postList}
        </Box>
      </div>
    );
  } else {
    // when specific post is clicked it should transition into what the post content is
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
            overflow: "auto",
          }}
        >
          {
            <PostSpecific
              postDetail={specificPostDetail}
              return={setSpecificPost}
            />
          }
        </Box>
      </div>
    );
  }
}
