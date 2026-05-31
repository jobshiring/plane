import React from "react";
import Countdown from "react-countdown";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import { useDispatch, flightSlice, bookingExpiry, useSelector } from "@/redux";
import { useRouter } from "@bprogress/next";
import toast from "react-hot-toast";
import dayjs from "dayjs";
const renderer = ({ ...props }) => {
  const { minutes, seconds } = props;
  return (
    <Alert
      severity="info"
      variant="outlined"
      sx={{
        display: "inline-flex",
        alignItems: "start",
        pr: 6,
      }}
    >
      <Stack>
        <Typography
          variant="h6"
          sx={{ mr: 1, color: "info.main", lineHeight: 1.1 }}
        >
          Finish booking in
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          component="span"
          sx={{ pt: 1 }}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </Typography>
      </Stack>
    </Alert>
  );
};
export default function ExpiryCountDown({ ...props }) {
  const { popupOnly, setCount } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const ExpiryData = useSelector(bookingExpiry);
  const ExpiryTime = useSelector(({ flight }) => flight?.expiry);
  const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes in ms

  const expiry = popupOnly ? newExpiry : ExpiryData?.expiry;
  const backUrl = ExpiryData?.backUrl;
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    if (!popupOnly && ExpiryData.isBooking === false) {
      toast.error("Please select a flight before booking");
      dispatch(flightSlice.actions.resetBooking());
      router.push("/");
    }

    const checkExpiry = () => {
      if (dayjs().isAfter(dayjs(expiry))) {
        setIsExpired(true);
      }
    };
    const interval = setInterval(checkExpiry, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    dispatch(flightSlice.actions.resetBooking());
    router.push(backUrl || "/");
  };

  return (
    <>
      <Stack
        gap={1}
        direction={{ md: "row", xs: "column" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Typography variant="h2" color="text.primary">
          My Booking
        </Typography>
        {!popupOnly && (
          <Countdown date={new Date(ExpiryTime)} renderer={renderer} />
        )}
      </Stack>
      <Dialog
        open={isExpired}
        maxWidth="sm"
        fullWidth
        onClose={handleBack}
        aria-labelledby="session-expired-dialog-title"
        aria-describedby="session-expired-dialog-description"
      >
        <DialogTitle id="session-expired-dialog-title">
          Session Expired
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="session-expired-dialog-description">
            Your session has expired. Please click the button below to go back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="primary" autoFocus>
            Go Back
          </Button>
          {popupOnly && (
            <Button
              onClick={() => {
                setCount((prev) => prev + 1);
                setIsExpired(false);
              }}
              color="primary"
              autoFocus
            >
              Refresh Flights
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
