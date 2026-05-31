/* Core */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  booking: null,
  expiry: null,
  backUrl: null,
  isBooking: false,
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addBooking: (state, action) => {
      state.expiry = _.add(new Date().getTime(), 5 * 60000);
      state.backUrl = action.payload.backUrl;
      state.isBooking = true;
      state.booking = action.payload;
    },
    resetBooking: (state) => {
      state.expiry = null;
      state.backUrl = null;
      state.isBooking = false;
      state.booking = null;
    },
  },
});
