import * as React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import styles from "./TermOfUse.module.css";

export default function TermOfUse(props) {
  return (
    <Typography
      className={styles.termOfUse}
      fontSize={"0.8em"}
      fontWeight={"lighter"}
      color={"#333"}
      align={props.align}
      {...props.sx}
    >
      {props.text}{" "}
      <Link className={styles.link} href={props.linkPage} target="_blank">
        {props.textLink}
      </Link>
    </Typography>
  );
}
