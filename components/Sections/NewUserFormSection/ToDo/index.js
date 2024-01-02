import { Button, Box, Typography } from "@mui/material";
import ButtonNext from "../../../ButtonNext";

export default function ToDo({ onNext, onPrevious, data }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography className="new-user-form-typo">
        What do you want to do?
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
        {`Build My New ${data.typeOfProject}`}
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
        {`Repair My existing ${data.typeOfProject}`}
      </ButtonNext>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          className="black-button"
          variant="outlined"
          onClick={onPrevious}
        >
          Previous
        </Button>
      </Box>
    </Box>
  );
}
