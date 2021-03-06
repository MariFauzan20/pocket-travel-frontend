import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
let initialState;

if (user) {
  initialState = JSON.parse(user);
} else {
  initialState = {
    user_id: "",
    name: "",
    email: "",
    token: "",
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    reset: (state) => {
      state.user_id = '';
      state.name = '';
      state.email = '';
      state.token = '';
    }
  },
});

export const { login, reset } = authSlice.actions;
export default authSlice.reducer;
