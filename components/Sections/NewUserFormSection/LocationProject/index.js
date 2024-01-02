import { Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import validations from "../../../../utils/validations";
import TextField from "../../../TextField";
import useFormInput from "../../../../hooks/useFormInput";
import RegularButton from "../../../RegularButton";

export default function LocationProject({ onNext }) {
  const input = useFormInput("", validations.isValidUSZipCode);

  const handleClick = (event) => {
    event.preventDefault();
    const inputIsValid = validations.isValidUSZipCode(input.value);
    if (!inputIsValid) {
      input.triggerOnChangeValidation();
    } else {
      onNext(input.value);
    }
  };

  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <Typography className="new-user-form-typo">
        What is the location of your project?
      </Typography>
      <TextField
        placeholder="Zip Code"
        name="zipCode"
        isValid
        onChange={input.onChange}
        autoComplete="postal-code"
        value={input.value}
      />
      <Box sx={{ mt: 2 }}>
        {!input.isValid && (
          <Alert variant="standard" severity="error" sx={{ mb: 2 }}>
            Please enter a valid zip code
          </Alert>
        )}
        <RegularButton onClick={handleClick}>Next</RegularButton>
      </Box>
    </Box>
  );
}
