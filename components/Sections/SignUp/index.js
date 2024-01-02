import * as React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import styles from "./SignUpLabel.module.css";

export default function SignUpLabel(props) {
  return (
    <Typography
      className={styles.singUpLabel}
      align="center"
      fontFamily={'"Poppins", sans-serif'}
      {...props.sx}
    >
      {props.text}
      <Link className={styles.link} href={props.linkPage}>
        {props.textLink}
      </Link>
    </Typography>
  );
}
