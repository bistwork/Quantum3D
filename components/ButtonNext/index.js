import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function ButtonNext(props) {
  return (
    <Button
      size="large"
      variant="outlined"
      endIcon={<NavigateNextIcon />}
      {...props}
      // sx={{ fontFamily: "var(--primary-font-family)" }}
    >
      {props.children}
    </Button>
  );
}
