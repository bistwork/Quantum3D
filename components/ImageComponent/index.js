import Image from "next/image";
import { Box } from "@mui/material";
import styles from "./Image.module.css";

export default function CustomImage(props) {
  return (
    <Box padding={props.padding || "0 0 24px"} className={styles.boxImage}>
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width || 72}
        height={props.height || 72}
      />
    </Box>
  );
}
