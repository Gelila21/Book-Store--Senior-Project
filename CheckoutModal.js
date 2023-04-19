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
