import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const getPosts = createAsyncThunk("posts/getPosts", async (url) => {
  // perform fetch with localhost 3000
  // return data from fetch
});

export default postsSlice.reducer;