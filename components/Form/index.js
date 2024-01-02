import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import styles from "./Form.module.css";

export default function CustomizedInputsStyled(props) {
  return (
    <Box component="form" {...props} padding={"0 2em "} noValidate>
      <FormControl className={styles.form} variant="standard">
        {props.children}
      </FormControl>
    </Box>
  );
}
