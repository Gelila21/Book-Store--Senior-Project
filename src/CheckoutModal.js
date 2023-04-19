import React from "react";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import "./CheckoutModal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    width: "100%",
    alignItems: "center"
  },
  flexSpacer: {
    flexGrow: 1
  }
}));

Modal.setAppElement("#root");

const CheckoutModal = ({ isOpen, onRequestClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="checkout-modal-title"
      className={classes.modal}
    >
      <DialogTitle id="checkout-modal-title">Checkout</DialogTitle>
      <form className={classes.form}>
        <DialogContent>
          <TextField
            label="Full Name"
            type="text"
            id="name"
            name="name"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            id="email"
            name="email"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Shipping Address"
            type="text"
            id="address"
            name="address"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            type="text"
            id="city"
            name="city"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            type="text"
            id="state"
            name="state"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="ZIP Code"
            type="text"
            id="zip"
            name="zip"
            required
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          <div className={classes.flexSpacer} />
          <Button onClick={onRequestClose} color="secondary" style={{ backgroundColor: '#333', color: '#fff' }}>
            Close
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Pay with PayPal
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CheckoutModal;
