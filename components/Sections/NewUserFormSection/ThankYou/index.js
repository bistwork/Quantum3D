import { Box, Typography } from "@mui/material";
import RegularButton from "../../../RegularButton";

export default function ThankYou() {
  const handleClick = () => {
    window.location.href = "https://www.pergalum.net";
  };

  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <Typography fontSize={38} fontFamily={"var(--primary-font-family)"}>
        Thank you for your request!!
      </Typography>
      <Typography>
        Having gathered all your project details, we've connected you with
        dealers in your local area. You'll have the opportunity to select the
        one you'd prefer to collaborate with. Your information has been
        forwarded to them, and they will reach out to you soon. Take a look at
        their profiles below to conduct your research on their companies before
        they provide an estimate for your project.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <RegularButton onClick={handleClick} width="220px">
          Continue with Pergalum
        </RegularButton>
      </Box>
    </Box>
  );
}
