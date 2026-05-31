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
      state.expiry = _.add(new Date().getTime(), 20 * 60000);
      state.backUrl = action.payload.backUrl;
      state.isBooking = true;
      state.booking = action.payload;
    },
    addBookingDetail: (state, action) => {
      state.expiry = _.add(new Date().getTime(), 20 * 60000);
      state.backUrl = action.payload.backUrl;
      state.isBooking = true;
      state.booking = action.payload;
    },
    cancelBooking: (state) => {
      const currentBooking = {
        ...state.booking,
        bookingStatus: "canceled",
      };

      state.booking = currentBooking;
    },

    confirmBooking: (state, action) => {
      state.expiry = _.add(new Date().getTime(), 20 * 60000);
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
