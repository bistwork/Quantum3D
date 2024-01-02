import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CustomizedSnackbars(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (props.onClose) props.onClose();
  };
  //type of alerts:
  //["error", "warning", "info", "success"]
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.open || false}
        autoHideDuration={4000}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={props.alertType || "success"}
          sx={{ width: "100%" }}
        >
          {props.message || "This is a success message!"}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
// --------USAGE----------
////  useContext from react
//import { SnackbarContext } from "../../../context/snackBar-context";
// const showSnackbar = useContext(SnackbarContext);
// showSnackbar("Your profile has been Updated!", "error");
