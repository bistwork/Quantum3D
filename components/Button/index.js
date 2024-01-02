import * as React from "react";
import styles from "./Button.module.css";
import Button from "@mui/material/Button";

export default function BasicButtons({ sx, ...props }) {
  return (
    <Button
      {...props}
      className={`${styles.customButton} ${props.className}`}
      sx={{
        ...sx,
        "&.Mui-disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.12) !important",
          color: "rgba(0, 0, 0, 0.26) !important",
        },
      }}
      variant="contained"
    >
      {props.children}
    </Button>
  );
}
