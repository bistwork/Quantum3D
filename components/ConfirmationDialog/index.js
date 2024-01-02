import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  onClose,
  text,
  leftBtnText,
  rightBtnText,
  onClickLeftBtn,
  onClickRightBtn,
  ...props
}) {
  const handleLeftButton = (e) => {
    onClose();
    if (onClickLeftBtn) {
      onClickLeftBtn();
    }
  };
  const handleRightButton = (e) => {
    onClose();
    if (onClickRightBtn) {
      onClickRightBtn();
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{text || "Write your text here"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleLeftButton}>{leftBtnText || "Disagree"}</Button>
        <Button onClick={handleRightButton}>{rightBtnText || "Agree"}</Button>
      </DialogActions>
    </Dialog>
  );
}
