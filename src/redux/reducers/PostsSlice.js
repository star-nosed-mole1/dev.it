import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // posts are objects with information
  postsArray: [],
  newPost: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    refreshPost(state) {
      state.newPost = true;
    },
    stopRefreshPost(state) {
      state.newPost = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postsArray = action.payload; // update list of posts
    });
  },
});

export const getPosts = createAsyncThunk("posts/getPosts", async (url) => {
  // perform fetch with localhost 3000
  // const data = await fetch("http://localhost:3000/posts/recent").then(
  //   (response) => response.json()
  // );
  try {
    const data = await axios.get("http://localhost:3000/post/all");
    return data.data;
  } catch (err) {
    console.log("Something fucked up with the getPosts: ", err);
  }
});

export default postsSlice.reducer;
export const { refreshPost, stopRefreshPost } = postsSlice.actions;
