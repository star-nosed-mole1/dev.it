import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/PostsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
