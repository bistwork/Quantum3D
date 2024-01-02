import TextField from "../../TextField";
import { Grid } from "@mui/material";
import ConfirmationBtn from "../../ConfirmationBtn";
import { useEffect, useState } from "react";
import validations from "../../../utils/validations";
import useFormInput from "../../../hooks/useFormInput";

export default function ChangeEmail(props) {
  const emailInput = useFormInput("", validations.email);
  const confirmedEmailInput = useFormInput("", validations.email);
  const [areEmailsValid, setAreEmailsValid] = useState(false);

  const setNewEmail = () => {};

  useEffect(() => {
    if (
      emailInput.isValid &&
      confirmedEmailInput.isValid &&
      emailInput.value === confirmedEmailInput.value &&
      emailInput.value !== "" &&
      confirmedEmailInput.value !== ""
    ) {
      setAreEmailsValid(true);
    } else {
      setAreEmailsValid(false);
    }
  }, [
    emailInput.isValid,
    confirmedEmailInput.isValid,
    emailInput.value,
    confirmedEmailInput.value,
  ]);

  const handleEmailChange = emailInput.onChange;
  const handleOnBlurEmail = emailInput.onBlur;
  const handleConfirmedEmailChange = confirmedEmailInput.onChange;
  const handleOnBlurConfirmedEmail = confirmedEmailInput.onBlur;

  return (
    <form onSubmit={setNewEmail} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="email"
            tooltipText="Enter a valid Email"
            value={emailInput.value}
            type="email"
            fullWidth
            helperText={<p>New Email</p>}
            placeholder="Enter new email"
            required
            isValid={emailInput.isValid}
            onChange={handleEmailChange}
            onBlur={handleOnBlurEmail}
            nonCopyable
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="email"
            tooltipText="Enter a valid Email"
            value={confirmedEmailInput.value}
            type="email"
            fullWidth
            helperText={<p>Confirm Email</p>}
            placeholder="Confirm Email"
            required
            isValid={confirmedEmailInput.isValid}
            onChange={handleConfirmedEmailChange}
            onBlur={handleOnBlurConfirmedEmail}
          />
        </Grid>
      </Grid>
      <ConfirmationBtn
        type={"submit"}
        marginTop="1em"
        disabled={!areEmailsValid}
      >
        Change Email
      </ConfirmationBtn>
    </form>
  );
}
