import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import formatters from "../../../../utils/formatters";
import validations from "../../../../utils/validations";
import useFormInput from "../../../../hooks/useFormInput";
import TextField from "../../../TextField";
import RegularButton from "../../../RegularButton";

export default function MoreInfo({ onNext, onPrevious }) {
  const firstName = useFormInput(
    "",
    validations.validateNotEmpty,
    formatters.removeNumbers
  );
  const lastName = useFormInput(
    "",
    validations.validateNotEmpty,
    formatters.removeNumbers
  );
  const phone = useFormInput(
    "",
    validations.validateNotEmpty,
    formatters.phoneFormatter
  );
  const email = useFormInput("", validations.email);

  const style = { marginBottom: "10px!important" };

  const [showAlert, setShowAlert] = useState(false);

  const handleNext = () => {
    const firstNameIsValid = validations.validateNotEmpty(firstName.value);
    const lastNameIsValid = validations.validateNotEmpty(lastName.value);
    const phoneIsValid = validations.validateNotEmpty(phone.value);
    const emailIsValid = validations.email(email.value);

    if (!firstNameIsValid) firstName.triggerOnChangeValidation();
    if (!lastNameIsValid) lastName.triggerOnChangeValidation();
    if (!phoneIsValid) phone.triggerOnChangeValidation();
    if (!emailIsValid) email.triggerOnChangeValidation();

    if (firstNameIsValid && lastNameIsValid && phoneIsValid && emailIsValid) {
      onNext({
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value,
      });
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setShowAlert(
      !firstName.isValid ||
        !lastName.isValid ||
        !phone.isValid ||
        !email.isValid
    );
  }, [firstName.isValid, lastName.isValid, phone.isValid, email.isValid]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography className="new-user-form-typo">
        Providing a bit more information will allow us to connect you with a
        suitable installer!
      </Typography>

      <TextField
        isValid
        autoComplete="given-name"
        placeholder="First Name"
        sx={style}
        value={firstName.value}
        onChange={firstName.onChange}
      />
      <TextField
        isValid
        autoComplete="family-name"
        placeholder="Last Name"
        sx={style}
        value={lastName.value}
        onChange={lastName.onChange}
      />
      <TextField
        isValid
        autoComplete="tel"
        placeholder="Phone"
        sx={style}
        value={phone.value}
        onChange={phone.onChange}
      />
      <TextField
        isValid
        autoComplete="email"
        placeholder="email@example.com"
        value={email.value}
        onChange={email.onChange}
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
