import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import AddCustomerStepper from "../AddCustomerStepper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResponsiveDialog({ open, setOpen, customerSelected }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": { borderRadius: ".3em" },
        }}
      >
        <AddCustomerStepper
          onClose={handleClose}
          customerSelected={customerSelected}
        />
      </Dialog>
    </>
  );
}
