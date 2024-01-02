import { Box } from "@mui/material";
import styles from "./MainCard.module.css";

export default function MainCard({ children, ...props }) {
  return (
    <Box className={styles.mainBox} {...props}>
      {children}
    </Box>
  );
}
