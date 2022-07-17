import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/PostsSlice";
import userReducer from "../reducers/UserSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});
