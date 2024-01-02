import Button from "../../Button";
import { Box } from "@mui/material";

export default function UpdateCancel({
  hasChanged,
  hasChangedAndValid,
  onReset,
  onUpdate,
  ...props
}) {
  // --btn-color-blue
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
        marginTop: "2em",
      }}
    >
      <Button
        className="update-btn"
        style={{
          backgroundColor: "var(--btn-color-blue)",
          color: "white",
        }}
        disabled={!hasChangedAndValid}
        type="submit"
      >
        Updates
      </Button>
      <Button
        className="cancel-btn"
        style={{
          backgroundColor: "var(--light-error-color)",
          color: "var(--error-color)",
        }}
        disabled={!hasChanged}
        onClick={() => {
          if (onReset) onReset();
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}
