import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  avatar: "", // link to avatar of the user
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      console.log(action.payload);
      const { _id, username, avatar } = action.payload;
      state.id = _id;
      state.username = username;
      state.avatar = avatar;

      console.log(_id, username, avatar);
    },
  },
});

export default userSlice.reducer;
export const { updateUser } = userSlice.actions;
