/* Instruments */

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const booking = (state) => state.flight.booking;
export const bookingExpiry = (state) => {
  return {
    expiry: state.flight.expiry,
    backUrl: state.flight.backUrl,
    isBooking: state.flight.isBooking,
  };
};
