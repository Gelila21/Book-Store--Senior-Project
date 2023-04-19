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
