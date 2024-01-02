import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import styles from "./TextField.module.css";
import Grid from "@mui/material/Grid";
import Link from "next/link";

export default function CustomTextField(props) {
  const {
    forgotPassword,
    topTextField,
    isValid,
    isMatched,
    nonCopyable,
    tooltipText,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={topTextField ? styles.topTextField : ""}>
      {props.helperText && (
        <Grid
          className={styles.helperText}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            {props.helperText}
            {props.required && <span className={styles.required}>*</span>}
          </Grid>
          {forgotPassword && (
            <Grid item className={styles.forgotPassword}>
              <Link href="/forgotPassword">Forgot Password?</Link>
            </Grid>
          )}
        </Grid>
      )}
      <Tooltip
        placement={props.tooltipPosition || "left"}
        PopperProps={{
          className: styles.tooltipWithBreaks,
        }}
        title={
          props.name === "password"
            ? "Must Contain:\n• Minimun 8 characters\n• One UpperCase\n• One LowerCase\n• One Number\n• One Special (!@#$&%)"
            : props.tooltipText || ""
        }
        open={!isValid && isFocused}
        arrow
      >
        <TextField
          onCopy={nonCopyable ? (e) => e.preventDefault() : null}
          className={`${props.className} ${!isValid ? styles.error : ""} ${
            styles.mainTextField
          } main-text-field`}
          {...restProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
          helperText={null}
          FormHelperTextProps={{ classes: { root: styles.muiHelperText } }}
          variant="outlined"
          color={isValid ? "primary" : "error"}
        />
      </Tooltip>
      {props.name === "password" && !props.isValid && (
        <p className={styles.invalidText}>Invalid Password</p>
      )}
      {isMatched && <p className={styles.isMatched}>Password Match!</p>}
    </div>
  );
}
