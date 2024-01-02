import { Button } from "@mui/material";
import styles from "./RegularButton.module.css";

export default function (props) {
  return (
    <Button
      className={styles.regularButton}
      variant={props.variant || "outlined"}
      onClick={props.onClick}
      sx={{ width: props.width || "95px" }}
    >
      {props.children}
    </Button>
  );
}
