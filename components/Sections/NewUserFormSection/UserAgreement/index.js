import { Box, Typography } from "@mui/material";
import TermsAndConditions from "../../../TermsAndAgree";
import RegularButton from "../../../RegularButton";

export default function UserAgreement({ onNext, onPrevious }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography className="new-user-form-typo">
        Please accept our user agreement to be assigned a dealer in your area.
      </Typography>
      <TermsAndConditions />
      <Typography fontFamily={"Barlow,sans-serif"}>
        By submitting the form you agree to the above terms.
      </Typography>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <RegularButton onClick={onPrevious}>Previous</RegularButton>
        <RegularButton
          onClick={() => {
            onNext(true);
          }}
        >
          Submit
        </RegularButton>
      </Box>
    </Box>
  );
}
