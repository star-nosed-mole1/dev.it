import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/reducers/PostsSlice";
import Post from "./Post";
import { PostSpecific } from "./PostSpecfic";
import { motion } from "framer-motion";
import { stopRefreshPost } from "../redux/reducers/PostsSlice";

export default function PostDisplay() {
  const postState = useSelector((state) => state.posts);
  const refresh = postState.newPost;
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const myBox = useRef(null);

  const [specificPost, setSpecificPost] = useState(false);
  const [specificPostDetail, setSpecificPostDetail] = useState({});

  const array = [];

  // right now it is only fetching once
  // need to fetch every now and then or when the user posts new content
  useEffect(() => {
    if (myBox.current !== null) {
      myBox.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [specificPost]);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  async function getSpecificPost(e) {
    setSpecificPost(true);
    setSpecificPostDetail(e);
  }

  useEffect(() => {
    for (let i = 0; i < postState.postsArray.length; i++) {
      const post = postState.postsArray[i];
      array.push(
        <motion.div
          animate={{
            marginTop: 0,
            opacity: 1,
          }}
          initial={{
            marginTop: 1000,
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <Post
            key={i}
            comments={post.comments}
            content={post.title}
            avatar={post.author_id.avatar}
            username={post.author_id.username}
            createdAt={post.created_at.split("").slice(0, 10).join("")}
            onClick={() => {
              getSpecificPost(post);
            }}
          ></Post>
        </motion.div>
      );
      setPostList(array);
    }
  }, [postState.postsArray]);

  if (refresh) {
    dispatch(getPosts());
    dispatch(stopRefreshPost());
  }

  if (!specificPost) {
    return (
      <div>
        <Box
          sx={{
            width: '70vw',
            height: 750,
            backgroundColor: 'secondary.light',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '20px',
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
          ref={myBox}
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
