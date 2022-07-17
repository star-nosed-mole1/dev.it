import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/reducers/PostsSlice';
import Post from './Post';
import { PostSpecific } from './PostSpecfic';

export default function PostDisplay() {
  const postState = useSelector((state) => state.posts);
  const arrayRerender = postState.postsArray;
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);

  const [specificPost, setSpecificPost] = useState(true);
  const [specificPostDetail, setSpecificPostDetail] = useState({
    _id: '62d308eb2967a6bf2963cbfa',
    author_id: {
      _id: '62d2290fbe13d65a80ea1f1d',
      username: 'Alejandrin_Leffler',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/354.jpg',
    },
    title: 'testing',
    content: 'testing',
    comments: [
      {
        _id: '62d33997101eae47e3ba0f83',
        author_id: '62d2290fbe13d65a80ea1f11',
        post_id: '62d308eb2967a6bf2963cbfa',
        content: 'Ullam ipsa sed quis non qui.',
        created_at: '2022-07-16T22:20:07.783Z',
        __v: 0,
      },
    ],
    created_at: '2022-07-16T18:52:27.834Z',
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
      console.log(post.comments);
      array.push(
        <Post
          key={i}
          comments={post.comments}
          content={post.title}
          avatar={post.author_id.avatar}
          username={post.author_id.username}
          createdAt={post.created_at.split('').slice(0, 10).join('')}
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
            width: '70vw',
            height: 700,
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
          sx={{
            width: '70vw',
            height: 700,
            backgroundColor: 'secondary.light',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '20px',
            borderRadius: 4,
            overflow: 'auto',
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
