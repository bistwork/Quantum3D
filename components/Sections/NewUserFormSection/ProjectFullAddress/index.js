import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import TextField from "../../../TextField";
import useFormInput from "../../../../hooks/useFormInput";
import validations from "../../../../utils/validations";
import formatters from "../../../../utils/formatters";
import RegularButton from "../../../RegularButton";

export default function ProjectFullAddress({ onNext, onPrevious }) {
  const streetAddress = useFormInput("", validations.validateNotEmpty);
  const city = useFormInput(
    "",
    validations.validateNotEmpty,
    formatters.removeNumbers
  );
  const state = useFormInput(
    "",
    validations.validateNotEmpty,
    formatters.removeNumbers
  );

  const style = { marginBottom: "10px!important" };
  const [showAlert, setShowAlert] = useState(false);

  const handleNext = () => {
    const streetIsValid = validations.validateNotEmpty(streetAddress.value);
    const cityIsValid = validations.validateNotEmpty(city.value);
    const stateIsValid = validations.validateNotEmpty(state.value);

    if (!streetIsValid) streetAddress.triggerOnChangeValidation();
    if (!cityIsValid) city.triggerOnChangeValidation();
    if (!stateIsValid) state.triggerOnChangeValidation();

    if (streetIsValid && cityIsValid && stateIsValid) {
      onNext({
        streetAddress: streetAddress.value,
        city: city.value,
        state: state.value,
      });
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setShowAlert(!streetAddress.isValid || !city.isValid || !state.isValid);
  }, [streetAddress.isValid, city.isValid, state.isValid]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography className="new-user-form-typo">
        What is the address of your project?
      </Typography>

      <TextField
        isValid
        autoComplete="street-address"
        placeholder="Street Address"
        sx={style}
        value={streetAddress.value}
        onChange={streetAddress.onChange}
      />
      <TextField
        isValid
        autoComplete="address-level2"
        placeholder="City"
        sx={style}
        value={city.value}
        onChange={city.onChange}
      />
      <TextField
        isValid
        autoComplete="address-level1"
        placeholder="State"
        value={state.value}
        onChange={state.onChange}
      />

      {showAlert && (
        <Alert variant="standard" severity="error" sx={{ mb: 2, mt: 2 }}>
          Please fill out all fields and ensure they are valid.
        </Alert>
      )}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <RegularButton onClick={onPrevious}>Previous</RegularButton>
        <RegularButton onClick={handleNext}>Next</RegularButton>
      </Box>
    </Box>
  );
}
