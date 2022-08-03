import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { displayName: "", email: "", uid: "" },
  logged_in: false,
};

export const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.logged_in = true;
    },
    setLoggedIn: (state, action) => {
      state.logged_in = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
