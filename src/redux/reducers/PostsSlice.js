import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // posts are objects with information
  postsArray: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addComment(state, action) {
      // add comment to a specific post by looping through the array
      // getting specific id of the post then add it to the array of comments
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
