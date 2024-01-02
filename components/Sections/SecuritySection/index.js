import { Box } from "@mui/material";
import ChangeEmail from "../ChangeEmail";
import ChangePassword from "../ChangePassword";

export default function Security(props) {
  return (
    <Box sx={{ width: "100%", m: "auto", p: 2 }}>
      <ChangePassword />
      <ChangeEmail />
    </Box>
  );
}
