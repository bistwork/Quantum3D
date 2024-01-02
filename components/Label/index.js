import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./label.module.css";

export default function CustomLabel(props) {
  return (
    <Box
      marginBottom={props.marginBottom}
      className={`${props.colored ? styles.colored : ""} ${styles.labelBox}`}
      sx={props.sx}
    >
      <Typography
        fontSize={props.fontSize}
        color={props.color}
        component={props.component}
        fontFamily={'"Poppins", sans-serif'}
        fontWeight={props.fontWeight}
      >
        {props.children}
      </Typography>
    </Box>
  );
}
