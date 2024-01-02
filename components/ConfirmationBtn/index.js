import Button from "../Button";
import { Box } from "@mui/material";

export default function ConfirmationBtn({ type, ...props }) {
  return (
    <Box
      type={type}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
        marginTop: props.marginTop || "2em",
      }}
    >
      <Button
        disabled={props.disabled}
        style={{
          backgroundColor: "var(--btn-color-blue)",
          color: "white",
        }}
      >
        {props.children}
      </Button>
    </Box>
  );
}
