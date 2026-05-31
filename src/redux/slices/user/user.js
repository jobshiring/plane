import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

// initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false,
};

// slice
export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateProfile(state, action) {
      state.user = action.payload;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    setCount(state) {
      state.count = state.count + 1;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },
  },
});

// Actions
export const { setLogin, setLogout, setCount, setInitialize, updateProfile } =
  userSlice.actions;

// ----------------------------------------------------------------------
