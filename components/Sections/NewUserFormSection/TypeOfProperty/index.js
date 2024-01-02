import { Box, Typography } from "@mui/material";
import ButtonNext from "../../../ButtonNext";
import RegularButton from "../../../RegularButton";

export default function TypeOfProperty({ onNext, onPrevious }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography className="new-user-form-typo">
        What type of property is the project location?
      </Typography>
      <ButtonNext
        className="black-button"
        onClick={(e) => onNext(e.target.textContent)}
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Residential
      </ButtonNext>
      <ButtonNext
        className="black-button"
        onClick={(e) => onNext(e.target.textContent)}
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Commercial
      </ButtonNext>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <RegularButton onClick={onPrevious}>Previous</RegularButton>
      </Box>
    </Box>
  );
}
