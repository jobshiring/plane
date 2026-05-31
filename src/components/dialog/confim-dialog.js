import * as React from "react"; // Importing React for component creation

// MUI components for dialogs and buttons
import Button from "@mui/material/Button"; // Standard MUI button component
import Dialog from "@mui/material/Dialog"; // MUI Dialog component for pop-up modals
import DialogActions from "@mui/material/DialogActions"; // Wrapper for actions (buttons) in a dialog
import DialogContent from "@mui/material/DialogContent"; // Wrapper for the main content of the dialog
import DialogContentText from "@mui/material/DialogContentText"; // MUI component for displaying text content in a dialog
import DialogTitle from "@mui/material/DialogTitle"; // Title/header for the dialog
export default function ConfirmDialog({ ...props }) {
  const { setOpen, open, onAgree, isLoading } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancel Flight Booking</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your flight booking? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            No, Keep Booking
          </Button>
          <Button
            onClick={onAgree}
            autoFocus
            loading={isLoading}
            color="error"
            variant="contained"
          >
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
